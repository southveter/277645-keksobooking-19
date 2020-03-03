'use strict';

(function () {

  var xhrSuccessHandler = function (data) {
    window.serverData = data;
    window.pin.insertToPage(data);
  };

  var xhrErrorHandler = function (text) {
    window.messages.createDownload(text);
  };

  var loadData = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.STATUS_CODE_OK) {
        xhrSuccessHandler(xhr.response);
      } else {
        xhrErrorHandler('Произошла ошибка соединения, попробуйте обновить страницу позже');
      }
    });
    xhr.addEventListener('error', function () {
      xhrErrorHandler('Произошел сбой со стороны сервера, либо у вас пропало интернет-соединение, попробуйте обновить страницу позже');
    });
    xhr.addEventListener('timeout', function () {
      xhrErrorHandler('Запрос выполняется слишком долго, попробуйте обновить страницу позже');
    });
    xhr.timeout = window.data.TIME_OUT;
    xhr.open('GET', window.data.SERVER_URL.GET);
    xhr.send();
  };

  window.download = {
    data: loadData,
  };

})();
