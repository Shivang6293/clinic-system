import React from 'react'

export default function Dashboard({queue, appointments, refresh}){
  const next = (queue || []).find(q=>q.status==='waiting')
  return (
    <div className="section">
      <h4 style={{marginBottom:8}}>Today at a glance</h4>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:12, opacity:0.8}}>Next to call</div>
        <div style={{fontSize:20, fontWeight:700}}>{next ? `#${next.number} — ${next.name}` : '—'}</div>
      </div>

      <hr />

      <div style={{marginTop:12}}>
        <div style={{fontSize:12, opacity:0.8}}>Upcoming appointments</div>
        <ul style={{marginTop:8, padding:0, listStyle:'none'}}>
          {(appointments || []).slice(0,5).map(a=> (
            <li key={a.id} style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
              <div>{a.patientName} <span style={{opacity:0.7}}>({a.doctor})</span></div>
              <div style={{opacity:0.7}}>{a.time ? new Date(a.time).toLocaleString() : '—'}</div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{marginTop:12, textAlign:'right'}}>
        <button className="button" onClick={refresh}>Refresh</button>
      </div>
    </div>
  )
}
