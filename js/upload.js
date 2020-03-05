'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var template = document.querySelector('#error').content.querySelector('.error');
  var mapFilter = document.querySelector('.map__filters');

  var xhrSuccessHandler = function () {
    window.pin.remove();
    window.card.remove();
    mapBlock.classList.add('map--faded');
    mapFilter.reset();
  };

  var xhrErrorHandler = function () {
    window.messages.createUpload(template);
  };


  var uploadData = function (data, successUploadHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.STATUS_CODE_OK) {
        successUploadHandler();
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

    xhr.timeout = window.data.TIME_OUT;

    xhr.open('POST', window.data.SERVER_URL.POST);
    xhr.send(data);
  };

  window.upload = {
    data: uploadData,
    xhrSuccessHandler: xhrSuccessHandler
  };
})();
