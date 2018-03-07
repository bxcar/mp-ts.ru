<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

if( !isset( $_GET['email'])) {
    $outp = '{"result":"1","description":"Email not specified"}';
    exit($outp);
}

$servername = 'localhost';
$username = 'cy97948_svm00db';
$password = '670041';

$conn = mysql_connect( $servername, $username, $password );
if( !$conn ) {
    exit( '{"result":"2","description":"' . mysql_connect_error() . '"}' );
}
#mysql_select_db('cd15707_svm00db');
mysql_select_db('cy97948_svm00db');

$query = "SELECT * FROM user WHERE user.email='" . $_GET["email"] ."'";

$result = mysql_query( $query, $conn );
if( !$result ) {
    exit( 'Query failed: ' . mysql_error() );
}

if( mysql_num_rows( $result ) != 1 ) {
    $outp = '{"result":"3","description":"No such user"}';
    exit( $outp );
}

$id = uniqid('', true);
$query = "UPDATE user SET password_reset_token='" . $id . "' WHERE email='" . $_GET["email"] . "'";

if( ! mysql_query( $query, $conn ) ) {
    $outp = '{"result":"4","description":"Failed to set password recovery token"}';
    exit( $outp );
}

    $subject = "ВИНИЛ: восстановление пароля";

// compose headers
    $headers = "From: vinil <noreply@appsasgard.ru>\r\n";
    $headers .= "Reply-To: noreply@appsasgard.ru\r\n";
    $headers .= "X-Mailer: PHP/".phpversion();

// compose message
    $message = "Здравствуйте " . $_GET["email"] . ",\r\n\r\n";
    $message .= " Для восстановления пароля перейдите пожалуйста по ссылке ниже:\r\n";
#    $message .= " http://build-1.tw1.ru/build/confirm.php?u=" . $id . "\r\n";
    $message .= " http://mp-ts.ru/build/confirm.php?u=" . $id . "\r\n";
    $message .= " Если вы не запрашивали восстановление пароля, то просто проигнорируйте это сообщение.\r\n\r\n";
    $message .= " С уважением,\r\nВаш Винил\r\n";
// $message = wordwrap($message, 70);

// send email
    mail( $_GET["email"], $subject, $message, $headers );

$outp = '{"result":"0","description":"Ok","data":[{"reset_token":"' . $id . '"}]}';

mysql_free_result($result);
mysql_close( $conn );
exit( $outp );
?>
