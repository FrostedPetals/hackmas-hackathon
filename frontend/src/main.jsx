import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './contexts/ThemeProvider.jsx'
import { LoggedinProvider } from './contexts/LoggedinProvider.jsx'
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LoggedinProvider>
          <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
            <App />
          </DndProvider>
        </LoggedinProvider>

      </ThemeProvider>

    </BrowserRouter>

  </StrictMode>,
)
