'use strict';

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (array) {
  var resultArray = [];
  var length = getRandomInt(1, array.length);
  for (var i = 0; i < length; i++) {
    resultArray.push(array[i]);
  }
  return resultArray;
};

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

var bodyWidht = document.body.clientWidth;

var mapBlock = document.querySelector('.map');

mapBlock.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinsBlock = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

var OBJECTS_AMOUNT = 8;

var createObjects = function (count) {
  var offers = [];
  for (var i = 0; i < count; i++) {
    offers.push(object());
  }
  return offers;
};

var renderedAds = createObjects(OBJECTS_AMOUNT);

var renderPin = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (offer.location.x - (PIN_WIDTH / 2)) + 'px;' + ' top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.title;

  return pinElement;
};

var renderPinToDocument = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < renderedAds.length; i++) {
    fragment.appendChild(renderPin(renderedAds[i]));
  }
  pinsBlock.appendChild(fragment);
};


var popupFeatures = function (features) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + features[i]);
    li.textContent = (features[i]);
    fragment.appendChild(li);
  }
  return fragment;
};

// var popupPhotos = function (photos) {
//   var fragment = new DocumentFragment();
//   for (var i = 0; i < photos.length; i++) {
//     var newImage = document.createElement('img');
//     newImage.classList.add('popup__photo');
//     newImage.src = photos[i];
//     newImage.width = '45';
//     newImage.height = '40';
//     newImage.alt = 'Фотография жилья';
//     fragment.appendChild(newImage);
//   }
//   return fragment;
// };

var addPhotos = function (arr, photos) {
  photos.innerHTML = '';
  for (var i = 0; i < arr.length; i++) {
    var newChild = document.createElement('img');
    newChild.className = 'popup__photo';
    newChild.setAttribute('src', arr[i]);
    newChild.setAttribute('width', 45);
    newChild.setAttribute('height', 40);
    newChild.setAttribute('alt', 'Фотография жилья');
    photos.appendChild(newChild);
  }
};

var renderCard = function (offer) {
// debugger;
  var cardElement = cardTemplate.cloneNode(true);
  console.log(popupFeatures(offer.offer.features));
  var housingTypes = {
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира',
    bungalo: 'Бунгало'
  };
  cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = housingTypes[offer.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ',' + ' выезд до ' + offer.offer.checkout + '.';
  cardElement.querySelector('.popup__features').innerHTML = (popupFeatures(offer.offer.features));

  cardElement.querySelector('.popup__description').textContent = offer.offer.description;
  // cardElement.querySelector('popup__photos').innerHtml = popupPhotos(offer.offer.photos);
  addPhotos(offer.offer.photos, cardElement.querySelector('.popup__photos'));
  return cardElement;
};

var renderCardToDocument = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < renderedAds.length; i++) {
    fragment.appendChild(renderCard(renderedAds[i]));
  }
  // mapBlock.insertAdjacentHTML('beforebegin', fragment);
  var filtersContainerBlock = mapBlock.querySelector('.map__filters-container');
  mapBlock.insertBefore(fragment, filtersContainerBlock);
};

renderPinToDocument();

renderCardToDocument();
