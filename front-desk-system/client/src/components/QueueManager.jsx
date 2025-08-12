import React, {useState} from 'react'
import axios from 'axios'

const API = (p) => `http://localhost:4000/api/${p}`

export default function QueueManager({queue, refresh}){
  const [name, setName] = useState('')

  async function addWalkIn(){
    await axios.post(API('queue'), { name: name || 'Walk-in' })
    setName('')
    refresh()
  }

  async function advance(id){
    await axios.patch(API(`queue/${id}`), { status: 'in-progress' })
    refresh()
  }

  async function complete(id){
    await axios.patch(API(`queue/${id}`), { status: 'completed' })
    await axios.delete(API(`queue/${id}`))
    refresh()
  }

  return (
    <section className="section">
      <h2 style={{fontSize:18, marginBottom:8}}>Queue Manager</h2>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <input style={{flex:1, padding:8}} placeholder="Patient name (optional)" value={name} onChange={e=>setName(e.target.value)} />
        <button className="button" style={{background:'#4f46e5', color:'#fff'}} onClick={addWalkIn}>Add Walk-in</button>
      </div>

      <ul style={{listStyle:'none', padding:0}}>
        {queue.map(t => (
          <li key={t.id} style={{padding:12, borderRadius:8, border:'1px solid #e6e9ef', display:'flex', justifyContent:'space-between', marginBottom:8}}>
            <div>
              <div style={{fontWeight:700}}>#{t.number} — {t.name}</div>
              <div style={{fontSize:12, opacity:0.7}}>Status: {t.status}</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              {t.status !== 'in-progress' && <button className="button" style={{background:'#f59e0b'}} onClick={()=>advance(t.id)}>Call</button>}
              <button className="button" style={{background:'#10b981', color:'#fff'}} onClick={()=>complete(t.id)}>Complete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
