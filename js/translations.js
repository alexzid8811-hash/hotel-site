/* =========================================================
   ФАЙЛ: js/translations.js
   ЗА ЧТО ОТВЕЧАЕТ:
   - хранит весь текст сайта на русском и английском языках в объекте translations;
   - используется функцией setLanguage(lang) из language.js;
   - HTML-элементы связаны с переводами через атрибут data-i18n.

   КАК МЕНЯТЬ:
   - чтобы изменить русский текст, меняйте translations.ru;
   - чтобы изменить английский текст, меняйте translations.en;
   - ключи должны совпадать со значением data-i18n в index.html.

   ПОДКЛЮЧАЕТСЯ ПЕРВЫМ из всех JS-файлов: остальные файлы используют объект translations.
   ========================================================= */

/* =========================================================
   БЛОК 1. ПЕРЕВОДЫ САЙТА RU / EN

   За что отвечает:
   - хранит весь текст сайта на русском и английском языках;
   - используется функцией setLanguage(lang);
   - HTML-элементы связаны с переводами через data-i18n.

   Почему так:
   - переключение языка происходит без перезагрузки страницы;
   - все тексты собраны в одном месте, чтобы их было проще менять.

   Как менять:
   - Текст hero_title и hero_text синхронизирован с index.html;
   - чтобы изменить русский текст, меняйте translations.ru;
   - чтобы изменить английский текст, меняйте translations.en;
   - ключи должны совпадать с data-i18n в HTML.
   ========================================================= */
