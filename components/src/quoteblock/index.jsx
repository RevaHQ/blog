import React from 'react';
import { createRoot } from 'react-dom/client';
import QuoteBlock from './QuoteBlock';

document.querySelectorAll('[data-component="quoteblock"]').forEach((container, index) => {
  const root = createRoot(container);
  root.render(<QuoteBlock text={container.dataset.text} />);
});