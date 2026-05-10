<?php
/*
  contact.php — пример обработчика формы для отправки писем на почту.

  ВАЖНО:
  1) Этот файл работает только на хостинге/сервере с PHP.
  2) На обычном компьютере при открытии index.html через двойной клик письма не отправятся.
  3) На многих хостингах функция mail() может быть отключена.
     Тогда лучше использовать SMTP-библиотеку, например PHPMailer.
  4) Для защиты от спама желательно добавить CAPTCHA.

  Куда приходят письма:
  Замените email ниже на рабочую почту гостиницы.
*/

$to = "hotel@example.ru";
$subject = "Заявка с сайта Отель 2.0";

function clean_value($value) {
  $value = trim($value);
  $value = strip_tags($value);
  return $value;
}

$name = isset($_POST["name"]) ? clean_value($_POST["name"]) : "";
$phone = isset($_POST["phone"]) ? clean_value($_POST["phone"]) : "";
$email = isset($_POST["email"]) ? clean_value($_POST["email"]) : "";
$room = isset($_POST["room"]) ? clean_value($_POST["room"]) : "";
$dates = isset($_POST["dates"]) ? clean_value($_POST["dates"]) : "";
$message = isset($_POST["message"]) ? clean_value($_POST["message"]) : "";

$body = "Имя: " . $name . "\n";
$body .= "Телефон: " . $phone . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Тип номера: " . $room . "\n";
$body .= "Даты проживания: " . $dates . "\n";
$body .= "Комментарий: " . $message . "\n";

$headers = "From: no-reply@example.ru\r\n";
if ($email) {
  $headers .= "Reply-To: " . $email . "\r\n";
}

if (mail($to, $subject, $body, $headers)) {
  echo "Спасибо! Ваша заявка отправлена.";
} else {
  echo "Ошибка отправки. Попробуйте позже.";
}
?>
