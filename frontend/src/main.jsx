import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './contexts/ThemeProvider.jsx'
import { LoggedinProvider } from './contexts/LoggedinProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <LoggedinProvider>
        <App />
      </LoggedinProvider>
      
    </ThemeProvider>
    
    </BrowserRouter>
    
  </StrictMode>,
)
