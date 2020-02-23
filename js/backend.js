'use strict';

(function () {
  var serverUrl = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };
  var pinsBlock = document.querySelector('.map__pins');
  var mapBlock = document.querySelector('.map');
  var template = document.querySelector('#error').content.querySelector('.error');
  var TIME_OUT = 10000;

  var loadData = function (successLoadHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', serverUrl.GET);

    xhr.addEventListener('load', function () {
      successLoadHandler(xhr.response);
    });

    xhr.send();
  };

  var removePins = function () {
    var pins = pinsBlock.querySelectorAll('.user-pin');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var removeCard = function () {
    var card = mapBlock.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  var xhrSuccessHandler = function () {
    removePins();
    removeCard();
    mapBlock.classList.add('map--faded');
  };

  var xhrErrorHandler = function () {
    window.messages.createUpload(template);
  };


  var uploadData = function (data, successUploadLoadHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successUploadLoadHandler();
        xhrSuccessHandler();
      } else {
        xhrErrorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      xhrErrorHandler();
    });

    xhr.addEventListener('timeout', function () {
      xhrErrorHandler();
    });

    xhr.timeout = TIME_OUT;

    xhr.open('POST', serverUrl.POST);
    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    uploadData: uploadData
  };
})();
