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

var OFFSET_X = 25;

var OFFSET_Y = 70;

var bodyWidht = document.body.clientWidth;

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinsBlock = document.querySelector('.map__pins');

var object = function () {
  return {
    author: {
      avatar: AVATAR_AUTHORS[getRandomInt(0, AVATAR_AUTHORS.length - 1)]
    },

    offer: {
      title: TITLES [getRandomInt(0, TITLES.length - 1)],
      address: '600, 350',
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
      x: getRandomInt(0, bodyWidht),
      y: getRandomInt(130, 630)
    }
  };
};

var OBJECTS_AMOUNT = 8;

var createObjects = function (count) {
  var offers = [];
  for (var i = 0; i <= count; i++) {
    offers.push(object());
  }
  return offers;
};

var renderedPins = createObjects(OBJECTS_AMOUNT);


document.querySelector('.map').classList.remove('map--faded');

var renderPin = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (offer.location.x + OFFSET_X) + 'px;' + ' top: ' + (offer.location.y + OFFSET_Y) + 'px;';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.title;

  return pinElement;
};

var renderPinToDocument = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < renderedPins.length; i++) {
    fragment.appendChild(renderPin(renderedPins[i]));
  }
  pinsBlock.appendChild(fragment);
};

renderPinToDocument();
