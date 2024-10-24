import React from 'react';
import { createRoot } from 'react-dom/client';
import QuoteBlock from './QuoteBlock';

const container = document.getElementById('quoteblock');
if (container) {
  const root = createRoot(container);
  root.render(<QuoteBlock text={container.dataset.text} />);
}