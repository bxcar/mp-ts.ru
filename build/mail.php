<?php

$name = $_POST['username'];
$phone = $_POST['phone'];
$skype = $_POST['q14_input14'];
$email = $_POST['email'];
$vk = $_POST['vk'];
$text = $_POST['text'];
$messegers = implode (', ' , $_POST['q13_clickTo13']);

$message = "
<table>

<tr>
<td>Имя</td>
<td>$name</td>
</tr>

<tr>
<td>Телефон</td>
<td>$phone</td>
</tr>

<tr>
<td>Почта</td>
<td>$email</td>
</tr>

<tr>
<td>Скайп</td>
<td>$skype</td>
</tr>

<tr>
<td>ВКонтакте</td>
<td>$vk</td>
</tr>

<tr>
<td>Мессдежеры</td>
<td>$messegers</td>
</tr>

<tr>
<td>Текст сообщения</td>
<td>$text</td>
</tr>

</table>
";

$headers= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

mail("carbon3d@bk.ru", "Письмо в техническую поддержку", $message, $headers);
header('Location: /support.html')
?>
