/* =========================================================
   ФАЙЛ: js/slider.js
   ЗА ЧТО ОТВЕЧАЕТ:
   - переключает фотографии внутри карточки номера;
   - кнопки ‹ / › меняют слайд, не открывая лайтбокс;
   - точки-индикаторы показывают текущий слайд.

   ПОДКЛЮЧАЕТСЯ ПОСЛЕ lightbox.js И ПЕРЕД script.js.
   ========================================================= */

(function () {
  var sliders = document.querySelectorAll('.room-slider');

  for (var i = 0; i < sliders.length; i++) {
    initSlider(sliders[i]);
  }

  function initSlider(slider) {
    var slides = slider.querySelectorAll('.room-slide');
    var dots   = slider.querySelectorAll('.slide-dot');
    var prevBtn = slider.querySelector('.slide-prev');
    var nextBtn = slider.querySelector('.slide-next');
    var current = 0;

    function goTo(index) {
      removeClass(slides[current], 'active');
      removeClass(dots[current],  'active');
      current = (index + slides.length) % slides.length;
      addClass(slides[current], 'active');
      addClass(dots[current],  'active');
    }

    addEvent(prevBtn, 'click', function (e) {
      e.stopPropagation();
      goTo(current - 1);
    });

    addEvent(nextBtn, 'click', function (e) {
      e.stopPropagation();
      goTo(current + 1);
    });

    for (var j = 0; j < dots.length; j++) {
      (function (idx) {
        addEvent(dots[idx], 'click', function (e) {
          e.stopPropagation();
          goTo(idx);
        });
      })(j);
    }

    var touchStartX = 0;
    var touchStartY = 0;

    addEvent(slider, 'touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    addEvent(slider, 'touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      // свайп засчитывается только если горизонталь преобладает над вертикалью
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
        if (dx < 0) {
          goTo(current + 1);
        } else {
          goTo(current - 1);
        }
      }
    }, { passive: true });
  }
})();
