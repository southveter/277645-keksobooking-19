'use strict';


var AVATAR_AUTHORS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];


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


var MAP_SIZE = {
  startX: 0,
  startY: 130,
  endY: 630
};

var PIN_SIZE = {
  width: 50,
  height: 70
};

var MAX_CARDS = 8;

var LEFT_MOUSE_BTN = 0;

var ENTER_KEY = 'Enter';


var bodyWidht = document.body.clientWidth;


var mapBlock = document.querySelector('.map');


var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


var pinsBlock = document.querySelector('.map__pins');


// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var adFormFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');

var setAdFormFieldsetsDisabled = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = true;
  }
};

var mapFilter = document.querySelector('.map__filters');


var mapFilterSelects = mapFilter.querySelectorAll('select');


var mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');

var mainPin = document.querySelector('.map__pin--main');

var mainPinCenterCoordinates = mainPin.getBoundingClientRect();

var formAddress = document.querySelector('#address');

var adForm = document.querySelector('.ad-form');

var setMainPinCoordinatesInactive = function () {
  formAddress.placeholder = (Math.round(mainPinCenterCoordinates.left + PIN_SIZE.width / 2) + ', ' + Math.round(mainPinCenterCoordinates.top + PIN_SIZE.height / 2));
};

var setMainPinCoordinatesActive = function () {
  formAddress.value = (Math.round(mainPinCenterCoordinates.left + PIN_SIZE.width / 2) + ', ' + Math.round(mainPinCenterCoordinates.top + PIN_SIZE.height));
};

var setMapFilterSelectsDisabled = function () {
  for (var i = 0; i < mapFilterSelects.length; i++) {
    mapFilterSelects[i].disabled = true;
  }
};

var setMapFilterFieldsetsDisabled = function () {
  for (var i = 0; i < mapFilterFieldsets.length; i++) {
    mapFilterFieldsets[i].disabled = true;
  }
};


setAdFormFieldsetsDisabled();
setMapFilterSelectsDisabled();
setMapFilterFieldsetsDisabled();
setMainPinCoordinatesInactive();


var getCardData = function () {
  return {
    author: {
      avatar: AVATAR_AUTHORS[getRandomInt(0, AVATAR_AUTHORS.length - 1)]
    },

    offer: {
      title: TITLES [getRandomInt(0, TITLES.length - 1)],
      adress: getRandomInt(0, 600) + ', ' + getRandomInt(0, 350),
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


// mapBlock.classList.remove('map--faded');

var getCards = function (count) {
  var offers = [];
  for (var i = 0; i < count; i++) {
    offers.push(getCardData());
  }
  return offers;
};


var cards = getCards(MAX_CARDS);


var getPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (ad.location.x - (PIN_SIZE.width / 2)) + 'px;' + ' top: ' + (ad.location.y - PIN_SIZE.height) + 'px;';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};


var insertPinToPage = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(getPin(cards[i]));
  }
  pinsBlock.appendChild(fragment);
};


// var createPopupFeatures = function (features, element) {
//   element.textContent = '';
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < features.length; i++) {
//     var li = document.createElement('li');
//     li.classList.add('popup__feature', 'popup__feature--' + features[i]);
//     li.textContent = features[i];
//     fragment.appendChild(li);
//   }
//   element.appendChild(fragment);
// };


// var createPopupPhotos = function (photos, element) {
//   element.textContent = '';
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < photos.length; i++) {
//     var image = document.createElement('img');
//     image.src = photos[i];
//     image.classList.add('popup__photo');
//     image.width = '45';
//     image.height = '40';
//     image.alt = 'Фотография жилья';
//     fragment.appendChild(image);
//   }
//   element.appendChild(fragment);
// };


// var typesOfBuildings = {
//   palace: 'Дворец',
//   house: 'Дом',
//   flat: 'Квартира',
//   bungalo: 'Бунгало'
// };


// var getPageCard = function (ad) {
//   var cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
//   cardElement.querySelector('.popup__title').textContent = ad.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = ad.offer.adress;
//   cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
//   cardElement.querySelector('.popup__type').textContent = typesOfBuildings[ad.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ',' + ' выезд до ' + ad.offer.checkout + '.';
//   createPopupFeatures(ad.offer.features, cardElement.querySelector('.popup__features'));
//   createPopupPhotos(ad.offer.photos, cardElement.querySelector('.popup__photos'));
//   cardElement.querySelector('.popup__description').textContent = ad.offer.description;
//   return cardElement;
// };


// var insertCardToPage = function (index) {
//   var filtersContainerBlock = mapBlock.querySelector('.map__filters-container');
//   mapBlock.insertBefore(getPageCard(cards[index]), filtersContainerBlock);
// };


var setAdFormFieldsetsEnabled = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = false;
  }
};

