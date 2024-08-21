import { DatasProvider } from '../contextes/DatasContexte.jsx'
import { UserLocationProvider } from '../contextes/UserLocationContexte.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <DatasProvider>
    <UserLocationProvider>
      <App />
    </UserLocationProvider>
  </DatasProvider>
)
