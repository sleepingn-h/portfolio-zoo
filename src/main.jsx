import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import SmoothScrollProvider from './providers/SmoothScrollProvider'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </SmoothScrollProvider>
    </MotionConfig>
  </StrictMode>
)
