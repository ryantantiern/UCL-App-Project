<?php
	session_start();
	header("Access-Control-Allow-Origin : *" );
	header("Access-Control-Allow-Headers : Content-type");
?>
<?php 
	// 1. Create a database connection
	$dbhost = "localhost";
	$dbuser = "bf_cms";
	$dbpass = "password";
	$dbname = "brain_focus";
	$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
	// Test if connection occured.
	if(mysqli_connect_errno()){
		die("Database connection failed: " . 
			 mysqli_connect_error() . 
			 " (" . mysqli_connect_errno(). ")"
		);
	}
?>
<?php
	$y_plot = array();
	$x_plot = array();
	$time = array();
	
	$ui_package = json_decode(file_get_contents('php://input'));
	foreach($ui_package as $obj){
		array_push($x_plot, $obj->{'x'}); // change to calculate deviation from a starting x pos instead
		array_push($y_plot, $obj->{'y'});
		array_push($time, $obj->{'t'});
	}	
	
	$_SESSION["y_plot"] = $y_plot;
	$_SESSION["x_plot"] = $x_plot;
	$_SESSION["time"] = $time;
	$_SESSION["json_data"] = json_encode($ui_package);
	
?>



	
<?php
	$gender = intval($_SESSION["gender"]);
	$dob =  $_SESSION["dob"];
	$musicality = intval($_SESSION["musicality"]);

	
	$query1  = "INSERT INTO user_info( ";
	$query1 .= "gender, dob, musicality ";
	$query1 .= " ) VALUES( ";
	$query1 .= "'{$gender}', '{$dob}', '{$musicality}'";
	$query1 .= ");";
	
	$song = intval($_SESSION["song"]);
	$json_data = $_SESSION["json_data"];
	
	$query2  = "INSERT INTO data( ";
	$query2 .= "song, json_data ) VALUES( ";
	$query2 .= "'{$song}','{$json_data}' ";
	$query2 .= ");";
	
	$userinfo = mysqli_query($connection, $query1); // True or false
	$data = mysqli_query($connection, $query2);
	
 if(!$userinfo){
		die("Database query failed. " . mysqli_error($connection)); // the error will be there until another query is made
	} 
	
	if(!$data){
		die("Database query failed. " . mysqli_error($connection)); // the error will be there until another query is made
	}
	
?>


<?php	
	
	session_write_close();
	mysqli_close($connection);


?>





