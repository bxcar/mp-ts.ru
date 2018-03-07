

<?php
if(isset($_POST['finish'])){ //выполняем нижеследующий код, только если нажата кнопка
$query = mysql_query("SELECT * FROM `users`  WHERE `login`='".$_POST['user_name']."'"); //отправляем запрос на выборку всего содержимого , где поле логин равно переменной $login
  $row = mysql_num_rows($query); // считаем количество рядов результата запроса

if(empty($_POST['user_name'])){ //если переменная логина пуста или не существует
echo"login error"; // выводим сообщение об ошибке
  }elseif(!preg_match("/[-a-zA-Z0-9]{3,15}/", $_POST['user_name'])){ //если переменная не соответствует шаблону -a-zA-Z0-9
echo"login empty"; // выводим сообщение об ошибке
  }elseif(empty($_POST['user_password'])){ //если переменная логина пуста или не существует
echo"password empty"; // выводим сообщение об ошибке
  }elseif($row > 0){ //если переменная больше 0
echo"password exist"; // выводим сообщение об ошибке
  }elseif(!preg_match("/[-a-zA-Z0-9]{3,30}/", $_POST['user_password'])){ //если переменная не соответствует шаблону -a-zA-Z0-9
echo"passord error"; // выводим сообщение об ошибке
  }elseif(empty($_POST['user_password'])){ //если переменная логина пуста или не существует
echo"password retype empty"; // выводим сообщение об ошибке
  }elseif(!preg_match("/[-a-zA-Z0-9]{3,30}/", $_POST['user_password'])){ //если переменная не соответствует шаблону -a-zA-Z0-9
echo"password error"; // выводим сообщение об ошибке
  }elseif($_POST['user_password2'] != $_POST['user_password']){ //если переменная пароля и переенная  повтора пароля не одинаковы
echo"password retype error"; // выводим сообщение об ошибке
  }elseif(empty($_POST['user_email'])){ //если переменная E-mail'a пуста
echo"mail empty"; // выводим сообщение об ошибке
  }elseif(!preg_match("/[-a-zA-Z0-9_]{3,20}@[-a-zA-Z0-9]{2,64}\.[a-zA-Z\.]{2,9}/", $_POST['user_email'])){ //регулярка на проверку правильности email
echo"mail error"; // выводим сообщение об ошибке
  }else{ //если же ошибок нет
  $login = $_POST['user_name']; //присваеваем переменную
  $password = md5($_POST['user_password']);//присваеваем переменную и кодируем её в md5 для безопасности
  $email = $_POST['user_email'];//присваеваем переменную
  $insert = mysql_query("INSERT INTO `users` (`login` ,`password` ,`email` ) VALUES ('$login', '$password', '$email')"); //выполняем запрос на добавление нового пользователя
  if($insert == true){
  echo "succes";
  }else{
  echo "error";
  }

  }

}
?>

<?php echo 'hello1'; ?>