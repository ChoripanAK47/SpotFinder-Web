import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Importa el CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ Importa el JS de Bootstrap
import App from './App.jsx'
import { AuthProvider } from './components/AuthContext.jsx';
import { SpotProvider } from './components/SpotContext.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SpotProvider>
          <App />
        </SpotProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)