'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var avatarChooser = form.querySelector('#avatar');
  var avatar = form.querySelector('.ad-form-header__preview').querySelector('img');
  var housingImageChooser = form.querySelector('#images');
  var housingImage = form.querySelector('.ad-form__photo');

  var imageChooserChangeHandler = function (evt) {
    var file = evt.target.files[0];

    var reader = new FileReader();
    reader.addEventListener('load', function () {
      if (evt.target === avatarChooser) {
        avatar.src = reader.result;
      } else {
        housingImage.style.backgroundImage = 'url(' + reader.result + ')';
      }
    });
    reader.readAsDataURL(file);
  };

  avatarChooser.addEventListener('change', imageChooserChangeHandler);
  housingImageChooser.addEventListener('change', imageChooserChangeHandler);
})();
