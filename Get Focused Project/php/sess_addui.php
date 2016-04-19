<?php
	session_start();
	header("Access-Control-Allow-Origin : *" );
	header("Access-Control-Allow-Headers : Content-type");
?>
<?php
	$ui_package = json_decode(file_get_contents('php://input'),true);
	foreach($ui_package as $head => $head_value){
		$_SESSION["{$head}"] = $head_value;
	}
	
?>



