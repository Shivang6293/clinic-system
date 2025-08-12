import React, {useState, useEffect} from 'react'
import axios from 'axios'
import QueueManager from './components/QueueManager'
import AppointmentForm from './components/AppointmentForm'
import Dashboard from './components/Dashboard'

const API = (p) => `http://localhost:4000/api/${p}`

export default function App(){
  const [queue, setQueue] = useState([])
  const [appointments, setAppointments] = useState([])

  async function fetchAll(){
    try{
      const [qRes, aRes] = await Promise.all([
        axios.get(API('queue')),
        axios.get(API('appointments'))
      ])
      setQueue(qRes.data)
      setAppointments(aRes.data)
    }catch(e){
      console.error('Failed to fetch', e)
    }
  }

  useEffect(()=>{ fetchAll() }, [])

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding:20}}>
      <header style={{marginBottom:20, padding:16, borderRadius:12, background:'linear-gradient(90deg,#7c3aed33,#06b6d433)'}}>
        <h1 style={{fontSize:26, fontWeight:700}}>Clinic Front Desk ✨</h1>
        <p style={{opacity:0.8}}>Manage walk-ins, appointments, and patient flow</p>
      </header>

      <div style={{display:'flex', gap:20}}>
        <div style={{flex:2}}>
          <QueueManager queue={queue} refresh={fetchAll} />
          <AppointmentForm onCreate={fetchAll} />
        </div>
        <aside style={{flex:1}}>
          <Dashboard queue={queue} appointments={appointments} refresh={fetchAll} />
        </aside>
      </div>
    </div>
  )
}
