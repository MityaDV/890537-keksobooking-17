'use strict';

(function () {

  var MARK_POINTER_HEIGHT = 18;

  var mapActive = document.querySelector('.map'); // находим блок карты
  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var mapPinButton = similarMapPin.querySelector('.map__pin--main'); // нахожу метку кнопку
  var adForm = document.querySelector('.ad-form'); // нахожу блок формы объявления
  var addressInput = adForm.querySelector('[name="address"]');

  var posPin = window.data.getPosition(mapPinButton); // получаю координаты метки
  addressInput.placeholder = posPin.x + ',' + posPin.y; //  записываю эти координаты в placeholder

  var limitsCoord = { // получаю координаты ограничения блока с картой
    top: similarMapPin.offsetTop,
    right: (similarMapPin.offsetLeft + similarMapPin.offsetWidth) - mapPinButton.offsetWidth,
    bottom: (similarMapPin.offsetTop + similarMapPin.offsetHeight) - mapPinButton.offsetHeight,
    left: similarMapPin.offsetLeft
  };

  // код перемещения метки по карте
  mapPinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = { // записал в объект начальные координаты относительно окна браузера
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = { // записал в объект вычисление значения смещения (на сколько был сдвиг)
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = { // записал новые текущие координаты курсора
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      posPin = window.data.getPosition(mapPinButton); // отступы элемента offsetTop и Left

      if (posPin.x <= limitsCoord.left) { // проверяю находится ли метка в границах родительского блока по x
        posPin.x = limitsCoord.left;
      } else if (posPin.x >= limitsCoord.right) {
        posPin.x = limitsCoord.right;
      }

      if (posPin.y <= limitsCoord.top) { // проверяю находится ли метка в границах родительского блока по y
        posPin.y = limitsCoord.top;
      } else if (posPin.y >= limitsCoord.bottom) {
        posPin.y = limitsCoord.bottom;
      }

      mapPinButton.style.left = (posPin.x - shift.x) + 'px'; // записываю новые координаты метки
      mapPinButton.style.top = (posPin.y - shift.y) + 'px';

      var coordPinX = (posPin.x + (mapPinButton.offsetWidth / 2)); // координата острого конца указателя по x
      var coordPinY = (posPin.y + mapPinButton.offsetHeight + MARK_POINTER_HEIGHT); // координата острого конца указателя по y

      addressInput.setAttribute('placeholder', coordPinX + ',' + coordPinY); // записал координаты с поправкой на указатель в поле

      window.removeAttibutsElem(window.mapFilterSelect); // разблокировали поля
      window.removeAttibutsElem(window.adFormFieldset); //  разблокировали поля
      window.mapFilterFieldsetElem.removeAttribute('disabled'); //  разблокировали поля
      mapActive.classList.remove('map--faded'); // показываем блок карты
      adForm.classList.remove('ad-form--disabled'); // показываем поля формы объявлений
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      similarMapPin.appendChild(window.fragment); // вставляем сформированный фрагмент в разметку
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove); // добавил обработчик перемещению окна
    document.addEventListener('mouseup', onMouseUp); // добавил обработчик отпускания кнопки после перемещения
  });

})();
