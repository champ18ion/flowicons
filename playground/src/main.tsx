import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { init } from 'stat18ion'

init({
  siteId: '6cface3e-1177-409e-9191-d05e6404b0c7', 
  debug: false,      // Set to true to see logs in console
  trackLocal: false  // Set to true to send data from localhost/dev
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
