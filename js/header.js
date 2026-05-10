/* =========================================================
   ФАЙЛ: js/header.js
   Переключает класс .scrolled на шапке после прокрутки >20px.
   ЗАВИСИМОСТИ: js/utils.js — addClass / removeClass / addEvent
                js/elements.js — header
   ========================================================= */

function updateHeaderOnScroll() {
  var scrollTop = window.pageYOffset
               || document.documentElement.scrollTop
               || document.body.scrollTop
               || 0;

  if (scrollTop > 20) {
    addClass(header, "scrolled");
  } else {
    removeClass(header, "scrolled");
  }
}

addEvent(window, "scroll", updateHeaderOnScroll);
addEvent(window, "load",   updateHeaderOnScroll);
updateHeaderOnScroll();
