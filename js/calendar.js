/* =========================================================
   ФАЙЛ: js/calendar.js
   ЗА ЧТО ОТВЕЧАЕТ:
   - рисует двухмесячный календарь в форме бронирования;
   - позволяет выбрать заезд (первый клик) и выезд (второй клик);
   - подсвечивает диапазон выбранных дат;
   - автоматически записывает выбранные даты в поле формы «Даты проживания»;
   - переключает месяцы кнопками «‹» и «›».

   ВНУТРЕННИЕ БЛОКИ:
   - НАСТРОЙКИ — короткие имена дней и названия месяцев на RU/EN;
   - formatDate / dateKey — форматирование дат для UI и сравнения;
   - selectDate — логика выбора заезда/выезда;
   - renderCalendar — отрисовка двух месяцев;
   - кнопки prevMonth / nextMonth — переключение месяцев.
   ========================================================= */

/* =========================================================
   БЛОК 9. НАСТРОЙКИ КАЛЕНДАРЯ

   За что отвечает:
   - хранит названия месяцев;
   - хранит текущий месяц календаря;
   - хранит выбранную дату заезда и выезда.

   Почему так:
   - календарь показывает 2 месяца от calendarDate;
   - selectedStart и selectedEnd нужны для выбора периода «от — до».
   ========================================================= */
var monthNames = {
  ru:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
  en:["January","February","March","April","May","June","July","August","September","October","November","December"]
};

var calendarDate = new Date();
var selectedStart = null;
var selectedEnd = null;
var mobileDateSelectsReady = false;


/* =========================================================
   БЛОК 10. ФОРМАТ ДАТЫ

   За что отвечает:
   - formatDate показывает дату как 01.05.2026;
   - dateKey делает технический ключ даты для сравнения.

   Почему так:
   - пользователю удобнее видеть dd.mm.yyyy;
   - коду удобнее сравнивать yyyy-mm-dd.
   ========================================================= */
function formatDate(date) {
  return two(date.getDate()) + "." + two(date.getMonth() + 1) + "." + date.getFullYear();
}

function dateKey(date) {
  return date.getFullYear() + "-" + two(date.getMonth() + 1) + "-" + two(date.getDate());
}

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function getMobileDateSelect(role, part) {
  return document.querySelector('[data-booking-date="' + role + '"][data-date-part="' + part + '"]');
}

function getMobileBookingDate(role) {
  var daySelect = getMobileDateSelect(role, "day");
  var monthSelect = getMobileDateSelect(role, "month");
  var yearSelect = getMobileDateSelect(role, "year");

  if (!daySelect || !monthSelect || !yearSelect) { return null; }
  if (!daySelect.value || !monthSelect.value || !yearSelect.value) { return null; }

  var day = parseInt(daySelect.value, 10);
  var month = parseInt(monthSelect.value, 10) - 1;
  var year = parseInt(yearSelect.value, 10);
  var date = new Date(year, month, day);

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }

  return date;
}

function fillSelect(select, options, selectedValue, placeholder) {
  var value = selectedValue ? String(selectedValue) : "";
  select.innerHTML = "";

  var emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.innerHTML = placeholder;
  select.appendChild(emptyOption);

  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i].value;
    option.innerHTML = options[i].label;
    select.appendChild(option);
  }

  select.value = value;
}

function updateMobileDateOptions(role) {
  var daySelect = getMobileDateSelect(role, "day");
  var monthSelect = getMobileDateSelect(role, "month");
  var yearSelect = getMobileDateSelect(role, "year");

  if (!daySelect || !monthSelect || !yearSelect) { return; }

  var lang = loadLanguage();
  var dictionary = translations[lang] || translations.ru;
  var names = monthNames[lang] || monthNames.ru;
  var selectedDay = daySelect.value;
  var selectedMonth = monthSelect.value;
  var selectedYear = yearSelect.value;
  var currentYear = new Date().getFullYear();
  var years = [];
  var months = [];
  var days = [];

  for (var year = currentYear; year <= currentYear + 3; year++) {
    years.push({ value: String(year), label: String(year) });
  }

  for (var month = 1; month <= 12; month++) {
    months.push({ value: String(month), label: names[month - 1] });
  }

  var maxDay = 31;
  if (selectedMonth && selectedYear) {
    maxDay = daysInMonth(parseInt(selectedYear, 10), parseInt(selectedMonth, 10) - 1);
  }

  if (selectedDay && parseInt(selectedDay, 10) > maxDay) {
    selectedDay = "";
  }

  for (var day = 1; day <= maxDay; day++) {
    days.push({ value: String(day), label: two(day) });
  }

  fillSelect(daySelect, days, selectedDay, dictionary.date_day || "День");
  fillSelect(monthSelect, months, selectedMonth, dictionary.date_month || "Месяц");
  fillSelect(yearSelect, years, selectedYear, dictionary.date_year || "Год");
}

function setMobileSelectDate(role, date) {
  if (!date) { return; }

  var daySelect = getMobileDateSelect(role, "day");
  var monthSelect = getMobileDateSelect(role, "month");
  var yearSelect = getMobileDateSelect(role, "year");

  if (!daySelect || !monthSelect || !yearSelect) { return; }

  yearSelect.value = String(date.getFullYear());
  monthSelect.value = String(date.getMonth() + 1);
  updateMobileDateOptions(role);
  daySelect.value = String(date.getDate());
}

function syncMobileDateSelectorsFromSelection() {
  updateMobileDateOptions("start");
  updateMobileDateOptions("end");
  setMobileSelectDate("start", selectedStart);
  setMobileSelectDate("end", selectedEnd);
}

