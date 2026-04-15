import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import WhatsAppShell from './components/WhatsAppShell'
import { user1Data } from './data/user1'
import { user2Data } from './data/user2'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/assistant" element={<WhatsAppShell userData={user1Data} />} />
        <Route path="/wife" element={<WhatsAppShell userData={user2Data} />} />
        <Route path="*" element={<Navigate to="/assistant" replace />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)