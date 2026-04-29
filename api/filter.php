<?php

require_once __DIR__ . "/../classes/OfficineManager.php";

$data = json_decode(file_get_contents("php://input"), true);

$servizio = isset($data['servizio']) ? $data['servizio'] : null;
$accessorio = isset($data['accessorio']) ? $data['accessorio'] : null;

$result = OfficineManager::filter($servizio, $accessorio);

if ($result !== false) {
    ok($result, "filtered");
} else {
    error("errore durante il filter");
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
