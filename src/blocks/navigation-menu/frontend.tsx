import { hydrateRoot } from 'react-dom/client';

import { NavigationMenu } from './component';

window.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('#asd');

  elements.forEach(element => {
    const attributes = JSON.parse(element.getAttribute('data-attributes') || '{}');

    hydrateRoot(element,
      <NavigationMenu
        attributes={attributes}
        mode={undefined}
      />
    );
  });
});
