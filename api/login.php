<?php
header("Content-Type: application/json");

if (!isset($_SESSION)) {
    session_start();
}

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$user = $data["user"] ?? null;
$password = $data["password"] ?? null;

if (!$user || !$password) {
    error("Username o password mancanti");
}

require_once __DIR__ . "/../classes/Credentials.php";

if (Credentials::doLogin($user, $password)) {
    $_SESSION["user"] = $user;
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
