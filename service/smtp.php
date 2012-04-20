<?php
require_once('class.phpmailer.php');
include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

function smtpmail($to,$subject,$content)
{
    error_reporting(E_STRICT);
    date_default_timezone_set("Asia/Shanghai");
    $mail             = new PHPMailer(true); 
    $content             = eregi_replace("[\]",'',$content); 
    $mail->CharSet ="UTF-8";
    $mail->IsSMTP(); 
    $mail->IsHTML(true);
    $mail->SMTPDebug  = 1;                     
                                           // 1 = errors and messages
                                           // 2 = messages only
    $mail->SMTPAuth   = true;                  
    $mail->SMTPSecure = "ssl";                 
    $mail->Host       = "smtp.exmail.qq.com"; 
    $mail->Port       = 587;//25;
    $mail->Username   = "admin@yeeyee.net";
    $mail->Password   = "*secret*"; 
    $mail->SetFrom('admin@yeeyee.net', 'YeeYee.net');
    $mail->AddReplyTo("admin@yeeyee.net","YeeYee.net");
    $mail->Subject    = $subject;
    //$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
    $mail->MsgHTML($content);
    $address = $to;
    $mail->AddAddress($address, $address);
    //$mail->AddAttachment("images/phpmailer.gif");      // attachment 
    //$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment
    if(!$mail->Send()) {
        echo 'Sent email fail.'; 
    } else {
        echo 'email sent.'; 
    }
}
function signupmail($to,$subject,$content)
{
    error_reporting(E_STRICT);
    date_default_timezone_set("Asia/Shanghai");
    $mail             = new PHPMailer(true);
    $content             = eregi_replace("[\]",'',$content); 
    $mail->CharSet ="UTF-8";
    $mail->IsSMTP(); 
    $mail->IsHTML(true); // send as HTML
    $mail->SMTPDebug  = 1;
                                               // 1 = errors and messages
                                           // 2 = messages only
    $mail->SMTPAuth   = true;                 
    $mail->SMTPSecure = "ssl";               
    $mail->Host       = "smtp.exmail.qq.com";   
    $mail->Port       = 587;//25;                 
    $mail->Username   = "signup@yeeyee.net"; 
    $mail->Password   = "*secret*"; 
    $mail->SetFrom('signup@yeeyee.net', 'signup in YeeYee.net');
    $mail->AddReplyTo("admin@yeeyee.net","YeeYee.net");
    $mail->Subject    = $subject;
    //$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
    $mail->MsgHTML($content);
    $address = $to;
    $mail->AddAddress($address, $address);
    //$mail->AddAttachment("images/phpmailer.gif");      // attachment 
    //$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment
    if(!$mail->Send()) {
        echo 'Sent email fail.'; 
    } else {
        echo 'Email sent.'; 
    }
}
function sellmail($to,$subject,$content)
{
    error_reporting(E_STRICT);
    date_default_timezone_set("Asia/Shanghai");
    $mail             = new PHPMailer(true); 
    $content             = eregi_replace("[\]",'',$content); 
    $mail->CharSet ="UTF-8";
    $mail->IsSMTP();
    $mail->IsHTML(true);
    $mail->SMTPDebug  = 1; 
                                           // 1 = errors and messages
                                           // 2 = messages only
    $mail->SMTPAuth   = true;    
    $mail->SMTPSecure = "ssl";
    $mail->Host       = "smtp.exmail.qq.com";
    $mail->Port       = 587;//25;
    $mail->Username   = "sell@yeeyee.net";
    $mail->Password   = "*secret*";
    $mail->SetFrom('sell@yeeyee.net', 'something to sell');
    $mail->AddReplyTo("admin@yeeyee.net","YeeYee.net");
    $mail->Subject    = $subject;
    $mail->MsgHTML($content);
    $address = $to;
    $mail->AddAddress($address, $address);
    //$mail->AddAttachment("images/phpmailer.gif");      // attachment 
    //$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment
    if(!$mail->Send()) {
        return 0; 
    }else{
		return 1;
	}
}
function buymail($to,$subject,$content)
{
    error_reporting(E_STRICT);
    date_default_timezone_set("Asia/Shanghai");
    $mail             = new PHPMailer(true); 
    $content             = eregi_replace("[\]",'',$content);
    $mail->CharSet ="UTF-8";
    $mail->IsSMTP();
    $mail->IsHTML(true);
    $mail->SMTPDebug  = 1;                   
                                           // 1 = errors and messages
                                           // 2 = messages only
    $mail->SMTPAuth   = true;  
    $mail->SMTPSecure = "ssl";  
    $mail->Host       = "smtp.exmail.qq.com";
    $mail->Port       = 587;//25; 
    $mail->Username   = "buy@yeeyee.net";
    $mail->Password   = "*secret*";
    $mail->SetFrom('buy@yeeyee.net', 'something to buy');
    $mail->AddReplyTo("admin@yeeyee.net","YeeYee.net");
    $mail->Subject    = $subject;
    				//$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
    $mail->MsgHTML($content);
    $address = $to;
    $mail->AddAddress($address, $address);
					//$mail->AddAttachment("images/phpmailer.gif");      // attachment 
					//$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment
    if(!$mail->Send()) {
        return 0; 
    }else{
		return 1;
	}
}
function passwdmail($to,$subject,$content)
{
    error_reporting(E_STRICT);
    date_default_timezone_set("Asia/Shanghai");
    $mail             = new PHPMailer(true);
    $content             = eregi_replace("[\]",'',$content); 
    $mail->CharSet ="UTF-8";
    $mail->IsSMTP(); 
    $mail->IsHTML(true);
    $mail->SMTPDebug  = 1;
                                           // 1 = errors and messages
                                           // 2 = messages only
    $mail->SMTPAuth   = true;   
    $mail->SMTPSecure = "ssl";  
    $mail->Host       = "smtp.exmail.qq.com"; 
    $mail->Port       = 587;//25;
    $mail->Username   = "setpasswd@yeeyee.net";
    $mail->Password   = "*secret*"; 
    $mail->SetFrom('setpasswd@yeeyee.net', 'set password of YeeYee.net');
    $mail->AddReplyTo("admin@yeeyee.net","YeeYee.net");
    $mail->Subject    = $subject;
    //$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
    $mail->MsgHTML($content);
    $address = $to;
    $mail->AddAddress($address, $address);
    //$mail->AddAttachment("images/phpmailer.gif");      // attachment 
    //$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment
    if(!$mail->Send()) {
        echo 'Sent email fail.'; 
    } else {
        echo 'Email sent.'; 
    }
}
?>
