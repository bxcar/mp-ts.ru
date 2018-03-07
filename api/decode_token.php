<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

if( !isset( $_GET['token'])) {
    $outp = '{"result":1,"description":"Приглашение не указано"}';
    exit($outp);
}

$servername = 'localhost';
$username = 'cy97948_svm00db';
$password = '670041';

$conn = mysql_connect( $servername, $username, $password );
if( !$conn ) {
    exit( '{"result":2,"description":"' . mysql_connect_error() . '"}' );
}

mysql_select_db('cy97948_svm00db');

$query = "SELECT * FROM invitations WHERE token='" . $_GET["token"] . "'";

$result = mysql_query( $query, $conn );
if( !$result ) {
    exit( 'Query failed: ' . mysql_error() );
}

if( mysql_num_rows( $result ) != 1 ) {
    $outp = '{"result":6,"description":"Такого приглашения не существует"}';
    exit( $outp );
}

$row = mysql_fetch_assoc( $result );
if( $row['isRedeemed'] ) {
    $outp = '{"result":7,"description":"Приглашение уже использовано"}';
    exit( $outp );
}
$outp = '{"result":0,"description":"Ok","data":[{"email":"' . $row["email"] . '", "issuer":"' . $row["issuer"] . '", "role":"' . $row["role"] . '"}]}';

mysql_free_result($result);
mysql_close( $conn );
exit( $outp );
?>
