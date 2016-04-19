<?php
	$servername = "localhost";
	$username = "root";
	$password = "rynn2610";
	$dbname = "brain_focus";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT id, jdoc FROM graph";
	$result = $conn->query($sql);
?>
	

<!DOCTYPE HTML>
<html>
	<head>
		<title>DB Table</title>
	</head>
	<body>
		<?php
			if ($result->num_rows > 0) {
				// output data of each row
				while($row = $result->fetch_assoc()) {
					$jsonString = $row["jdoc"];
					echo "id: " . $row["id"]. " - jdoc: " . json_decode($jsonString). "<br>";
				}
			}
			else {
				echo "0 results";
			}
			$conn->close();
		?>
	</body>
</html>


