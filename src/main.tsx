import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import './index.css'
import "./i18n.js"
import Provider from './context/StationContext.js'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider>
    <Root />
  </Provider>
)
