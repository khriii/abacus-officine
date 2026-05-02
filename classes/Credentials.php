<?php

class Credentials
{
    static public function doLoginCliente($email, $password)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $db = new DatabaseManager();

        $stmt = $db->prepare("SELECT password FROM clienti WHERE mail = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if ($row && password_verify($password, $row["password"])) {
            return true;
        }

        return false;
    }

    static public function doRegisterCliente($email, $password, $surname, $name, $phone_number)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $db = new DatabaseManager();

        $stmt = $db->prepare("SELECT codice FROM clienti WHERE mail = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            return "MAIL_EXISTS";
        }

        $uuid = hash('sha256', $email . microtime(true) . random_bytes(16));

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $db->prepare("INSERT INTO clienti (mail, cognome, nome, password, telefono, uuid, verified) VALUES (?, ?, ?, ?, ?, ?, 0)");
        $stmt->bind_param("ssssss", $email, $surname, $name, $hashedPassword, $phone_number, $uuid);

        require_once __DIR__ . "/../configs/Config.php";
        $link = "http://" . Config::$domain . "/api/verify_account.php?mail=" . urlencode($email) . "&uuid=" . urlencode($uuid);
        require_once __DIR__ . "/../api/send_mail.php";
        sendMailAPI($email, "Verifica Account Abacus", "Ecco il tuo link di verifica: " . $link);


        try {
            if ($stmt->execute()) {
                return true;
            }
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                return "MAIL_EXISTS";
            }
        }

        return false;
    }

    static public function doLogin($user, $password)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $db = new DatabaseManager();

        $stmt = $db->prepare("SELECT password FROM dipendenti WHERE user = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if ($row && password_verify($password, $row["password"])) {
            return true;
        }

        return false;
    }

    static public function doRegister($user, $password)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $db = new DatabaseManager();

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $db->prepare("INSERT INTO dipendenti (user, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $user, $hashedPassword);

        try {
            if ($stmt->execute()) {
                return true;
            }
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                return "USER_EXISTS";
            }
        }

        return false;
    }

    static public function doLogout()
    {
        if (isset($_SESSION["user"])) {
            unset($_SESSION["user"]);
            return true;
        }
        return false;
    }
}