'use strict';
// Рандомное число
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Массив рандомной длины
var getRandomArray = function (array) {
  var resultArray = [];
  var length = getRandomInt(1, array.length);
  for (var i = 0; i < length; i++) {
    resultArray.push(array[i]);
  }
  return resultArray;
};
// Константы
var AVATAR_AUTHORS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var TITLES = ['Супер предложение', 'Такого вы ещё не видели', 'Лучше, чем сейчас не будет', 'Только попробуй не снять', 'И боги хотели бы тут жить'];

var BUILD_TYPE = ['palace', 'flat', 'house', 'bungalo'];

var CHECKIN_TIME = ['12:00', '13:00', '14:00'];

var FEATURE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var BUILD_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var DESCRIPTION = 'Очень классный тип жилья - ' + BUILD_TYPE[getRandomInt(0, BUILD_TYPE.length - 1)] + ', приезжайте, вам понравится!';

var MAP_START_X = 0;

var MAP_START_Y = 130;

var MAP_END_Y = 630;

var PIN_WIDTH = 50;

var PIN_HEIGHT = 70;

var OBJECTS_AMOUNT = 8;

var bodyWidht = document.body.clientWidth;

var mapBlock = document.querySelector('.map');

mapBlock.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinsBlock = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Рандомный мок
var object = function () {
  return {
    author: {
      avatar: AVATAR_AUTHORS[getRandomInt(0, AVATAR_AUTHORS.length - 1)]
    },

    offer: {
      title: TITLES [getRandomInt(0, TITLES.length - 1)],
      adress: getRandomInt(0, 600) + ', ' + getRandomInt(0, 350),
      price: getRandomInt(200, 1000),
      type: BUILD_TYPE[getRandomInt(0, BUILD_TYPE.length - 1)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 5),
      checkin: CHECKIN_TIME[getRandomInt(0, CHECKIN_TIME.length - 1)],
      checkout: CHECKIN_TIME[getRandomInt(0, CHECKIN_TIME.length - 1)],
      features: getRandomArray(FEATURE),
      description: DESCRIPTION,
      photos: getRandomArray(BUILD_PHOTO)
    },

    location: {
      x: getRandomInt(MAP_START_X + PIN_WIDTH / 2, bodyWidht - PIN_WIDTH / 2),
      y: getRandomInt(MAP_START_Y, MAP_END_Y)
    }
  };
};

// Создание моков
var createObjects = function (count) {
  var offers = [];
  for (var i = 0; i < count; i++) {
    offers.push(object());
  }
  return offers;
};

var Ads = createObjects(OBJECTS_AMOUNT);

// Создание пина
var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (ad.location.x - (PIN_WIDTH / 2)) + 'px;' + ' top: ' + (ad.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};
// Добавление пина в документ
var renderPinToDocument = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < Ads.length; i++) {
    fragment.appendChild(renderPin(Ads[i]));
  }
  pinsBlock.appendChild(fragment);
};

// Добавление features в родительский класс
var popupFeatures = function (features, element) {
  // console.log(element);
  element.textContent = '';
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + features[i]);
    li.textContent = features[i];
    fragment.appendChild(li);
  }
  element.appendChild(fragment);
};

// Добавление photos в родительский класс
var popupPhotos = function (photos, element) {
  element.textContent = '';
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var image = document.createElement('img');
    image.src = photos[i];
    image.classList.add('popup__photo');
    image.width = '45';
    image.height = '40';
    image.alt = 'Фотография жилья';
    fragment.appendChild(image);
  }
  element.appendChild(fragment);
};

// Создание карточки пина
var renderCard = function (ad) {
// debugger;
  var cardElement = cardTemplate.cloneNode(true);
  // console.log(popupPhotos(ad.offer.photos, cardElement.querySelector('.popup__photos'), 'фото'));
  var housingTypes = {
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира',
    bungalo: 'Бунгало'
  };
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = housingTypes[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ',' + ' выезд до ' + ad.offer.checkout + '.';
  popupFeatures(ad.offer.features, cardElement.querySelector('.popup__features'));
  popupPhotos(ad.offer.photos, cardElement.querySelector('.popup__photos'));
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  return cardElement;
};

// Добавление карточки в документ
var renderCardToDocument = function (index) {
  // var fragment = document.createDocumentFragment();
  // for (var i = 0; i < Ads.length; i++) {
  //   fragment.appendChild(renderCard(Ads[i]));
  // }
  // mapBlock.insertAdjacentHTML('beforebegin', fragment);
  var filtersContainerBlock = mapBlock.querySelector('.map__filters-container');
  mapBlock.insertBefore(renderCard(Ads[index]), filtersContainerBlock);
};

renderPinToDocument();

renderCardToDocument(0);
