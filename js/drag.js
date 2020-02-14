'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mapSizeXMax = Math.floor(document.querySelector('.map__overlay').offsetWidth);

  var mainPinLimit = {
    left: window.data.MAP_SIZE.startX - Math.round(mainPin.offsetWidth / 2),
    right: mapSizeXMax - Math.round(mainPin.offsetWidth / 2),
    top: window.data.MAP_SIZE.startY - mainPin.offsetHeight,
    bottom: window.data.MAP_SIZE.endY - mainPin.offsetHeight
  };

  var checkLimitMainPinCoordinates = function () {

    if (mainPin.offsetLeft <= mainPinLimit.left) {
      mainPin.style.left = mainPinLimit.left + 'px';
    }
    if (mainPin.offsetLeft >= mainPinLimit.right) {
      mainPin.style.left = mainPinLimit.right + 'px';
    }
    if (mainPin.offsetTop <= mainPinLimit.top) {
      mainPin.style.top = mainPinLimit.top + 'px';
    }
    if (mainPin.offsetTop >= mainPinLimit.bottom) {
      mainPin.style.top = mainPinLimit.bottom + 'px';
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      checkLimitMainPinCoordinates();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


  });
})();
