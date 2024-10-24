import React from 'react'
import ReactDOM from 'react-dom/client'
import MetricsComparison from './MetricsComparison'
import './styles.css'
import '../tailwind-global/styles.css';

const container = document.getElementById('metricscomparison')
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <MetricsComparison />
    </React.StrictMode>,
  )
}