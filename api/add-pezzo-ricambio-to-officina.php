<?php
require_once __DIR__ . "/../classes/OfficineManager.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['pezzi_ricambio']) || !isset($data['officine'])) {
    error("Dati mancanti");
}

$pezziRicambio = $data['pezzi_ricambio'];
$officine = $data['officine'];
$defaultQuantita = isset($data['quantita']) ? (int) $data['quantita'] : 1;

$success = true;

foreach ($officine as $codice_officina) {
    foreach ($pezziRicambio as $pezzo) {
        if (is_array($pezzo)) {
            $codice_pezzo_ricambio = $pezzo['codice'] ?? null;
            $quantita = isset($pezzo['quantita']) ? (int) $pezzo['quantita'] : $defaultQuantita;
        } else {
            $codice_pezzo_ricambio = $pezzo;
            $quantita = $defaultQuantita;
        }

        if (!$codice_pezzo_ricambio || $quantita <= 0) {
            error("Codice pezzo ricambio o quantità non valida");
        }

        if (OfficineManager::hasPezzoRicambioInOfficina($codice_officina, $codice_pezzo_ricambio)) {
            error("Questo pezzo di ricambio è già associato a quest'officina");
        }

        $result = OfficineManager::bindPezzoRicambioToOfficina($codice_officina, $codice_pezzo_ricambio, $quantita);
        if (!$result) {
            error("Errore durante l'associazione del pezzo di ricambio");
        }
    }
}

ok(null, "Pezzi di ricambio associati con successo");


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
