'use strict';

(function () {
  var MAX_NUMBER_PIN = 5;

  var map = document.querySelector('.map'); // нахожу блок карты
  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var mapFilter = document.querySelector('.map__filters-container'); // блок фильтрации на карте
  var formFilter = mapFilter.querySelector('.map__filters'); // блок формы фильтрации
  var selectHousingPrice = formFilter.querySelector('#housing-price'); // селект с ценой жилья
  var optionsHousingPrice = Array.from(selectHousingPrice.querySelectorAll('option'));

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

  var filterState = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var priceState = getPriceHousing(); // получил словарь с значениями цен
  var HIGH_PRICE = parseInt(priceState.middle.split('-')[1], 10); // max цена
  var LOW_PRICE = parseInt(priceState.middle.split('-')[0], 10); // min цена

  var onFilterChange = function (evt) {
    var checked = evt.target.checked;

    if (evt.target.tagName === 'SELECT') {
      filterState[evt.target.id.split('-')[1]] = evt.target.value;
    } if (checked) {
      filterState.features.push(evt.target.defaultValue);
    } else if (!checked) {
      filterState.features.pop(evt.target.defaultValue);
    }

    // console.log(filterState);

    var filteredPins = window.pin.data.filter(function (pin) { // фильтрую метки
      if (filterState.type !== 'any') {
        if (pin.offer.type !== filterState.type) {
          return false;
        }
      }

      if (filterState.price !== 'any') {
        if (filterState.price === 'middle') {
          return pin.offer.price > LOW_PRICE && pin.offer.price < HIGH_PRICE;
        } else if (filterState.price === 'low') {
          return pin.offer.price < LOW_PRICE;
        } else if (filterState.price === 'high') {
          return pin.offer.price > HIGH_PRICE;
        }
        return false;
      }

      if (filterState.rooms !== 'any') {
        if (pin.offer.rooms !== +filterState.rooms) {
          return false;
        }
      }

      if (filterState.guests !== 'any') {
        if (pin.offer.guests !== +filterState.guests) {
          return false;
        }
      }

      if (filterState.features !== []) {
        filterState.features.find(function (elem) {
          return pin.offer.features[elem];
        });
        return false;
      }

      return true;
    });

    getClearMap();
    window.filter.getRenderPin(filteredPins);
  };

  window.filter = {

    getRenderPin: function (data) { // ф-я создания пяти меток
      var fragment = document.createDocumentFragment(); // создаём елемент fragment

      data.slice(0, MAX_NUMBER_PIN).forEach(function (elem) { // обрезаю массив и отрисовываю каждый элемент

        fragment.appendChild(window.pin.render(elem));
      });

      similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
    },

    getChangeHousingFilter: function () {
      formFilter.addEventListener('change', onFilterChange);
    }
  };

})();
