<?php

	$post = (!empty($_POST)) ? true : false;

	if($post) {
		$name = htmlspecialchars($_POST['name']);
		$tel = htmlspecialchars($_POST['phone']);
		$error = '';

		if(!$name) {
			$error .= 'Пожалуйста введите ваше имя<br />';
		}
		
		if(!$error) {


			$name_tema = "=?utf-8?b?". base64_encode($name) ."?=";

			$subject ="Новая заявка с сайта Agency.DK";
			$subject1 = "=?utf-8?b?". base64_encode($subject) ."?=";

			$message1 ="\n\nName: ".$name."\n\nPhone: " .$tel."\n\n";

			$header = "Content-Type: text/plain; charset=utf-8\n";

			$header .= "From: Новая заявка <example@gmail.com>\n\n";
			$to = "kaminskiispace@mail.ru";
			$mail = mail($to, $subject1, iconv ('utf-8', 'windows-1251', $message1), iconv ('utf-8', 'windows-1251', $header));
			if($mail) {
				echo 'OK';
			}

		}
		else {
			echo 'error';	
		}
	}
?>