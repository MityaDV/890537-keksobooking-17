'use strict';

(function () {

  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var similarPinTemplate = document.querySelector('#pin') // находим шаблон меток
    .content
    .querySelector('.map__pin');

  var similarErrorTemplate = document.querySelector('#error') // находим шаблон ошибки
    .content
    .querySelector('.error');

  var renderPin = function (advert) { // ф-я создания меток
    var pinElement = similarPinTemplate.cloneNode(true); // клонируем метки

    // записываем новые значения из массива
    pinElement.style = 'left: ' + advert.location.x + 'px;' + ' ' + 'top: ' + advert.location.y + 'px;';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.type;

    return pinElement;
  };

  window.onSuccessLoad = function (advertsData) { // ф-я обработки при успешной загрузки
    var fragment = document.createDocumentFragment(); // создаём елемент fragment

    for (var i = 0; i < advertsData.length; i++) { // на каждой иттерации создаём новую метку и записываем новые данные из массива
      fragment.appendChild(renderPin(advertsData[i]));
    }

    similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
  };

  window.onErrorLoad = function (errorMessage) { // ф-я обработки ошибок при загрузке
    var fragment = document.createDocumentFragment();

    similarErrorTemplate.querySelector('.error__message').textContent = errorMessage;

    fragment.appendChild(similarErrorTemplate);
    document.querySelector('main').appendChild(fragment);
  };

})();
