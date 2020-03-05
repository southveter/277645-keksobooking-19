'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsBlock = document.querySelector('.map__pins');

  var openCardHandler = function (ad) {
    window.card.removeHandler();
    window.card.render(ad);
  };

  var getPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (ad.location.x - (window.data.PIN_SIZE.width / 2)) + 'px;' + ' top: ' + (ad.location.y - window.data.PIN_SIZE.height) + 'px;';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.classList.add('user-pin');


    pinElement.addEventListener('click', function () {
      openCardHandler(ad);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.data.Keys.ENTER_KEY) {
        openCardHandler(ad);
      }
    });

    return pinElement;
  };

  var insertPinToPage = function (serverData) {
    var data = serverData.slice(0, window.data.MAX_CARDS);
    var fragment = document.createDocumentFragment();
    data.forEach(function (item, index) {
      fragment.appendChild(getPin(data[index]));
    });
    pinsBlock.appendChild(fragment);
  };

  var removePins = function () {
    var pins = pinsBlock.querySelectorAll('.user-pin');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    get: getPin,
    insertToPage: insertPinToPage,
    remove: removePins
  };
})();
