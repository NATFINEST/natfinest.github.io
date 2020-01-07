<?php
// if (isset($_POST['username']) && $_POST['username'] && isset($_POST['password']) && $_POST['password']) {
//     // do user authentication as per your requirements
//     // ...
//     // ...
//     // based on successful authentication
//     echo json_encode(array('success' => 1));
// } else {
//     echo json_encode(array('success' => 0));
// }
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        die();
    }

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    $ret = [
        'result' => 'OK ',
    ];
    print json_encode($ret);
echo "Something";