<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error("Metodo non consentito. Usa POST.");
}

if (!isset($_SESSION)) {
    session_start();
}

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if ($json && $data === null) {
    error("Formato JSON non valido");
}

$mail = trim($data["mail"] ?? '');
$password = $data["password"] ?? '';
$cognome = trim($data["cognome"] ?? '');
$nome = trim($data["nome"] ?? '');
$telefono = trim($data["numero_telefono"] ?? '');

if ($mail === '' || $password === '' || $cognome === '' || $nome === '' || $telefono === '') {
    error("Dati mancanti per la registrazione del cliente");
}

if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    error("Il formato dell'indirizzo email non è valido");
}

require_once __DIR__ . "/../classes/Credentials.php";

try {
    $risultato = Credentials::doRegisterCliente($mail, $password, $cognome, $nome, $telefono);

    if ($risultato === "SUCCESS") {
        ok(null, "Registrazione cliente eseguita con successo");
    } elseif ($risultato === "MAIL_EXISTS") {
        error("Questa email è già registrata.");
    } else {
        error("Registrazione cliente non riuscita, riprova più tardi");
    }
} catch (Exception $e) {
    error("Errore interno del server durante la registrazione");
}

function error($msg = "Errore sconosciuto")
{
    http_response_code(400);
    $v = [
        "success" => false,
        "msg" => $msg
    ];
    echo json_encode($v);
    exit();
}

function ok($data, $msg = '')
{
    http_response_code(200);
    $v = [
        "success" => true,
        "msg" => $msg,
        "data" => $data
    ];
    echo json_encode($v);
    exit();
}