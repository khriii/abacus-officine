<?php
require_once __DIR__ . "/../classes/OfficineManager.php";

if (!isset($_GET["codice_officina"])) {
    error("codice_officina mancante");
}

$result = OfficineManager::getServiziByOfficina($_GET["codice_officina"]);

if ($result !== null) {
    ok($result, "servizi trovati");
} else {
    error("errore durante il getServiziByOfficina");
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
