'use strict';

(function () {

  var similarPinTemplate = document.querySelector('#pin') // находим шаблон меток
    .content
    .querySelector('.map__pin');

  var similarErrorTemplate = document.querySelector('#error') // находим шаблон ошибки
    .content
    .querySelector('.error');

  var onPinClick = function (data) { // ф-я срабатывает при клике по метке
    window.card.render(data); // вызов ф-и отрисовки карточки при клике по метке
  };

  window.pin = {
    onSuccessLoad: function (advertData) { // ф-я обработки при успешной загрузки
      window.pin.data = advertData; // сохранил полученные данные с сервера

      window.filter.getRenderPin(advertData);
      window.filter.getChangeHousingType(advertData);
    },

    onErrorLoad: function (errorMessage) { // ф-я обработки ошибок при загрузке
      var fragment = document.createDocumentFragment();

      similarErrorTemplate.querySelector('.error__message').textContent = errorMessage;

      fragment.appendChild(similarErrorTemplate);
      document.body.querySelector('main').appendChild(fragment);
    },

    render: function (advertData) { // ф-я создания меток
      // копирую разметку шаблона метки со всем содержимым
      var pinElement = similarPinTemplate.cloneNode(true);

      // записываем новые значения из массива
      pinElement.style = 'left: ' + advertData.location.x + 'px;' + ' ' + 'top: ' + advertData.location.y + 'px;';
      pinElement.querySelector('img').src = advertData.author.avatar;
      pinElement.querySelector('img').alt = advertData.offer.type;
      pinElement.addEventListener('click', function () {
        onPinClick(advertData);
      });
      return pinElement;
    },

    data: [] // массив с объектами с пришедших данных
  };

})();
