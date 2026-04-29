<?php
require_once __DIR__ . "/../classes/OfficineManager.php";

$result = OfficineManager::getAllAccessori();

if ($result !== null) {
    ok($result, "accessori trovati");
} else {
    error("errore durante il getAllAccessori()");
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
