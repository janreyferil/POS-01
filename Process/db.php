<?php

class Database {
    private $host;
    private $username;
    private $password;
    private $dbname;

    public function connection() {
        $this->host = 'localhost';
        $this->username = 'root';
        $this->password = '';
        $this->dbname = 'dbpos';

        $conn = new mysqli($this->host,$this->username,$this->password,$this->dbname);
        return $conn;
    }
}



