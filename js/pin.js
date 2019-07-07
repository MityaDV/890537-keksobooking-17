'use strict';

(function () {
  var ADVERTS_COUNT = 8;
  var HOUSING_TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var COORDINATE_MIN_X = 60;
  var COORDINATE_MAX_X = 1140;
  var COORDINATE_MIN_Y = 130;
  var COORDINATE_MAX_Y = 630;

  var similarPinTemplate = document.querySelector('#pin') // находим шаблон меток
    .content
    .querySelector('.map__pin');

  var similarAdverts = []; // массив похожих объявлений

  var generateAdvertObject = function (index) { // функция генерации объектов
    return {
      'author': {
        'avatar': 'img/avatars/user0' + index + '.png'
      },
      'offer': {
        'type': window.util.getRandomValueFromArray(HOUSING_TYPES)
      },
      'location': {
        'x': window.util.getRandomNumber(COORDINATE_MIN_X, COORDINATE_MAX_X),
        'y': window.util.getRandomNumber(COORDINATE_MIN_Y, COORDINATE_MAX_Y)
      }
    };
  };

  for (var i = 0; i < ADVERTS_COUNT; i++) { // Добавляем объекты
    similarAdverts[i] = generateAdvertObject(i + 1);
  }

  var renderPin = function (advert) { // ф-я создания меток
    var pinElement = similarPinTemplate.cloneNode(true); // клонируем метки
    // записываем новые значения из массива
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.type;
    pinElement.style = 'left: ' + advert.location.x + 'px;' + ' ' + 'top: ' + advert.location.y + 'px;';

    return pinElement;
  };

  window.fragment = document.createDocumentFragment(); // создаём елемент fragment

  for (var j = 0; j < similarAdverts.length; j++) { // на каждой иттерации создаём новую метку и записываем новые данные из массива
    window.fragment.appendChild(renderPin(similarAdverts[j]));
  }

})();
