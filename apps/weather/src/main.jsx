import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Only mount if running standalone
if (!window.__FEDERATION__) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}