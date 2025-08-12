const express = require('express');
const cors = require('cors');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const { nanoid } = require('nanoid');
const { nextQueueNumber } = require('./helpers');

const app = express();
app.use(cors());
app.use(express.json());

const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

(async () => {
  await db.read();
  db.data ||= { queue: [], appointments: [] };
  await db.write();
})();

// Create a walk-in queue ticket
app.post('/api/queue', async (req, res) => {
  await db.read();
  const number = nextQueueNumber(db);
  const ticket = {
    id: nanoid(),
    number,
    name: req.body.name || 'Walk-in',
    status: 'waiting',
    createdAt: Date.now()
  };
  db.data.queue.push(ticket);
  await db.write();
  res.json(ticket);
});

// Get queue list
app.get('/api/queue', async (req, res) => {
  await db.read();
  res.json((db.data.queue || []).sort((a,b)=>a.number-b.number));
});

// Update queue ticket status
app.patch('/api/queue/:id', async (req, res) => {
  await db.read();
  const ticket = (db.data.queue || []).find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Not found' });
  Object.assign(ticket, req.body);
  await db.write();
  res.json(ticket);
});

// Remove a ticket (e.g., completed)
app.delete('/api/queue/:id', async (req, res) => {
  await db.read();
  db.data.queue = (db.data.queue || []).filter(t => t.id !== req.params.id);
  await db.write();
  res.json({ ok: true });
});

// Appointments
app.post('/api/appointments', async (req, res) => {
  await db.read();
  const appt = {
    id: nanoid(),
    patientName: req.body.patientName,
    doctor: req.body.doctor,
    time: req.body.time,
    status: 'scheduled',
    createdAt: Date.now()
  };
  db.data.appointments.push(appt);
  await db.write();
  res.json(appt);
});

app.get('/api/appointments', async (req, res) => {
  await db.read();
  res.json((db.data.appointments || []).sort((a,b)=>a.time? new Date(a.time)-new Date(b.time):0));
});

app.patch('/api/appointments/:id', async (req, res) => {
  await db.read();
  const a = (db.data.appointments || []).find(x => x.id === req.params.id);
  if (!a) return res.status(404).json({ error: 'Not found' });
  Object.assign(a, req.body);
  await db.write();
  res.json(a);
});

app.delete('/api/appointments/:id', async (req, res) => {
  await db.read();
  db.data.appointments = (db.data.appointments || []).filter(x => x.id !== req.params.id);
  await db.write();
  res.json({ ok: true });
});

// Patient status lookup (search both queue & appointments)
app.get('/api/patients/status', async (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  await db.read();
  const inQueue = (db.data.queue || []).filter(t => t.name.toLowerCase().includes(q));
  const appts = (db.data.appointments || []).filter(a => a.patientName.toLowerCase().includes(q));
  res.json({ queue: inQueue, appointments: appts });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
