// Burger and  search
// здесь мы определяем функцию, которая отвеает за работу меню, в ней не нужно ничего менять
function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);
    const menuLinks = document.querySelectorAll(`.${params.menuLinksClass}`);

    menu.addEventListener("animationend", function() {
        if (this.classList.contains(params.hiddenClass)) {
            this.classList.remove(params.activeClass);
            this.classList.remove(params.hiddenClass);
        }
    });

    btn.addEventListener("click", function() {
        this.classList.toggle(params.activeClass);

        if (!menu.classList.contains(params.activeClass) &&
            !menu.classList.contains(params.hiddenClass)
        ) {
            menu.classList.add(params.activeClass);
            document.body.classList.add('body-hidden');
        } else {
            menu.classList.add(params.hiddenClass);
            document.body.classList.remove('body-hidden');
        }
    });

    menuLinks.forEach(function(el) {
        el.addEventListener('click', function() {
            btn.classList.remove('is-opened');
            menu.classList.remove('is-opened');
            document.body.classList.remove('body-hidden');
        });
    });
}

// здесь мы вызываем функцию и передаем в нее классы наших элементов
setBurger({
    btnClass: "header__top-burger", // класс бургера
    menuClass: "header__top-menu", // класс меню
    menuLinksClass: "header-link",
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function(evt) {
        if (this._isOpened) {
            this.classList.remove(params.activeClass);
            this.classList.remove(params.hiddenClass);
            this._isOpened = false;
        } else {
            this._isOpened = true;
        }
    });

    search.addEventListener('click', function(evt) {
        evt._isSearch = true;
    });

    openBtn.addEventListener("click", function(evt) {
        this.disabled = true;

        if (!search.classList.contains(params.activeClass) &&
            !search.classList.contains(params.hiddenClass)
        ) {
            search.classList.add(params.activeClass);
        }
    });

    closeBtn.addEventListener('click', function() {
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener('click', function(evt) {
        if (!evt._isSearch && search._isOpened) {
            openBtn.disabled = false;
            search.classList.add(params.hiddenClass);
        }
    });
}

setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    closeBtnClass: "js-close", // класс кнопки закрытия
    searchClass: "js-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});


// Плавный скролл
document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    })
});

// Для мобильных устройств
(() => {
    const MOBILE_WIDTH = 580;

    function getWindowWidth() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.body.clientWidth,
            document.documentElement.clientWidth
        );
    }

    function scrollToContent(link, isMobile) {
        if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
            return;
        }

        const href = link.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById('href');
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    document.querySelectorAll('.js-scroll-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            scrollToContent(this, true);
        });
    });
})();



// DROPDOWN
const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
}

function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
        evt.target.classList.remove(params.disabledClassName, params.activeClassName);
        evt.target.removeEventListener("animationend", onDisable);
    }
}

function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
        const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

        if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
            activeElements.forEach((current) => {
                if (current.classList.contains(params.btnClassName)) {
                    current.classList.remove(params.activeClassName);
                } else {
                    current.classList.add(params.disabledClassName);
                }
            });
        }

        if (evt.target.closest(`.${params.btnClassName}`)) {
            const btn = evt.target.closest(`.${params.btnClassName}`);
            const path = btn.dataset.path;
            const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

            btn.classList.toggle(params.activeClassName);

            if (!drop.classList.contains(params.activeClassName)) {
                drop.classList.add(params.activeClassName);
                drop.addEventListener("animationend", onDisable);
            } else {
                drop.classList.add(params.disabledClassName);
            }
        }
    });
}

setMenuListener();


const heroslider = document.querySelector('.hero-swiper');
const eventslider = document.querySelector('.events__swiper');
const projectslider = document.querySelector('.project__swiper');

// SLIDER hero
let heroSlider = new Swiper(heroslider, {
    allowTouchMove: false,
    effect: 'fade',
    speed: 10000,
    autoplay: {
        delay: 10000,
    },
    loop: true,
});

// SLIDER gallery
document.addEventListener("DOMContentLoaded", () => {
    let gallerySlider = new Swiper(".slides-container", {
        slidesPerView: 1,
        grid: {
            rows: 1,
            fill: "row"
        },
        spaceBetween: 20,
        pagination: {
            el: ".gallery .gallery__pagination",
            type: "fraction"
        },
        navigation: {
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev"
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
                slidesPerGroup: 1
            },

            481: {
                slidesPerView: 2,
                spaceBetween: 38,
                slidesPerGroup: 2
            },

            769: {
                slidesPerView: 2,
                spaceBetween: 34,
                slidesPerGroup: 2
            },

            1025: {
                slidesPerView: 3,
                spaceBetween: 50,
                slidesPerGroup: 3
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 50,
                slidesPerGroup: 3
            }
        },

        a11y: false,
        keyboard: {
            enabled: true,
            onlyInViewport: true
        }, // можно управлять с клавиатуры стрелками влево/вправо

        // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        slideVisibleClass: "slide-visible",

        on: {
            init: function() {
                this.slides.forEach((slide) => {
                    if (!slide.classList.contains("slide-visible")) {
                        slide.tabIndex = "-1";
                    } else {
                        slide.tabIndex = "";
                    }
                });
            },
            slideChange: function() {
                this.slides.forEach((slide) => {
                    if (!slide.classList.contains("slide-visible")) {
                        slide.tabIndex = "-1";
                    } else {
                        slide.tabIndex = "";
                    }
                });
            }
        }
    });
});

