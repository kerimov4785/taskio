import { createRoot } from 'react-dom/client'
import './reset.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './Context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </DataProvider>
)
