-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 11. Mai 2012 um 09:29
-- Server Version: 5.5.16
-- PHP-Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `brainstormingapp`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `menu`
--

INSERT INTO `menu` (`ID`, `Name`) VALUES
(1, 'File'),
(2, 'Edit'),
(3, 'View');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `menu_entry`
--

CREATE TABLE IF NOT EXISTS `menu_entry` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `fk_ID` int(3) NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `onClick` varchar(255) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Daten für Tabelle `menu_entry`
--

INSERT INTO `menu_entry` (`ID`, `fk_ID`, `name`, `onClick`) VALUES
(1, 1, 'New', 'newAction'),
(2, 1, 'Load', 'loadAction'),
(3, 1, 'Save', 'saveAction'),
(4, 1, 'Logout', 'logoutAction'),
(5, 1, 'Preferences', 'preferencesAction'),
(6, 2, 'redo', 'redoAction'),
(7, 2, 'undo', 'undoAction'),
(8, 3, 'tools', 'toolsAction'),
(9, 3, 'etc', 'etcAction');

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'superuser', 'superuser@mail.com', 'pw'),
(2, 'Guest', 'guest@guest.guest', 'Guest');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
