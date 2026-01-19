import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

// Detect if we're on company.html and navigate to /company route
const isCompanyPage = window.location.pathname.includes('company.html');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/fll_group">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// Navigate to the correct route after initial render
if (isCompanyPage && window.location.pathname.includes('company.html')) {
  window.history.replaceState(null, '', '/fll_group/company');
}
