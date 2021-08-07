<?php require_once 'includes/header.php'; ?>

<?php
    $msg = "";
	use PHPMailer\PHPMailer\PHPMailer;
	include_once "PHPMailer/PHPMailer.php";
	include_once "PHPMailer/Exception.php";
	include_once "PHPMailer/SMTP.php";

	if (isset($_POST['submit'])) {
		$subject = $_POST['subject'];
		$email = $_POST['email'];
		$message = $_POST['message'];

		if (isset($_FILES['attachment']['name']) && $_FILES['attachment']['name'] != "") {
			$file = "attachment/" . basename($_FILES['attachment']['name']);
			move_uploaded_file($_FILES['attachment']['tmp_name'], $file);
		} else
			$file = "";

		$mail = new PHPMailer();

		//if we want to send via SMTP
		$mail->Host = "smtp.gmail.com";
		$mail->isSMTP();
		$mail->SMTPAuth = true;
		$mail->Username = "manoj.shahi.ms@gmail.com";
		$mail->Password = "manojshahi45";
		$mail->SMTPSecure = "ssl"; //TLS
		$mail->Port = 465; //587

		$mail->setFrom('manoj.shahi.ms@gmail.com','Manoj Shahi');
		$mail->addAddress($email);
		$mail->Subject = $subject;
		$mail->isHTML(true);
		$mail->Body = $message;
		$mail->addAttachment($file);

		if ($mail->send())
		    $msg = "<b>Your email has been sent, Thank You!</b>";
		else
		    $msg = "<b>Please try again!</b>";

		//unlink($file);
	}
?>

<div class="col-md-12">
<ol class="breadcrumb">
		  <li><a href="dashboard.php">Home</a></li>		  
		  <li class="active">Send Email</li>
		</ol>
		</div>

<div class="container">
		<div class="row vertical">
			<div class="col-md-5 col-md-offset-4">
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">Please Send Your Message</h3>
					</div>
					
					<div class="panel-body">
	                <form method="post" action="sendemail.php" enctype="multipart/form-data">
					<input class="form-control" name="subject" placeholder="Subject..."><br>
					<input class="form-control" name="email" type="email" placeholder="Email..."><br>
					<textarea placeholder="Message..." class="form-control" name="message"></textarea><br>
					<input class="form-control" type="file" name="attachment"><br>
					<input class="btn btn-primary" name="submit" type="submit" value="Send Email"><br>
					<span><?php if(isset($msg)){ echo $msg;} ?></span>
				    </form>
	                </div>
					
				</div>
				
			</div>
			
		</div>
		
	</div>
	
<?php require_once 'includes/footer.php'; ?>






