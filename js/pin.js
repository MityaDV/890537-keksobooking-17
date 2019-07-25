'use strict';

(function () {

  var similarPinTemplate = document.querySelector('#pin') // находим шаблон меток
    .content
    .querySelector('.map__pin');

  var similarErrorTemplate = document.querySelector('#error') // находим шаблон ошибки
    .content
    .querySelector('.error');

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
      pinElement.addEventListener('click', window.pin.onPinClick);
      return pinElement;
    },

    onPinClick: function (evt) {
      debugger;
      var pressPinEvent = evt.currentTarget;
      var userSrcValue = pressPinEvent.querySelector('img').attributes.src.value;
      window.pin.data.filter(function (it) {
        if (it.author.avatar === userSrcValue) {
          window.card.render(it); // отрисовываю первую карточку
        }
      });
    },

    data: [] // массив с объектами с пришедших данных
  };

})();
