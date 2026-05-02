<?php
require_once __DIR__ . "/../classes/OfficineManager.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    error("Dati mancanti");
}

if (isset($data['officine']) && isset($data['pezzi_ricambio'])) {
    $officine = $data['officine'];
    $pezziRicambio = $data['pezzi_ricambio'];
} elseif (isset($data['officina_id']) && isset($data['pezzo_ricambio_id'])) {
    $officine = [$data['officina_id']];
    $pezziRicambio = [$data['pezzo_ricambio_id']];
} else {
    error("Parametri mancanti");
}

$success = true;

foreach ($officine as $codice_officina) {
    foreach ($pezziRicambio as $codice_pezzo_ricambio) {
        if (!$codice_officina || !$codice_pezzo_ricambio) {
            error("Codice officina o codice pezzo ricambio non valido");
        }

        $result = OfficineManager::removePezzoRicambioFromOfficina($codice_officina, $codice_pezzo_ricambio);
        if ($result === false) {
            error("Errore durante la rimozione del pezzo di ricambio dall'officina");
        }

        if ($result === 0) {
            error("Questo pezzo di ricambio non è presente in quest'officina");
        }
    }
}

ok(null, "Pezzo di ricambio rimosso dall'officina con successo");


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
