-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 29, 2026 alle 09:07
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abacus`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `accessori`
--

CREATE TABLE `accessori` (
  `codice` int(11) NOT NULL,
  `descrizione` varchar(255) NOT NULL,
  `costo_unitario` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dump dei dati per la tabella `accessori`
--

INSERT INTO `accessori` (`codice`, `descrizione`, `costo_unitario`) VALUES
(4, 'Specchietto', 67),
(5, 'Liquido Lavavetri', 25);

-- --------------------------------------------------------

--
-- Struttura della tabella `autoveicoli`
--

CREATE TABLE `autoveicoli` (
  `targa` varchar(7) NOT NULL,
  `n_telaio` varchar(255) NOT NULL,
  `descrizione` varchar(255) NOT NULL,
  `anno_costruzione` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `clienti`
--

CREATE TABLE `clienti` (
  `codice` int(11) NOT NULL,
  `mail` varchar(64) NOT NULL,
  `cognome` varchar(64) NOT NULL,
  `nome` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `telefono` varchar(16) NOT NULL,
  `uuid` varchar(64) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `dipendenti`
--

CREATE TABLE `dipendenti` (
  `user` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ruolo` enum('admin','tecnico','magazziniere') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dump dei dati per la tabella `dipendenti`
--

INSERT INTO `dipendenti` (`user`, `password`, `ruolo`) VALUES
('admin', 'password', 'admin');

-- --------------------------------------------------------

--
-- Struttura della tabella `interventi`
--

