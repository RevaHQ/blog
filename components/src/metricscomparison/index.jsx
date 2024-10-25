import React from 'react'
import ReactDOM from 'react-dom/client'
import MetricsComparison from './MetricsComparison'

const container = document.getElementById('metricscomparison')
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <MetricsComparison />
    </React.StrictMode>,
  )
}