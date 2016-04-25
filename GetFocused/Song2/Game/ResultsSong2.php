<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>GetFocused</title>

    <!-- Bootstrap Core CSS -->
    <link href="../../css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../../css/grayscale.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../../font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!-- Intro Header -->
    <header class="intro">
        <div class="intro-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <h1 class="brand-heading"><br>Get Focused!</h1>
                        <h3>Excellent</h3>
                        <img src="../../img/WaveSong2.jpg" alt="Original Soundwave" style="width:704px;height:228px;">
												<div style=" width:704px;height:228px; position: absolute; top: 260px; left: 38px; border:0;">	
													<canvas !important id="myCanvas" style="height:100%; width:100%;  background" > </canvas>
												</div>
                        <ul class="list-inline">
                            <li>
                                <a href="../../html/PlayPage.html" class="btn btn-default btn-lg"><i class="fa fa-play"></i><span class="">   Play again</span></a>
                            </li>
                            <li>
                                <a href="../../html/MainMenu.html" class="btn btn-default btn-lg"><i class="fa fa-home"></i><span class="">   Main Menu</span></a>
                            </li>
                            <li>
                                <a href="javascript:window.open('','_self').close();" class="btn btn-default btn-lg"><i class="fa fa-sign-out"></i><span class="">   Quit</span></a>
                             </li>
                        </ul>
												
										 <script>											
											function drawLine(x1, y1, x2, y2){
													context.beginPath();
													context.moveTo(x1, y1);
													context.quadraticCurveTo((x1+x2)/2,(y1+y2)/2, x2, y2);
													//context.lineTo(x2,y2);
													context.lineWidth =1;
													
													context.strokeStyle ='red';
													context.stroke();
												}
											var canvas = document.getElementById('myCanvas');
											var context = canvas.getContext('2d');
											var myGraphArray = <?php echo $_SESSION["json_data"];?>;
											
																					
											for( i=0; i < myGraphArray.length-1; i++){ 
												drawLine((myGraphArray[i].t * 704), (myGraphArray[i].y * 228), (myGraphArray[i+1].t* 704),( myGraphArray[i+1].y * 228));
											} 
												
											</script>
                        <br><br><br><br><br><br>
                    </div>
                </div>
            </div>
        </div>
    </header>

</body>

</html>

<?php 
	session_write_close();
	session_unset();
	session_destroy();

?>
