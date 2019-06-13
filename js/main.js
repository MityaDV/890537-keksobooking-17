'use strict';

var ADVERTS_COUNT = 8;
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var COORDINATE_MIN_X = 60;
var COORDINATE_MAX_X = 1140;
var COORDINATE_MIN_Y = 130;
var COORDINATE_MAX_Y = 630;

var randomValueFromArray = function (array) { // Функция генерации случайного значения из переданного массива
  return array[Math.floor(Math.random() * array.length)];
};

var calculatesСoordinateY = function (min, max) { // функция генерации случайного числа в интервале
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var mapActive = document.querySelector('.map'); // находим блок карты
mapActive.classList.remove('map--faded'); // показываем блок карты

var similarMapPins = document.querySelector('.map__pins'); // находим блок для вставки меток

var similarAdverts = []; // массив похожих объявлений

var generateAdvertObject = function () { // функция генерации объектов
  return {
    'author': {
      'avatar': 'img/avatars/user' + numbersImgAvatar + '.png'
    },
    'offer': {
      'type': randomValueFromArray(HOUSING_TYPES)
    },
    'location': {
      'x': calculatesСoordinateY(COORDINATE_MIN_X, COORDINATE_MAX_X),
      'y': calculatesСoordinateY(COORDINATE_MIN_Y, COORDINATE_MAX_Y)
    }
  };
};

for (var i = 0; i < ADVERTS_COUNT; i++) { // Добавляем объекты
  var numbersImgAvatar = 0 + [i + 1]; // добавляет номер картинки аватарки
  similarAdverts[i] = generateAdvertObject();
}

var similarPinTemplate = document.querySelector('#pin') // находим шаблон меток
.content
.querySelector('.map__pin');

var renderPin = function (advert) { // ф-я создания меток
  var pinElement = similarPinTemplate.cloneNode(true); // клонируем метки
  // записываем новые значения из массива
  pinElement.querySelector('img').src = advert.author.avatar;
  pinElement.querySelector('img').alt = advert.offer.type;
  pinElement.style = 'left: ' + advert.location.x + 'px;' + ' ' + 'top: ' + advert.location.y + 'px;';

  return pinElement;
};

var fragment = document.createDocumentFragment(); // создаём елемент fragment

for (var j = 0; j < similarAdverts.length; j++) { // на каждой иттерации создаём новую метку и записываем новые данные из массива
  fragment.appendChild(renderPin(similarAdverts[j]));
}

similarMapPins.appendChild(fragment);