function updateDatesFromMobileSelectors() {
  selectedStart = getMobileBookingDate("start");
  selectedEnd = getMobileBookingDate("end");

  if (selectedStart && selectedEnd && selectedEnd < selectedStart) {
    var temporaryDate = selectedStart;
    selectedStart = selectedEnd;
    selectedEnd = temporaryDate;
    syncMobileDateSelectorsFromSelection();
  }

  updateStayDatesInput();
  syncMobileDateSelectorsFromSelection();
  renderCalendar();
}

function initMobileDateSelectors() {
  var selectors = document.querySelectorAll ? document.querySelectorAll("[data-booking-date][data-date-part]") : [];

  if (!selectors.length) { return; }

  updateMobileDateOptions("start");
  updateMobileDateOptions("end");

  if (mobileDateSelectsReady) { return; }

  for (var i = 0; i < selectors.length; i++) {
    addEvent(selectors[i], "change", function () {
      updateMobileDateOptions(getAttr(this, "data-booking-date"));
      updateDatesFromMobileSelectors();
    });
  }

  mobileDateSelectsReady = true;
}


/* =========================================================
   БЛОК 11. ЗАПИСЬ ДАТ В ФОРМУ

   За что отвечает:
   - записывает выбранный период в поле «Даты проживания».

   Почему так:
   - первый клик выбирает дату заезда;
   - второй клик выбирает дату выезда;
   - поле readonly, чтобы пользователь не испортил формат вручную.
   ========================================================= */
function updateStayDatesInput() {
  var input = document.getElementById("stayDates");

  if (!input) { return; }

  if (selectedStart && selectedEnd) {
    input.value = formatDate(selectedStart) + " — " + formatDate(selectedEnd);
  } else if (selectedStart) {
    input.value = formatDate(selectedStart) + " — выберите дату выезда";
  } else {
    input.value = "";
  }
}


/* =========================================================
   БЛОК 12. ВЫБОР ДАТЫ В КАЛЕНДАРЕ

   За что отвечает:
   - обрабатывает клик по дню календаря;
   - определяет, это заезд или выезд;
   - если вторая дата раньше первой, меняет их местами.

   Почему так:
   - пользователь может сначала нажать более позднюю дату случайно;
   - код автоматически делает период правильным.
   ========================================================= */
function selectDate(date) {
  if (!selectedStart || selectedEnd) {
    selectedStart = date;
    selectedEnd = null;
  } else if (date < selectedStart) {
    selectedEnd = selectedStart;
    selectedStart = date;
  } else {
    selectedEnd = date;
  }

  updateStayDatesInput();
  syncMobileDateSelectorsFromSelection();
  renderCalendar();
}


/* =========================================================
   БЛОК 13. ОТРИСОВКА КАЛЕНДАРЯ НА 2 МЕСЯЦА

   За что отвечает:
   - строит HTML календаря;
   - показывает текущий и следующий месяц;
   - подсвечивает заезд, выезд и дни между ними.

   Почему такие значения:
   - цикл m < 2 означает два месяца;
   - firstDay нужен, чтобы первое число месяца встало под правильным днем недели;
   - daysInMonth рассчитывается автоматически для любого месяца.
   ========================================================= */
function renderCalendar() {
  var calendar = document.getElementById("calendar");
  var title = document.getElementById("calendarTitle");

  if (!calendar || !title) { return; }

  var lang = loadLanguage();
  var names = monthNames[lang] || monthNames.ru;

  calendar.innerHTML = "";
  title.innerHTML = names[calendarDate.getMonth()] + " " + calendarDate.getFullYear();

  for (var m = 0; m < 2; m++) {
    var d = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + m, 1);
    var month = document.createElement("div");

    month.className = "month";
    month.innerHTML = "<h3>" + names[d.getMonth()] + " " + d.getFullYear() + "</h3>" +
      "<div class='days'><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div>" +
      "<div class='dates'></div>";

    var dates = month.getElementsByClassName("dates")[0];
    var firstDay = d.getDay() || 7;

    for (var empty = 1; empty < firstDay; empty++) {
      var emptyCell = document.createElement("div");
      emptyCell.className = "date-empty";
      dates.appendChild(emptyCell);
    }

    var daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

    for (var day = 1; day <= daysInMonth; day++) {
      var cell = document.createElement("div");
      var cellDate = new Date(d.getFullYear(), d.getMonth(), day);

      cell.className = "date-cell";
      cell.innerHTML = day;
      cell.setAttribute("data-date", dateKey(cellDate));

      if (selectedStart && dateKey(cellDate) === dateKey(selectedStart)) {
        addClass(cell, "selected");
        addClass(cell, "range-start");
      }

      if (selectedEnd && dateKey(cellDate) === dateKey(selectedEnd)) {
        addClass(cell, "selected");
        addClass(cell, "range-end");
      }

      if (selectedStart && selectedEnd && cellDate > selectedStart && cellDate < selectedEnd) {
        addClass(cell, "in-range");
      }

      (function (savedDate) {
        addEvent(cell, "click", function () {
          selectDate(savedDate);
        });
      })(cellDate);

      dates.appendChild(cell);
    }

    calendar.appendChild(month);
  }
}


/* =========================================================
   БЛОК 14. КНОПКИ ПРЕДЫДУЩИЙ / СЛЕДУЮЩИЙ МЕСЯЦ

   За что отвечает:
   - листает календарь назад и вперед.

   Почему так:
   - setMonth автоматически учитывает переход года;
   - после изменения месяца календарь перерисовывается.
   ========================================================= */
var prevMonth = document.getElementById("prevMonth");
var nextMonth = document.getElementById("nextMonth");

addEvent(prevMonth, "click", function () {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendar();
});

addEvent(nextMonth, "click", function () {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendar();
});


