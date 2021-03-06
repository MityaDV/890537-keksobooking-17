'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    isEscEvent: function (evt, action) { // ф-я проверки нажатия кнопки esc и действия после нажатия
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    getArrsToObject: function (keys, vals) { // ф-я создания объекта словаря из двух массивов
      return keys.reduce(function (prev, val, i) {
        prev[val] = vals[i];
        return prev;
      }, {});
    },

    getPositionOffSetElem: function (elem) { // функция получения координат отступов
      return {
        x: elem.offsetLeft, // левый отступ эл-та от родителя
        y: elem.offsetTop // верхний отступ эл-та от родителя
      };
    }
  };

})();
