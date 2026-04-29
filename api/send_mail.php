<?php
function sendMailAPI($mail_destinazione, $oggetto, $body)
{
    $url = "https://agora.ismonnet.it/sendMail/send.php";

    $data = [
        "mail_invio" => "esercizio-5binf@ismonnet.eu",
        "mail_destinazione" => $mail_destinazione,
        "oggetto" => $oggetto,
        "body" => $body
    ];

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        return [
            "success" => false,
            "error" => curl_error($ch)
        ];
    }

    return [
        "success" => true,
        "response" => $response
    ];
}