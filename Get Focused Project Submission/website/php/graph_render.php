<?php
	//header ('Content-Type: image/png');
	$dbhost = "localhost";
	$dbuser = "bf_cms";
	$dbpass = "password";
	$dbname = "brain_focus";
	$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
	if(mysqli_connect_errno()){
		die("Database connection failed: " . 
			 mysqli_connect_error() . 
			 " (" . mysqli_connect_errno(). ")"
		);
	}
	
	$query = "SELECT json_data FROM data WHERE id = 1";
	$result = mysqli_query($connection, $query);
	
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>Graph for </title>
	</head>
	<body>
		<?php
					
			while($row = mysqli_fetch_assoc($result)){ 
				$myArray = json_decode($row["json_data"]); 
/* 				print_r($myArray[0]->t);
				echo "<br />";
				print_r($myArray[0]->x);
				echo "<br />";
				print_r($myArray[0]->y);
				echo "<br />";*/
				print_r($myArray[0]); 
				echo "<hr />"; // horizontal line
			}
		// 4. Release returned data
			mysqli_free_result($result);	
		?>

	</body>
</html>



<?php	mysqli_close($connection); ?>




