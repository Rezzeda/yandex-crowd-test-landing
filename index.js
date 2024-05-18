// //имитируем строку с сервера (начальные данные)
// [{"id":1,"name":"Хозе-Рауль Капабланка","status":"Чемпион мира по шахматам"},{"id":2,"name":"Эммануил Ласкер","status":"Чемпион мира по шахматам"},{"id":3,"name":"Александр Алехин","status":"Чемпион мира по шахматам"},{"id":4,"name":"Арон Нимцович","status":"Чемпион мира по шахматам"},{"id":5,"name":"Рихард Рети","status":"Чемпион мира по шахматам"},{"id":6,"name":"Рихард Рети","status":"Гроссмейстер"}]

const data = [
    {"id":1,"name":"Хозе-Рауль Капабланка","status":"Чемпион мира по шахматам","image":"./images/image-placeholder.png"},
    {"id":2,"name":"Эммануил Ласкер","status":"Чемпион мира по шахматам","image":"./images/image-placeholder.png"},
    {"id":3,"name":"Александр Алехин","status":"Чемпион мира по шахматам","image":"./images/image-placeholder.png"},
    {"id":4,"name":"Арон Нимцович","status":"Чемпион мира по шахматам","image":"./images/image-placeholder.png"},
    {"id":5,"name":"Рихард Рети","status":"Чемпион мира по шахматам","image":"./images/image-placeholder.png"},
    {"id":6,"name":"Остап Бендер","status":"Гроссмейстер","image":"./images/image-placeholder.png"}
];

const carouselSlider = document.querySelector('.carousel__slider');
const previousButton = document.querySelector('.carousel__previous');
const nextButton = document.querySelector('.carousel__next');
const imageCounter = document.querySelector('.carousel__image-counter');
const template = document.getElementById('carousel-card-template').content;

let currentIndex = 0;
let itemsPerPage = getItemsPerPage();

function getItemsPerPage() {
    const width = window.innerWidth;
    if (width >= 1366) return 3;
    if (width >= 950) return 2;
    return 1;
}

function updateCarousel() {
    carouselSlider.innerHTML = '';
    itemsPerPage = getItemsPerPage(); // пересчитываем количество на странице
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToShow = data.slice(start, end);

    itemsToShow.forEach(item => {
        const card = document.importNode(template, true);
        card.querySelector('.carousel__img').src = item.image;
        card.querySelector('.carousel__img').alt = item.name;
        card.querySelector('.carousel__name').textContent = item.name;
        card.querySelector('.carousel__status').textContent = item.status;
        carouselSlider.appendChild(card);
    });

    updateCounter();
}

function updateCounter() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    imageCounter.textContent = `${currentIndex + 1} / ${totalPages}`;
}

function nextSlide() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentIndex < totalPages - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // зацикливаем на 1 слайд
    }
    updateCarousel();
}

function previousSlide() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalPages - 1; // зацикливаем на последний слайд
    }
    updateCarousel();
}

function handleResize() {
    itemsPerPage = getItemsPerPage();
    currentIndex = 0; // на первую страницу
    updateCarousel();
}

nextButton.addEventListener('click', nextSlide);
previousButton.addEventListener('click', previousSlide);
window.addEventListener('resize', handleResize);

// Переключение каждые 4 сек
setInterval(nextSlide, 4000);

updateCarousel();


const carousel2Slider = document.querySelector('.carousel-unlooped__slider');
const previousButton2 = document.querySelector('.carousel-unlooped__previous');
const nextButton2 = document.querySelector('.carousel-unlooped__next');
const indicatorsContainer2 = document.querySelector('.carousel-unlooped__indicators');

const data2 = [
    { id: 1, text: "Строительство железнодорожной магистрали Москва-Васюки" },
    { id: 2, text: "Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов" },
    { id: 3, text: "Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет" },
    { id: 4, text: "Строительство дворца для турнира" },
    { id: 5, text: "Размещение гаражей для гостевого автотранспорта" },
    { id: 6, text: "Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов" },
    { id: 7, text: "Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн" }
];

let currentIndex2 = 0;

function renderGrid() {
    gridContainer.innerHTML = '';
    data2.forEach(item => {
        const gridItem = document.createElement('div');
        gridItem.className = `grid__item grid__item${item.id}`;
        gridItem.innerHTML = `<span class="grid__item-number">${item.id}</span><p class="grid__item-text">${item.text}</p>`;
        gridContainer.appendChild(gridItem);
    });
}

function updateCarousel2() {
    carousel2Slider.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'carousel-unlooped__card';
    card.innerHTML = `<span class="grid__item-number">${data2[currentIndex2].id}</span><p class="grid__item-text">${data2[currentIndex2].text}</p>`;
    carousel2Slider.appendChild(card);
    updateIndicators2();

    // кнопка неактивна
    if (currentIndex2 === 0) {
        previousButton2.disabled = true;
        previousButton2.classList.add('carousel-unlooped__btn_disabled');
    } else {
        previousButton2.disabled = false;
        previousButton2.classList.remove('carousel-unlooped__btn_disabled');
    }

    if (currentIndex2 === data2.length - 1) {
        nextButton2.disabled = true;
        nextButton2.classList.add('carousel-unlooped__btn_disabled');
    } else {
        nextButton2.disabled = false;
        nextButton2.classList.remove('carousel-unlooped__btn_disabled');
    }
}

function updateIndicators2() {
    indicatorsContainer2.innerHTML = '';
    for (let i = 0; i < data2.length; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === currentIndex2) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentIndex2 = i;
            updateCarousel2();
        });
        indicatorsContainer2.appendChild(indicator);
    }
}

function nextSlide2() {
    if (currentIndex2 < data2.length - 1) {
        currentIndex2++;
        updateCarousel2();
    }
}

function previousSlide2() {
    if (currentIndex2 > 0) {
        currentIndex2--;
        updateCarousel2();
    }
}

previousButton2.addEventListener('click', previousSlide2);
nextButton2.addEventListener('click', nextSlide2);


function handleResize2() {
    const width = window.innerWidth;
    if (width > 780) {
        document.getElementById('carousel-unlooped').style.display = 'none';
        gridContainer.style.display = 'grid';
        renderGrid();
    } else {
        document.getElementById('carousel-unlooped').style.display = 'block';
        gridContainer.style.display = 'none';
        updateCarousel2();
    }
}

window.addEventListener('resize', handleResize2);
window.addEventListener('load', handleResize2);

handleResize2();