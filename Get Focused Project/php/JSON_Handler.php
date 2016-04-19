<?php
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
	
	$str_json = file_get_contents('php://input'); // get json string
	// 2. Perform database Query
	

	$query  = "INSERT INTO graph( ";
	$query .= "  jdoc ";
	$query .= " )VALUES( ";
	$query .= " '{$str_json}' ";
	$query .= ")";
	
	$result = mysqli_query($connection, $query); // True or false 

	
	if(!$result){

		die("Database query failed. " . mysqli_error($connection)); // the error will be there until another query is made
	}
?>
<?php	
	
	// 5. Close database connection
	mysqli_close($connection);

?>


