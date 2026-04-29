<?php
require_once __DIR__ . "/../vendor/autoload.php";

class Config
{
    static public $hostname;
    static public $username;
    static public $password;
    static public $dbName;
    static public $domain = "abacus";

    static function init()
    {
        $dotEnv = Dotenv\Dotenv::createImmutable(__DIR__ . "/../");
        $dotEnv->load();

        Config::$hostname = $_ENV['DB_HOST'];
        Config::$dbName   = $_ENV['DB_NAME'];
        Config::$username = $_ENV['DB_USER'];
        Config::$password = $_ENV['DB_PASS'];
    }
}