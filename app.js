((self) => {
    'use strict';

    const config = {
        sideBtnText: 'Get Your Gift',
        gameAssets: {
            cardCover: 'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/back.png',
            cardList: [
                'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/megadeth.png',
                'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/metallica.png',
                'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/slayer.png'
            ],
            backgroundImage: 'https://raw.githubusercontent.com/irfansubasi/card-matching-campaign/refs/heads/main/pics%20for%20url/bg.png',
        },
        pageText: {
            page_0: {
                title: 'Match Card and Win The Prize!',
                description: 'For the 10th anniversary of the Great Rock/Metal festival, play the card matching game and get your gift!',
                gift: '40% discount on festival ticket!',
                buttonText: 'Start',
            },

        },
        offEvents: [
            '.openModal',
            '.closeModal',
        ]
    }

    const classes = {
        style: 'ins-custom-style',
        wrapper: 'ins-wrapper',
        sideBtn: 'ins-side-btn',
        sideBtnText: 'ins-side-btn__text',
        modalOverlay: 'ins-modal-overlay',
        modal: 'ins-modal',
        show: 'ins-show',
        slider: 'ins-slider',
        track: 'ins-slider__track',
        page: 'ins-slider__page',
        title: 'ins-slider__title',
        description: 'ins-slider__description',
        gift: 'ins-slider__gift',
        startBtn: 'ins-start-btn',
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

        config.offEvents.forEach(event => $(document).off(event));

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
        const { wrapper, sideBtn, sideBtnText, modal, modalOverlay, show, slider, track, page, title, description, gift, startBtn } = selectors;

        const customStyle = `
            <style class="${style}">
                ${wrapper}{
                    position: fixed;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    font-family: 'Verdana', sans-serif;
                }

                ${sideBtn}{
                    background-color: #000000;
                    border: 1px solid #ffffff;
                    border-left: none;
                    width: 50px;
                    height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    padding: 10px 0;
                }

                ${sideBtnText}{
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 700;
                    text-transform: uppercase;
                    writing-mode: sideways-lr;
                    word-spacing: 10px;
                }

                ${modalOverlay}{
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                }

                ${modal}{
                    font-family: 'Verdana', sans-serif;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 600px;
                    height: 450px;
                    background: url(${config.gameAssets.backgroundImage})center center;
                    border-radius: 30px;
                    border: 2px solid #ffffff;
                }

                ${modalOverlay}${show}{
                    display: block;
                }

                ${slider}{
                    width: 600px;
                    height: 450px;
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                }

                ${track}{
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                }

                ${page}{
                    box-sizing: border-box;
                    flex: 0 0 100%;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    color: #ffffff;
                    text-align: center;
                    padding: 50px;
                }

                ${title}{
                    font-size: 24px;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                ${description}{
                    font-size: 16px;
                    font-weight: 400;
                }

                ${gift}{
                    font-size: 24px;
                    font-weight: 700;
                }

                ${startBtn}{
                    font-size: 20px;
                    font-weight: 700;
                    text-transform: uppercase;
                    background-color: #000000;
                    border: 1px solid #ffffff;
                    border-radius: 8px;
                    cursor: pointer;
                    padding: 10px 5px;
                }
            </style>
        `

        $('head').append(customStyle);
    }

    self.buildHTML = () => {
        const { sideBtn, wrapper, sideBtnText, modal, modalOverlay, slider, track, page, title, description, gift, startBtn } = classes;
        const { modal: modalSelector } = selectors;

        const html = `
            <div class="${wrapper}">
                <div class="${sideBtn}">
                    <div class="${sideBtnText}">${config.sideBtnText}</div>
                </div>
            </div>
        `;

        const modalHTML = `
            <div class="${modalOverlay}">
                <div class="${modal}">
                </div>
            </div>
        `;

        const sliderHTML = `
            <div class="${slider}">
                <div class="${track}">
                    <div class="${page}">
                        <h2 class="${title}">${config.pageText.page_0.title}</h2>
                        <p class="${description}">${config.pageText.page_0.description}</p>
                        <p class="${gift}">${config.pageText.page_0.gift}</p>
                        <div class="${startBtn}">${config.pageText.page_0.buttonText}</div>
                    </div>
                    <div class="${page}">
                        <p>page1 test</p>
                    </div>
                    <div class="${page}">
                        <p>page2 text</p>
                    </div>
                </div>
            </div>
        `;

        $(html).appendTo('body');
        $(modalHTML).appendTo('body');
        $(modalSelector).html(sliderHTML);
    }

    self.setEvents = () => {
        const { show, startBtn } = classes;
        const { sideBtn, modalOverlay, modal } = selectors;

        $(document).on('click.changePage', modal, (event) => {
            if (event.target.classList.contains(startBtn)) {
                self.slideTo(1);
            }
        });

        $(document).on('click.openModal', sideBtn, () => {
            $(modalOverlay).toggleClass(show);
        });

        $(document).on('click.closeModal', modalOverlay, (event) => {
            if (event.target === event.currentTarget) {
                $(modalOverlay).toggleClass(show);
            }
        });
    }

    self.slideTo = (page) => { $(selectors.slider).css('transform', `translateX(-${page * 600}px)`) };



    setTimeout(self.init, 2.5 * 1000);
})({})