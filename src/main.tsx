import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import './index.css'
import "./i18n.js"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />
)
