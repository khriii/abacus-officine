<?php
header("Content-Type: application/json");

if (!isset($_SESSION)) {
    session_start();
}

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$mail = $data["mail"] ?? null;
$password = $data["password"] ?? null;
$cognome = $data["cognome"] ?? null;
$nome = $data["nome"] ?? null;
$telefono = $data["numero_telefono"] ?? null;

if (!$mail || !$password || !$cognome || !$nome || !$telefono ) {
    error("Dati mancanti per la registrazione del cliente");
}

require_once __DIR__ . "/../classes/Credentials.php";

if (Credentials::doRegisterCliente($mail, $password, $cognome, $nome, $telefono)) {
    ok(null, "Registrazione cliente eseguita con successo");
} else {
    error("Registrazione cliente non riuscita");
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
