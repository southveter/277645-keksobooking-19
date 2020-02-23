'use strict';

(function () {
  var createDownloadMessage = function (text) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '200px';
    node.style.fontSize = '30px';
    node.textContent = text;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var createUploadMessage = function (template) {
    var node = template.cloneNode(true);
    var buttonClose = node.querySelector('.error__button');

    var removeNode = function () {
      node.remove();
      document.removeEventListener('keydown', documentEscKeydownHandler);
      document.removeEventListener('click', documentClickHandler);
    };

    var buttonCloseClickHandler = function () {
      removeNode();
    };

    var documentEscKeydownHandler = function (evt) {
      if (evt.key === window.data.Keys.ESC_KEY) {
        removeNode();
      }
    };

    var documentClickHandler = function () {
      removeNode();
    };

    if (buttonClose) {
      buttonClose.addEventListener('click', buttonCloseClickHandler);
    }

    document.addEventListener('keydown', documentEscKeydownHandler);
    document.addEventListener('click', documentClickHandler);

    var main = document.querySelector('main');
    main.appendChild(node);
  };

  window.messages = {
    createUpload: createUploadMessage,
    createDownload: createDownloadMessage,
  };
})();
