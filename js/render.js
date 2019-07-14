'use strict';

(function () {

  var similarMapPin = document.querySelector('.map__pins'); // находим блок для вставки меток
  var similarPinTemplate = document.querySelector('#pin') // находим шаблон меток
    .content
    .querySelector('.map__pin');

  var mapFilter = document.querySelector('.map__filters-container'); // блок фильтрации на карте
  var formFilter = mapFilter.querySelector('.map__filters'); // блок формы фильтрации
  var selectHousingType = formFilter.querySelector('#housing-type'); // селект с типами жилья
  // var housingType = selectHousingType.querySelectorAll('option'); // все поля внутри селекта

  var renderPin = function (advert) { // ф-я создания меток
    var pinElement = similarPinTemplate.cloneNode(true); // клонируем метки

    // записываем новые значения из массива
    pinElement.style = 'left: ' + advert.location.x + 'px;' + ' ' + 'top: ' + advert.location.y + 'px;';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.type;

    return pinElement;
  };

  window.render = {
    getRenderPin: function (data) { // ф-я создания пяти меток
      var fragment = document.createDocumentFragment(); // создаём елемент fragment
      data.slice(0, 5).forEach(function (elem) { // обрезаю массив и отрисовываю каждый элемент
        fragment.appendChild(renderPin(elem));
      });

      similarMapPin.appendChild(fragment); // вставляем сформированный фрагмент в разметку
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
        newPin.slice(0, 5).forEach(function (elem) { // перебираю отфильтрованный массив
          fragment.appendChild(renderPin(elem));
        });

        similarMapPin.appendChild(fragment);
      };

      selectHousingType.addEventListener('change', onHousingTypeChange); // обработчик смены типа жилья
    }
  };

})();
