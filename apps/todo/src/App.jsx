import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const add = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input, done: false }])
    setInput('')
  }

  const toggle = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const remove = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>✅ Todo App</h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a task..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button
          onClick={add}
          style={{ padding: '0.5rem 1rem', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>
      {todos.map(todo => (
        <div key={todo.id} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: '#fff', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem'
        }}>
          <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
          <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#aaa' : '#000' }}>
            {todo.text}
          </span>
          <button onClick={() => remove(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e55' }}>✕</button>
        </div>
      ))}
    </div>
  )
}