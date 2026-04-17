import { useState } from 'react'
import axios from 'axios'

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    if (!city.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      setWeather(res.data)
    } catch {
      setError('City not found')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>🌤 Weather App</h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetch()}
          placeholder="Enter city..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button
          onClick={fetch}
          style={{ padding: '0.5rem 1rem', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{Math.round(weather.main.temp)}°C</p>
          <p style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}