'use strict';

(function () {

  var similarErrorTemplate = document.querySelector('#error') // находим шаблон ошибки
    .content
    .querySelector('.error');

  window.pin = {
    onSuccessLoad: function (advertsData) { // ф-я обработки при успешной загрузки
      window.render.getRenderPin(advertsData);
      window.render.getChangeHousingType(advertsData);
    },

    onErrorLoad: function (errorMessage) { // ф-я обработки ошибок при загрузке
      var fragment = document.createDocumentFragment();

      similarErrorTemplate.querySelector('.error__message').textContent = errorMessage;

      fragment.appendChild(similarErrorTemplate);
      document.querySelector('main').appendChild(fragment);
    }
  };

})();
