<?php
if(isset($_POST['submit'])){ //выполняем нижеследующий код, только если нажата кнопка
if(empty($_POST['user_name'])){ //если переменная логина пуста или не существует
echo"login empty"; // выводим сообщение об ошибке
}elseif(!preg_match("/[-a-zA-Z0-9]{3,15}/", $_POST['user_name'])){ //если переменная не соответствует шаблону -a-zA-Z0-9
echo"login error"; // выводим сообщение об ошибке
}elseif(empty($_POST['user_password'])){ //если переменная логина пуста или не существует
echo"password empty"; // выводим сообщение об ошибке
}elseif(!preg_match("/[-a-zA-Z0-9]{3,30}/", $_POST['user_password'])){ //если переменная не соответствует шаблону -a-zA-Z0-9
echo"password error"; // выводим сообщение об ошибке
}else{
$login = $_POST['user_name']; //присваеваем переменную
$password = md5($_POST['user_password']);//присваеваем переменную и кодируем её в md5 для безопасности
$query = mysql_query("SELECT * FROM `users` WHERE `login`='$login' AND `password`='$password'"); //отправляем запрос на выборку всего содержимого , где поле логин равно переменной $login, а поле password равно переменной $password
$row = mysql_num_rows($query); // считаем количество рядов результата запроса
if($row > 0){ //если их больше 0
//header( 'Location: http://www.yoursite.com/new_page.html' ); ; // выводим сообщение об удачной авторизации!
  echo "success";
}else{
  echo "error";
//echo "error"; // выводим сообщение об ошибке!
}
}
}
?>



<?php echo 'hello2'; ?>