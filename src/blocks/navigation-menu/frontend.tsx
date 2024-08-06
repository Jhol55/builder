import '../../style.css';
import Component from './component';
import { hydrateRoot } from 'react-dom/client';
import { useMediaQuery } from '@reactuses/core';

window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('#asd');

    elements.forEach(element => {
        const items = JSON.parse(element.getAttribute('data-items') || '[]');

        hydrateRoot(element, 
            <Component 
                items={items}  
                mode={undefined}
            />
        );
    });
});
