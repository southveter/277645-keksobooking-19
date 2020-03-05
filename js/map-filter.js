'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var DEBOUNCE_INTERVAL = 500;
  var mapFilters = document.querySelector('.map__filters');
  var typeSelect = mapFilters.querySelector('#housing-type');
  var priceSelect = mapFilters.querySelector('#housing-price');
  var roomsSelect = mapFilters.querySelector('#housing-rooms');
  var guestsSelect = mapFilters.querySelector('#housing-guests');
  var featuresGroup = mapFilters.querySelector('.map__features');
  var wifiFeature = featuresGroup.querySelector('#filter-wifi');
  var dishwasherFeature = featuresGroup.querySelector('#filter-dishwasher');
  var parkingFeature = featuresGroup.querySelector('#filter-parking');
  var washerFeature = featuresGroup.querySelector('#filter-washer');
  var elevatorFeature = featuresGroup.querySelector('#filter-elevator');
  var conditionerFeature = featuresGroup.querySelector('#filter-conditioner');
  var features = featuresGroup.querySelectorAll('.map__checkbox');


  var isSuitedItem = function (item) {
    var isSuited = true;
    var featuresArray = item.offer.features;

    for (var i = 0; i < features.length && isSuited; i++) {
      if (features[i].checked) {
        isSuited = featuresArray.includes(features[i].value);
      }
    }

    if (typeSelect.value !== 'any' && isSuited) {
      isSuited = item.offer.type === typeSelect.value;
    }

    if (priceSelect.value !== 'any' && isSuited) {
      switch (priceSelect.value) {
        case 'low':
          isSuited = item.offer.price < MIN_PRICE;
          break;
        case 'middle':
          isSuited = item.offer.price >= MIN_PRICE && item.offer.price <= MAX_PRICE;
          break;
        case 'high':
          isSuited = item.offer.price > MAX_PRICE;
      }
    }

    if (roomsSelect.value !== 'any' && isSuited) {
      isSuited = item.offer.rooms === +roomsSelect.value;
    }

    if (guestsSelect.value !== 'any' && isSuited) {
      isSuited = item.offer.guests === +guestsSelect.value;
    }

    return isSuited;
  };

  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var formElementChangeHandler = function () {
    debounce(function () {
      var serverData = window.serverData;
      var data = serverData.filter(isSuitedItem);
      window.card.remove();
      window.pin.remove();
      window.pin.insertToPage(data);
    });
  };

  // mapFilters.addEventListener('change', window.card.remove);
  typeSelect.addEventListener('change', formElementChangeHandler);
  priceSelect.addEventListener('change', formElementChangeHandler);
  roomsSelect.addEventListener('change', formElementChangeHandler);
  guestsSelect.addEventListener('change', formElementChangeHandler);
  wifiFeature.addEventListener('change', formElementChangeHandler);
  dishwasherFeature.addEventListener('change', formElementChangeHandler);
  parkingFeature.addEventListener('change', formElementChangeHandler);
  washerFeature.addEventListener('change', formElementChangeHandler);
  elevatorFeature.addEventListener('change', formElementChangeHandler);
  conditionerFeature.addEventListener('change', formElementChangeHandler);

})();
