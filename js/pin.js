'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  var openCardHandler = function (ad) {
    window.card.removeHandler();
    window.card.render(ad);
  };

  var getPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (ad.location.x - (window.data.PIN_SIZE.width / 2)) + 'px;' + ' top: ' + (ad.location.y - window.data.PIN_SIZE.height) + 'px;';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

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

  // var insertPinToPage = function (cards) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i <= window.data.MAX_CARDS; i++) {
  //     fragment.appendChild(getPin(cards[i]));
  //   }
  //   pinsBlock.appendChild(fragment);
  // };

  window.pin = {
    get: getPin
  };
})();
