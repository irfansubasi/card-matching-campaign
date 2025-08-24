((self) => {
    'use strict';

    const config = {
        sideBtnText: 'Get Your Gift',
        closeIcon: 'X',
        prevIcon: '⬅',
        storageKey: 'ins-gameWon',
        cacheExpiry: 86400000,
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
            startPage: {
                title: 'Match Cards and Win The Prize!',
                description: 'For the 10th anniversary of the Great Rock/Metal festival, play the card matching game and get your gift!',
                gift: '40% discount on festival ticket!',
                buttonText: 'Start',
            },
            gamePage: {
                title: 'Match Cards!',
                shuffleBtn: 'Shuffle!',
                readyBtn: "I'm Ready!",
            },
            resultPage: {
                win: {
                    title: 'You Win!',
                    description: 'Copy the coupon code below and get ready to headbang!',
                    warning: 'You can use this coupon code only once. The coupon code is valid for a single ticket on a single account.',
                    buttonText: 'Copy',
                    couponCode: 'RIPOZZY25',
                },
                lose: {
                    title: 'You Lose!',
                    description: 'Catch the rock spirit. You should try again.',
                    buttonText: 'Try Again',
                }
            }
        },
        offEvents: [
            '.openModal',
            '.closeModal',
        ]
    }

    let gameStarted = false;
    let pair = [];

    const classes = {
        style: 'ins-custom-style',
        wrapper: 'ins-wrapper',
        sideBtn: 'ins-side-btn',
        sideBtnText: 'ins-side-btn__text',
        modalOverlay: 'ins-modal-overlay',
        modal: 'ins-modal',
        closeBtn: 'ins-close-btn',
        prevBtn: 'ins-prev-btn',
        show: 'ins-show',
        hide: 'ins-hide',
        slider: 'ins-slider',
        track: 'ins-slider__track',
        page: 'ins-slider__page',
        title: 'ins-slider__title',
        description: 'ins-slider__description',
        gift: 'ins-slider__gift',
        startBtn: 'ins-start-btn',
        cardList: 'ins-card-list',
        cardItem: 'ins-card-item',
        shuffleBtn: 'ins-shuffle-btn',
        readyBtn: 'ins-ready-btn',
        flipCardAnimation: 'ins-flip-card-animation',
        shuffleAnimation: 'ins-shuffle-animation',
        opened: 'ins-opened-card',
        tryAgainBtn: 'ins-tryagain-btn',
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
        const { style } = selectors; //virgülle ayırabilirsin removeda

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
        const { wrapper, sideBtn, sideBtnText, modal, modalOverlay, show, hide, slider, track, page, title, description, gift, startBtn, cardItem, cardList, shuffleBtn, readyBtn, flipCardAnimation, shuffleAnimation, tryAgainBtn, closeBtn, prevBtn } = selectors;

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

                ${modal} *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                ${modal}{
                    font-family: 'Verdana', sans-serif;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 800px;
                    height: 600px;
                    background: url(${config.gameAssets.backgroundImage})center center;
                    border-radius: 30px;
                    border: 2px solid #ffffff;
                }

                ${slider}{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                }

                ${track}{
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                }

                ${prevBtn}{
                    font-size: 24px;
                    font-weight: 700;
                    text-transform: uppercase;
                    cursor: pointer;
                    color: #ffffff;
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    z-index: 20;
                }

                ${closeBtn}{
                    font-size: 24px;
                    font-weight: 700;
                    text-transform: uppercase;
                    cursor: pointer;
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    color: #ffffff;
                    z-index: 20;
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
                    padding: 30px;
                }

                ${page}:nth-child(2) {
                    position: relative;
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

                ${startBtn}, ${shuffleBtn}, ${readyBtn}, ${tryAgainBtn}{
                    font-size: 20px;
                    font-weight: 700;
                    text-transform: uppercase;
                    background-color: #000000;
                    border: 1px solid #ffffff;
                    border-radius: 8px;
                    cursor: pointer;
                    padding: 10px 5px;
                }

                ${cardList} {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    width: 100%;
                }
                
                ${cardItem} {
                    max-width: 160px;
                    width: 100%;
                    aspect-ratio: 3 / 4;
                    overflow: hidden;
                    border-radius: 8px;
                    justify-self: center;
                }
                
                ${cardItem} img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                ${readyBtn}{
                    display:none;
                }

                ${flipCardAnimation}{
                    animation: cardFlip 1s ease-in-out;
                }

                ${shuffleAnimation}{
                    animation: shuffleMove 3s ease-in-out;
                }

                ${show}{
                    display: block;
                }

                ${hide}{
                    display: none;
                }

                @keyframes cardFlip {
                    0% {
                        transform: rotateY(0deg);
                    }

                    50% {
                        transform: rotateY(90deg);
                    }

                    100% {
                        transform: rotateY(0deg);
                    }
                }

                @keyframes shuffleMove {
                    0% {
                        transform: translateX(0);
                    }

                    25% {
                        transform: translateX(-50px);
                    }

                    50% {
                        transform: translateX(1000px);
                    }

                    75% {
                        transform: translateX(1000px);
                    }

                    100% {
                        transform: translateX(0);
                    }
                }

            </style>
        `

        $('head').append(customStyle);
    }

    self.buildHTML = () => {
        const { sideBtn, wrapper, sideBtnText, modal, modalOverlay, slider, track, page, title, description, gift, startBtn, shuffleBtn, readyBtn, cardItem, cardList, closeBtn, prevBtn } = classes;
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
            <div class="${closeBtn}">${config.closeIcon}</div>
            <div class="${slider}">
                <div class="${track}">
                    <div class="${page}">
                        <h2 class="${title}">${config.pageText.startPage.title}</h2>
                        <p class="${description}">${config.pageText.startPage.description}</p>
                        <p class="${gift}">${config.pageText.startPage.gift}</p>
                        <div class="${startBtn}">${config.pageText.startPage.buttonText}</div>
                    </div>
                    <div class="${page}">
                        <div class="${prevBtn}">${config.prevIcon}</div>
                        <h2 class="${title}">${config.pageText.gamePage.title}</h2>
                        <div class="${cardList}">
                            ${config.gameAssets.cardList.map(card => `
                                <div class="${cardItem}">
                                    <img src="${card}" alt="card">
                                </div>
                            `).join('').repeat(2)}
                        </div>
                        <div class="${shuffleBtn}">${config.pageText.gamePage.shuffleBtn}</div>
                        <div class="${readyBtn}">${config.pageText.gamePage.readyBtn}</div>
                    </div>
                    <div class="${page}">
                    </div>
                </div>
            </div>
        `;


        $(html).appendTo('body');
        $(modalHTML).appendTo('body');
        $(modalSelector).html(sliderHTML);
    }

    self.setEvents = () => {
        const { show } = classes;
        const { sideBtn, modalOverlay, shuffleBtn, cardItem, readyBtn, tryAgainBtn, closeBtn, startBtn, prevBtn, couponCode } = selectors;

        $(document).on('click.changePage', startBtn, () => {
            self.slideTo(1);
        });

        $(document).on('click.openModal', sideBtn, () => {
            const hasPlayed = self.getLocalStorage();

            if (hasPlayed) {
                alert('You have already played this game.');
                return;
            }

            $(modalOverlay).toggleClass(show);
        });

        $(document).on('click.closeModal', modalOverlay, (event) => {
            if (event.target === event.currentTarget) {
                $(modalOverlay).toggleClass(show);
            }
        });

        $(document).on('click.closeModal', closeBtn, (event) => {
            if (event.target === event.currentTarget) {
                $(modalOverlay).toggleClass(show);
            }
        });

        $(document).on('click.prevPage', prevBtn, self.resetGame);

        $(document).on('click.shuffleCards', shuffleBtn, self.shuffleCards);

        $(document).on('click.gameStart', readyBtn, self.startGame);

        $(document).on('click.cardGame', cardItem, self.handleCardClick);

        $(document).on('click.restartGame', tryAgainBtn, self.resetGame);

        $(document).on('click.copyCouponCode', couponCode, self.copyCouponCode);

    }

    self.shuffleDeck = () => {
        const { cardItem } = selectors;

        let allCards = config.gameAssets.cardList.concat(config.gameAssets.cardList);

        //fisher-yates
        for (let i = allCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
        }

        const cards = $(cardItem).find('img');
        cards.each((index, img) => {
            $(img).attr('data-src', allCards[index]);
        });

    }

    self.updateShuffleUI = () => {
        const { shuffleBtn, readyBtn, cardItem } = selectors;
        const { hide, show, flipCardAnimation, shuffleAnimation } = classes;

        $(shuffleBtn).removeClass(show).addClass(hide);
        $(cardItem).addClass(flipCardAnimation);

        setTimeout(() => {
            $(cardItem).find('img').attr('src', config.gameAssets.cardCover);
        }, 500);

        setTimeout(() => {
            $(cardItem).addClass(shuffleAnimation);
        }, 1000);

        setTimeout(() => {
            $(readyBtn).removeClass(hide).addClass(show);
            $(cardItem).removeClass(flipCardAnimation);
            $(cardItem).removeClass(shuffleAnimation);
        }, 4000);
    }

    self.shuffleCards = () => {
        self.shuffleDeck();
        self.updateShuffleUI();
    };

    self.handleCardClick = (event) => {

        const { opened } = classes;
        const { cardItem, opened: openedSelector } = selectors;

        if (!gameStarted) return;

        const selectedCard = $(event.currentTarget);
        const cardImg = selectedCard.find('img').attr('data-src');

        if (selectedCard.hasClass(opened)) return;

        selectedCard.addClass(opened);

        selectedCard.find('img').attr('src', cardImg);

        if (pair.length < 2) {
            pair.push(cardImg);
        }

        if (pair.length === 2) {
            if (pair[0] == pair[1]) {
                pair = [];

                const totalCards = $(cardItem).length;
                const openedCards = $(cardItem).filter(openedSelector).length;

                if (openedCards === totalCards) {
                    self.updateResultGame(true);
                    self.setLocalStorage();
                }
            } else {
                self.updateResultGame(false);
            }
        }

    }

    self.startGame = () => {
        const { readyBtn, cardItem } = selectors;
        const { hide, flipCardAnimation } = classes;

        $(readyBtn).toggleClass(hide);
        $(cardItem).addClass(flipCardAnimation);

        setTimeout(() => {
            $(cardItem).find('img').each((index, img) => {
                $(img).attr('src', $(img).attr('data-src'));
            });
        }, 500);

        setTimeout(() => {
            $(cardItem).removeClass(flipCardAnimation);
            setTimeout(() => {
                $(cardItem).addClass(flipCardAnimation);
                setTimeout(() => {
                    gameStarted = true;
                    $(cardItem).find('img').attr('src', config.gameAssets.cardCover);
                }, 500);
            }, 500);
        }, 4000);
    }

    self.resetGame = () => {
        const { shuffleBtn, readyBtn, cardItem } = selectors;
        const { show, hide, opened, flipCardAnimation, shuffleAnimation } = classes;

        gameStarted = false;
        pair = [];

        $(cardItem).find('img').each((index, img) => {
            $(img).attr('src', config.gameAssets.cardList[Math.floor(index / 2)]);
            $(img).removeAttr('data-src');
        });

        $(cardItem).removeClass(opened);
        $(cardItem).removeClass(flipCardAnimation);
        $(cardItem).removeClass(shuffleAnimation);
        $(shuffleBtn).removeClass(hide).addClass(show);
        $(readyBtn).removeClass(show).addClass(hide);

        self.slideTo(0);
    };

    self.updateResultGame = (isWin) => {
        const { win, lose } = config.pageText.resultPage;
        const { track, page } = selectors;
        const { tryAgainBtn, title, description } = classes;

        const winHTML = `
            <h2 class="${title}">${win.title}</h2>
            <div class="${description}">${win.description}</div>
            <div>
                <div>${win.couponCode}</div>
                <div>${win.buttonText}</div>
            </div>
            <div>${win.warning}</div>
        `;

        const loseHTML = `
            <h2 class="${title}">${lose.title}</h2>
            <div class="${description}">${lose.description}</div>
            <div class="${tryAgainBtn}">${lose.buttonText}</div>
        `;

        const resultHTML = isWin ? winHTML : loseHTML;

        $(track).find(page).last().html(resultHTML);

        self.slideTo(2);
    }

    self.copyCouponCode = () => {
        const { couponCode } = config.pageText.resultPage.win;
        navigator.clipboard.writeText(couponCode);
    }

    self.setLocalStorage = (expiry = config.cacheExpiry) => {
        const toStore = {
            value: 'true',
            expiry: Date.now() + expiry,
        }

        localStorage.setItem(config.storageKey, JSON.stringify(toStore));
    }

    self.getLocalStorage = () => {
        const stored = localStorage.getItem(config.storageKey);

        if (!stored) return null;

        const parsed = JSON.parse(stored);

        if (!parsed.expiry || !parsed.expiry) return null;

        if (Date.now() > parsed.expiry) {
            localStorage.removeItem(config.storageKey);
            return null;
        }

        return parsed.value;
    }

    self.slideTo = (page) => { $(selectors.slider).css('transform', `translateX(-${page * 800}px)`) };

    self.init();
})({})