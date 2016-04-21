<?php

	// to be removed when done developing
	session_start();
	var_dump($_SESSION);
	session_unset(); 
	session_destroy();
	session_write_close();

?>