// MODAL
const btnsModals = document.querySelectorAll('.gallery__slide');
const modalOverlay = document.querySelector('.gallery__modal-overlay');
const modals = document.querySelectorAll('.gallery__modal');
const modalClose = document.querySelector('.gallery__modal-svg');

btnsModals.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');

        modals.forEach((el) => {
            el.classList.remove('modal--visible');
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
        modalOverlay.classList.add('modal-overlay--visible');

    });
});

modalClose.addEventListener('click', (e) => {
    // console.log(e.target);

    if (e.target == modalClose) {
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            el.classList.remove('modal--visible');
        });
    }
});

// SLIDER events
let eventSlider = new Swiper(eventslider, {
    grid: {
        rows: 1,
        fill: "row"
    },
    pagination: {
        el: ".events__pagination",
        type: "bullets",
        clickable: true
    },
    navigation: {
        nextEl: ".events__btn-next",
        prevEl: ".events__btn-prev"
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
            slidesPerGroup: 1
        },

        481: {
            slidesPerView: 2,
            spaceBetween: 34,
            slidesPerGroup: 2
        },

        769: {
            slidesPerView: 3,
            spaceBetween: 27,
            slidesPerGroup: 3
        },

        1200: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 3
        },

        1440: {
            slidesPerView: 3,
            spaceBetween: 50,
            slidesPerGroup: 3
        },

        1920: {
            slidesPerView: 3,
            spaceBetween: 50,
            slidesPerGroup: 3
        }
    },
});

// SELECT
const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
    searchEnabled: false,
    shouldSortItems: false,
    itemSelectText: '',
    shouldSort: false,
    placeholder: false
});

// SLIDER project
let projectSlider = new Swiper(projectslider, {
    grid: {
        rows: 1,
        fill: "row"
    },
    navigation: {
        nextEl: ".project__btn-next",
        prevEl: ".project__btn-prev"
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
        },

        481: {
            slidesPerView: 1,
        },

        660: {
            slidesPerView: 2,
            spaceBetween: 33,
        },

        769: {
            slidesPerView: 2,
            spaceBetween: 50,
        },

        1200: {
            slidesPerView: 2,
            spaceBetween: 30,
        },

        1400: {
            slidesPerView: 3,
            spaceBetween: 25,
        },

        1600: {
            slidesPerView: 3,
            spaceBetween: 35,
        },

        1920: {
            slidesPerView: 3,
            spaceBetween: 50,
        }
    },
    a11y: false,
    keyboard: {
        enabled: true,
        onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
        init: function() {
            this.slides.forEach((slide) => {
                if (!slide.classList.contains("slide-visible")) {
                    slide.tabIndex = "-1";
                } else {
                    slide.tabIndex = "";
                }
            });
        },
        slideChange: function() {
            this.slides.forEach((slide) => {
                if (!slide.classList.contains("slide-visible")) {
                    slide.tabIndex = "-1";
                } else {
                    slide.tabIndex = "";
                }
            });
        }
    }
});

// TABS
let tabsBtn = document.querySelectorAll('.js-tab-btn');
let tabsItem = document.querySelectorAll('.js-tab-content');

tabsBtn.forEach(function(element) {
    element.addEventListener('click', function(e) {
        const path = e.currentTarget.dataset.path;

        tabsBtn.forEach(function(btn) { btn.classList.remove('js-tab-btn--active') });
        e.currentTarget.classList.add('js-tab-btn--active');

        tabsItem.forEach(function(element) { element.classList.remove('js-tab-content--active') });
        document.querySelector(`[data-target="${path}"]`).classList.add('js-tab-content--active');
    });
});




// ACCORDION
(() => {
    new Accordion(".js-accordion-container", {
        openOnInit: [0]
    });
})();

// TOOLTIP
tippy('.tooltip-marker', {
    trigger: 'mouseenter click',
    theme: 'purple',
    maxWidth: 300,
});

// FORM
// Маска для номера
var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7(999)999-99-99");

im.mask(selector);
// Валидация формы
new JustValidate('.contacts__form', {
    rules: {
        name: {
            required: true,
            minLength: 3,
            maxLength: 30,
            strength: {
                custom: '^[A-zА-яЁё]+$',
            },
        },
        tel: {
            required: true,
            function: (name, value) => {
                const phone = selector.inputmask.unmaskedvalue()
                console.log(phone)
                return Number(phone) && phone.length === 10
            }
        },
    },

    messages: {
        name: {
            required: 'Как вас зовут?',
            minLength: 'Введите 3 и более символов',
            maxLength: 'Слишком длинное имя',
            strength: 'Недопустимый формат'
        },
        tel: {
            required: 'Укажите ваш телефон',
            // function: 'Здесь должно быть 10 символов без +7',
            function: 'Недопустимый формат',
        },
    },

    submitHandler: function(thisForm) {
        let formData = new FormData(thisForm);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Отправлено');
                }
            }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        thisForm.reset();
    }
});

// Yandex-MAP
ymaps.ready(init);

function init() {
    let myMap = new ymaps.Map("myMap", {
        center: [55.75846806898367, 37.60108849999989],
        zoom: 14,
        controls: ['geolocationControl', 'zoomControl']
    }, {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "200px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" }
    });

    myMap.behaviors.disable('scrollZoom');

    let myPlacemark = new ymaps.Placemark(
        [55.75846806898367, 37.60108849999989], {}, {
            iconLayout: "default#image",
            iconImageHref: "./img/contacts/placemark.svg",
            iconImageSize: [20, 20],
            iconImageOffset: [-9, -10],
        }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
};