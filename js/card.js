'use strict';

(function () {
  // debugger;
  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var mapPinButton = similarMapPin.querySelector('.map__pin');


  var similarCardTemplate = document.querySelector('#card') // нахожу шаблон карточки
    .content
    .querySelector('.map__card');

  window.card = {

    onSuccessLoad: function (advertData) { // ф-я обработки при успешной загрузки
      var fragment = document.createDocumentFragment(); // создаём елемент fragment

      fragment.appendChild(renderCard(advertData[1]));

      similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
    }
  };

  var renderCard = function (advertData) {
    // копирую разметку шаблона карточки со всем содержимым
    var cardElement = similarCardTemplate.cloneNode(true);

    // записываем новые значения из приходящего массива
    cardElement.querySelector('.popup__title').textContent = advertData.offer.title;

    return cardElement;
  };


  mapPinButton.addEventListener('click', function () {
    window.backend.load(window.card.onSuccessLoad);
  });

})();
