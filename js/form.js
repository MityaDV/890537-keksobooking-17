'use strict';

(function () {
  var MIN_PRICE_HOUSING = [0, 1000, 5000, 10000];

  var mapFilter = document.querySelector('.map__filters'); // нахожу блок формы фильтров
  window.mapFilterSelect = mapFilter.querySelectorAll('.map__filter'); // нахожу select в форме фильтров
  window.mapFilterFieldsetElem = mapFilter.querySelector('.map__features'); // нахожу fieldset в форме фильтров
  var adForm = document.querySelector('.ad-form'); // нахожу блок формы объявления
  window.adFormFieldset = adForm.querySelectorAll('fieldset'); // нахожу fieldset в форме объявлений
  var priceInput = adForm.querySelector('#price'); // нахожу поле с ценой
  var adFormSelectType = adForm.querySelector('#type'); // нахожу select с типом жилья
  var adFormFieldsetTime = adForm.querySelector('.ad-form__element--time'); // нахожу fieldset time
  var adFormSelectTimeIn = adForm.querySelector('#timein'); // нахожу select timein
  var adFormSelectTimeOut = adForm.querySelector('#timeout'); // нахожу select timeout

  var addAttributs = function (array) { // функция добавления атрибутов в массиве
    for (var a = 0; a < array.length; a++) {
      array[a].setAttribute('disabled', '');
    }
  };

  window.mapFilterFieldsetElem.setAttribute('disabled', ''); // блокируем fieldset в форме фильтров
  addAttributs(window.mapFilterSelect); // блокирую select формы фильтров
  addAttributs(window.adFormFieldset); // блокирую fieldset формы объявлений

  window.removeAttibutsElem = function (array) { // функция удаления атрибутов
    for (var b = 0; b < array.length; b++) {
      array[b].removeAttribute('disabled');
    }
  };

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

})();
