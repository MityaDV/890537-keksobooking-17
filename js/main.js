'use strict';

var ADVERTS_COUNT = 8;
var HOUSING_TYPES = ['bungalo', 'flat', 'house', 'palace'];
var MIN_PRICE_HOUSING = [0, 1000, 5000, 10000];
var COORDINATE_MIN_X = 60;
var COORDINATE_MAX_X = 1140;
var COORDINATE_MIN_Y = 130;
var COORDINATE_MAX_Y = 630;

// module3-task1

var randomValueFromArray = function (array) { // Функция генерации случайного значения из переданного массива
  return array[Math.floor(Math.random() * array.length)];
};

var calculatesСoordinateY = function (min, max) { // функция генерации случайного числа в интервале
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var mapActive = document.querySelector('.map'); // находим блок карты
var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток

var generateAdvertObject = function (index) { // функция генерации объектов
  return {
    'author': {
      'avatar': 'img/avatars/user0' + index + '.png'
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

var similarAdverts = []; // массив похожих объявлений

for (var i = 0; i < ADVERTS_COUNT; i++) { // Добавляем объекты
  similarAdverts[i] = generateAdvertObject(i + 1);
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

// module4-task1

var mapFilter = document.querySelector('.map__filters'); // нахожу блок формы фильтров
var mapFilterSelect = mapFilter.querySelectorAll('.map__filter'); // нахожу select в форме фильтров
var mapFilterFieldsetElem = mapFilter.querySelector('.map__features'); // нахожу fieldset в форме фильтров
mapFilterFieldsetElem.setAttribute('disabled', ''); // блокируем fieldset в форме фильтров
var adForm = document.querySelector('.ad-form'); // нахожу блок формы объявления
var adFormFieldset = adForm.querySelectorAll('fieldset'); // нахожу fieldset в форме объявлений
var mapPinButton = similarMapPin.querySelector('.map__pin--main'); // нахожу метку кнопку
var addressInput = adForm.querySelector('[name="address"]');

var addAttributs = function (array) { // функция добавления элементам атрибутов
  for (var a = 0; a < array.length; a++) {
    array[a].setAttribute('disabled', '');
  }
};

addAttributs(mapFilterSelect); // блокирую select формы фильтров
addAttributs(adFormFieldset); // блокирую fieldset формы объявлений

var removeAttibuts = function (array) { // функция удаления элементам атрибутов
  for (var b = 0; b < array.length; b++) {
    array[b].removeAttribute('disabled');
  }
};

mapPinButton.addEventListener('click', function () { // обработчик на кнопку
  removeAttibuts(mapFilterSelect); // разблокировали поля
  removeAttibuts(adFormFieldset); //  разблокировали поля
  mapFilterFieldsetElem.removeAttribute('disabled'); //  разблокировали поля
  mapActive.classList.remove('map--faded'); // показываем блок карты
  adForm.classList.remove('ad-form--disabled'); // показываем поля формы объявлений
  similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
});

var positionPin = function (elem) { // функция получения координат
  var posX = elem.offsetLeft; // верхний отступ эл-та от родителя
  var posY = elem.offsetTop; // левый отступ эл-та от родителя
  return (posX + ',' + posY); // печатаем координаты
};

addressInput.setAttribute('placeholder', positionPin(mapPinButton));

mapPinButton.addEventListener('mouseup', function () { // обработчик для определения и записи координат при перемещении метки
  addressInput.placeholder = positionPin(mapPinButton);
});

// module4-task2

var priceInput = adForm.querySelector('#price'); // нахожу поле с ценой
var adFormSelectType = adForm.querySelector('#type'); // нахожу select с типом жилья
var adFormFieldsetTime = adForm.querySelector('.ad-form__element--time'); // нахожу fieldset time
var adFormSelectTimeIn = adForm.querySelector('#timein'); // нахожу select timein
var adFormSelectTimeOut = adForm.querySelector('#timeout'); // нахожу select timeout

var onTypeChange = function () { // создаю ф-ю обработчика события для изменения типа и цены жилья
  var index = adFormSelectType.selectedIndex; // записал в пер-ю номер выбранного элемента option
  priceInput.placeholder = MIN_PRICE_HOUSING[index]; // присваиваю значение placeholder
  priceInput.min = MIN_PRICE_HOUSING[index]; // присваиваю значение min для поля с ценой
};

adFormSelectType.addEventListener('change', onTypeChange); // навешиваю обработчик с переданной ф-й на select с типом жилья

var onTimeChange = function (evt) { // создаю ф-ю обработчика события для изменения заезда и выезда
  adFormSelectTimeIn.value = evt.target.value;
  adFormSelectTimeOut.value = evt.target.value;
};

adFormFieldsetTime.addEventListener('change', onTimeChange); // навешиваю обработчик с переданной ф-й на fieldset c двумя select времени заезда и выезда
