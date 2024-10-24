import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client'
import Expandable from './Expandable';
import './styles.css';

const container = document.getElementById('expandable')
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <Expandable 
      title={container.dataset.title} 
      content={container.dataset.content} 
    />
    </React.StrictMode>,
  )
}