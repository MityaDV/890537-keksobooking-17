'use strict';

(function () {

  var MIN_PRICE_HOUSING = [0, 1000, 5000, 10000];
  var MAX_ROOM = '100';
  var NOT_CAPACITY = '0';

  var mapFilter = document.querySelector('.map__filters'); // нахожу блок формы фильтров
  var adForm = document.querySelector('.ad-form'); // нахожу блок формы объявления
  var priceInput = adForm.querySelector('#price'); // нахожу поле с ценой
  var adFormSelectType = adForm.querySelector('#type'); // нахожу select с типом жилья
  var adFormOptionsType = Array.from(adFormSelectType.querySelectorAll('option')); // option с типом жилья
  var adFormFieldsetTime = adForm.querySelector('.ad-form__element--time'); // нахожу fieldset time
  var adFormSelectTimeIn = adFormFieldsetTime.querySelector('#timein'); // нахожу select timein
  var adFormSelectTimeOut = adFormFieldsetTime.querySelector('#timeout'); // нахожу select timeout
  var adFormSelectRoomNumber = adForm.querySelector('#room_number');
  var adFormSelectCapacity = adForm.querySelector('#capacity');

  var addAttributs = function (collection) { // функция пребразования HTML коллекции в массив и добавления атрибутов
    Array.from(collection).forEach(function (it) {
      it.setAttribute('disabled', '');
    });
  };

  window.form = {
    mapFiltersSelection: mapFilter.querySelectorAll('.map__filter'), // нахожу select в форме фильтров
    mapFilterFieldsetElem: mapFilter.querySelector('.map__features'), // нахожу fieldset в форме фильтров
    adFormFields: adForm.querySelectorAll('fieldset'), // нахожу fieldset в форме объявлений

    removeAttributsElem: function (collection) { // функция пребразования HTML коллекции в массив и удаления атрибутов
      Array.from(collection).forEach(function (it) {
        it.removeAttribute('disabled');
      });
    }
  };

  addAttributs(window.form.mapFiltersSelection); // блокирую select формы фильтров
  addAttributs(window.form.adFormFields); // блокирую fieldset формы объявлений
  window.form.mapFilterFieldsetElem.setAttribute('disabled', ''); // блокируем fieldset в форме фильтров

  // Код фильтрации в форме объявления
  // код для полей тип жилья и цена
  var adFormOptionsTypeValue = adFormOptionsType.map(function (it) { // получение value option с типом жилья
    return it.value;
  });

  // создал словарь тип жилья и цена
  var typeHousingToPrice = window.utils.getArrsToObject(adFormOptionsTypeValue, MIN_PRICE_HOUSING);

  // создаю ф-ю обработчика события для изменения типа и цены жилья
  var onTypeChange = function () {
    var value = adFormSelectType.value; // записал в пер-ю номер выбранного элемента option
    var newPrice = typeHousingToPrice[value];

    priceInput.placeholder = newPrice; // присваиваю значение placeholder
    priceInput.min = newPrice; // присваиваю значение min для поля с ценой
  };

  adFormSelectType.addEventListener('change', onTypeChange); // навешиваю обработчик с переданной ф-й на select с типом жилья

  // код для полей время заезда и выезда
  // создаю ф-ю обработчика события для изменения заезда и выезда
  var onTimeChange = function (evt) {
    adFormSelectTimeIn.value = evt.target.value;
    adFormSelectTimeOut.value = evt.target.value;
  };

  adFormFieldsetTime.addEventListener('change', onTimeChange); // навешиваю обработчик с переданной ф-й на fieldset c двумя select времени заезда и выезда

  // код для полей кол-во комнат и кол-во мест

  var onRoomChange = function () {
    var valueRoom = adFormSelectRoomNumber.value;
    var valueCapacity = adFormSelectCapacity.value;

    if (valueRoom < valueCapacity) {
      adFormSelectCapacity.setCustomValidity('Значение должно быть, меньше или равно количеству комнат');
    } else if (valueRoom === MAX_ROOM && !(valueCapacity === NOT_CAPACITY)) {
      adFormSelectCapacity.setCustomValidity('Значение должно быть равно, "не для гостей"');
    } else {
      adFormSelectCapacity.setCustomValidity('');
    }
  };

  adFormSelectRoomNumber.addEventListener('change', onRoomChange);
  adFormSelectCapacity.addEventListener('change', onRoomChange);

})();

// [{
//   fieldName: 'address',
//   fieldValue: '',
//   errorMessage: 'is required'
// }]
