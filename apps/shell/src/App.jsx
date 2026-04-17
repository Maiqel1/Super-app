import { useState, Suspense, lazy } from 'react'

const TodoApp = lazy(() => import('todoApp/App'))
const NotesApp = lazy(() => import('notesApp/App'))
const WeatherApp = lazy(() => import('weatherApp/App'))

const apps = [
  { id: 'todo', label: '✅ Todo' },
  { id: 'notes', label: '📝 Notes' },
  { id: 'weather', label: '🌤 Weather' },
]

export default function App() {
  const [active, setActive] = useState('todo')

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: '200px',
        background: '#1e1e2e',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1rem',
        gap: '1rem',
      }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>⚡ SuperApp</h2>
        {apps.map(app => (
          <button
            key={app.id}
            onClick={() => setActive(app.id)}
            style={{
              background: active === app.id ? '#7c3aed' : 'transparent',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '0.95rem',
            }}
          >
            {app.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '2rem', background: '#f4f4f5', overflowY: 'auto' }}>
        <Suspense fallback={<div>Loading app...</div>}>
          {active === 'todo' && <TodoApp />}
          {active === 'notes' && <NotesApp />}
          {active === 'weather' && <WeatherApp />}
        </Suspense>
      </div>
    </div>
  )
}