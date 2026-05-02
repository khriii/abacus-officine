<?php
class OfficineManager
{

    //private Officina $officine = [];

    public static function getServiziByOfficina($codiceOfficina)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $query = "
            SELECT s.codice, s.descrizione, s.costo_orario
            FROM officine_servizi os
            JOIN servizi s ON os.codice_servizio = s.codice
            WHERE os.codice_officina = '$codiceOfficina'
        ";

        $result = $dbManager->query($query);

        $servizi = [];
        while ($row = $result->fetch_assoc()) {
            $servizi[] = $row;
        }

        return $servizi;
    }

    public static function getAllOfficine()
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("SELECT * FROM officine");

        $officine = [];
        while ($row = $result->fetch_assoc()) {
            $officine[] = $row;
        }

        return $officine;
    }

    public static function getAllServizi()
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("SELECT * FROM servizi");

        $servizi = [];
        while ($row = $result->fetch_assoc()) {
            $servizi[] = $row;
        }

        return $servizi;
    }


    public static function addServizio($costo_orario, $descrizione)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("INSERT INTO servizi (costo_orario, descrizione) VALUES ('$costo_orario', '$descrizione')");
        if (!$result) {
            return false;
        }
        return true;
    }

    public static function addPezzoRicambio($costo_unitario, $descrizione)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("INSERT INTO pezzi_di_ricambio (costo_unitario, descrizione) VALUES ('$costo_unitario', '$descrizione')");
        if (!$result) {
            return false;
        }
        return true;
    }

    public static function bindServizioToOfficina($codice_officina, $codice_servizio)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("INSERT IGNORE INTO officine_servizi (codice_officina, codice_servizio) VALUES ('$codice_officina', '$codice_servizio')");
        if (!$result) {
            return false;
        }
        return true;
    }

    public static function addAccessorio($descrizione, $costo_unitario)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("INSERT INTO accessori (descrizione, costo_unitario) VALUES ('$descrizione', '$costo_unitario')");
        if (!$result) {
            return false;
        }
        return true;
    }

    public static function getAllAccessori()
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("SELECT * FROM accessori");

        $accessori = [];
        while ($row = $result->fetch_assoc()) {
            $accessori[] = $row;
        }

        return $accessori;
    }

    public static function getAllPezziRicambio()
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("SELECT * FROM pezzi_di_ricambio");

        $accessori = [];
        while ($row = $result->fetch_assoc()) {
            $accessori[] = $row;
        }

        return $accessori;
    }

    public static function bindAccessorioToOfficina($codice_officina, $codice_accessorio)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("INSERT IGNORE INTO officine_accessori (codice_officina, codice_accessorio) VALUES ('$codice_officina', '$codice_accessorio')");
        if (!$result) {
            return false;
        }
        return true;
    }

    public static function hasPezzoRicambioInOfficina($codice_officina, $codice_pezzo_ricambio)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;
        $query = "SELECT 1 FROM officine_pezzi_ricambio WHERE codice_officina = '$codice_officina' AND codice_pezzo_ricambio = '$codice_pezzo_ricambio' LIMIT 1";
        $result = $dbManager->query($query);

        if (!$result) {
            return false;
        }

        return $result->num_rows > 0;
    }

    public static function bindPezzoRicambioToOfficina($codice_officina, $codice_pezzo_ricambio, $quantita = 1)
    {
        if (self::hasPezzoRicambioInOfficina($codice_officina, $codice_pezzo_ricambio)) {
            return false;
        }

        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        $result = $dbManager->query("INSERT INTO officine_pezzi_ricambio (codice_officina, codice_pezzo_ricambio, quantita) VALUES ('$codice_officina', '$codice_pezzo_ricambio', '$quantita')");
        if (!$result) {
            return false;
        }
        return true;
    }

    public static function removePezzoRicambioFromOfficina($codice_officina, $codice_pezzo_ricambio)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;
        $result = $dbManager->query("DELETE FROM officine_pezzi_ricambio WHERE codice_officina = '$codice_officina' AND codice_pezzo_ricambio = '$codice_pezzo_ricambio'");

        if ($result === false) {
            return false;
        }

        return $dbManager->getConnection()->affected_rows;
    }

    public static function filter($servizio, $accessorio)
    {
        require_once __DIR__ . "/DatabaseManager.php";

        $dbManager = new DatabaseManager;

        if ($servizio != null && $servizio != '' && $accessorio != null && $accessorio != '') {
            $query = "SELECT DISTINCT o.* FROM officine o 
                      JOIN officine_servizi os ON o.codice = os.codice_officina 
                      JOIN officine_accessori oa ON o.codice = oa.codice_officina 
                      WHERE os.codice_servizio = '$servizio' AND oa.codice_accessorio = '$accessorio'";
        } else if ($servizio != null && $servizio != '') {
            $query = "SELECT DISTINCT o.* FROM officine o 
                      JOIN officine_servizi os ON o.codice = os.codice_officina 
                      WHERE os.codice_servizio = '$servizio'";
        } else if ($accessorio != null && $accessorio != '') {
            $query = "SELECT DISTINCT o.* FROM officine o 
                      JOIN officine_accessori oa ON o.codice = oa.codice_officina 
                      WHERE oa.codice_accessorio = '$accessorio'";
        } else {
            $query = "SELECT DISTINCT o.* FROM officine o";
        }

        $result = $dbManager->query($query);

        if (!$result) {
            return false;
        }

        $officine = [];
        while ($row = $result->fetch_assoc()) {
            $officine[] = $row;
        }

        return $officine;
    }
}
