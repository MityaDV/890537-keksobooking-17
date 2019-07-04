'use strict';

(function () {

  window.data = {
    randomValueFromArray: function (array) { // Функция генерации случайного значения из переданного массива
      return array[Math.floor(Math.random() * array.length)];
    },
    calculatesСoordinateY: function (min, max) { // функция генерации случайного числа в интервале
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getPosition: function (elem) { // функция получения координат отступов
      return {
        x: elem.offsetLeft, // левый отступ эл-та от родителя
        y: elem.offsetTop // верхний отступ эл-та от родителя
      };
    }
  };

})();
