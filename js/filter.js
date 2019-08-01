'use strict';

(function () {
  var MAX_NUMBER_PIN = 5;

  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var mapFilter = document.querySelector('.map__filters-container'); // блок фильтрации на карте
  var formFilter = mapFilter.querySelector('.map__filters'); // блок формы фильтрации
  var selectHousingType = formFilter.querySelector('#housing-type'); // селект с типами жилья
  var map = document.querySelector('.map'); // нахожу блок карты

  window.filter = {

    getRenderPin: function (data) { // ф-я создания пяти меток
      var fragment = document.createDocumentFragment(); // создаём елемент fragment

      data.slice(0, MAX_NUMBER_PIN).forEach(function (elem) { // обрезаю массив и отрисовываю каждый элемент

        fragment.appendChild(window.pin.render(elem));
      });

      similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
    },

    getChangeHousingType: function (data) { // ф-я фильтра типа жилья

      var onHousingTypeChange = function (evt) { // выбраное значение
        var newValue = evt.target.value;
        // удаляю метки
        var clearPins = Array.from(similarMapPin.querySelectorAll('.map__pin'));
        clearPins.forEach(function (elem, index) {
          if (index > 0) {
            similarMapPin.removeChild(elem);
          }
        });

        var clearCard = map.querySelector('.map__card'); // удаляю открытую карточку
        if (clearCard) {
          map.removeChild(clearCard);
        }

        var newPin = data.filter(function (elem) { // фильтрую массив по типу жилья
          return elem.offer.type === newValue;
        });

        var fragment = document.createDocumentFragment(); // создаём елемент fragment
        newPin.slice(0, MAX_NUMBER_PIN).forEach(function (elem) { // перебираю отфильтрованный массив
          fragment.appendChild(window.pin.render(elem));
        });

        similarMapPin.appendChild(fragment);
      };

      selectHousingType.addEventListener('change', onHousingTypeChange); // обработчик смены типа жилья
    }
  };

})();
