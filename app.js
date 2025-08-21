((self) => {
    'use strict';

    const config = {
        game: {
            cardCover: 'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/back.png',
            cardList: [
                'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/megadeth.png',
                'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/metallica.png',
                'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/slayer.png'
            ],
            backgroundImage: 'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/bg.png',

        }
    }

    const classes = {
        style: 'ins-custom-style',
        wrapper: 'ins-wrapper',
        sideBtn: 'ins-side-btn',
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
        const { style } = classes;

        const customStyle = `
            <style class="${style}">
            
            </style>
        `

        $('head').append(customStyle);
    }

    self.buildHTML = () => {
        const { sideBtn, wrapper } = classes;

        const html = `
            <div class="${wrapper}">
                <div class="${sideBtn}">
                    <div></div>
                    <div></div>
                </div>
            </div>
        `;

        $(html).appendTo('body');
    }

    self.setEvents = () => {

    }

    setTimeout(self.init, 2.5 * 1000);
})({})