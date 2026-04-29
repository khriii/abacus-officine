<?php
require_once __DIR__ . "/../classes/OfficineManager.php";

if ($result = OfficineManager::getAllOfficine()) {
    ok($result, "officine trovate");
} else {
    error("errore durante il getAllOfficine");
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
