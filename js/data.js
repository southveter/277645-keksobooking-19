'use strict';

(function () {

  var TITLES = [
    'Супер предложение',
    'Такого вы ещё не видели',
    'Лучше, чем сейчас не будет',
    'Только попробуй не снять',
    'И боги хотели бы тут жить'
  ];

  var BUILDING_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var CHECKIN_TIME_HOURS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var BUILDING_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var MAP_SIZE = {
    startX: 0,
    startY: 130,
    endY: 630
  };

  var DEFAULT_PIN_COORDS = {
    X: 570,
    Y: 375
  };

  var PIN_SIZE = {
    width: 50,
    height: 70
  };

  var Keys = {
    ENTER_KEY: 'Enter',
    ESC_KEY: 'Escape',
    LEFT_MOUSE_BTN: 0
  };

  var SERVER_URL = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var STATUS_CODE_OK = 200;

  var TIME_OUT = 10000;

  var bodyWidht = document.body.clientWidth;

  var getRandomInt = function (max, min) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomArray = function (array) {
    var resultArray = [];
    var length = getRandomInt(1, array.length);
    for (var i = 0; i < length; i++) {
      resultArray.push(array[i]);
    }
    return resultArray;
  };

  var DESCRIPTION = 'Очень классный тип жилья - ' + BUILDING_TYPES[getRandomInt(0, BUILDING_TYPES.length - 1)] + ', приезжайте, вам понравится!';

  var MAX_CARDS = 5;

  var getCardData = function (index) {
    return {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },

      offer: {
        title: TITLES[getRandomInt(0, TITLES.length - 1)],
        address: getRandomInt(0, 600) + ', ' + getRandomInt(0, 350),
        price: getRandomInt(200, 1000),
        type: BUILDING_TYPES[getRandomInt(0, BUILDING_TYPES.length - 1)],
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 5),
        checkin: CHECKIN_TIME_HOURS[getRandomInt(0, CHECKIN_TIME_HOURS.length - 1)],
        checkout: CHECKIN_TIME_HOURS[getRandomInt(0, CHECKIN_TIME_HOURS.length - 1)],
        features: getRandomArray(FEATURES),
        description: DESCRIPTION,
        photos: getRandomArray(BUILDING_PHOTOS)
      },

      location: {
        x: getRandomInt(MAP_SIZE.startX + PIN_SIZE.width / 2, bodyWidht - PIN_SIZE.width / 2),
        y: getRandomInt(MAP_SIZE.startY, MAP_SIZE.endY)
      }
    };
  };

  var getCards = function (count) {
    var offers = [];
    for (var i = 0; i < count; i++) {
      offers.push(getCardData(i));
    }
    return offers;
  };

  var cards = getCards(MAX_CARDS);

  window.data = {
    PIN_SIZE: PIN_SIZE,
    CARDS: cards,
    Keys: Keys,
    MAP_SIZE: MAP_SIZE,
    MAX_CARDS: MAX_CARDS,
    SERVER_URL: SERVER_URL,
    DEFAULT_PIN_COORDS: DEFAULT_PIN_COORDS,
    STATUS_CODE_OK: STATUS_CODE_OK,
    TIME_OUT: TIME_OUT
  };

})();
