'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form-header__input');
  var preview = document.querySelector('.ad-form-header__preview img');

  var checkFileType = function (name) { // ф-я проверки типа файла
    var matches = FILE_TYPES.some(function (it) {
      return name.endsWith(it);
    });
    return matches;
  };

  // загрузка аватарки

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (checkFileType(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // загрузка фото жилья

  var adFormphotoContainer = document.querySelector('.ad-form__photo-container');
  var photoChooser = adFormphotoContainer.querySelector('#images');
  var adFormphotoBlock = adFormphotoContainer.querySelector('.ad-form__photo');

  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (checkFileType(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.className = 'ad-form__photo';
        adFormphotoContainer.insertBefore(img, adFormphotoBlock);
      });

      reader.readAsDataURL(file);
    }
  });

  window.upload = {
    preview: preview,
    photoContainer: adFormphotoContainer
  };

})();
