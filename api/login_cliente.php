<?php
header("Content-Type: application/json");

if (!isset($_SESSION)) {
    session_start();
}

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$mail = $data["mail"] ?? null;
$password = $data["password"] ?? null;

if (!$mail || !$password) {
    error("Username o password mancanti");
}

require_once __DIR__ . "/../classes/Credentials.php";

if (Credentials::doLoginCliente($mail, $password)) {
    $_SESSION["user"] = $mail;
    ok(null, "Login eseguito con successo");
} else {
    error("Login non riuscito");
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
