'use strict';

(function () {
  var MAX_NUMBER_PIN = 5;

  var map = document.querySelector('.map'); // нахожу блок карты
  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var mapFilter = document.querySelector('.map__filters-container'); // блок фильтрации на карте
  var formFilter = mapFilter.querySelector('.map__filters'); // блок формы фильтрации
  var selectHousingType = formFilter.querySelector('#housing-type'); // селект с типами жилья
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

  var onFilterChange = function (evt) {
    // debugger;
    if (evt.target.tagName === 'SELECT') {
      filterState[evt.target.id.split('-')[1]] = evt.target.value;
    } else {
      filterState.features.push(evt.target.defaultValue);
    }

    var filteredPins = window.pin.data.filter(function (pin) {
      if (pin.offer.type !== filterState.type) {
        return false;
      }
      if (pin.offer.rooms !== +filterState.rooms) {
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
