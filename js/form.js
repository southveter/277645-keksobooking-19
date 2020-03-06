'use strict';

(function () {
  var FORM_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
    max: 1000000
  };

  var FORM_TITLE = {
    minLength: 30,
    maxLength: 100
  };

  var PIN_ATTRIBUTES = {
    placeholder: 'placeholder',
    value: 'value'
  };

  var ROOM_NUMBERS = {
    one: '1',
    two: '2',
    three: '3',
    hundred: '100'
  };

  var GUEST_NUMBERS = {
    one: '1',
    two: '2',
    three: '3',
    zero: '0'
  };

  var mapBlock = document.querySelector('.map');

  var adForm = document.querySelector('.ad-form');

  var adFormAddress = adForm.querySelector('input[name=address]');

  var mapFilter = document.querySelector('.map__filters');

  var mapFilterSelects = mapFilter.querySelectorAll('select');

  var mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');

  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var template = document.querySelector('#success').content.querySelector('.success');

  var resetButton = adForm.querySelector('.ad-form__reset');

  var checkoutSelectElement = document.querySelector('#timeout');

  var checkinSelectElement = document.querySelector('#timein');

  var mainPin = document.querySelector('.map__pin--main');

  var mainPinCenterCoordinates = mainPin.getBoundingClientRect();

  var formAddress = adForm.querySelector('#address');

  var avatarImage = adForm.querySelector('.ad-form-header__preview').querySelector('img');

  var houseImage = adForm.querySelector('.ad-form__photo');

  var formTitle = adForm.querySelector('#title');

  var formPrice = adForm.querySelector('#price');

  var formRoomNumber = adForm.querySelector('#room_number');

  var formCapacity = adForm.querySelector('#capacity');

  var formBuildingType = adForm.querySelector('#type');

  var PAGE_FIELDSETS_SELECTS_FILTERS = {
    formFieldsets: adFormFieldsets,
    filterSelects: mapFilterSelects,
    filterFieldsets: mapFilterFieldsets
  };

  var setMainPinCoordinatesInactiveActive = function (arg) {
    formAddress[arg] = (Math.round(mainPinCenterCoordinates.left + window.data.PIN_SIZE.width / 2) + ', ' + Math.round(mainPinCenterCoordinates.top + window.data.PIN_SIZE.height / 2));
  };

  setMainPinCoordinatesInactiveActive(PIN_ATTRIBUTES.placeholder);

  var setPageOptionsDisabledEnabled = function (isEnable) {
    for (var i = 0; i < PAGE_FIELDSETS_SELECTS_FILTERS.formFieldsets.length; i++) {
      PAGE_FIELDSETS_SELECTS_FILTERS.formFieldsets[i].disabled = isEnable;
    }
    for (i = 0; i < PAGE_FIELDSETS_SELECTS_FILTERS.filterSelects.length; i++) {
      PAGE_FIELDSETS_SELECTS_FILTERS.filterSelects[i].disabled = isEnable;
    }
    for (i = 0; i < PAGE_FIELDSETS_SELECTS_FILTERS.filterFieldsets.length; i++) {
      PAGE_FIELDSETS_SELECTS_FILTERS.filterFieldsets[i].disabled = isEnable;
    }
    adFormAddress.readOnly = true;
  };

  setPageOptionsDisabledEnabled(true);

  var validateFormTitle = function () {
    formTitle.required = true;
    formTitle.minLength = FORM_TITLE.minLength;
    formTitle.maxLength = FORM_TITLE.maxLength;
  };

  var validateFormPrice = function () {
    formPrice.required = true;
    formPrice.type = 'number';
    formPrice.max = FORM_PRICE.max;
  };

  var validateFormRoomsPeoplesHandler = function () {
    formRoomNumber.setCustomValidity('');
    formCapacity.setCustomValidity('');
    if (formRoomNumber.value === ROOM_NUMBERS.one && (formCapacity.value === GUEST_NUMBERS.zero || formCapacity.value === GUEST_NUMBERS.two || formCapacity.value === GUEST_NUMBERS.three)) {
      formRoomNumber.setCustomValidity('Выберите большее количество комнат');
    } else if (formRoomNumber.value === ROOM_NUMBERS.two && (formCapacity.value === GUEST_NUMBERS.zero || formCapacity.value === GUEST_NUMBERS.three)) {
      formRoomNumber.setCustomValidity('Выберите большее количество комнат');
    } else if (formRoomNumber.value === ROOM_NUMBERS.three && formCapacity.value === GUEST_NUMBERS.zero) {
      formRoomNumber.setCustomValidity('Выберите большее количество комнат');
    } else if (formRoomNumber.value === ROOM_NUMBERS.hundred && (formCapacity.value === GUEST_NUMBERS.one || formCapacity.value === GUEST_NUMBERS.two || formCapacity.value === GUEST_NUMBERS.three)) {
      formCapacity.setCustomValidity('Выберите - не для гостей');
    }
  };

  var validateInputPriceHandler = function () {
    if (formBuildingType.value === 'bungalo') {
      formPrice.min = FORM_PRICE.bungalo;
      formPrice.placeholder = FORM_PRICE.bungalo;
    } else if (formBuildingType.value === 'flat') {
      formPrice.min = FORM_PRICE.flat;
      formPrice.placeholder = FORM_PRICE.flat;
    } else if (formBuildingType.value === 'house') {
      formPrice.min = FORM_PRICE.house;
      formPrice.placeholder = FORM_PRICE.house;
    } else {
      formPrice.min = FORM_PRICE.palace;
      formPrice.placeholder = FORM_PRICE.palace;
    }
  };

  var changeCheckinTimeSelectorHandler = function () {
    checkoutSelectElement.value = checkinSelectElement.value;
  };


  var changeCheckoutTimeSelectorHandler = function () {
    checkinSelectElement.value = checkoutSelectElement.value;
  };

  var resetPage = function () {
    window.pin.remove();
    window.card.remove();
    mapBlock.classList.add('map--faded');
    mapFilter.reset();
    adForm.reset();
    avatarImage.src = 'img/muffin-grey.svg';
    houseImage.style.backgroundImage = '';
    adForm.classList.add('ad-form--disabled');
    setPageOptionsDisabledEnabled(true);
    setMainPinCoordinatesInactiveActive(PIN_ATTRIBUTES.placeholder);
    mainPin.style.top = window.data.DEFAULT_PIN_COORDS.Y + 'px';
    mainPin.style.left = window.data.DEFAULT_PIN_COORDS.X + 'px';
  };

  var formSubmitHandler = function () {
    resetPage();
    window.messages.createUpload(template);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload.data(new FormData(adForm), formSubmitHandler);
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetPage();
  });

  window.form = {
    validateTitle: validateFormTitle,
    validatePrice: validateFormPrice,
    validateRoomsPeoplesHandler: validateFormRoomsPeoplesHandler,
    validateInputPriceHandler: validateInputPriceHandler,
    changeCheckinTimeSelectorHandler: changeCheckinTimeSelectorHandler,
    changeCheckoutTimeSelectorHandler: changeCheckoutTimeSelectorHandler,
    setPageOptionsDisabledEnabled: setPageOptionsDisabledEnabled,
    PIN_ATTRIBUTES: PIN_ATTRIBUTES,
    setMainPinCoordinatesInactiveActive: setMainPinCoordinatesInactiveActive,
    resetPage: resetPage
  };
})();
