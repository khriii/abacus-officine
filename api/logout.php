<?php
header("Content-Type: application/json");

if (!isset($_SESSION)) {
    session_start();
}

require_once __DIR__ . "/../classes/Credentials.php";

if (Credentials::doLogout()) {
    ok(null, "Logout eseguito con successo");
} else {
    error("Logout non riuscito");
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
