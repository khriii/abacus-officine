<?php
require_once __DIR__ . "/../classes/OfficineManager.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['accessori']) || !isset($data['officine'])) {
    error("Dati mancanti");
}

$accessori = $data['accessori'];
$officine = $data['officine'];

$success = true;

foreach ($officine as $codice_officina) {
    foreach ($accessori as $codice_accessorio) {
        $result = OfficineManager::bindAccessorioToOfficina($codice_officina, $codice_accessorio);
        if (!$result) {
            $success = false;
        }
    }
}

if ($success) {
    ok(null, "Accessori associati con successo");
} else {
    error("Errore durante l'associazione di uno o più accessori");
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
