'use strict';

(function () {
  var MAX_NUMBER_PIN = 5;

  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var mapFilter = document.querySelector('.map__filters-container'); // блок фильтрации на карте
  var formFilter = mapFilter.querySelector('.map__filters'); // блок формы фильтрации
  var selectHousingType = formFilter.querySelector('#housing-type'); // селект с типами жилья

  window.filter = {

    getRenderPin: function (data) { // ф-я создания пяти меток
      var fragment = document.createDocumentFragment(); // создаём елемент fragment

      data.slice(0, MAX_NUMBER_PIN).forEach(function (elem) { // обрезаю массив и отрисовываю каждый элемент
        fragment.appendChild(window.pin.renderPin(elem));
      });

      similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
      window.card.onClickNewPin(); // вызов ф-и для модуля card
    },

    getChangeHousingType: function (data) { // ф-я фильтра типа жилья

      var onHousingTypeChange = function (evt) { // выбраное значение
        var newValue = evt.target.value;

        var clearPin = Array.from(similarMapPin.querySelectorAll('.map__pin')); // удаляю метки
        clearPin.forEach(function (elem, index) {
          if (index > 0) {
            similarMapPin.removeChild(elem);
          }
        });

        var newPin = data.filter(function (elem) { // фильтрую массив по типу жилья
          return elem.offer.type === newValue;
        });

        var fragment = document.createDocumentFragment(); // создаём елемент fragment
        newPin.slice(0, MAX_NUMBER_PIN).forEach(function (elem) { // перебираю отфильтрованный массив
          fragment.appendChild(window.pin.renderPin(elem));
        });

        similarMapPin.appendChild(fragment);
        window.card.onClickNewPin(); // вызов ф-и для модуля card
      };

      selectHousingType.addEventListener('change', onHousingTypeChange); // обработчик смены типа жилья
    }
  };

})();
