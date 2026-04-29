<?php
class Officina {
    private int $codice;
    private string $denominazione;
    private string $indirizzo;

    public function __construct($codice, $denominazione, $indirizzo)
    {
        $this->codice = $codice;
        $this->denominazione = $denominazione;
        $this->indirizzo = $indirizzo;
    }

    public function getCodice() {
        return $this->codice;
    }

    public function getDenominazione() {
        return $this->denominazione;
    }

    public function getIndirizzo() {
        return $this->indirizzo;
    }
}