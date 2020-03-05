'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapBlock = document.querySelector('.map');
  var mapFiltersContainer = mapBlock.querySelector('.map__filters-container');

  var POPUP_PHOTO = {
    width: 45,
    height: 40
  };

  var TypesOfBuildings = {
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира',
    bungalo: 'Бунгало'
  };

  var createPopupFeatures = function (features, element) {
    element.textContent = '';
    var fragment = document.createDocumentFragment();
    features.forEach(function (item, index) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + features[index]);
      li.textContent = features[index];
      fragment.appendChild(li);
    });
    element.appendChild(fragment);
  };

  var createPopupPhotos = function (photos, element) {
    element.textContent = '';
    var fragment = document.createDocumentFragment();
    photos.forEach(function (item, index) {
      var image = document.createElement('img');
      image.src = photos[index];
      image.classList.add('popup__photo');
      image.width = POPUP_PHOTO.width;
      image.height = POPUP_PHOTO.height;
      image.alt = 'Фотография жилья';
      fragment.appendChild(image);
    });
    element.appendChild(fragment);
  };

  var removeCardHandler = function () {
    var card = mapBlock.querySelector('.map__card');

    if (card) {
      var popupClose = card.querySelector('.popup__close');

      card.remove();

      popupClose.removeEventListener('click', removeCardHandler);
      document.removeEventListener('keydown', pressEscCardHandler);
    }
  };

  var pressEscCardHandler = function (evt) {
    if (evt.key === window.data.Keys.ESC_KEY) {
      removeCardHandler();
    }
  };

  var getPageCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupClose = cardElement.querySelector('.popup__close');
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypesOfBuildings[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ',' + ' выезд до ' + ad.offer.checkout + '.';
    createPopupFeatures(ad.offer.features, cardElement.querySelector('.popup__features'));
    createPopupPhotos(ad.offer.photos, cardElement.querySelector('.popup__photos'));
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    popupClose.addEventListener('click', removeCardHandler);
    document.addEventListener('keydown', pressEscCardHandler);
    return cardElement;
  };

  var renderCard = function (ad) {
    mapFiltersContainer.insertAdjacentElement('beforebegin', getPageCard(ad));
  };

  var removeCard = function () {
    var card = mapBlock.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  window.card = {
    render: renderCard,
    removeHandler: removeCardHandler,
    remove: removeCard
  };
})();
