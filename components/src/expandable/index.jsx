import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client'
import Expandable from './Expandable';

document.querySelectorAll('[data-component="expandable"]').forEach((container) => {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <Expandable 
          title={container.dataset.title}
          content={container.dataset.content}
        />
      </React.StrictMode>
    );
  });
  