var setMapFilterSelectsEnabled = function () {
  for (var i = 0; i < mapFilterSelects.length; i++) {
    mapFilterSelects[i].disabled = false;
  }
};

var setMapFilterFieldsetsEnabled = function () {
  for (var i = 0; i < mapFilterFieldsets.length; i++) {
    mapFilterFieldsets[i].disabled = false;
  }
};

var formTitle = adForm.querySelector('#title');

var validateFormTitle = function () {
  formTitle.required = true;
  formTitle.minLength = 30;
  formTitle.maxLength = 100;
};

var formPrice = adForm.querySelector('#price');

var validateFormPrice = function () {
  formPrice.required = true;
  formPrice.type = 'number';
  formPrice.max = 1000000;
};

var formRoomNumber = adForm.querySelector('#room_number');

var formCapacity = adForm.querySelector('#capacity');


var validateFormRoomsPeoplesHandler = function () {
  if (formRoomNumber.value === '1' && (formCapacity.value === '0' || formCapacity.value === '2' || formCapacity.value === '3')) {
    formRoomNumber.setCustomValidity('Выберите большее количество комнат');
  } else if (formRoomNumber.value === '2' && (formCapacity.value === '0' || formCapacity.value === '3')) {
    formRoomNumber.setCustomValidity('Выберите большее количество комнат');
  } else if (formRoomNumber.value === '3' && formCapacity.value === '0') {
    formRoomNumber.setCustomValidity('Выберите большее количество комнат');
  } else if (formRoomNumber.value === '100' && (formCapacity.value === '1' || formCapacity.value === '2' || formCapacity.value === '3')) {
    formCapacity.setCustomValidity('Выберите - не для гостей');
  } else {
    formRoomNumber.setCustomValidity('');
    formCapacity.setCustomValidity('');
  }
};

var formBuildingType = adForm.querySelector('#type');

var validateInputPriceHandler = function () {
  if (formBuildingType.value === 'bungalo') {
    formPrice.min = 0;
    formPrice.placeholder = '0';
  } else if (formBuildingType.value === 'flat') {
    formPrice.min = 1000;
    formPrice.placeholder = '1000';
  } else if (formBuildingType.value === 'house') {
    formPrice.min = 5000;
    formPrice.placeholder = '5000';
  } else {
    formPrice.min = 10000;
    formPrice.placeholder = '10000';
  }
};

var activatePageFirstUsageHandler = (function (evt) {
  if (evt.button === LEFT_MOUSE_BTN) {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adForm.action = 'https://js.dump.academy/keksobooking';
    setAdFormFieldsetsEnabled();
    setMapFilterSelectsEnabled();
    setMapFilterFieldsetsEnabled();
    setMainPinCoordinatesActive();
    validateFormTitle();
    validateFormPrice();
    insertPinToPage();
  } else if (evt.key === ENTER_KEY) {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adForm.action = 'https://js.dump.academy/keksobooking';
    setAdFormFieldsetsEnabled();
    setMapFilterSelectsEnabled();
    setMapFilterFieldsetsEnabled();
    setMainPinCoordinatesActive();
    validateFormTitle();
    validateFormPrice();
    insertPinToPage();
  }
});


mainPin.addEventListener('mousedown', activatePageFirstUsageHandler);
mainPin.addEventListener('keydown', activatePageFirstUsageHandler);
adForm.addEventListener('change', validateFormRoomsPeoplesHandler);
adForm.addEventListener('change', validateInputPriceHandler);


