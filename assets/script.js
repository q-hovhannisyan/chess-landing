function createCarousel(root, {
    loop = false, auto = false, interval = 4000,
} = {}) {
    const track = root.querySelector(".track");
    const cards = root.querySelectorAll(".card");
    const prevBtn = root.querySelector(".left");
    const nextBtn = root.querySelector(".right");
    const currentEl = root.querySelector(".participants__current");
    const totalEl = root.querySelector(".participants__total");
    const dotsContainer = root.querySelector(".stages__dots");

    let visible = getVisibleCards();
    let index = 0;

    function getVisibleCards() {
        if (window.innerWidth <= 768) {
            return 1;
        }

        if (window.innerWidth <= 1024) {
            return 2;
        }

        return 3;
    }

    function updateCounter() {
        if (!currentEl || !totalEl) {
            return;
        }

        currentEl.textContent = index + 1;
        totalEl.textContent = cards.length;
    }

    function createDots() {

        if (!dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = "";

        cards.forEach((_, dotIndex) => {

            const dot =
                document.createElement("button");

            dot.className = "stages__dot";

            if (dotIndex === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener(
                "click",
                () => {

                    index = dotIndex;

                    update();
                }
            );

            dotsContainer.append(dot);
        });
    }

    function updateButtons() {
        if (loop) return;

        const maxIndex = cards.length - visible;

        prevBtn?.toggleAttribute("disabled", index <= 0);
        nextBtn?.toggleAttribute("disabled", index >= maxIndex);
    }

    function update() {
        visible = getVisibleCards();

        const maxIndex = cards.length - visible;

        if (index > maxIndex) {
            index = maxIndex;
        }

        const translate = index * (100 / visible);

        track.style.transform = `translateX(-${translate}%)`;

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll(".stages__dot");

            dots.forEach((dot) => {
                dot.classList.remove("active");
            });

            dots[index]?.classList.add("active");
        }

        updateButtons();
        updateCounter();
    }

    function next() {
        const maxIndex = cards.length - visible;

        if (loop) {
            index = index >= maxIndex ? 0 : index + 1;
        } else {
            index = Math.min(index + 1, maxIndex);
        }

        update();
    }

    function prev() {
        const maxIndex = cards.length - visible;

        if (loop) {
            index = index <= 0 ? maxIndex : index - 1;
        } else {
            index = Math.max(index - 1, 0);
        }

        update();
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    window.addEventListener("resize", update);

    let autoplayId = null;

    function startAutoplay() {
        if (!auto) {
            return;
        }

        stopAutoplay();

        autoplayId = setInterval(next, interval);
    }

    function stopAutoplay() {
        clearInterval(autoplayId);
    }

    if (window.matchMedia("(hover: hover)").matches) {
        root.addEventListener("mouseenter", stopAutoplay);
        root.addEventListener("mouseleave", startAutoplay);
    }

    startAutoplay();

    createDots();
    update();
}

const stagesData = [
    {
        id: 1,
        text: "Строительство железнодорожной магистрали Москва-Васюки"
    },
    {
        id: 2,
        text: "Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов",
    },
    {
        id: 3,
        text: "Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет",
        className: [ 'stage-card--tall' ]
    },
    {
        id: 4,
        text: "Строительство дворца для турнира",
    },
    {
        id: 5,
        text: "Размещение гаражей для гостевого автотранспорта",
    },
    {
        id: 6,
        text: "Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов",
        className: [ 'stage-card--mobile-wide' ]
    },
    {
        id: 7,
        text: "Создание аэропорта «Большие Васюки»\n с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анджелес и Мельбурн",
        className: [ 'stage-card--wide', 'stage-card--plane' ]
    }
];
const participantsData = [
    {
        name: "Хосе-Рауль Капабланка", role: "Чемпион мира по шахматам", image: "./assets/images/player.webp",
    },

    {
        name: "Эммануил Ласкер", role: "Чемпион мира по шахматам", image: "./assets/images/player.webp",
    },

    {
        name: "Александр Алехин", role: "Чемпион мира по шахматам", image: "./assets/images/player.webp",
    },

    {
        name: "Арон Нимцович", role: "Чемпион мира по шахматам", image: "./assets/images/player.webp",
    },

    {
        name: "Рихард Рети", role: "Чемпион мира по шахматам", image: "./assets/images/player.webp",
    },

    {
        name: "Остап Бендер", role: "Гроссмейстер", image: "./assets/images/player.webp",
    }
];
const tickerMessages = ["Дело помощи утопающим — дело рук самих утопающих!", "Шахматы двигают вперед не только культуру, но и экономику!", "Лед тронулся, господа присяжные заседатели!",];
const announcementTableData = [
    {
        title: "Место проведения:",
        value: "Клуб «Картонажник»",
    },

    {
        title: "Дата и время мероприятия:",
        value: "22 июня 1927 г. в 18:00",
    },

    {
        title: "Стоимость входных билетов:",
        value: "20 коп.",
    },

    {
        title: "Плата за игру:",
        value: "50 коп.",
    },

    {
        title: "Взнос на телеграммы:",
        value: `
            <span class="discount">
                100 руб.
            </span>

            21 руб. 16 коп.
        `,
    },
];

const stagesGrid = document.querySelector(".stages__grid");
const participantsTrack = document.querySelector(".participants__track");
const tickerTracks = document.querySelectorAll(".ticker__track");

function initAnnouncementLayout() {

    const section = document.querySelector(".announcement__top");

    const title = document.querySelector(".announcement__title");

    const topText = document.querySelector(".announcement__text-top");

    const bottomText = document.querySelector(".announcement__text-bottom");

    const image = document.querySelector(".announcement__top-image");

    function renderDesktopLayout() {

        title.innerHTML = "";

        title.append(topText);
        title.append(bottomText);

        section.innerHTML = "";

        section.append(title);
        section.append(image);
    }

    function renderMobileLayout() {

        section.innerHTML = "";

        section.append(topText);
        section.append(image);
        section.append(bottomText);
    }

    function updateLayout() {

        if (window.innerWidth < 992) {
            renderMobileLayout();
        } else {
            renderDesktopLayout();
        }
    }

    updateLayout();

    window.addEventListener("resize", updateLayout);
}

function createTickerContent() {
    return tickerMessages
        .map((message) => {
            return `
                <span class="ticker__item">
                    ${message}
                </span>
            `;
        })
        .join("");
}

function initAnnouncementTable() {

    const table =
        document.querySelector(
            ".announcement__table"
        );

    function renderDesktopTable() {

        table.innerHTML = `
            <table>
                <tbody>
                    ${announcementTableData.map((item) => {
                        return `
                            <tr>
                                <td>
                                    ${item.title}
                                </td>

                                <td>
                                    ${item.value}
                                </td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        `;
    }

    function renderMobileTable() {

        table.innerHTML = `
            <div class="announcement__mobile-table">
                ${announcementTableData.map((item) => {
                    return `
                        <div class="announcement__mobile-row">

                            <div class="announcement__mobile-title">
                                ${item.title}
                            </div>

                            <div class="announcement__mobile-value">
                                ${item.value}
                            </div>

                        </div>
                    `;
                }).join("")}
            </div>
        `;
    }

    function updateTable() {

        if (window.innerWidth <= 768) {
            renderMobileTable();
        } else {
            renderDesktopTable();
        }
    }

    updateTable();

    window.addEventListener("resize", updateTable);
}

tickerTracks.forEach((track) => {
    const content = createTickerContent();

    track.innerHTML = content + content;
});

function initStages() {

    function renderDesktopStages() {
        stagesGrid.innerHTML = "";

        stagesData.forEach((stage) => {

            const card =
                createStageCard(stage);

            stagesGrid.append(card);
        });
    }

    function renderMobileStages() {

        stagesGrid.innerHTML = "";

        const slides = [
            [1, 2],
            [3],
            [4, 5],
            [6],
            [7],
        ];

        slides.forEach((slideItems) => {

            const slide = document.createElement("div");

            slide.className = "stages__slide card";

            slideItems.forEach((id) => {

                const stage =
                    stagesData.find(
                        (item) =>
                            item.id === id
                    );

                const card = createStageCard(stage, true);

                slide.append(card);
            });

            stagesGrid.append(slide);
        });
    }

    function updateStagesLayout() {

        if (window.innerWidth <= 768) {
            renderMobileStages();
        } else {
            renderDesktopStages();
        }
    }

    updateStagesLayout();

    window.addEventListener(
        "resize",
        updateStagesLayout
    );
}

function createStageCard(stage, isMobile = false) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "stage-card stage-bg";

    if (stage.className) {
        card.classList.add(
            ...stage.className
        );
    }

    card.innerHTML = `
        <span class="stage-card__number">
            ${stage.id}
        </span>

        <p class="stage-card__text">${stage.text}</p>

        ${
        stage.className?.includes("stage-card--plane") && !isMobile
            ? `
                <img
                    class="stage-card__plane-image"
                    src="./assets/images/plane.webp"
                    alt="Самолёт"
                >
                `
            : ""
    }
    `;

    return card;
}

participantsData.forEach((participant) => {
    const card = document.createElement("article");

    card.className = "participant-card card";

    card.innerHTML = `
        <img
            class="participant-card__image"
            src="${participant.image}"
            alt="${participant.name}"
        >

        <h3 class="participant-card__name">
            ${participant.name}
        </h3>

        <p class="participant-card__role">
            ${participant.role}
        </p>

        <button class="participant-card__button">
            Подробнее
        </button>
    `;

    participantsTrack.append(card);
});

function initParticipantsLayout() {
    const container = document.querySelector(".participants .container");
    const header = document.querySelector(".participants__header");
    const carousel = document.querySelector(".participants .carousel");
    const controls = document.querySelector(".participants__controls");

    function renderDesktopLayout() {
        header.append(controls);
    }

    function renderMobileLayout() {
        carousel.after(controls);
    }

    function updateLayout() {
        if (window.innerWidth < 992) {
            renderMobileLayout();
        } else {
            renderDesktopLayout();
        }
    }

    updateLayout();

    window.addEventListener(
        "resize",
        updateLayout
    );
}

initStages();
initAnnouncementLayout();
initAnnouncementTable();
initParticipantsLayout();

createCarousel(document.getElementById("participants"), {
    loop: true,
    // auto: true,
    interval: 4000,
});


createCarousel(document.getElementById("stages"), {
    loop: false,
    auto: false,
});