CREATE TABLE `interventi` (
  `codice` int(11) NOT NULL,
  `codice_cliente` int(11) NOT NULL,
  `codice_tipo_intervento` int(11) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `interventi_accessori`
--

CREATE TABLE `interventi_accessori` (
  `codice_articolo` int(11) NOT NULL,
  `codice_intervento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `interventi_pezzi_ricambio`
--

CREATE TABLE `interventi_pezzi_ricambio` (
  `codice_intervento` int(11) NOT NULL,
  `codice_pezzo_ricambio` int(11) NOT NULL,
  `quantita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `interventi_servizi`
--

CREATE TABLE `interventi_servizi` (
  `codice_intervento` int(11) NOT NULL,
  `codice_servizio` int(11) NOT NULL,
  `ore` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `magazzinieri`
--

CREATE TABLE `magazzinieri` (
  `id` int(11) NOT NULL,
  `nome` varchar(64) NOT NULL,
  `codice_officina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dump dei dati per la tabella `magazzinieri`
--

INSERT INTO `magazzinieri` (`id`, `nome`, `codice_officina`) VALUES
(1, 'Francesco', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `officine`
--

CREATE TABLE `officine` (
  `codice` int(11) NOT NULL,
  `denominazione` varchar(255) NOT NULL,
  `indirizzo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dump dei dati per la tabella `officine`
--

INSERT INTO `officine` (`codice`, `denominazione`, `indirizzo`) VALUES
(3, 'Ferrari', 'Via Ferrari'),
(4, 'Lamborghini', 'Via Lamborghini');

-- --------------------------------------------------------

--
-- Struttura della tabella `officine_accessori`
--

CREATE TABLE `officine_accessori` (
  `codice_officina` int(11) NOT NULL,
  `codice_accessorio` int(11) NOT NULL,
  `quantita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `officine_pezzi_ricambio`
--

CREATE TABLE `officine_pezzi_ricambio` (
  `codice_officina` int(11) NOT NULL,
  `codice_pezzo_ricambio` int(11) NOT NULL,
  `quantita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `officine_servizi`
--

CREATE TABLE `officine_servizi` (
  `codice_officina` int(11) NOT NULL,
  `codice_servizio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `pezzi_di_ricambio`
--

CREATE TABLE `pezzi_di_ricambio` (
  `codice` int(11) NOT NULL,
  `descrizione` varchar(255) NOT NULL,
  `costo_unitario` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `servizi`
--

CREATE TABLE `servizi` (
  `codice` int(11) NOT NULL,
  `costo_orario` double NOT NULL,
  `descrizione` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dump dei dati per la tabella `servizi`
--

INSERT INTO `servizi` (`codice`, `costo_orario`, `descrizione`) VALUES
(6, 20, 'Lavaggio Auto'),
(7, 20, 'Lavaggio Moto');

-- --------------------------------------------------------

--
-- Struttura della tabella `tipi_intervento`
--

CREATE TABLE `tipi_intervento` (
  `codice` int(11) NOT NULL,
  `descrizione` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accessori`
--
ALTER TABLE `accessori`
  ADD PRIMARY KEY (`codice`);

--
-- Indici per le tabelle `autoveicoli`
--
ALTER TABLE `autoveicoli`
  ADD PRIMARY KEY (`targa`);

--
-- Indici per le tabelle `clienti`
--
ALTER TABLE `clienti`
  ADD PRIMARY KEY (`codice`),
  ADD UNIQUE KEY `email` (`mail`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indici per le tabelle `dipendenti`
--
ALTER TABLE `dipendenti`
  ADD PRIMARY KEY (`user`);

--
-- Indici per le tabelle `interventi`
--
ALTER TABLE `interventi`
  ADD PRIMARY KEY (`codice`),
  ADD KEY `fk_codice_cliente` (`codice_cliente`),
  ADD KEY `fk_codice_tipo_intervento` (`codice_tipo_intervento`);

--
-- Indici per le tabelle `interventi_accessori`
--
ALTER TABLE `interventi_accessori`
  ADD KEY `fk_codice_intervento` (`codice_intervento`),
  ADD KEY `fk_codice_articolo` (`codice_articolo`);

--
-- Indici per le tabelle `interventi_pezzi_ricambio`
--
ALTER TABLE `interventi_pezzi_ricambio`
  ADD KEY `fk_codice_intervento` (`codice_intervento`),
  ADD KEY `fk_codice_pezzo_ricambio` (`codice_pezzo_ricambio`);

--
-- Indici per le tabelle `interventi_servizi`
--
ALTER TABLE `interventi_servizi`
  ADD KEY `fk_codice_intervento` (`codice_intervento`),
  ADD KEY `fk_codice_servizio` (`codice_servizio`);

--
-- Indici per le tabelle `magazzinieri`
--
ALTER TABLE `magazzinieri`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codice_officina` (`codice_officina`);

--
-- Indici per le tabelle `officine`
--
ALTER TABLE `officine`
  ADD PRIMARY KEY (`codice`);

--
-- Indici per le tabelle `officine_accessori`
--
ALTER TABLE `officine_accessori`
  ADD KEY `fk_codice_officina` (`codice_officina`),
  ADD KEY `fk_codice_accessorio` (`codice_accessorio`);

--
-- Indici per le tabelle `officine_pezzi_ricambio`
--
ALTER TABLE `officine_pezzi_ricambio`
  ADD KEY `fk_codice_officina` (`codice_officina`),
  ADD KEY `fk_codice_pezzo_ricambio` (`codice_pezzo_ricambio`);

--
-- Indici per le tabelle `officine_servizi`
--
ALTER TABLE `officine_servizi`
  ADD PRIMARY KEY (`codice_officina`,`codice_servizio`);

--
-- Indici per le tabelle `pezzi_di_ricambio`
--
ALTER TABLE `pezzi_di_ricambio`
  ADD PRIMARY KEY (`codice`);

--
-- Indici per le tabelle `servizi`
--
ALTER TABLE `servizi`
  ADD PRIMARY KEY (`codice`);

--
-- Indici per le tabelle `tipi_intervento`
--
ALTER TABLE `tipi_intervento`
  ADD PRIMARY KEY (`codice`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `accessori`
--
ALTER TABLE `accessori`
  MODIFY `codice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `clienti`
--
ALTER TABLE `clienti`
  MODIFY `codice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `interventi`
--
ALTER TABLE `interventi`
  MODIFY `codice` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `magazzinieri`
--
ALTER TABLE `magazzinieri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `officine`
--
ALTER TABLE `officine`
  MODIFY `codice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `pezzi_di_ricambio`
--
ALTER TABLE `pezzi_di_ricambio`
  MODIFY `codice` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `servizi`
--
ALTER TABLE `servizi`
  MODIFY `codice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `tipi_intervento`
--
ALTER TABLE `tipi_intervento`
  MODIFY `codice` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `magazzinieri`
--
ALTER TABLE `magazzinieri`
  ADD CONSTRAINT `fk_codice_officina_magazzinieri` FOREIGN KEY (`codice_officina`) REFERENCES `officine` (`codice`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
