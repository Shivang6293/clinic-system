const express = require("express");
const router = express.Router();
const store = require("../models/dataStore");

// Book appointment
router.post("/book", (req, res) => {
    const { name, doctor, time } = req.body;
    if (!name || !doctor || !time) {
        return res.status(400).json({ error: "Name, doctor, and time are required" });
    }
    const appointment = { id: store.appointments.length + 1, name, doctor, time, status: "Scheduled" };
    store.appointments.push(appointment);
    res.json({ message: "Appointment booked", appointment });
});

// Get all appointments
router.get("/", (req, res) => {
    res.json(store.appointments);
});

// Reschedule appointment
router.put("/:id/reschedule", (req, res) => {
    const { time } = req.body;
    const appointment = store.appointments.find(a => a.id == req.params.id);
    if (!appointment) return res.status(404).json({ error: "Not found" });
    appointment.time = time;
    res.json({ message: "Rescheduled", appointment });
});

// Cancel appointment
router.delete("/:id", (req, res) => {
    store.appointments = store.appointments.filter(a => a.id != req.params.id);
    res.json({ message: "Cancelled" });
});

module.exports = router;
