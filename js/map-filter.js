'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var typeSelect = form.querySelector('#housing-type');

  typeSelect.addEventListener('change', function () {
    var value = typeSelect.value;
    var isSuited = function (item) {
      return item.offer.type === value;
    };
    var serverData = window.serverData;
    var data = value === 'any' ? serverData : serverData.filter(isSuited);
    window.card.remove();
    window.pin.remove();
    window.pin.insertToPage(data);
  });

  form.addEventListener('change', window.card.remove);

})();
