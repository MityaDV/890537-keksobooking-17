'use strict';

(function () {

  var map = document.querySelector('.map'); // нахожу блок карты
  var mapFilterContainer = map.querySelector('.map__filters-container'); // блок с фильтрами на карте

  var similarCardTemplate = document.querySelector('#card') // нахожу шаблон карточки
    .content
    .querySelector('.map__card');

  window.card = {
    render: function (advertData) { // ф-я отрисовки карточки
      var mapCard = map.querySelector('.map__card');

      if (mapCard) {
        map.removeChild(mapCard);
      }
      map.insertBefore(createsCard(advertData), mapFilterContainer); // вставляем сформированный карточку в разметку
    }
  };

  var onButtonCloseClick = function () { // ф-я закрытия карточки
    var mapCard = map.querySelector('.map__card');
    map.removeChild(mapCard);
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardEscPress = function (evt) { // ф-я закрытия карточки по нажатию esc
    window.utils.isEscEvent(evt, onButtonCloseClick);
    document.removeEventListener('keydown', onCardEscPress);
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

    // создал словарь
    var featureToClassLi = window.utils.getArrsToObject(dataFeatures, popupFeatures);
    // очистил блок с преимуществами
    popupFeatureContainer.innerHTML = '';
    // перебираю и добавляю только имеющиеся преимущества
    dataFeatures.forEach(function (it) {
      popupFeatureContainer.appendChild(featureToClassLi[it]);
    });

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

    // фото в аватарку
    cardElement.querySelector('.popup__avatar').src = advertData.author.avatar;

    // логика закрытия карточки
    var buttonCardClose = cardElement.querySelector('.popup__close');

    buttonCardClose.addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onCardEscPress);

    return cardElement;
  };

})();
