/* =========================================================
   ФАЙЛ: js/utils.js
   ЗА ЧТО ОТВЕЧАЕТ:
   - хранит универсальные вспомогательные функции, которые используются
     несколькими модулями: addEvent, hasClass, addClass, removeClass,
     toggleClass, getAttr, two.
   - функции написаны с учётом поддержки современных браузеров (без IE).

   ПОДКЛЮЧАЕТСЯ ВТОРЫМ — после translations.js, до всех остальных модулей.
   ========================================================= */

/* =========================================================
   БЛОК 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ СОВМЕСТИМОСТИ

   За что отвечает:
   - добавляет события;
   - добавляет/удаляет CSS-классы;
   - получает атрибуты;
   - форматирует числа.

   Почему так:
   - функции оставлены для удобства чтения и повторного использования;
   - старые проверки больше не нужны для Internet Explorer, так как поддержка IE удалена.
   ========================================================= */
function addEvent(element, eventName, handler, options) {
  if (!element) { return; }

  if (element.addEventListener) {
    element.addEventListener(eventName, handler, options || false);
  }
}

function hasClass(element, className) {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

function addClass(element, className) {
  if (!hasClass(element, className)) {
    element.className = element.className ? element.className + " " + className : className;
  }
}

function removeClass(element, className) {
  element.className = (" " + element.className + " ").replace(" " + className + " ", " ").replace(/^\s+|\s+$/g, "");
}

function toggleClass(element, className) {
  if (hasClass(element, className)) {
    removeClass(element, className);
  } else {
    addClass(element, className);
  }
}

function getAttr(element, name) {
  return element ? element.getAttribute(name) : null;
}

function two(number) {
  number = String(number);
  return number.length < 2 ? "0" + number : number;
}


