import { hydrateRoot } from 'react-dom/client';

import { OptimizedImage } from './component';


window.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('#optimized-image');

  elements.forEach(element => {
    const attributes = JSON.parse(element.getAttribute('data-attributes') || '{}');

    hydrateRoot(element,
      <OptimizedImage {...attributes} />
    );
  });
});
