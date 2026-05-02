<?php
header("Content-Type: application/json");

if (!isset($_SESSION)) {
    session_start();
}

try {
    if (isset($_SESSION["email"])) {
        ok(["isLoggedIn" => true], "Sei già loggato");
    } else {
        ok(["isLoggedIn" => false], "Non sei ancora loggato");
    }
} catch (Exception $e) {
    error("Errore durante il controllo dello stato di login: " . $e->getMessage());
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
