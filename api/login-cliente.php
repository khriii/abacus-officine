<?php
header("Content-Type: application/json");

if (!isset($_SESSION)) {
    session_start();
}

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$email = $data["email"] ?? null;
$password = $data["password"] ?? null;

if (!$email || !$password) {
    error("Email o password mancanti");
}

require_once __DIR__ . "/../classes/Credentials.php";

if (Credentials::doLoginCliente($email, $password)) {
    $_SESSION["email"] = $email;
    ok(null, "Sei stato loggato con successo");
} else {
    error("Email o password errati");
}


// Methods
function error($msg)
{
    $v = [
        "success" => false,
        "msg" => $msg
    ];
    if ($msg != null) {
        echo json_encode($v);
    }
    exit();
}

function ok($data, $msg = '')
{
    $v = [
        "success" => true,
        "msg" => $msg,
        "data" => $data
    ];
    echo json_encode($v);
    exit();
}
