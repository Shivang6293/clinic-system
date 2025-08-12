const express = require("express");
const router = express.Router();
const store = require("../models/dataStore");

// Assign queue number to walk-in patient
router.post("/add", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Patient name is required" });

    const queueNumber = store.getNextQueueNumber();
    const patient = { id: queueNumber, name, status: "Waiting" };
    store.queue.push(patient);
    res.json({ message: "Added to queue", patient });
});

// Get current queue
router.get("/", (req, res) => {
    res.json(store.queue);
});

// Update patient status
router.put("/:id/status", (req, res) => {
    const patient = store.queue.find(p => p.id == req.params.id);
    if (!patient) return res.status(404).json({ error: "Not found" });

    patient.status = req.body.status;
    res.json({ message: "Status updated", patient });
});

module.exports = router;
