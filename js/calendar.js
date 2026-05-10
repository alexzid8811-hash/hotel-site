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


