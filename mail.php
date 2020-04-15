<?php

$recepient = "vitaliyzinoviev@mail.ru";//почта
$sitename  = 'MAXICO';
$subject   = "Новая заявка с сайта \"$sitename\"";
$name = "\"$sitename\"";
$email = 'noreply@site.ru';

$message="<table border='1'>";

if (isset($_POST['form'])){
	$message .= table_tr('Форма',$_POST["form"]);
}
if (isset($_POST['name'])){
	$message .= table_tr('Имя',$_POST["name"]);
}
if (isset($_POST['phone'])){
	$message .= table_tr('Телефон',$_POST["phone"]);
}
if (isset($_POST['email'])){
	$message .= table_tr('Email',$_POST["email"]);
}
if (isset($_POST['site'])){
	$message .= table_tr('Сайт',$_POST["site"]);
}

$message .="</table>";

function table_tr($title,$value){
	if ($value=='') return false;
	return "
	<tr>
		<td width='200' height='40' bgcolor='#eee' style='padding: 5px;'>
			$title
		</td>
		<td width='300' style='padding: 5px;'>
			$value
		</td>
	</tr>";
}
function checkbox($array){
	$check = implode(", ", $array);
	$check = substr($check, 0);
	return $check;
}


mail($recepient, $subject, $message, "From: $name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");
?>