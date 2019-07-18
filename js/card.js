'use strict';

(function () {

  var MIN_NUMBER_PIN = 1;
  // debugger;
  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var mapPinButtons = Array.from(similarMapPin.querySelectorAll('.map__pin'));

  var similarCardTemplate = document.querySelector('#card') // нахожу шаблон карточки
    .content
    .querySelector('.map__card');

  window.card = {
    onSuccessLoad: function (advertData) { // ф-я обработки при успешной загрузки
      var fragment = document.createDocumentFragment(); // создаём елемент fragment

      advertData.slice(MIN_NUMBER_PIN).forEach(function (it) {
        fragment.appendChild(renderCard(it));
      });

      similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
    }
  };

  var renderCard = function (advertData) { // ф-я описания новой карточки

    // копирую разметку шаблона карточки со всем содержимым
    var cardElement = similarCardTemplate.cloneNode(true);

    // записываем новые значения из приходящего массива
    cardElement.querySelector('.popup__title').textContent = advertData.offer.title;

    return cardElement;
  };
  //  debugger;
  mapPinButtons.forEach(function (it, index) {
    if (index > 0) {
      it.addEventListener('click', function () {
        window.backend.load(window.card.onSuccessLoad);
      });
    }
  });

})();
