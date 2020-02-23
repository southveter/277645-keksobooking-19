'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var loadData = function (successLoadHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      successLoadHandler(xhr.response);
    });

    xhr.send();
  };

  window.load = {
    data: loadData
  };
})();
