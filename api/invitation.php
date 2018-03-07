<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

if( !isset( $_GET['email'])) {
    $outp = '{"result":1,"description":"Email не указан"}';
    exit($outp);
}

if( !isset( $_GET['user'])) {
    $outp = '{"result":5,"description":"User ID не указан"}';
    exit($outp);
}

$role = 20;
if( isset( $_GET['role'] ) ) {
    $role = $_GET['role'];
}

$servername = 'localhost';
$username = 'cy97948_svm00db';
$password = '670041';

$conn = mysql_connect( $servername, $username, $password );
if( !$conn ) {
    exit( '{"result":2,"description":"Ошибка БД:' . mysql_connect_error() . '"}' );
}
mysql_select_db('cy97948_svm00db');

$query = "SELECT * FROM user WHERE user.email='" . $_GET["email"] ."'";

$result = mysql_query( $query, $conn );
if( !$result ) {
    exit( '{"result":2,"description":"Ошибка БД:' . mysql_error() . '"}'  );
}

if( mysql_num_rows( $result ) > 0 ) {
    $outp = '{"result":3,"description":"Пользователь уже существует"}';
    exit( $outp );
}

$query = "SELECT * FROM invitations WHERE email='" . $_GET["email"] ."'";

$result = mysql_query( $query, $conn );
if( !$result ) {
    exit( '{"result":2,"description":"Ошибка БД:' . mysql_error() . '"}'  );
}

if( mysql_num_rows( $result ) > 0 ) {
    $outp = '{"result":6,"description":"Приглашение для этого пользователя уже существует"}';
    exit( $outp );
}

$id = uniqid('', true);

$query = "INSERT INTO invitations (email, issuer, token, role) VALUES ('" . $_GET["email"] . "', " . $_GET["user"] . ", '" . $id . "', " . $role . ")";

if( ! mysql_query( $query, $conn ) ) {
    $outp = '{"result":4,"description":"Ошибка создания токена"}';
    exit( $outp );
}





    $subject = "TUNINGSOUZ: приглашение";

// compose headers
    $headers = "From: TUNINGSOUZ <noreply@appsasgard.ru>\r\n";
    $headers .= "Reply-To: noreply@appsasgard.ru\r\n";
    $headers .= "X-Mailer: PHP/".phpversion();

// compose message
    $message = "Здравствуйте " . $_GET["email"] . ",\r\n\r\n";
    $message .= " Вы приглашены в сервис TUNINGSOUZ. Для регистрации перейдите пожалуйста по ссылке ниже:\r\n";
    $message .= " http://mp-ts.ru/build/index.html?token=" . $id . "\r\n";
#    $message .= " http://build-1.tw1.ru/build/index.html?token=" . $id . "\r\n";
    $message .= " Если вы не хотите регистрироваться, то просто проигнорируйте это сообщение.\r\n\r\n";
    $message .= " С уважением,\r\nВаш TUNINGSOUZ\r\n";
// $message = wordwrap($message, 70);

// send email
    mail( $_GET["email"], $subject, $message, $headers );

$outp = '{"result":0,"description":"Ok","data":[{"invitation_token":"' . $id . '"}]}';

mysql_free_result($result);
mysql_close( $conn );
exit( $outp );
?>
