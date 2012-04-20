<?php
DEFINE ('DB_USER','root');
DEFINE ('DB_PASSWORD','');
DEFINE ('DB_HOST','localhost');
DEFINE ('DB_NAME','yeeyee');

if ($dbc=@mysql_connect(DB_HOST,DB_USER,DB_PASSWORD))
{
	if (!mysql_select_db(DB_NAME))
	{
		trigger_error("Could not select the database!\n<br />MySQL error: ".mysql_error());
		exit();
	}
}
else
{
	trigger_error("Could not connect to MySQL!\n<br />MySQL error: ".mysql_error());
	exit();
}

function escape_data($data)
{
	if(ini_get('magic_quotes_gpc'))
	{
		$data=stripslashes($data);
	}
	if (function_exists('mysql_real_escape_string'))
	{
		global $dbc;
		$data=mysql_real_escape_string(trim($data),$dbc);
	}
	else
	{
		$data=mysql_escape_string(trim($data));
	}
	$data=htmlspecialchars($data,ENT_QUOTES);
	return $data;
}


function cookie_destroy($cookie){
	setcookie($cookie,'',time()-3600);
}
session_start();

mysql_query("SET NAMES utf8");
date_default_timezone_set("Asia/Hong_Kong");
?>