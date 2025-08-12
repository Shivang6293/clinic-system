const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const queueRoutes = require("./routes/queue");
const appointmentRoutes = require("./routes/appointments");

app.use("/api/queue", queueRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
