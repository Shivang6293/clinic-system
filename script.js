const API_URL = "http://localhost:5000/api";

async function addToQueue() {
    const name = document.getElementById("patientName").value;
    const res = await fetch(`${API_URL}/queue/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    });
    await res.json();
    loadQueue();
}

async function loadQueue() {
    const res = await fetch(`${API_URL}/queue`);
    const data = await res.json();
    document.getElementById("queueList").innerHTML = data.map(p => `<li>${p.id} - ${p.name} (${p.status})</li>`).join("");
}

async function bookAppointment() {
    const name = document.getElementById("apptName").value;
    const doctor = document.getElementById("apptDoctor").value;
    const time = document.getElementById("apptTime").value;
    const res = await fetch(`${API_URL}/appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, doctor, time })
    });
    await res.json();
    loadAppointments();
}

async function loadAppointments() {
    const res = await fetch(`${API_URL}/appointments`);
    const data = await res.json();
    document.getElementById("apptList").innerHTML = data.map(a => `<li>${a.id} - ${a.name} with Dr. ${a.doctor} at ${a.time} (${a.status})</li>`).join("");
}

loadQueue();
loadAppointments();
