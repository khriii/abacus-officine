<?php
header("Content-Type: application/json");

if (!isset($_SESSION)) {
    session_start();
}

if (isset($_SESSION["user"])) {
    ok(null, "e' loggato");
} else {
    error("non e' loggato");
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
