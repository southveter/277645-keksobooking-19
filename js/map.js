'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var checkoutSelectElement = document.querySelector('#timeout');
  var checkinSelectElement = document.querySelector('#timein');
  var mainPin = document.querySelector('.map__pin--main');


  var adFormAvatar = adForm.querySelector('#avatar');

  var adFormImages = adForm.querySelector('#images');

  var activatePageFirstUsageHandler = (function (evt) {
    if (evt.button === window.data.Keys.LEFT_MOUSE_BTN || evt.key === window.data.Keys.ENTER_KEY) {
      mapBlock.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      adForm.action = 'https://js.dump.academy/keksobooking';
      window.form.setPageOptionsDisabledEnabled(window.form.PAGE_OPTIONS.enable);
      window.form.setMainPinCoordinatesInactiveActive(window.form.PIN_ATTRIBUTES.value);
      window.form.validateTitle();
      window.form.validatePrice();
      window.pin.insertToPage();
      checkinSelectElement.addEventListener('change', window.form.changeCheckinTimeSelectorHandler);
      checkoutSelectElement.addEventListener('change', window.form.changeCheckoutTimeSelectorHandler);
      adFormAvatar.accept = 'image/*';
      adFormImages.accept = 'image/*';
    }
  });

  mainPin.addEventListener('mousedown', activatePageFirstUsageHandler);
  mainPin.addEventListener('keydown', activatePageFirstUsageHandler);
  adForm.addEventListener('change', window.form.validateRoomsPeoplesHandler);
  adForm.addEventListener('change', window.form.validateInputPriceHandler);


})();
