<?php

namespace Controllers\edu_login;

use \Helpers\Session;
use \Helpers\Url;
use \Core\View;
use Core\Config;

\Yabacon\Paystack::registerAutoloader();

class courses extends \Core\Controller
{


	private $allow;
	public $error;
	public $msg;

	public function __construct()
	{

		// var_dump('kore');exit;

		$this->msg = new \Plasticbrain\FlashMessages\FlashMessages();

		if (Session::get('loggedin')) {
			$this->allow = true;

		} else {
			$this->allow = false;
			//url::redirect('login');
		}
		$this->model = new \Models\edu_login\Users();
	}

	public function index()
	{
		$number_of_items = 6;
		if ($this->allow) {
			$model_obj = new\Models\edu_login\Course();
			$model_obj->getCourses($number_of_items);
			$data["courses"] = $model_obj->courses;
			$data["number_of_courses"] = $model_obj->number_of_courses;
			$data["number_of_pages"] = $model_obj->number_of_pages;
			$data["current_page"] = $model_obj->current_page;
			$data["categories"] = $model_obj->categories;
			$data["category_name"] = "All Courses";
			$data["category_description"] = "Browse all our courses";

			View::renderTemplate('loggedin_user_header', $data);
			View::render('edu_login/courses', $data, $error);
			View::renderTemplate('footer', $data);


		} else {
			$number_of_items = 6;

			$model_obj = new\Models\edu_login\Course();
			$model_obj->getCourses($number_of_items);
			$data["courses"] = $model_obj->courses;
			$data["number_of_courses"] = $model_obj->number_of_courses;
			$data["number_of_pages"] = $model_obj->number_of_pages;
			$data["current_page"] = $model_obj->current_page;
			$data["categories"] = $model_obj->categories;
			$data["category_name"] = "All Courses";
			$data["category_description"] = "Browse all our courses";
			View::renderTemplate('confirmed_header', $data);
			View::render('edu_login/courses', $data, $error);
			View::renderTemplate('footer', $data);

		}
	}

	public function admin_course_index(){
		if(Session::get("role")==2)
		{
			$tutor_model = new\Models\edu_login\Users();
			$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));



