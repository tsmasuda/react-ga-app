import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initGA, trackPageView, trackButtonClick, trackEvent } from './analytics'

function App() {
  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '' })

  // Initialize Google Analytics
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      initGA(gaId)
      trackPageView(window.location.pathname)
    } else {
      console.warn('Google Analytics Measurement ID not configured')
    }
  }, [])

  const handleCountClick = () => {
    setCount((count) => count + 1)
    trackButtonClick('Increment Counter')
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackEvent('User Interaction', 'Form Submit', 'Contact Form')
    alert(`Form submitted: ${formData.name}, ${formData.email}`)
    setFormData({ name: '', email: '' })
  }

  const handleLogoClick = (logoName: string) => {
    trackEvent('User Interaction', 'External Link Click', logoName)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" onClick={() => handleLogoClick('Vite')}>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" onClick={() => handleLogoClick('React')}>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Google Analytics</h1>

      <div className="card">
        <button onClick={handleCountClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="card">
        <h2>Sample Form with Tracking</h2>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px' }}>
            Submit Form
          </button>
        </form>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
