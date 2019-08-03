'use strict';

(function () {
  var MAX_NUMBER_PIN = 5;

  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var mapFilter = document.querySelector('.map__filters-container'); // блок фильтрации на карте
  var formFilter = mapFilter.querySelector('.map__filters'); // блок формы фильтрации
  var selectHousingType = formFilter.querySelector('#housing-type'); // селект с типами жилья
  var selectHousingPrice = formFilter.querySelector('#housing-price'); // селект с ценой жилья
  var optionsHousingPrice = Array.from(selectHousingPrice.querySelectorAll('option'));
  // var selectHousingRoom = formFilter.querySelector('#housing-rooms'); // селект с числом комнат
  // var selectHousingGuest = formFilter.querySelector('#housing-guests'); // селект с числом гостей
  // var selectHousingFeature = formFilter.querySelector('#housing-features'); // фиелдсет с удоюствами
  // var inputMapFeatures = selectHousingFeature.querySelectorAll('.map__feature'); // фиелдсет с удоюствами

  var map = document.querySelector('.map'); // нахожу блок карты

  // удаляю метки и открытые карточки
  var getClearMap = function () {
    var clearPins = Array.from(similarMapPin.querySelectorAll('.map__pin'));
    clearPins.forEach(function (elem, index) {
      if (index > 0) {
        similarMapPin.removeChild(elem);
      }
    });

    var clearCard = map.querySelector('.map__card');
    if (clearCard) {
      map.removeChild(clearCard);
    }
  };

  // создаю словарь цен
  var getPriceHousing = function () {
    var valuePrice = optionsHousingPrice.map(function (it) {
      return it.value;
    });

    var valueText = optionsHousingPrice.map(function (it) {
      return it.textContent;
    });

    var valuePriceToNumberPrice = window.utils.getArrsToObject(valuePrice, valueText);
    return valuePriceToNumberPrice;
  };

  window.filter = {

    getRenderPin: function (data) { // ф-я создания пяти меток
      var fragment = document.createDocumentFragment(); // создаём елемент fragment

      data.slice(0, MAX_NUMBER_PIN).forEach(function (elem) { // обрезаю массив и отрисовываю каждый элемент

        fragment.appendChild(window.pin.render(elem));
      });

      similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
    },

    getChangeHousingFilter: function (data) { // ф-я фильтра типа жилья

      var onHousingChangeType = function (evt) { // выбраное значение типа жилья
        getClearMap();

        var newValue = evt.target.value;

        var newPinType = data.filter(function (elem) { // фильтрую массив по типу жилья
          return elem.offer.type === newValue;
        });

        var fragment = document.createDocumentFragment(); // создаём елемент fragment

        newPinType.slice(0, MAX_NUMBER_PIN).forEach(function (elem) { // перебираю отфильтрованный массив
          fragment.appendChild(window.pin.render(elem));
        });

        similarMapPin.appendChild(fragment);
      };

      var onHousingChangePrice = function (evt) {
        getClearMap();

        var newValue = evt.target.value;

        var price = getPriceHousing();
        var regex = /[\d|,|.|e|E|\+]+/g;
        var priceItem = price[newValue].match(regex);

        var newPinPrice = data.filter(function (elem) { // фильтрую массив по цене жилья
          return elem.offer.price < priceItem || elem.offer.price > priceItem;
        });
        // return newPinPrice;
        var fragment = document.createDocumentFragment(); // создаём елемент fragment

        newPinPrice.slice(0, MAX_NUMBER_PIN).forEach(function (elem) { // перебираю отфильтрованный массив
          fragment.appendChild(window.pin.render(elem));
        });

        similarMapPin.appendChild(fragment);
      };

      selectHousingType.addEventListener('change', onHousingChangeType); // обработчик смены типа жилья
      selectHousingPrice.addEventListener('change', onHousingChangePrice); // обработчик смены цены жилья
      // selectHousingRoom.addEventListener('change', onHousingChangeFilter); // обработчик смены кол-ва комнат
      // selectHousingGuest.addEventListener('change', onHousingChangeFilter); // обработчик смены кол-ва жильцов
    }
  };

})();
