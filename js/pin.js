'use strict';

(function () {

  var similarPinTemplate = document.querySelector('#pin') // находим шаблон меток
    .content
    .querySelector('.map__pin');

  var similarErrorTemplate = document.querySelector('#error') // находим шаблон ошибки
    .content
    .querySelector('.error');

  window.pin = {
    onSuccessLoad: function (advertsData) { // ф-я обработки при успешной загрузки
      window.filter.getRenderPin(advertsData);
      window.filter.getChangeHousingType(advertsData);
    },

    onErrorLoad: function (errorMessage) { // ф-я обработки ошибок при загрузке
      var fragment = document.createDocumentFragment();

      similarErrorTemplate.querySelector('.error__message').textContent = errorMessage;

      fragment.appendChild(similarErrorTemplate);
      document.querySelector('main').appendChild(fragment);
    },

    renderPin: function (advertsData) { // ф-я создания меток
      var pinElement = similarPinTemplate.cloneNode(true); // клонируем метки c шаблона

      // записываем новые значения из массива
      pinElement.style = 'left: ' + advertsData.location.x + 'px;' + ' ' + 'top: ' + advertsData.location.y + 'px;';
      pinElement.querySelector('img').src = advertsData.author.avatar;
      pinElement.querySelector('img').alt = advertsData.offer.type;

      return pinElement;
    }
  };

})();
