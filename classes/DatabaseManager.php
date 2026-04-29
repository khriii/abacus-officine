<?php

class DatabaseManager {
    private $conn;
    
    public function __construct()
    {
        require_once __DIR__ . "/../configs/Config.php";
        Config::init();
        $this->conn = new mysqli(
            Config::$hostname,
            Config::$username,
            Config::$password,
            Config::$dbName
        );
    }

    public function query($q) {
        return $this->conn->query($q);
    }

    public function prepare($sql) {
        return $this->conn->prepare($sql);
    }

    public function getConnection() {
    return $this->conn;
}
}