<?php
require_once __DIR__ . "/../classes/OfficineManager.php";

$data = json_decode(file_get_contents("php://input"), true);

if ($result = OfficineManager::addPezzoRicambio($data["costo_unitario"], $data["descrizione"])) {
    ok($result, "pezzo ricambio aggiunto");
} else {
    error("errore durante il addPezzoRicambio");
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