			View::renderTemplate('user_header',$data);
			View::render('edu_login/tutor-dashboard',$data,$error);
			View::renderTemplate('student_dashboard_footer',$data);
		}
	}

	public function display_courses($path)
	{
		$model_obj = new\Models\edu_login\Course();
		$data['courses'] = $model_obj->getCategoryCourses($path);
		$data["categories"] = $model_obj->categories;
		$data["category_name"] = $model_obj->category_name;
		$data["category_description"] = $model_obj->category_description;

		if ($this->allow) {
			View::renderTemplate('loggedin_user_header', $data);
			View::render('edu_login/courses', $data, $error);
			View::renderTemplate('footer', $data);
		} else {
			View::renderTemplate('confirmed_header', $data);
			View::render('edu_login/courses', $data, $error);
			View::renderTemplate('footer', $data);
		}


	}

	public function display_course($path)
	{
		if ($_POST["submit"]) 
			{
				$firstname = $_POST['firstname'];
				$lastname = $_POST['lastname'];
				$email = $_POST['email'];
				$phone = $_POST['phone'];
				$password = $_POST['password'];
				// $confirm_password = $_POST['confirm_password'];

				#insert the sign up details into the $postdata array
				$postdata = array(
					'userid' =>  sha1($email),
					'firstname' => $firstname,
					'lastname' => $lastname,
					'email' => $email,
					'phone' => $phone,
					'password' => $password,
					'role' => '1'
					);
				if(!$this->model->error)
					{
						$new_postdata = array(
						'userid' =>  sha1($email),
						'firstname' => $firstname,
						'lastname' => $lastname,
						'email' => $email,
						'phone' => $phone,
						'password' => sha1($password),
						'role' => '1'
						);
						$this->model->addUser($new_postdata);
					
						$email = $_POST['email'];
						$password = $_POST['password'];
						$model_obj = new\Models\edu_login\Auth();
						$data = $model_obj->verify($email);
						
						// if(sha1($password) == $data[0]->password and $email == $data[0]->email){
							Session::set('loggedin',true);
							Session::set('userid',$data[0]->userid);
							Session::set('firstname',$data[0]->firstname);
							Session::set('lastname',$data[0]->lastname);
							Session::set('email',$data[0]->email);
							Session::set('img_path',$data[0]->img_path);
							Session::set('user_id',$data[0]->user_id);
							Session::set('role',$data[0]->role);

							$to = Session::get('email');
							$subject = "Successful sign up on davtonlearn.com";
							$message =  "<html><body><div style='text-align:center;'><img src = 'http://davtonlearn.com/images/davton.png'><p>Dear Student, you have successfully signed up on davtonlearn.com
							 			<br>You can start enjoying the course content by subscribing for the available courses. We hope you have a great experience with us. </p>
							 			<p> davtonlearn.com</p></div></html></body>";
							$headers  = 'MIME-Version: 1.0' . "\r\n";
							$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
							$headers .= 'From: Davtonlearn <noreply@davtonlearn.com>' . "\r\n";

							#send mail to tobi@davtonlearn.com
							$to_admin = 'tobi@davtonlearn.com';
							$to_admin2 = 'tayo@davtonlearn.com';
							$subject_admin = "New Student Signup made to davtonlearn.com";
							$message_admin = "<html><body><div style='text-align:center;'><img src = 'http://davtonlearn.com/images/davton.png'><p> Dear Admin a student has just registered
							 			<br>Email: ".$data[0]->email." <br> Fullname: ".$data[0]->firstname." ".$data[0]->lastname." </p>
							 			<p> davtonlearn.com</p></div></html></body>";

							mail($to_admin, $subject_admin, $message_admin, $headers);
							mail($to_admin2, $subject_admin, $message_admin, $headers);

							mail($to,$subject,$message,$headers);
						// }
					}

				$user_model = new\Models\edu_login\Users();
				Session::set('promo', true);#

				$data['student_details'] = $user_model->get_user_details(Session::get('userid'));
				Url::redirect('payment/pmp');
				

	    }

		if (isset($_GET['auth_id'])) {
			$user_model = new\Models\edu_login\Users();
			$data['user_details'] = $user_model->get_user_details($_GET['auth_id']);


			Session::set('loggedin', true);
			Session::set('userid', $data['user_details'][0]->userid);
			Session::set('firstname', $data['user_details'][0]->firstname);
			Session::set('lastname', $data['user_details'][0]->lastname);
			Session::set('email', $data['user_details'][0]->email);
			Session::set('img_path', $data['user_details'][0]->img_path);
			Session::set('user_id', $data['user_details'][0]->user_id);

			$data['student_details'] = $user_model->get_user_details(Session::get('userid'));
			$data['firstname'] = $data['student_details'][0]->firstname;
			$data['lastname'] = $data['student_details'][0]->lastname;
			$data['email'] = $data['student_details'][0]->email;

			$model_obj = new\Models\edu_login\Course();
			$model = new\Models\edu_login\Course();
			$data['course_detail'] = $model_obj->getCourseDetails($path);
			$data['cat'] = $model_obj->get_categories();
			$data['courses'] = $model_obj->get_random_courses();
			$data['course'] = $model->get_course_details($path);
			$id = $data['course'][0]->course_id;
			$data['cat'] = $model->get_categories();
			$data['courses'] = $model->get_random_courses();
			$data['courses_header'] = $model->get_courses();
			$data['course_url'] = $path;
			Session::set('course_id', $id);


		}


		$user_model = new\Models\edu_login\Users();
		$data['student_details'] = $user_model->get_user_details(Session::get('userid'));

		$model_obj = new\Models\edu_login\Course();
		$data['course_detail'] = $model_obj->getCourseDetails($path);
		$data['cat'] = $model_obj->get_categories();
		$data['courses'] = $model_obj->get_random_courses();
		$data['feature'] = $model_obj->getFeatures($data["course_detail"][0]->course_id);
		$data['recent_courses'] = $model_obj->get_recent_courses();
		$model = new\Models\edu_login\Course();
		$data['course'] = $model->get_course_details($path);
		$id = $data['course'][0]->course_id;

		$data['course_tutor'] = $model_obj->get_course_tutor($data['course_detail'][0]->course_id);
		Session::set('course_id', $id);

		#check if course has a curriculum yet

		#if course is not approved yet
		if ($data['course'][0]->course_status == 0) {
			$model = new\Models\edu_login\Course();
			$model_test = new\Models\edu_login\Testimonials();
			$data['cat'] = $model->get_categories();
			$data['courses'] = $model->get_random_courses();
			$data['courses_header'] = $model->get_courses();
			$data['recent_courses'] = $model->get_recent_courses();
			$data['tech'] = $model->get_tech_courses();
			$data['testimonials'] = $model_test->get_general_testimonial();

			if (Session::get('loggedin')) {

				if (isset($_POST['book_course'])) {
					$model = new\Models\edu_login\Course();
					$postdata = array(
						'fullname' => $_POST['fullname'],
						'email' => $_POST['email'],
						'phone' => $_POST['phone'],
						'course' => $data['course'][0]->course_title

					);

					$model->makeBookings($postdata);

					$this->sendMail($_POST['fullname'],$_POST['email'], $_POST['phone'], $data['course'][0]->course_title);
					Url::redirect("course/" . $data['course'][0]->course_url . "?booking_successful='success'");
				} else {

					$data['course_title'] = $data['course_detail'][0]->course_title;
					View::renderTemplate('loggedin_user_header', $data);
					View::render('edu_login/bookings', $data, $error);
					View::renderTemplate('footer', $data);

				}
			} else {
				if (isset($_POST['book_course'])) {
					$model = new\Models\edu_login\Course();
					$postdata = array(
						'fullname' => $_POST['fullname'],
						'email' => $_POST['email'],
						'phone' => $_POST['phone'],
						'course' => $data['course'][0]->course_title

					);

					$model->makeBookings($postdata);
					Url::redirect("course/" . $data['course'][0]->course_url . "?booking_successful='success'");

				} else {
					$data['course_title'] = $data['course_detail'][0]->course_title;
					View::renderTemplate('confirmed_header', $data);
					View::render('edu_login/bookings', $data, $error);
					View::renderTemplate('footer', $data);

				}
			}
		} else {
			
			#get payment response from cash envo
			if (isset($_GET['course_enrolled'])) {
				function getStatus($transref, $mertid, $type = '', $sign)
				{
					$request = 'mertid=' . $mertid . '&transref=' . $transref . '&respformat=' . $type . '&signature=' . $sign; //initialize the request variables
					//$url = 'https://www.cashenvoy.com/sandbox/?cmd=requery'; //this is the url of the gateway's test api
					$url = 'https://www.cashenvoy.com/webservice/?cmd=requery'; //this is the url of the gateway's live api
					$ch = curl_init(); //initialize curl handle
					curl_setopt($ch, CURLOPT_URL, $url); //set the url
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //return as a variable
					curl_setopt($ch, CURLOPT_POST, 1); //set POST method
					curl_setopt($ch, CURLOPT_POSTFIELDS, $request); //set the POST variables
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
					$response = curl_exec($ch); // grab URL and pass it to the browser. Run the whole process and return the response
					curl_close($ch); //close the curl handle
					return $response;
				}

				$key = 'fb55fceecbb0445d548fd7b5ffbbc5c1';
				$transref = $_POST['ce_transref'];
				$mertid = 2625;
				$type = ''; //Data return format. Options are xml or json. leave blank if you want data returned in string format.
				$cdata = $key . $transref . $mertid;
				$signature = hash_hmac('sha256', $cdata, $key, false);
				$response = getStatus($transref, $mertid, $type, $signature);

				$data = explode('-', $response);
				$returned_transref = $data[0];
				$returned_status = $data[1];
				$returned_amount = $data[2];


				$payment_model = new\Models\edu_login\Course();

				$data['transaction_details'] = $payment_model->verifyTransaction($transref);


				#if transaction is successful
				if ($returned_status == "C00") {
					if ($data['transaction_details'][0]->payment_price == $returned_amount) {
						$where = array('payment_transaction_id' => $data['transaction_details'][0]->payment_transaction_id);
						$updateData = array(
							'status' => 'paid'
						);
						$payment_model->updatePaymentDetails($updateData, $where);
						$course_id = $payment_model->get_course_details($_GET['course_enrolled'])[0]->course_id;


						$time_duration = $data['transaction_details'][0]->duration;
						$start_date = date("Y-m-d ", time());

						$to = strtotime('+' . $time_duration . ' days', time());
						$end_date = date("Y-m-d ", $to);


						$postdata = array(
							'user_id' => Session::get('user_id'),
							'course_id' => $course_id,
							'start_date' => $start_date,
							'end_date' => $end_date
						);

						$payment_model->createEnrollment($postdata);
						$payment_model->createRegistration($postdata);

						$to = Session::get('temp_email');
						$subject = "Course Payment made to davtonlearn.com";
						$message = "<html><body><div style='text-align:center;'><img src = 'http://davtonlearn.com/images/davton.png'><p>Your payment of $returned_amount for the davton course has been successfully received.
							 			<br>You can start enjoying the course contents from your dashboard. </p>
							 			<p> davtonlearn.com</p></div></html></body>";
						$headers = 'MIME-Version: 1.0' . "\r\n";
						$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
						$headers .= 'From: Davtonlearn <noreply@davtonlearn.com>' . "\r\n";

						mail($to, $subject, $message, $headers);

						#send mail to tobi@davtonlearn.com
						$to_admin = 'tobi@davtonlearn.com';
						$subject_admin = "Course Payment made to davtonlearn.com";
						$message_admin = "<html><body><div style='text-align:center;'><img src = 'http://davtonlearn.com/images/davton.png'><p> payment of $returned_amount has been made for davton bootcamp class
							 			<br>  </p>
							 			<p> davtonlearn.com</p></div></html></body>";

						mail($to_admin, $subject_admin, $message_admin, $headers);

					}

					Url::redirect('dashboard');


				} #If insufficient fund
				else if ($returned_status == "C04") {
					$where = array('payment_transaction_id' => $data['transaction_details'][0]->payment_transaction_id);
					$updateData = array(
						'status' => 'Insufficient Fund'
					);
					$payment_model->updatePaymentDetails($updateData, $where);

					Url::redirect('payment/' . $_GET['course_enrolled'] . '?incomplete_transaction=Insufficient funds');
				} #If User Cancelled
				else if ($returned_status == "C01") {
					$where = array('payment_transaction_id' => $data['transaction_details'][0]->payment_transaction_id);
					$updateData = array(
						'status' => 'User Cancellation'
					);
					$payment_model->updatePaymentDetails($updateData, $where);

					Url::redirect('payment/' . $_GET['course_enrolled'] . '?incomplete_transaction=User cancellation');
				} #If  User cancellation by inactivity.
				else if ($returned_status == "C02") {
					$where = array('payment_transaction_id' => $data['transaction_details'][0]->payment_transaction_id);
					$updateData = array(
						'status' => 'User cancellation by inactivity.'
					);
					$payment_model->updatePaymentDetails($updateData, $where);

					Url::redirect('payment/' . $_GET['course_enrolled'] . '?incomplete_transaction= User cancellation by inactivity');
				} #If  No transaction record.
				else if ($returned_status == "C03") {
					$where = array('payment_transaction_id' => $data['transaction_details'][0]->payment_transaction_id);
					$updateData = array(
						'status' => 'No transaction record.'
					);
					$payment_model->updatePaymentDetails($updateData, $where);

					Url::redirect('payment/' . $_GET['course_enrolled'] . '?incomplete_transaction=No transaction record.');
				} #If  Transaction failed
				else if ($returned_status == "C05") {
					$where = array('payment_transaction_id' => $data['transaction_details'][0]->payment_transaction_id);
					$updateData = array(
						'status' => 'Transaction failed'
					);
					$payment_model->updatePaymentDetails($updateData, $where);

					Url::redirect('payment/' . $_GET['course_enrolled'] . '?incomplete_transaction=Transaction failed');
				}


			} else {
				$check = $model->check($id);
				if ($check[0]->count > 0) {

					$data['sections'] = $model->get_course_curriculum_sections($id);
				}

				#check if section has a video yet
				$check2 = $model->check_section_exist($data['sections'][0]->section_id, $id);
				if ($check2[0]->count > 0) {

					$data['sec_vid'] = $model->get_section_video($data['sections'][0]->section_id, $id);
					$data['sec_quiz'] = $model->get_section_quiz($data['sections'][0]->section_id, $id);
				}
				$data['cat'] = $model->get_categories();
				$data['courses'] = $model->get_random_courses();
				$data['courses_header'] = $model->get_courses();

				#When user clicks on the enroll button for a course

				if (isset($_GET["enroll"]) and Session::get('loggedin')) {
					$data['student_details'] = $user_model->get_user_details(Session::get('userid'));
					Url::redirect('payment/' . $data['course_detail'][0]->course_url);


				} else if (Session::get('loggedin') and Session::get('user_id') == $data["course_detail"][0]->course_creator) {
					$this->allow = true;

					if (isset($_POST["feature"])) {
						$postdata = array(
							'course_feature_icon' => $_POST['icon'],
							'course_id' => $data["course_detail"][0]->course_id,
							'course_feature_text' => $_POST['feature_text']
						);
						$model_obj->addFeature($postdata);
						Url::redirect('course/' . $data["course_detail"][0]->course_url);
					}

					if (isset($_POST["certification"])) {
						$postdata = array(

							'course_id' => $data["course_detail"][0]->course_id,
							'course_certification_text' => $_POST['certification_text']

						);
						$model_obj->addCertification($postdata);
					}

					if (isset($_POST["faq"])) {
						$postdata = array(

							'course_id' => $data["course_detail"][0]->course_id,
							'course_faq_text' => $_POST['faq_text']
						);
						$model_obj->addFaq($postdata);
					}


					View::renderTemplate('user_header', $data);
					View::render('edu_login/instructor_course', $data, $error);
					View::renderTemplate('footer', $data);

				} else if (Session::get('loggedin') and $model_obj->checkEnrollment(Session::get('user_id'), $data["course_detail"][0]->course_id)) {


					$data['course_dates'] = $model->get_course_dates(Session::get('user_id'), $data["course_detail"][0]->course_id);

					$end_date = substr($data['course_dates'][0]->end_date, 0, 10);
					$today = date("Y-m-d");

					$diff = (strtotime($end_date) - strtotime($today));
					$permit = floor($diff / (60 * 60 * 24));

					if ($permit < 0) {
						$delete_where = array(
							'user_id' => Session::get('user_id'),
							'course_id' => $data["course_detail"][0]->course_id

						);
						$model->delete_user_course($delete_where);

						Url::redirect('dashboard?course_duration=exceeded');
					} else {

						$data['course_material'] = $model->retrieve_course_documents($data["course_detail"][0]->course_id);
						$this->allow = true;
						$data['course_forum_posts'] = $model->get_course_post($data["course_detail"][0]->course_id);
						$data['course_quiz'] = $model->course_quiz($data["course_detail"][0]->course_id);
						#code to display individual module videos
						if (isset($_GET['module_video'])) {
							$data['video_url'] = $model->get_video_url($_GET['module_video']);
							if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
								$user_model = new\Models\edu_login\Users();
								$data['student_details'] = $user_model->get_user_details(Session::get('userid'));

								$postdata = array(
									'user_id' => Session::get('user_id'),
									'course_id' => $_POST['course_id'],
									'message_content' => $_POST["forum_post"],
									'time_created' => time()
								);

								$model->course_post($postdata); ?>

								<div class="panel-body">
									<div class="media v-middle">
										<div class="media-left">
											<img src="<?= DIR ?><?= $data['student_details'][0]->img_path ?>"
												 alt="image" class="media-object img-circle width-50">
										</div>
										<div class="media-body message">
											<h4 class="text-subhead margin-none"><?= Session::get('firstname') ?> <?= Session::get('lastname') ?></h4>
											<p class="text-caption text-light"><i class="fa fa-clock-o"></i> Just now
											</p>
										</div>
									</div>
									<p><?= $_POST["forum_post"] ?></p>
								</div>
								<?
							} else {

								View::renderTemplate('loggedin_video_header', $data);
								View::render('edu_login/course_module_videos', $data, $error);
								View::renderTemplate('student_dashboard_footer', $data);
							}

						} # if no mdule video
						else {
							#Handle Forum Section

							if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {

								$user_model = new\Models\edu_login\Users();
								$data['student_details'] = $user_model->get_user_details(Session::get('userid'));


								$postdata = array(
									'user_id' => Session::get('user_id'),
									'course_id' => $_POST['course_id'],
									'message_content' => $_POST["forum_post"],
									'time_created' => time()
								);

								$model->course_post($postdata); ?>

								<div class="panel-body">
									<div class="media v-middle">
										<div class="media-left">
											<img src="<?= DIR ?><?= $data['student_details'][0]->img_path ?>"
												 alt="person" class="media-object img-circle width-50">
										</div>
										<div class="media-body message">
											<h4 class="text-subhead margin-none"><?= Session::get('firstname') ?> <?= Session::get('lastname') ?></h4>
											<p class="text-caption text-light"><i class="fa fa-clock-o"></i> Just now
											</p>
										</div>
									</div>
									<p><?= $_POST["forum_post"] ?></p>
								</div>

								<?

							} else if (isset($_GET['download'])) {

								$filename = $_GET['download'];
								header('Pragma: public');
								header('Expires: 0');
								header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
								header('Cache-Control: private', false); // required for certain browsers
								header('Content-Type: application/pdf');

								header('Content-Disposition: attachment; filename="' . basename($filename) . '";');
								header('Content-Transfer-Encoding: binary');
								header('Content-Length: ' . filesize($filename));

								readfile($filename);

								exit;

							} #handling course quiz
							else if (isset($_GET['take_course_quiz'])) {
								$quiz_model = new\Models\edu_login\Course();
								$quiz_id = $quiz_model->get_quiz_id($_GET['take_course_quiz'])[0]->quiz_id;

								#if quiz has been submitted.
								if (isset($_POST['submit_quiz'])) {
									$data['course_path'] = $path;
									$total = $_POST['counter']; #total number of questions
									$score = 0; #initializing the score to 0
									$data['corrections'] = array();

									for ($i = 0; $i < $total; $i++) {
										if (!empty($_POST['option_value' . $i]) and $_POST['option_value' . $i] == $_POST['correct_option' . $i]) {


											$score = $score + 1;

										} else {

											$data['corrections'][$_POST["question$i"]] = $_POST['correct_option_value' . $i];
										}
									}

									$data['score'] = $score;
									$data['total_q'] = $total;


									View::renderTemplate('loggedin_quiz_header', $data);
									View::render('edu_login/quiz_result', $data, $error);
									View::renderTemplate('footer_quiz', $data);


								} else {
									if ($quiz_id) {


										$data['quiz_questions'] = $quiz_model->course_quiz_questions($quiz_id, $data['course_detail'][0]->course_id);

										$data['quiz_count'] = count($data['quiz_questions']); #number of quiz questions

										$data['quiz_options'] = $quiz_model->quiz_question_options();

										View::renderTemplate('loggedin_quiz_header', $data);
										View::render('edu_login/take_quiz', $data, $error);
										View::renderTemplate('footer_quiz', $data);


									} else {
										Url::redirect('/dashboard');
									}
								}

							} #handling quiz
							else if (isset($_GET['take_quiz']) and isset($_GET['section_id'])) {
								$quiz_model = new\Models\edu_login\Course();

								#if quiz has been submitted.
								if (isset($_POST['submit_quiz'])) {
									$data['course_path'] = $path;
									$total = $_POST['counter']; #total number of questions
									$score = 0; #initializing the score to 0
									$data['corrections'] = array();

									for ($i = 0; $i < $total; $i++) {
										if ($_POST['option_value' . $i] == $_POST['correct_option' . $i]) {
											$score += 1;
										} else {

											$data['corrections'][$_POST["question$i"]] = $_POST['correct_option_value' . $i];
										}
									}

									$data['score'] = $score;
									$data['total_q'] = $total;

									View::renderTemplate('loggedin_quiz_header', $data);
									View::render('edu_login/quiz_result', $data, $error);
									View::renderTemplate('footer_quiz', $data);

								} #default action to display quiz
								else {
									$data['sections_id'] = array();

									foreach ($data['sec_quiz'] as $q) {

										array_push($data['sections_id'], $q->course_curriculum_section_id);


										# Get quiz questions related to the section
										if ($q->course_curriculum_section_id == $_GET['section_id']) {
											$data['quiz_questions'] = $quiz_model->quiz_question($q->quiz_id);

											$data['quiz_count'] = count($data['quiz_questions']); #number of quiz questions

											$data['quiz_options'] = $quiz_model->quiz_question_options();

											View::renderTemplate('loggedin_quiz_header', $data);
											View::render('edu_login/take_quiz', $data, $error);
											View::renderTemplate('footer_quiz', $data);
										}

									}
									#if section has no quiz yet.
									if (!in_array($_GET['section_id'], $data['sections_id'])) {
										$data['course_path'] = $path;
										View::renderTemplate('loggedin_quiz_header', $data);
										View::render('edu_login/no_quiz_view', $data, $error);
										View::renderTemplate('footer_quiz', $data);
									}

								}
							} else {

								View::renderTemplate('loggedin_video_header', $data);
								View::render('edu_login/take_course', $data, $error);
								View::renderTemplate('student_dashboard_footer', $data);
							}
						}
					}

				}
				if (Session::get('loggedin') and !$model_obj->checkEnrollment(Session::get('user_id'), $data["course_detail"][0]->course_id) and Session::get('user_id') != $data["course_detail"][0]->course_creator) {
					$this->allow = true;
					$data["enroll_link"] = "?enroll";
					View::renderTemplate('loggedin_course_header', $data);
					View::render('edu_login/' . $data['course_detail'][0]->course_url, $data, $error);
					View::renderTemplate('footer', $data);

				}

				if (!Session::get('loggedin')) {

					$data["enroll_link"] = DIR . "student_signup?course=" . $data['course_detail'][0]->course_url;
					$this->allow = false;
					$model = new\Models\edu_login\Testimonials();
					$data['course_testimonial'] = $model->get_course_testimonial($path);
					View::renderTemplate('confirmed_course_header', $data);
					View::render('edu_login/' . $data['course_detail'][0]->course_url, $data, $error);
					View::renderTemplate('footer', $data);

				}
			}
		}

	}

	public function getTestimonial($courseid)
	{
		$model = new\Models\edu_login\Testimonials();
		$data['course_testimonial'] = $model->get_course_testimonial($courseid);
		var_dump($data['course_testimonial']);

	}

	function createCourse()
	{
		$model = new\Models\edu_login\Course();
		$tutor_model = new\Models\edu_login\Users();
		$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));
		$data['categories'] = $model->get_categories();

		if (isset($_GET['new_course'])) {
			$data['message'] = 'Course Created Successfully';
		}
		if (isset($_GET['course_error'])) {
			$data['error'] = 'Please fill out all the Fields.';
		}

		if (isset($_POST['add_new_course'])) {

			$course_title = $_POST['course_title'];
			$course_creator = Session::get('user_id');
			$course_description = $_POST['course_description'];
			$course_welcome_message = $_POST['course_welcome_message'];
			$course_url = $_POST['course_url'];
			$course_preview_video = $_POST['course_preview_video'];
			$course_image = $_POST['course_image'];

			if ($course_title == '') {
				$error[] = 'course_title is required';
			}

			if ($course_description == '') {
				$error[] = 'course_description is required';
			}

			if ($course_welcome_message == '') {
				$error[] = 'Please Enter a Welcome message for the course ';
			}

			if ($course_url == '') {
				$error[] = 'A url is required for the course';
			}

			if (!$error) {

				$postdata = array(
					'course_title' => $course_title,
					'course_creator' => $course_creator,
					'course_description' => $course_description,
					'course_welcome' => $course_welcome_message,
					'course_url' => $course_url,
					'course_preview_video_url' => $course_preview_video,
					'course_marsh' => $course_image
				);

				$model->createNewCourse($postdata);
				$course_id = $model->get_last_course_id()[0]->course_id;
				$upload_course = array(
					'course_id' => $course_id,
					'category_id' => $_POST['category']
				);
				$model->upload_course($upload_course);
				Url::redirect('course/new?new_course=success');

			} else {
				Url::redirect('course/new?course_error');
			}
		}

		View::renderTemplate('user_header', $data);
		View::render('edu_login/create_new_course', $data, $error);
		View::renderTemplate('footer', $data);

	}

	function add_course_meta($id)
	{
		$model = new\Models\edu_login\Course();
		$data['course_info'] = $model->get_course_details($path);
		if (isset($_POST['add_meta'])) {
			$check = $model->check_meta($id);
			$postdata = array(
				'course_id' => $id,
				'course_content' => $_POST['course_content'],
				'course_price' => $_POST['course_price'],
				'course_duration' => $_POST['course_duration'],
				'course_start_date' => $_POST['course_start_date'],
				'course_end_date' => $_POST['course_end_date']
			);


			if (empty($check)) {
				$model->add_course_meta($postdata);
				$data['message'] = 'Course Meta Added successfully';

			} else {
				$where = array('course_id' => $id);
				$model->update_course_meta($postdata, $where);
				$data['message'] = 'Course Meta updated successfully';


			}

		}

		View::renderTemplate('user_header', $data);
		View::render('edu_login/course_meta', $data, $error);
		View::renderTemplate('footer', $data);

	}

	function editCourse($path)
	{
		if (Session::get('loggedin')) {
			$tutor_model = new\Models\edu_login\Users();
			$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));
			$model = new\Models\edu_login\Course();

			$data['course_info'] = $model->get_course_details($path);

			if (isset($_GET['course-edit'])) {
				$data['message'] = "Course details Updated Successfully";
			}

			if (isset($_POST['edit_course'])) {

				$postdata = array(
					'course_title' => $_POST['course_title'],
					'course_creator' => $data['tutor_details'][0]->user_id,
					'course_description' => $_POST['course_description'],
					'course_welcome' => $_POST['course_welcome_message'],
					'course_url' => $_POST['course_url'],
					'course_marsh' => $_POST['course_icon'],
					'course_preview_video_url' => substr($_POST['course_preview_video'], 71, 36)
				);

				$where = array('course_id' => $data['course_info'][0]->course_id);
				$model->edit_course($postdata, $where);
				Url::redirect('course/editCourse/' . $data['course_info'][0]->course_url . '?course-edit=success');
			}
			View::renderTemplate('user_header', $data);
			View::render('edu_login/edit-course', $data, $error);
			View::renderTemplate('footer', $data);

		}
	}

	function add_course_curriculum2($path)
	{
		if (Session::get("role") == 2) {
			$model = new\Models\edu_login\Course();
			$data['course'] = $model->get_course_details($path);
			$id = $data['course'][0]->course_id;

			$tutor_model = new\Models\edu_login\Users();
			$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));


			#check if course has a curriculum yet
			$check = $model->check($id);

			if ($check[0]->count > 0) {

				$data['sections'] = $model->get_course_curriculum_sections($id);
			}

			#check if course has a section yet
			$check2 = $model->check_section_exist($data['sections'][0]->section_id, $id);
			if ($check2[0]->count > 0) {

				$data['sec_vid'] = $model->get_section_video($data['sections'][0]->section_id, $id);
				$data['sec_quiz'] = $model->get_section_quiz($data['sections'][0]->section_id, $id);

			}


			# first add Sections
			if (isset($_POST['add_section'])) {
				$section_title = $_POST['section_title'];
				$section_no = $_POST['order_num'];
				$mExist = $model->check_section($section_no,$id);

				if ($mExist[0]->count > 0) {

					$this->msg->error('Section Number already exist, delete the previous one to add new Section', DIR . "course/add_course_curriculum/$path");

				}
				$postdata = array(
					'section_title' => $section_title,
					'order_number' => $section_no,
					'course_id' => $id
				);


				$model->create_section($postdata);
				$this->msg->Success("Section {$_POST['order_num']} created Successfully", DIR . "course/add_course_curriculum/$path");

			}






			$data['url_course'] = $data['course'][0]->course_url;
			View::renderTemplate('user_header', $data);
			View::render('edu_login/add_curriculum2', $data, $error);
			View::renderTemplate('admin/footer', $data);

		}else
			$this->msg->error("You don't have permission to access this page", DIR );

	}

	function add_course_curriculum($path)
	{
		if (Session::get('role') == 2) {

			$model = new\Models\edu_login\Course();
			$data['course'] = $model->get_course_details($path);
			$id = $data['course'][0]->course_id;

			$tutor_model = new\Models\edu_login\Users();
			$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));


			#check if course has a curriculum yet
			$check = $model->check($id);
			if ($check[0]->count > 0) {

				$data['sections'] = $model->get_course_curriculum_sections($id);
			}

			#check if course has a section yet
			$check2 = $model->check_section_exist($data['sections'][0]->section_id, $id);
			if ($check2[0]->count > 0) {

				$data['sec_vid'] = $model->get_section_video($data['sections'][0]->section_id, $id);
				$data['sec_quiz'] = $model->get_section_quiz($data['sections'][0]->section_id, $id);

			}
			if (isset($_POST['add_section'])) {

				$section_title = $_POST['section_title'];
				$section_no = $_POST['order_num'];

				$postdata = array(
					'section_title' => $section_title,
					'order_number' => $section_no,
					'course_id' => $id
				);

				$mExist = $model->check_section($section_no,$id);

				if ($mExist[0]->count > 0) {

					$this->msg->error('Section Number already exist, delete the previous one to add new Section', DIR . "$mailUrl/sch_admin/edit_content/$id");
				}
				$model->create_section($postdata);

				Url::redirect("course/add_course_curriculum/" . $data['course'][0]->course_url);

			}

			if (isset($_POST['add_video'])) {

				$data['section_id'] = $_POST['section_id'];

				View::renderTemplate('user_header', $data);
				View::render('edu_login/upload_video', $data);
				View::renderTemplate('footer', $data);

			}
			if (isset($_POST['upload_video'])) {

				$postdata = array(
					'course_curriculum_video_title' => $_POST['video_title'],
					'course_curriculum_video_description' => $_POST['video_desc'],
					'course_curriculum_video_source' => $_POST['video_src'],
					'course_curriculum_video_url' => substr($_POST['video_url'], 77, 36),
					'course_curriculum_video_code' => $_POST['video_code'],
					'course_curriculum_video_key' => uniqid(),
					'course_curriculum_video_length' => $_POST['video_length']

				);
				$model->upload_video($postdata);


				$latest_video_id = $model->get_last_video_id()[0]->course_curriculum_video_id;

				$cur_data = array(

					'course_curriculum_title' => $_POST['video_title'],
					'course_curriculum_gradeable' => 1,
					'course_curriculum_type' => 1,
					'course_curriculum_type_id' => $latest_video_id,
					'course_curriculum_order' => $_POST['curriculum_order'],
					'course_curriculum_length' => $_POST['video_length'],
					'course_curriculum_section_id' => $_POST['section_id']
				);


				$model->upload_curriculum($cur_data);
				Url::redirect("course/add_course_curriculum/" . $data['course'][0]->course_url);


			}

			if (isset($_POST['add_quiz'])) {
				$data['section_id'] = $_POST['section_id'];

				View::renderTemplate('user_header', $data);
				View::render('edu_login/add_quiz', $data);
				View::renderTemplate('footer', $data);
			}

			if (isset($_POST['upload_quiz'])) {

				$quiz_description = $_POST['quiz_description'];
				$quiz_title = $_POST['quiz_title'];
				$quiz_instruction = $_POST['quiz_instruction'];
				$quiz_public = $_POST['quiz_public'];
				$quiz_time = $_POST['quiz_time'];
				$quiz_point = $_POST['quiz_point'];
				$quiz_order = $_POST['quiz_order'];
				$quiz_url = uniqid();
				$quiz_creator = Session::get('user_id');

				$postdata = array(

					'quiz_description' => $quiz_description,
					'quiz_title' => $quiz_title,
					'quiz_instruction' => $quiz_instruction,
					'quiz_public' => $quiz_public,
					'quiz_time' => $quiz_time,
					'quiz_point' => $quiz_point,
					'quiz_url' => $quiz_url,
					'quiz_creator' => $quiz_creator

				);


				$model->upload_quiz($postdata);

				$last_quiz_id = $model->get_last_quiz_id()[0]->quiz_id;
				$cur_data = array(

					'course_curriculum_title' => $quiz_title,
					'course_curriculum_gradeable' => 1,
					'course_curriculum_type' => 2,
					'course_curriculum_type_id' => $last_quiz_id,
					'course_curriculum_order' => $quiz_order,
					'course_curriculum_length' => '',
					'course_curriculum_section_id' => $_POST['section_id']


				);

				$model->upload_curriculum($cur_data);
				Url::redirect('course/add_course_curriculum/' . $path . '/upload_quiz_question?quiz_id=' . $last_quiz_id);

			}

			if (empty($_POST)) {
				$data['url_course'] = $data['course'][0]->course_url;
				View::renderTemplate('user_header', $data);
				View::render('edu_login/add_curriculum', $data, $error);
				View::renderTemplate('footer', $data);
			}
		}
	}

	function add_course_document($path)
	{
		$tutor_model = new\Models\edu_login\Users();
		$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));

		//echo $path;
		$model = new\Models\edu_login\Course();
		$data['course'] = $model->get_course_details($path);
		$id = $data['course'][0]->course_id;

		if (isset($_POST['upload_document'])) {
			$postdata = array(
				'course_id' => $id
			);
			$file = 'course_materials/' . $_FILES['document']['name'];
			move_uploaded_file($_FILES['document']['tmp_name'], $file);
			$postdata['course_documents'] = $file;

			$model->upload_document($postdata);
			Url::redirect('dashboard?document_uploaded');


		} else {

			View::renderTemplate('user_header', $data);
			View::render('edu_login/upload_document', $data, $error);
			View::renderTemplate('footer', $data);
		}

	}

	function add_course_quiz($path)
	{

		$tutor_model = new\Models\edu_login\Users();
		$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));
		$model = new\Models\edu_login\Course();
		$data['course'] = $model->get_course_details($path);
		$id = $data['course'][0]->course_id;

		if (isset($_POST['upload_quiz'])) {

			$quiz_description = $_POST['quiz_description'];
			$quiz_title = $_POST['quiz_title'];
			$quiz_instruction = $_POST['quiz_instruction'];
			$quiz_public = $_POST['quiz_public'];
			$quiz_time = $_POST['quiz_time'];
			$quiz_point = $_POST['quiz_point'];
			$quiz_order = $_POST['quiz_order'];
			$quiz_url = uniqid();
			$quiz_creator = Session::get('user_id');

			$postdata = array(

				'quiz_description' => $quiz_description,
				'quiz_title' => $quiz_title,
				'quiz_instruction' => $quiz_instruction,
				'quiz_public' => $quiz_public,
				'quiz_time' => $quiz_time,
				'quiz_point' => $quiz_point,
				'quiz_url' => $quiz_url,
				'quiz_creator' => $quiz_creator

			);
			var_dump($postdata);

			$model->upload_quiz($postdata);

			$last_quiz_id = $model->get_last_quiz_id()[0]->quiz_id;
			$cur_data = array(

				'course_id' => $id,
				'quiz_id' => $last_quiz_id

			);
			var_dump($cur_data);

			$model->upload_course_quiz($cur_data);
			Url::redirect('course/add_course_quiz/' . $path . '/upload_quiz?quiz_id=' . $last_quiz_id);

		} else {

			View::renderTemplate('user_header', $data);
			View::render('edu_login/add_quiz', $data);
			View::renderTemplate('footer', $data);
		}
	}

	function upload_course_quiz($path)
	{

		$tutor_model = new\Models\edu_login\Users();
		$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));
		$model = new\Models\edu_login\Course();

		#Handle quiz excel upload
		if (isset($_POST['upload_quiz_excel'])) {

			//$postdata['img_path'] = $file;

			if (!empty($_FILES)) {
				$excelpath = 'quiz_excel_documents/' . $_FILES['quiz_file']['name'];
				move_uploaded_file($_FILES['quiz_file']['tmp_name'], $excelpath);

				$excel_reader = new \Helpers\excel\Excel_reader;

				$excel_reader->setOutputEncoding('CP1251');

				$excel_reader->read($excelpath);


				// // Get the contents of the first worksheet
				$worksheet = $excel_reader->sheets[0];
				$numRows = $worksheet['numRows']; // ex: 14

				$numCols = $worksheet['numCols']; // ex: 4
				$cells = $worksheet['cells']; // the 1st row are usually the field's name

				$loop_rows = 1 + $numRows;


				$i = 2;
				while ($i < $loop_rows) {
					$options = array();
					$Question = $cells[$i][1];
					$option1 = $cells[$i][2];
					$option2 = $cells[$i][3];
					$option3 = $cells[$i][4];
					$option4 = $cells[$i][5];

					array_push($options, $option1);
					array_push($options, $option2);
					array_push($options, $option3);
					array_push($options, $option4);

					$correct_option = $cells[$i][6];

					$quizdata = array(
						'quiz_id' => $_GET['quiz_id'],
						'question' => $Question
					);

					$model->upload_quiz_question($quizdata);
					$last_question_id = $model->get_last_quizQuestion_id()[0]->quiz_question_id;


					#handle individual options already stored in an array
					for ($j = 0; $j < count($options); $j++) {
						#if the option is the right option
						if ($options[$j] == $correct_option) {
							$postdata = array(
								'quiz_question_id' => $last_question_id,
								'option_value' => $options[$j],
								'right_option' => 1
							);

						} #if otherwise.
						else {
							$postdata = array(
								'quiz_question_id' => $last_question_id,
								'option_value' => $options[$j],
								'right_option' => 0
							);

						}
						$model->upload_quiz_options($postdata);

					}

					$i += 1;


				}


			}
			Url::redirect('dashboard?quiz_uploaded');
		}

		View::renderTemplate('user_header', $data);
		View::render('edu_login/upload_course_quiz', $data, $error);
		View::renderTemplate('footer', $data);
	}

	function upload_quiz($path)
	{

		$tutor_model = new\Models\edu_login\Users();
		$data['tutor_details'] = $tutor_model->get_user_details(Session::get('userid'));
		$model = new\Models\edu_login\Course();
		if (isset($_POST['add_quiz'])) {
			$quizdata = array(
				'quiz_id' => $_GET['quiz_id'],
				'question' => $_POST['question']
			);
			$model->upload_quiz_question($quizdata);
			$last_question_id = $model->get_last_quizQuestion_id()[0]->quiz_question_id;
			for ($i = 1; $i <= 4; $i++) {
				if ($_POST['right_option' . $i]) {
					$postdata = array(
						'quiz_question_id' => $last_question_id,
						'option_value' => $_POST['option' . $i],
						'right_option' => 1
					);
				} else {
					$postdata = array(
						'quiz_question_id' => $last_question_id,
						'option_value' => $_POST['option' . $i],
						'right_option' => 0
					);
				}


				$model->upload_quiz_options($postdata);
				$data['success'] = true;

			}
		} #Handle quiz excel upload
		else if (isset($_POST['upload_quiz_excel'])) {

			//$postdata['img_path'] = $file;

			if (!empty($_FILES)) {
				$excelpath = 'quiz_excel_documents/' . $_FILES['quiz_file']['name'];
				move_uploaded_file($_FILES['quiz_file']['tmp_name'], $excelpath);

				$excel_reader = new \Helpers\excel\Excel_reader;

				$excel_reader->setOutputEncoding('CP1251');

				$excel_reader->read($excelpath);


				// // Get the contents of the first worksheet
				$worksheet = $excel_reader->sheets[0];
				$numRows = $worksheet['numRows']; // ex: 14

				$numCols = $worksheet['numCols']; // ex: 4
				$cells = $worksheet['cells']; // the 1st row are usually the field's name

				$loop_rows = 1 + $numRows;


				$i = 2;
				while ($i < $loop_rows) {
					$options = array();
					$Question = $cells[$i][1];
					$option1 = $cells[$i][2];
					$option2 = $cells[$i][3];
					$option3 = $cells[$i][4];
					$option4 = $cells[$i][5];

					array_push($options, $option1);
					array_push($options, $option2);
					array_push($options, $option3);
					array_push($options, $option4);

					$correct_option = $cells[$i][6];

					$quizdata = array(
						'quiz_id' => $_GET['quiz_id'],
						'question' => $Question
					);

					$model->upload_quiz_question($quizdata);
					$last_question_id = $model->get_last_quizQuestion_id()[0]->quiz_question_id;


					#handle individual options already stored in an array
					for ($j = 0; $j < count($options); $j++) {
						#if the option is the right option
						if ($options[$j] == $correct_option) {
							$postdata = array(
								'quiz_question_id' => $last_question_id,
								'option_value' => $options[$j],
								'right_option' => 1
							);

						} #if otherwise.
						else {
							$postdata = array(
								'quiz_question_id' => $last_question_id,
								'option_value' => $options[$j],
								'right_option' => 0
							);

						}
						$model->upload_quiz_options($postdata);


					}

					$i += 1;


				}# Handle each row returned from Excel worksheet
				//$data['success'] = true;
				//$data['success'] = true;

			}
		}


		View::renderTemplate('user_header', $data);
		View::render('edu_login/upload_quiz', $data, $error);
		View::renderTemplate('footer', $data);


	}


	function payment($path)
	{
		if (isset($_GET['course_payment']) && isset($_GET['auth_id'])) {
			$user_model = new\Models\edu_login\Users();
			$data['user_details'] = $user_model->get_user_details($_GET['auth_id']);


			Session::set('loggedin', true);
			Session::set('userid', $data['user_details'][0]->userid);
			Session::set('firstname', $data['user_details'][0]->firstname);
			Session::set('lastname', $data['user_details'][0]->lastname);
			Session::set('email', $data['user_details'][0]->email);
			Session::set('img_path', $data['user_details'][0]->img_path);
			Session::set('user_id', $data['user_details'][0]->user_id);

			$data['student_details'] = $user_model->get_user_details(Session::get('userid'));
			$data['firstname'] = $data['student_details'][0]->firstname;
			$data['lastname'] = $data['student_details'][0]->lastname;
			$data['email'] = $data['student_details'][0]->email;

			$model_obj = new\Models\edu_login\Course();
			$model = new\Models\edu_login\Course();
			$data['course_detail'] = $model_obj->getCourseDetails($path);
			$data['cat'] = $model_obj->get_categories();
			$data['courses'] = $model_obj->get_random_courses();
			$data['course'] = $model->get_course_details($path);
			$id = $data['course'][0]->course_id;
			$data['cat'] = $model->get_categories();
			$data['courses'] = $model->get_random_courses();
			$data['courses_header'] = $model->get_courses();
			$data['course_url'] = $path;


		}

		if (Session::get('promo') || Session::get('loggedin')) {
			$user_model = new\Models\edu_login\Users();
			$data['student_details'] = $user_model->get_user_details(Session::get('userid'));
			$model_obj = new\Models\edu_login\Course();
			$data['course_detail'] = $model_obj->getCourseDetails($path);
			$data['cat'] = $model_obj->get_categories();
			$data['courses'] = $model_obj->get_random_courses();
			$data['feature'] = $model_obj->getFeatures($data["course_detail"][0]->course_id);
			$data['recent_courses'] = $model_obj->get_recent_courses();
			$model = new\Models\edu_login\Course();
			$data['course'] = $model->get_course_details($path);
			$id = $data['course'][0]->course_id;

			$data['cat'] = $model->get_categories();
			$data['courses'] = $model->get_random_courses();
			$data['courses_header'] = $model->get_courses();

			$data['firstname'] = $data['student_details'][0]->firstname;
			$data['lastname'] = $data['student_details'][0]->lastname;
			$data['email'] = $data['student_details'][0]->email;

			$data['course_url'] = $path;

			if (isset($_POST['make_payment'])) {
				#if coupon code was entered
				Session::set('temp_email', $data['email']);
				if (!empty($_POST['coupon_code'])) {
					$coupon = $model_obj->verifyCoupon($_POST['coupon_code']);

					if ($coupon) {
						if ($coupon[0]->coupon_usage_count >= 1 and $coupon[0]->coupon_status == 'active') {

							#process price
							$percent = $coupon[0]->coupon_percentage;

							# check if coupon is 100% and duration not 30 days then send back
							// if ($percent == '100' and $_POST['duration'] != '20000') {
							// 	$this->error = 'You can\'t have more than 30 days access for 100% coupon';
							// 	View::renderTemplate('loggedin_user_header', $data);
							// 	View::render('edu_login/enroll_form', $data, $this->error);
							// 	View::renderTemplate('footer', $data);
							// 	die();
							// }
							#set coupon to session for successfull payment usage
							//Session::set('temp_coupon', $coupon[0]->coupon_id);

							$data['price'] = $_POST['duration'] - (($percent / 100) * $_POST['duration']);
							$data['transaction_id'] = uniqid();
							$data['customer_id'] = Session::get('userid');
							$data['transaction_description'] = 'Payment for ' . $course_title . ' With a Coupon used ';
							$data['return_url'] = "http://davtonlearn.com/course/" . $data['course_url'] . "?course_enrolled=" . $path;
							// what is this all about
							$course_title = $model_obj->get_course_details($path)[0]->course_title;

							$postdata = array(

								'payment_userid' => Session::get('userid'),
								'firstname' => $data['firstname'],
								'lastname' => $data['lastname'],
								'email' => $data['email'],
								'payment_transaction_id' => $data['transaction_id'],
								'payment_coupon_used' => $coupon[0]->coupon_code,
								'course' => $course_title,
								'payment_price' => $data['price']
							);

							if ($_POST['duration'] == '20000') {
								$postdata['duration'] = 30;
							} else if ($_POST['duration'] == '35000') {
								$postdata['duration'] = 60;
							} else if ($_POST['duration'] == '55000') {
								$postdata['duration'] = 90;
							}

							#if coupon code is 100% send to paid page

							$model_obj->uploadPaymentDetails($postdata);

							$payment_model = new\Models\edu_login\Course();

							$time_duration = $data['transaction_details'][0]->duration;
							$start_date = date("Y-m-d ", time());

							$to = strtotime('+' . $postdata['duration'] . ' days', time());
							$end_date = date("Y-m-d ", $to);


							#edit for coupon starts here
							if ($data['price'] == 0) {
								$postdata = array(
									'user_id' => Session::get('user_id'),
									'course_id' => $id,
									'start_date' => $start_date,
									'end_date' => $end_date
								);

								$payment_model->createEnrollment($postdata);
								$payment_model->createRegistration($postdata);

								#update coupon status and set usage count to 0
								$model_object = new\Models\edu_login\Course();

								$where = array('coupon_id' => $coupon[0]->coupon_id);
								$updateData = array(
									'coupon_status' => 'expired',
									'coupon_usage_count' => 0,
								);
								$model_object->updateCoupon($updateData, $where);

								Url::redirect('course/' . $data["course_detail"][0]->course_url);

							}
							#edit for coupon ends here

							// View::render('edu_login/cashenvoy_gateway', $data);
							View::renderTemplate('loggedin_user_header', $data);
							View::render('edu_login/enroll_form_2', $data, $this->error);
							View::renderTemplate('footer', $data);


						} else {
							$this->error = 'Coupon Code has expired';
							View::renderTemplate('loggedin_user_header', $data);
							View::render('edu_login/enroll_form', $data, $this->error);
							View::renderTemplate('footer', $data);
						}


					} #if coupon does not exist
					else {
						$this->error = 'The Coupon Code does not exist, You can proceed payment without a coupon code';

						View::renderTemplate('loggedin_user_header', $data);
						View::render('edu_login/enroll_form', $data, $this->error);
						View::renderTemplate('footer', $data);
					}
				} #if no coupon code is entered
				else {
					$course_title = $model_obj->get_course_details($path)[0]->course_title;
					$data['price'] = $_POST['duration'];
					$data['transaction_id'] = uniqid();
					$data['customer_id'] = Session::get('userid');
					$data['transaction_description'] = 'Payment for ' . $course_title;
					$data['return_url'] = "http://davtonlearn.com/course/" . $data['course_url'] . "?course_enrolled=" . $path;

					$postdata = array(

						'payment_userid' => Session::get('userid'),
						'firstname' => $data['firstname'],
						'lastname' => $data['lastname'],
						'email' => $data['email'],
						'payment_transaction_id' => $data['transaction_id'],
						'status' => 'pending',
						'course' => $course_title,
						'payment_price' => $data['price']
					);

					if ($_POST['duration'] == '20000') {
						$postdata['duration'] = 30;

					} else if ($_POST['duration'] == '35000') {
						$postdata['duration'] = 60;
					} else if ($_POST['duration'] == '10000') {
						$postdata['duration'] = 60;
					} else if ($_POST['duration'] == '55000') {
						$postdata['duration'] = 90;
					}

					$model_obj->uploadPaymentDetails($postdata);

					$payment_model = new\Models\edu_login\Course();

					$time_duration = $data['transaction_details'][0]->duration;
					$start_date = date("Y-m-d ", time());

					$to = strtotime('+' . $postdata['duration'] . ' days', time());
					$end_date = date("Y-m-d ", $to);

						$postdata = array(
							'user_id' => Session::get('user_id'),
							'course_id' => $id,
							'start_date' => $start_date,
							'end_date' => $end_date
						);

						$payment_model->createEnrollment($postdata);
						$payment_model->createRegistration($postdata);

						#update coupon status and set usage count to 0
						$model_object = new\Models\edu_login\Course();

						$where = array('coupon_id' => $coupon[0]->coupon_id);
						$updateData = array(
							'coupon_status' => 'expired',
							'coupon_usage_count' => 0,
						);
						$model_object->updateCoupon($updateData, $where);

						Url::redirect('course/' . $data["course_detail"][0]->course_url);

				}

			} else {
				View::renderTemplate('loggedin_user_header', $data);
				View::render('edu_login/enroll_form', $data, $error);
				View::renderTemplate('footer', $data);
			}
		}

	}

	public function json_course_time()
	{

		if ($_POST['timeMe']){
			$model = new\Models\edu_login\Course();
		     $data = array(
			'course_id' => Session::get('course_id'),
			'user_id' => Session::get('user_id'),
			'page' => 'course video',
			'created_date' => date('Y-m-d h:i:s'),
			'timeMe' => $_POST['timeMe'],

		);


		$model->createCourseTime($data);
	}
//		xmlhttp.open("GET","getuser.php?q="+str,true);
//		xmlhttp.send();

	}
	public function json_about_course(){
		if (isset($_POST['id'])) {
			$str = $_POST['id'];
			$model = new\Models\edu_login\Course();
			$data=$model->getCourseStudentList($str);
			$html =" <table class=\"table table-striped\"> <thead> <tr> <th>#</th> <th>First Name</th> <th>Last Name</th> </tr> </thead> <tbody>";
			for($i = 0; $i < count($data); $i++){
				$no = $i+1;
				$html .=" <tr> <th scope=row>". $no ."</th> <td>".$data[$i][0]->firstname."</td> <td>".$data[$i][0]->lastname."</td> </tr> ";
			}
			$html .= "</tbody> </table>";

			echo($html);

		}
	}

	private function sendMail($student,$student_email,$phone,$course){
		$to = $student_email;
		$subject = "DavtonLearn Course Booking";
		$message =  "<html><body><div style='text-align:center;'><img src = 'http://davtonlearn.com/images/davton.png'><p>Hello $student.
		 			<br> You request for $course is noted
		 			<br> We will get back to you as soon as the Course is available. Thank you. </p>
		 			<p> davtonlearn.com</p></div></html></body>";
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= 'From: Davtonlearn <noreply@davtonlearn.com>' . "\r\n";


		mail($to,$subject,$message,$headers);

		#send mail to tobi@davtonlearn.com
		$to_admin_1 =ADMIN_MAIL_1;
		$to_admin_2 =ADMIN_MAIL_2;
		$subject_admin = "Course Booking from $student";
		$message_admin =  "<html><body><div style='text-align:center;'><img src = 'http://davtonlearn.com/images/davton.png'><p> $student  with email: $student_email and Mobile No: $phone Just booked for $course
		 			<br> An Acknowledgment mail was sent to him . </p>
		 			<p> davtonlearn.com</p></div></html></body>";
		mail($to_admin_1,$subject_admin,$message_admin,$headers);

		mail($to_admin_2,$subject_admin,$message_admin,$headers);
	}
}
?>