var translations = {
  ru: {
    brand:"Отель 2.0",
    nav_about:"О нас",
    nav_rooms:"Номера",
    nav_booking:"Забронировать",
    nav_contacts:"Контакты",
    hero_title:"Мини отель",
    hero_text:"Мы небольшой мини-отель на 15 номеров, расположенный в тихом районе Санкт-Петербурга. Рады предложить вам остановиться у нас и отдохнуть. Со своей стороны мы сделаем всё, чтобы ваш отдых запомнился.",
    hero_button:"Забронировать номер",
    services_title:"Услуги отеля",
    service_1_title:"Круглосуточное заселение",
    service_1_text:"Администратор на связи 24/7, чтобы гостям было удобно заехать в любое время.",
    service_2_title:"Бесплатный Wi‑Fi",
    service_2_text:"Стабильный интернет для работы, связи и отдыха.",
    service_3_title:"Чайная зона",
    service_3_text:"Возможность выпить чай или кофе после дороги и перед прогулкой.",
    service_4_title:"Стирка и глажка",
    service_4_text:"Дополнительные бытовые услуги для длительного проживания.",
    service_5_title:"Уборка номеров",
    service_5_text:"Поддерживаем чистоту и порядок во время проживания гостей.",
    service_6_title:"Удобное расположение",
    service_6_text:"Рядом транспорт, магазины и городская инфраструктура.",
    social_title:"Мы в социальных сетях",
    social_text:"Ссылки будут добавлены позже.",
    rooms_title:"Номера",
    standard_title:"Стандарт",
    standard_text:"Уютный номер для одного или двух гостей. Подходит для коротких поездок и командировок.",
    standard_price:"Стоимость проживания: [сумма] руб.*",
    lux_title:"Люкс",
    lux_text:"Просторный номер повышенной комфортности с зоной отдыха и расширенным набором удобств.",
    lux_price:"Стоимость проживания: [сумма] руб.*",
    comfort_title:"Комфорт",
    comfort_text:"Оптимальный вариант для гостей, которым важны тишина, удобная кровать и приятная атмосфера.",
    comfort_price:"Стоимость проживания: [сумма] руб.*",
    econom_title:"Эконом",
    econom_text:"Практичный номер для тех, кто ищет доступное размещение без лишних расходов.",
    econom_price:"Стоимость проживания: [сумма] руб.*",
    junior_title:"Полулюкс",
    junior_text:"Комфортный номер с увеличенной площадью, подходящий для отдыха и деловых поездок.",
    junior_price:"Стоимость проживания: [сумма] руб.*",
    room_price_note:"* 2 часа — 2 000 рублей, 3 часа — 3 000 рублей.",
    book_btn:"Забронировать",
    booking_title:"Забронировать",
    booking_lead:"Выберите даты и заполните форму. В дальнейшем этот блок можно заменить или подключить к SAby Hotel.",
    form_name:"Имя",
    form_phone:"Телефон",
    form_email:"Email",
    form_room:"Тип номера",
    form_dates:"Даты проживания",
    mobile_checkin:"Дата заезда",
    mobile_checkout:"Дата выезда",
    form_message:"Комментарий",
    send_btn:"Отправить заявку",
    contacts_title:"Контакты",
    send_message_btn:"Отправить сообщение",
    footer_booking_rules:"Правила бронирования",
    footer_extra_prices:"Расценки дополнительных услуг",
    footer_ip:"Информация об ИП Сионкова",
    footer_owner_title:"Данные владельца",
    footer_docs_title:"Юридические документы",
    footer_rules:"Правила проживания",
    footer_privacy:"Политика обработки персональных данных",
    footer_consent:"Согласие на обработку персональных данных",
    footer_offer:"Публичная оферта",
    footer_requisites:"Реквизиты владельца",
    footer_note:"Перед публикацией сайта проверьте актуальность адреса гостиницы, телефона, e-mail, сведений о классификации и текстов документов."
  },
  en: {
    brand:"Hotel 2.0",
    nav_about:"About",
    nav_rooms:"Rooms",
    nav_booking:"Book now",
    nav_contacts:"Contacts",
    hero_title:"Mini hotel",
    hero_text:"We are a small 15-room mini hotel located in a quiet district of Saint Petersburg. We will be glad to welcome you and help you relax. We will do everything we can to make your stay memorable.",
    hero_button:"Book a room",
    services_title:"Hotel services",
    service_1_title:"24/7 check-in",
    service_1_text:"The administrator is available around the clock for convenient arrivals.",
    service_2_title:"Free Wi‑Fi",
    service_2_text:"Stable internet for work, communication and entertainment.",
    service_3_title:"Tea area",
    service_3_text:"Tea or coffee after your trip and before exploring the city.",
    service_4_title:"Laundry and ironing",
    service_4_text:"Additional household services for long stays.",
    service_5_title:"Room cleaning",
    service_5_text:"We keep rooms clean and comfortable during your stay.",
    service_6_title:"Convenient location",
    service_6_text:"Transport, shops and city infrastructure nearby.",
    social_title:"Social media",
    social_text:"Links will be added later.",
    rooms_title:"Rooms",
    standard_title:"Standard",
    standard_text:"A cozy room for one or two guests. Good for short stays and business trips.",
    standard_price:"Accommodation price: [amount] RUB.*",
    lux_title:"Suite",
    lux_text:"A spacious high-comfort room with a seating area and extended amenities.",
    lux_price:"Accommodation price: [amount] RUB.*",
    comfort_title:"Comfort",
    comfort_text:"A balanced choice for guests who value quiet, a comfortable bed and a pleasant atmosphere.",
    comfort_price:"Accommodation price: [amount] RUB.*",
    econom_title:"Economy",
    econom_text:"A practical room for affordable accommodation without unnecessary expenses.",
    econom_price:"Accommodation price: [amount] RUB.*",
    junior_title:"Junior Suite",
    junior_text:"A comfortable larger room suitable for leisure and business trips.",
    junior_price:"Accommodation price: [amount] RUB.*",
    room_price_note:"* 2 hours — 2,000 RUB, 3 hours — 3,000 RUB.",
    book_btn:"Book now",
    booking_title:"Book now",
    booking_lead:"Choose dates and fill in the form. Later this block can be replaced or connected to SAby Hotel.",
    form_name:"Name",
    form_phone:"Phone",
    form_email:"Email",
    form_room:"Room type",
    form_dates:"Stay dates",
    mobile_checkin:"Check-in date",
    mobile_checkout:"Check-out date",
    form_message:"Message",
    send_btn:"Send request",
    contacts_title:"Contacts",
    send_message_btn:"Send message",
    footer_booking_rules:"Booking rules",
    footer_extra_prices:"Additional service prices",
    footer_ip:"Information about sole proprietor Sionkova",
    footer_owner_title:"Owner details",
    footer_docs_title:"Legal documents",
    footer_rules:"Accommodation rules",
    footer_privacy:"Personal data processing policy",
    footer_consent:"Personal data processing consent",
    footer_offer:"Public offer",
    footer_requisites:"Owner requisites",
    footer_note:"Before publishing the website, check the hotel address, phone number, email, classification information and document texts."
  }
};


