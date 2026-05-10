/* =========================================================
   ФАЙЛ: js/lightbox.js
   ЗА ЧТО ОТВЕЧАЕТ:
   - открывает фото номера на весь экран при клике по фотографии;
   - если в карточке несколько фото (слайдер), открывает с текущего;
   - кнопки ‹ / › и клавиши ← / → листают фото в лайтбоксе;
   - закрывает фото по крестику, тёмному фону или клавише Esc.

   ПОДКЛЮЧАЕТСЯ ПОСЛЕ calendar.js И ПЕРЕД slider.js.
   ========================================================= */

(function () {
  var lightbox    = document.getElementById('photoLightbox');
  var lightboxImg = document.getElementById('photoLightboxImg');
  var closeBtn    = document.getElementById('photoLightboxClose');
  var prevBtn     = document.getElementById('photoLightboxPrev');
  var nextBtn     = document.getElementById('photoLightboxNext');
  var photos      = document.querySelectorAll('.room-photo.has-image');

  var currentPhotos = [];
  var currentIndex  = 0;

  /* --- открытие --- */
  function openLightbox(photosArray, index) {
    if (!lightbox || !lightboxImg || !photosArray.length) { return; }
    currentPhotos = photosArray;
    currentIndex  = index;
    lightboxImg.src = currentPhotos[currentIndex].getAttribute('src');
    lightboxImg.alt = currentPhotos[currentIndex].getAttribute('alt') || 'Фото номера';
    updateNav();
    addClass(lightbox, 'open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /* --- закрытие --- */
  function closeLightbox() {
    if (!lightbox || !lightboxImg) { return; }
    removeClass(lightbox, 'open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxImg.alt = '';
    document.body.style.overflow = '';
  }

  /* --- перейти к фото по индексу --- */
  function showPhoto(index) {
    currentIndex = (index + currentPhotos.length) % currentPhotos.length;
    lightboxImg.src = currentPhotos[currentIndex].getAttribute('src');
    lightboxImg.alt = currentPhotos[currentIndex].getAttribute('alt') || 'Фото номера';
  }

  /* --- скрыть/показать кнопки навигации --- */
  function updateNav() {
    var show = currentPhotos.length > 1;
    prevBtn.style.display = show ? '' : 'none';
    nextBtn.style.display = show ? '' : 'none';
  }

  /* --- собрать массив фото из карточки --- */
  function getPhotos(photoBlock) {
    var slides = photoBlock.querySelectorAll('.room-slide');
    var arr = [];
    var start = 0;
    if (slides.length > 0) {
      for (var j = 0; j < slides.length; j++) {
        arr.push(slides[j]);
        if (hasClass(slides[j], 'active')) { start = j; }
      }
    } else {
      var img = photoBlock.querySelector('img');
      if (img) { arr.push(img); }
    }
    return { photos: arr, index: start };
  }

  /* --- привязка кликов по карточкам --- */
  for (var i = 0; i < photos.length; i++) {
    addEvent(photos[i], 'click', function () {
      var result = getPhotos(this);
      openLightbox(result.photos, result.index);
    });

    addEvent(photos[i], 'keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        var result = getPhotos(this);
        openLightbox(result.photos, result.index);
      }
    });
  }

  /* --- управление лайтбоксом --- */
  addEvent(closeBtn, 'click', closeLightbox);

  addEvent(prevBtn, 'click', function (e) {
    e.stopPropagation();
    showPhoto(currentIndex - 1);
  });

  addEvent(nextBtn, 'click', function (e) {
    e.stopPropagation();
    showPhoto(currentIndex + 1);
  });

  addEvent(lightbox, 'click', function (event) {
    if (event.target === lightbox) { closeLightbox(); }
  });

  addEvent(document, 'keydown', function (event) {
    if (!lightbox || !hasClass(lightbox, 'open')) { return; }
    if (event.key === 'Escape')     { closeLightbox(); }
    if (event.key === 'ArrowLeft')  { showPhoto(currentIndex - 1); }
    if (event.key === 'ArrowRight') { showPhoto(currentIndex + 1); }
  });
})();
