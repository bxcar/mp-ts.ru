<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

$servername = 'localhost';
$username = 'cy97948_svm00db';
$password = '670041';

$conn = mysql_connect( $servername, $username, $password );
if( !$conn ) {
    exit( '{"result":2,"description":"' . mysql_connect_error() . '"}' );
}
mysql_select_db('cy97948_svm00db');

$query = "INSERT INTO log (data) VALUES ('" . $_GET["data"] . "')";

if( ! mysql_query( $query, $conn ) ) {
    $outp = '{"result":4,"description":"Failed to save log"}';
    exit( $outp );
}

$outp = '{"result":0,"description":"Ok"}';

mysql_free_result($result);
mysql_close( $conn );
exit( $outp );
?>
