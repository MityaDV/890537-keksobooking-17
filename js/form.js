'use strict';

(function () {

  var MIN_PRICE_HOUSING = [0, 1000, 5000, 10000];
  var PIN_MAIN_LEFT = 570;
  var PIN_MAIN_TOP = 375;

  var mapFilter = document.querySelector('.map__filters'); // нахожу блок формы фильтров
  var adForm = document.querySelector('.ad-form'); // нахожу блок формы объявления
  var priceInput = adForm.querySelector('#price'); // нахожу поле с ценой
  var adFormSelectType = adForm.querySelector('#type'); // нахожу select с типом жилья
  var adFormOptionsType = Array.from(adFormSelectType.querySelectorAll('option')); // option с типом жилья
  var adFormFieldsetTime = adForm.querySelector('.ad-form__element--time'); // нахожу fieldset time
  var adFormSelectTimeIn = adFormFieldsetTime.querySelector('#timein'); // нахожу select timein
  var adFormSelectTimeOut = adFormFieldsetTime.querySelector('#timeout'); // нахожу select timeout
  var adFormSelectRoomNumber = adForm.querySelector('#room_number'); // нахожу select выбора кол-ва комнат
  var adFormSelectCapacity = adForm.querySelector('#capacity'); // нахожу select выбора количества мест
  var mapActive = document.querySelector('.map'); // находим блок карты
  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var addressInput = adForm.querySelector('[name="address"]');
  var adFormInputs = adForm.querySelectorAll('input'); // нахожу все input

  var addAttributes = function (collection) { // функция пребразования HTML коллекции в массив и добавления атрибутов
    Array.from(collection).forEach(function (it) {
      it.setAttribute('disabled', '');
    });
  };

  window.form = {
    mapFiltersSelection: mapFilter.querySelectorAll('.map__filter'), // нахожу select в форме фильтров
    mapFilterFieldsetElem: mapFilter.querySelector('.map__features'), // нахожу fieldset в форме фильтров
    adFormFields: adForm.querySelectorAll('fieldset'), // нахожу fieldset в форме объявлений

    removeAttributesElem: function (collection) { // функция пребразования HTML коллекции в массив и удаления атрибутов
      Array.from(collection).forEach(function (it) {
        it.removeAttribute('disabled');
      });
    }
  };

  addAttributes(window.form.mapFiltersSelection); // блокирую select формы фильтров
  addAttributes(window.form.adFormFields); // блокирую fieldset формы объявлений
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
  var RoomToCapacity = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var removeAtributOption = function (element) {
    element.removeAttribute('disabled');
  };

  var addClassOption = function (element) {
    element.classList.add('hidden');
  };

  var onRoomChange = function () {
    var guests = RoomToCapacity[adFormSelectRoomNumber.value];
    [].forEach.call(adFormSelectCapacity.options, function (element) {
      if (guests.includes(element.value)) {
        removeAtributOption(element);
      } else {
        addClassOption(element);
      }
    });
    adFormSelectCapacity.value = guests[0];
  };

  adFormSelectRoomNumber.addEventListener('change', onRoomChange);


  // код задания по отправке формы
  var successMessage = document.querySelector('#success') // находим шаблон успешного создания объявления
    .content
    .querySelector('.success');

  var clearValue = function (collection) { // ф-я очистки значения заполненных полей
    Array.from(collection).forEach(function (it) {
      it.value = '';
    });
  };

  var onClickButtonReset = function () { // ф-я reset формы
    var clearPins = Array.from(similarMapPin.querySelectorAll('.map__pin')); // находим метки отрисованные

    clearPins.forEach(function (elem, index) { // удаляю отрисованные метки
      if (index === 0) {
        elem.style.left = PIN_MAIN_LEFT + 'px';
        elem.style.top = PIN_MAIN_TOP + 'px';

        var posPin = window.utils.getPositionOffSetElem(elem); // получаю координаты метки
        addressInput.placeholder = '';
        addressInput.placeholder = posPin.x + ',' + posPin.y; //  записываю эти координаты в placeholder

      } else if (index > 0) {
        similarMapPin.removeChild(elem);
      }
    });

    var mapCard = mapActive.querySelector('.map__card'); // нахожу карточку если она есть

    if (mapCard) {
      mapActive.removeChild(mapCard); // если карточка есть удаляю её
    }

    window.form.mapFiltersSelection.forEach(function (option) { // сброс значений полей фильтров на карте
      if (option.value !== 'any') {
        option.value = 'any';
      }
    });

    var featuresInputs = window.form.mapFilterFieldsetElem.querySelectorAll('input'); // сброс выбранных чекбоксов
    featuresInputs.forEach(function (input) {
      if (input.checked === true) {
        input.checked = false;
      }
    });

    window.upload.preview.src = 'img/muffin-grey.svg'; // сброс аватарки пользователя

    // сброс загруженных изображений
    var uploadPhoto = adForm.querySelectorAll('img.ad-form__photo');
    Array.from(uploadPhoto).forEach(function (photo) {
      window.upload.photoContainer.removeChild(photo);
    });

    mapActive.classList.add('map--faded'); // блокирую блок карты
    adForm.classList.add('ad-form--disabled'); // блокирую поля формы объявлений
    addAttributes(window.form.mapFiltersSelection); // блокирую select формы фильтров
    addAttributes(window.form.adFormFields); // блокирую fieldset формы объявлений
    window.form.mapFilterFieldsetElem.setAttribute('disabled', ''); // блокирую fieldset в форме фильтров
  };

  var onMessageClick = function () { // ф-я при клике по пустой области
    successMessage.setAttribute('hidden', '');
  };

  var onMessageEscPress = function (_evt) { // ф-я закрытия сообщения об отправке по нажатию esc
    window.utils.isEscEvent(_evt, onMessageClick);
  };

  var onSuccessUpload = function () {

    onClickButtonReset();

    clearValue(adFormInputs); // очищаю заполненные input при удачной отправке
    adForm.querySelector('#description').value = ''; // очищаю поле описания при удачной отправке

    document.body.querySelector('main').appendChild(successMessage); // показываю объявление

    successMessage.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
  };

  adForm.addEventListener('submit', function (evt) { // навешиваю обработчик при отправке формы
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessUpload, window.pin.onErrorLoad);
  });

  adForm.addEventListener('reset', onClickButtonReset); // обработчик reset формы

})();
