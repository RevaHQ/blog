import React from 'react';
import { createRoot } from 'react-dom/client';
import Expandable from './Expandable';
import './styles.css';

const container = document.getElementById('expandable');
if (container) {
  const root = createRoot(container);
  root.render(
    <Expandable 
      title={container.dataset.title} 
      content={container.dataset.content} 
    />
  );
}