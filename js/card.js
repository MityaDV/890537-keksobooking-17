'use strict';

(function () {
  // var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var similarMapPin = document.querySelector('.map__pins'); // находим блок с метками
  var map = document.querySelector('.map'); // нахожу блок карты
  var mapFilterContainer = map.querySelector('.map__filters-container');

  var similarCardTemplate = document.querySelector('#card') // нахожу шаблон карточки
    .content
    .querySelector('.map__card');

  window.card = {
    onSuccessLoad: function (advertData) { // ф-я обработки при успешной загрузки
      var fragment = document.createDocumentFragment(); // создаём елемент fragment

      advertData.forEach(function (it) {
        fragment.appendChild(renderCard(it));
      });

      map.insertBefore(fragment, mapFilterContainer); // вставляем сформированный фрагмент в разметку
    },

    onClickNewPin: function () {
      var mapPinButtons = Array.from(similarMapPin.querySelectorAll('.map__pin'));

      mapPinButtons.forEach(function (it, index) {
        if (index > 0) {
          it.addEventListener('click', function () {
            window.backend.load(window.card.onSuccessLoad);
          });
        }
      });
    }
  };

  var renderCard = function (advertData) { // ф-я описания новой карточки

    // копирую разметку шаблона карточки со всем содержимым
    var cardElement = similarCardTemplate.cloneNode(true);

    // записываем новые значения из приходящего массива
    cardElement.querySelector('.popup__title').textContent = advertData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advertData.offer.address + ', ' + advertData.location.x + ', ' + advertData.location.y;
    cardElement.querySelector('.popup__text--price').textContent = advertData.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = advertData.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advertData.offer.description;

    var photoContainer = cardElement.querySelector('.popup__photos');
    var photoPopup = photoContainer.querySelector('img');
    var newPhotoPopup = advertData.offer.photos.map(function (it) {
      photoContainer.appendChild(photoPopup.cloneNode()).src = it;
    });

    // var popupFeatures = Array.from(cardElement.querySelectorAll('.popup__feature'));

    // var arrToObject = function (keys, vals) {
    //   return keys.reduce(function (prev, val, i) {
    //     prev[val] = vals[i];
    //     return prev;
    //   }, {});
    // };

    // var featureValue = arrToObject(FEATURES, popupFeatures);

    // advertData.offer.features.forEach(function (it, index) {
    //   if (it === featureValue) {
    //     popupFeatures = featureValue;
    //   }
    // });

    return cardElement;
  };

})();
