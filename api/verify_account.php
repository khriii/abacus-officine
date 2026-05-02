<?php
require_once __DIR__ . "/../classes/DatabaseManager.php";

header('Content-Type: text/html; charset=UTF-8');

if (!isset($_GET['mail']) || !isset($_GET['uuid'])) {
    die("Parametri mancanti.");
}

$mail = $_GET['mail'];
$uuid = $_GET['uuid'];

$db = new DatabaseManager();

$stmt = $db->prepare("SELECT codice, verified FROM clienti WHERE mail = ? AND uuid = ?");
$stmt->bind_param("ss", $mail, $uuid);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("Link non valido o utente inesistente.");
}

$row = $result->fetch_assoc();

if ($row['verified'] == 1) {
    echo "Account già verificato.";
    exit;
}

$stmt = $db->prepare("UPDATE clienti SET verified = 1 WHERE mail = ? AND uuid = ?");
$stmt->bind_param("ss", $mail, $uuid);

if ($stmt->execute()) {
    echo "Account verificato con successo!";
} else {
    echo "Errore durante la verifica.";
}