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

			$subject ="Новая заявка с сайта kaminskii.space";
			$subject1 = "=?utf-8?b?". base64_encode($subject) ."?="; // title

			$message1 ="\n\nИмя: ".$name."\n\nНомер телефона: " .$tel."\n\n"; // body message

			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "Content-type: text/html; charset=utf-8\r\n"; 
			$headers .= "From: kaminskii.space/\r\n";
			
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
