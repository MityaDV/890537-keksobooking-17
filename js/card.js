'use strict';

(function () {

  var map = document.querySelector('.map'); // нахожу блок карты
  var mapFilterContainer = map.querySelector('.map__filters-container'); // блок с фильтрами на карте

  var similarCardTemplate = document.querySelector('#card') // нахожу шаблон карточки
    .content
    .querySelector('.map__card');

  window.card = {
    render: function (advertData) { // ф-я отрисовки карточки

      map.insertBefore(createsCard(advertData), mapFilterContainer); // вставляем сформированный карточку в разметку
    }
  };

  var createsCard = function (advertData) { // ф-я добавления данных в новую карточку

    // копирую разметку шаблона карточки со всем содержимым
    var cardElement = similarCardTemplate.cloneNode(true);

    // записываем новые значения из приходящего массива
    cardElement.querySelector('.popup__title').textContent = advertData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advertData.offer.address + ', ' + advertData.location.x + ', ' + advertData.location.y;
    cardElement.querySelector('.popup__text--price').textContent = advertData.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = advertData.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;

    // код отрисовки удобств
    var popupFeatureContainer = cardElement.querySelector('.popup__features');
    var popupFeatures = popupFeatureContainer.querySelectorAll('.popup__feature');
    var dataFeatures = advertData.offer.features;

    // ф-я создания объекта из двух массивов
    var arrsToObject = function (keys, vals) {
      return keys.reduce(function (prev, val, i) {
        prev[val] = vals[i];
        return prev;
      }, {});
    };

    // создал словарь
    var getFeatureLi = arrsToObject(dataFeatures, popupFeatures);
    // очистил блок с преимуществами
    popupFeatureContainer.innerHTML = '';
    // перебираю и добавляю только имеющиеся преимущества
    dataFeatures.forEach(function (it) {
      popupFeatureContainer.appendChild(getFeatureLi[it]);
    });
    // end удобств
    // описание объявления
    cardElement.querySelector('.popup__description').textContent = advertData.offer.description;

    // код отрисовки фото
    var photoContainer = cardElement.querySelector('.popup__photos');
    var photoPopup = photoContainer.querySelector('.popup__photo');

    advertData.offer.photos.forEach(function (it) {
      var newPhoto = photoPopup.cloneNode();
      newPhoto.src = it;
      photoContainer.appendChild(newPhoto);
    });
    photoContainer.removeChild(photoPopup);
    // end фото
    // фото в аватарку
    cardElement.querySelector('.popup__avatar').src = advertData.author.avatar;

    return cardElement;
  };

})();
