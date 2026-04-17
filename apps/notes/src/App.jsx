import { useState, useEffect } from 'react'

export default function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes') || '[]'))
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const add = () => {
    if (!input.trim()) return
    setNotes([...notes, { id: Date.now(), text: input }])
    setInput('')
  }

  const remove = (id) => setNotes(notes.filter(n => n.id !== id))

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>📝 Notes App</h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a note..."
          rows={3}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', resize: 'none' }}
        />
        <button
          onClick={add}
          style={{ padding: '0.5rem 1rem', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Save
        </button>
      </div>
      {notes.map(note => (
        <div key={note.id} style={{
          background: '#fff', padding: '0.75rem', borderRadius: '8px',
          marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between'
        }}>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{note.text}</p>
          <button onClick={() => remove(note.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e55' }}>✕</button>
        </div>
      ))}
    </div>
  )
}