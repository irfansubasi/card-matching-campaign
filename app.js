((self) => {
    'use strict';

    const classes = {
        style: 'ins-custom-style',
    }

    const selectors = Object.keys(classes).reduce((createdSelector, key) => (
        createdSelector[key] = `.${classes[key]}`, createdSelector
    ), {})

    self.init = () => {

        if (typeof window.jQuery === 'undefined') {
            self.loadJQuery();
        } else {
            self.reset();
            self.buildCSS();
            self.buildHTML();
            self.setEvents();
        }

    };

    self.reset = () => {
        const { style } = selectors;

        $(style).remove();
    }

    self.loadJQuery = () => {
        const script = document.createElement('script');

        script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';

        script.onload = () => {
            self.init();
        };

        document.head.appendChild(script);
    }

    self.buildCSS = () => {

    }

    self.buildHTML = () => {
        const html = `
            
        `;

        document.body.appendChild(html);
    }

    self.setEvents = () => {

    }

    setTimeout(self.init, 2.5 * 1000);
})({})