import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import Sensor from './routes/sensor'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
    <div className="separator" />
    <Sensor />
  </React.StrictMode>,
)
