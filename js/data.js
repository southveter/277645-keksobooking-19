'use strict';

(function () {

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

  var MAX_CARDS = 5;

  window.data = {
    PIN_SIZE: PIN_SIZE,
    Keys: Keys,
    MAP_SIZE: MAP_SIZE,
    MAX_CARDS: MAX_CARDS,
    SERVER_URL: SERVER_URL,
    DEFAULT_PIN_COORDS: DEFAULT_PIN_COORDS,
    STATUS_CODE_OK: STATUS_CODE_OK,
    TIME_OUT: TIME_OUT
  };

})();
