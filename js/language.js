/* =========================================================
   ФАЙЛ: js/language.js
   ЗА ЧТО ОТВЕЧАЕТ:
   - сохраняет выбранный язык в localStorage (ключ hotel_lang);
   - при загрузке страницы автоматически восстанавливает выбранный язык;
   - переключает все элементы с data-i18n без перезагрузки страницы;
   - подсвечивает активную кнопку RU или EN в шапке.

   ЗАВИСИМОСТИ:
   - использует translations из translations.js;
   - использует addEvent / hasClass / addClass / removeClass из utils.js.
   ========================================================= */

/* =========================================================
   БЛОК 6. СОХРАНЕНИЕ И ЗАГРУЗКА ЯЗЫКА

   За что отвечает:
   - запоминает выбранный язык;
   - при следующем открытии сайта возвращает последний язык.

   Почему так:
   - localStorage хранит данные в браузере пользователя;
   - try/catch нужен, потому что в приватном режиме или старом браузере
     localStorage может быть недоступен.
   ========================================================= */
function saveLanguage(lang) {
  try {
    window.localStorage.setItem("hotel_lang", lang);
  } catch (e) {}
}

function loadLanguage() {
  try {
    return window.localStorage.getItem("hotel_lang") || "ru";
  } catch (e) {
    return "ru";
  }
}


/* =========================================================
   БЛОК 7. ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА БЕЗ ПЕРЕЗАГРУЗКИ

   За что отвечает:
   - меняет текст всех элементов с data-i18n;
   - переключает активную кнопку RU/EN;
   - меняет атрибут lang у html;
   - перерисовывает календарь с названиями месяцев на нужном языке.

   Почему так:
   - страница не перезагружается;
   - весь текст берется из объекта translations.
   ========================================================= */
function setLanguage(lang) {
  var dictionary = translations[lang] || translations.ru;
  document.documentElement.lang = lang;

  var langButtons = document.querySelectorAll ? document.querySelectorAll("[data-lang-btn]") : [];
  for (var i = 0; i < langButtons.length; i++) {
    var btnLang = getAttr(langButtons[i], "data-lang-btn");

    if (btnLang === lang) {
      addClass(langButtons[i], "active");
    } else {
      removeClass(langButtons[i], "active");
    }
  }

  var elements = document.querySelectorAll ? document.querySelectorAll("[data-i18n]") : [];
  for (var j = 0; j < elements.length; j++) {
    var key = getAttr(elements[j], "data-i18n");

    if (dictionary[key]) {
      elements[j].innerHTML = dictionary[key];
    }
  }

  saveLanguage(lang);
  renderCalendar();
}


/* =========================================================
   БЛОК 8. КНОПКИ RU / EN

   За что отвечает:
   - назначает обработчики клика на кнопки языка.

   Почему так:
   - кнопка сама хранит язык в data-lang-btn;
   - одна функция подходит для RU и EN.
   ========================================================= */
var langButtonsInit = document.querySelectorAll ? document.querySelectorAll("[data-lang-btn]") : [];

for (var lb = 0; lb < langButtonsInit.length; lb++) {
  addEvent(langButtonsInit[lb], "click", function () {
    setLanguage(getAttr(this, "data-lang-btn"));
  });
}


