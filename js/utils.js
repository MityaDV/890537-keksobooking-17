'use strict';

(function () {

  window.util = {
    getRandomValueFromArray: function (array) { // Функция генерации случайного значения из переданного массива
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomNumber: function (min, max) { // функция генерации случайного числа в интервале
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

})();
