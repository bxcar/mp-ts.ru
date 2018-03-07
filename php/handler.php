<?php
$config = array(); // указываем, что переменная $config это массив
$config['server'] = "localhost"; //сервер MySQL. Обычно это localhost
$config['login'] ="cy97948_svm00db"; //пользователь MySQL
$config['passw'] = "670041"; //пароль от пользователя MySQL
$config['name_db'] = "cy97948_svm00db"; //название нашей БД

$connect = mysql_connect($config['server'], $config['login'], $config['passw']) or die("Error!"); // подключаемся к MySQL или, в случаи  ошибки, прекращаем выполнение кода
mysql_select_db($config['name_db'], $connect) or die("Error!"); // выбираем БД  или, в случаии ошибки, прекращаем выполнение кода
?>
