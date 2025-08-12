import React, {useState} from 'react'
import axios from 'axios'

const API = (p) => `http://localhost:4000/api/${p}`

export default function AppointmentForm({onCreate}){
  const [patientName, setPatientName] = useState('')
  const [doctor, setDoctor] = useState('Dr. Sharma')
  const [time, setTime] = useState('')

  async function create(){
    if(!patientName || !time) return alert('Patient name and time required')
    await axios.post(API('appointments'), { patientName, doctor, time })
    setPatientName(''); setTime('')
    onCreate()
  }

  return (
    <section className="section" style={{marginTop:12}}>
      <h3 style={{marginBottom:8}}>Book / Reschedule Appointment</h3>
      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gap:8}}>
        <input value={patientName} onChange={e=>setPatientName(e.target.value)} placeholder="Patient name" style={{padding:8}} />
        <select value={doctor} onChange={e=>setDoctor(e.target.value)} style={{padding:8}}>
          <option>Dr. Sharma</option>
          <option>Dr. Rao</option>
          <option>Dr. Mehta</option>
        </select>
        <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} style={{padding:8}} />
      </div>
      <div style={{marginTop:8, textAlign:'right'}}>
        <button className="button" style={{background:'#4f46e5', color:'#fff'}} onClick={create}>Save Appointment</button>
      </div>
    </section>
  )
}
