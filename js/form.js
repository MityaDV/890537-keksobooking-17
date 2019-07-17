'use strict';

(function () {

  var mapFilter = document.querySelector('.map__filters'); // нахожу блок формы фильтров
  var adForm = document.querySelector('.ad-form'); // нахожу блок формы объявления
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

  window.form = {
    mapFiltersSelection: mapFilter.querySelectorAll('.map__filter'), // нахожу select в форме фильтров
    mapFilterFieldsetElem: mapFilter.querySelector('.map__features'), // нахожу fieldset в форме фильтров
    adFormFields: adForm.querySelectorAll('fieldset'), // нахожу fieldset в форме объявлений

    removeAttributsElem: function (array) { // функция удаления атрибутов
      for (var b = 0; b < array.length; b++) {
        array[b].removeAttribute('disabled');
      }
    }
  };

  addAttributs(window.form.mapFiltersSelection); // блокирую select формы фильтров
  addAttributs(window.form.adFormFields); // блокирую fieldset формы объявлений
  window.form.mapFilterFieldsetElem.setAttribute('disabled', ''); // блокируем fieldset в форме фильтров

  var minPriceHousing = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var onTypeChange = function () { // создаю ф-ю обработчика события для изменения типа и цены жилья
    var value = adFormSelectType.value; // записал в пер-ю номер выбранного элемента option
    var newPrice = minPriceHousing[value];

    priceInput.placeholder = newPrice; // присваиваю значение placeholder
    priceInput.min = newPrice; // присваиваю значение min для поля с ценой
  };

  adFormSelectType.addEventListener('change', onTypeChange); // навешиваю обработчик с переданной ф-й на select с типом жилья

  var onTimeChange = function (evt) { // создаю ф-ю обработчика события для изменения заезда и выезда
    adFormSelectTimeIn.value = evt.target.value;
    adFormSelectTimeOut.value = evt.target.value;
  };

  adFormFieldsetTime.addEventListener('change', onTimeChange); // навешиваю обработчик с переданной ф-й на fieldset c двумя select времени заезда и выезда

})();
