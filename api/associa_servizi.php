<?php
require_once __DIR__ . "/../classes/OfficineManager.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['servizi']) || !isset($data['officine'])) {
    error("Dati mancanti");
}

$servizi = $data['servizi'];
$officine = $data['officine'];

$success = true;

foreach ($officine as $codice_officina) {
    foreach ($servizi as $codice_servizio) {
        $result = OfficineManager::bindServizioToOfficina($codice_officina, $codice_servizio);
        if (!$result) {
            $success = false;
        }
    }
}

if ($success) {
    ok(null, "Servizi associati con successo");
} else {
    error("Errore durante l'associazione di uno o più servizi");
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
