-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 18 oct. 2020 à 23:39
-- Version du serveur :  10.4.14-MariaDB
-- Version de PHP : 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `joji_board`
--

-- --------------------------------------------------------

--
-- Structure de la table `access`
--

CREATE TABLE `access` (
  `id_access` int(11) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `access`
--

INSERT INTO `access` (`id_access`, `name`) VALUES
(1, 'user'),
(2, 'recruiter'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `ad`
--

CREATE TABLE `ad` (
  `id_ad` int(11) NOT NULL,
  `id_recruteur` int(11) NOT NULL,
  `name_ad` varchar(255) NOT NULL,
  `compagny` int(11) NOT NULL,
  `descr` varchar(30) NOT NULL,
  `descr_all` text NOT NULL,
  `salaire` varchar(30) NOT NULL,
  `duration_job` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ad`
--

INSERT INTO `ad` (`id_ad`, `id_recruteur`, `name_ad`, `compagny`, `descr`, `descr_all`, `salaire`, `duration_job`) VALUES
(24, 31, 'undefined', 6, '64564', 'eazeazsdddddddddddddddddddddddddddd', 'eazeazeaz', 'eazeaze'),
(26, 31, 'testte', 6, 'stest', 'test', 'test', 'test'),
(27, 31, 'name', 6, 'description', 'long descriptqsdqsd', 'salaire CDI', 'dureeqsdqsdqsfqsd');

-- --------------------------------------------------------

--
-- Structure de la table `compagnies`
--

CREATE TABLE `compagnies` (
  `id_compagnies` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `locality` varchar(255) NOT NULL,
  `Creator` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `compagnies`
--

INSERT INTO `compagnies` (`id_compagnies`, `name`, `locality`, `Creator`) VALUES
(3, 'Compagny 2', 'Metz', 29),
(4, 'Dev_opti2', 'Nancy', 24),
(7, 'SDALDLS', 'qsdlqlsd', 31);

-- --------------------------------------------------------

--
-- Structure de la table `info_ad`
--

CREATE TABLE `info_ad` (
  `id_info_ad` int(11) NOT NULL,
  `email_sent` varchar(255) NOT NULL,
  `ad` int(11) NOT NULL,
  `compagny_ad` int(11) NOT NULL,
  `people_interrested` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `info_ad`
--

INSERT INTO `info_ad` (`id_info_ad`, `email_sent`, `ad`, `compagny_ad`, `people_interrested`) VALUES
(12, 'kvjzek', 6, 3, 'jfnleeckz'),
(13, 'ad', 6, 3, 'BATAGNE'),
(14, 'ad', 6, 3, 'BATAGNE sonia');

-- --------------------------------------------------------

--
-- Structure de la table `people`
--

CREATE TABLE `people` (
  `id_people` int(11) NOT NULL,
  `droit` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mdp` varchar(32) NOT NULL,
  `num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `people`
--

INSERT INTO `people` (`id_people`, `droit`, `firstname`, `name`, `email`, `mdp`, `num`) VALUES
(23, 1, 'board', 'joji', 'johnbatagne@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 50431491),
(24, 2, 'Enes', 'KOC', 'enes.koc@epitech.eu', '123456', 786038178),
(27, 1, 'board', 'joji', 'johnbatagne@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 50431491),
(28, 1, 'board', 'joji', 'johnbatagne@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 50431491),
(29, 2, 'Mr jean', 'tenrien', 'jeantenrien@compagny.fr', 'jtjt', 786038176),
(30, 3, 'martel', 'jimmy', 'jimmy54martel@gmail.com', '123456', 695491398),
(31, 2, 'test', 'test', 'test@recruiter.fr', '123456', 123456789);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`id_access`);

--
-- Index pour la table `ad`
--
ALTER TABLE `ad`
  ADD PRIMARY KEY (`id_ad`),
  ADD KEY `id_recruteur` (`id_recruteur`);

--
-- Index pour la table `compagnies`
--
ALTER TABLE `compagnies`
  ADD PRIMARY KEY (`id_compagnies`),
  ADD KEY `compagnies_ibfk_1` (`Creator`);

--
-- Index pour la table `info_ad`
--
ALTER TABLE `info_ad`
  ADD PRIMARY KEY (`id_info_ad`),
  ADD KEY `ad` (`ad`),
  ADD KEY `compagny_ad` (`compagny_ad`);

--
-- Index pour la table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id_people`),
  ADD KEY `droit` (`droit`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `access`
--
ALTER TABLE `access`
  MODIFY `id_access` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `ad`
--
ALTER TABLE `ad`
  MODIFY `id_ad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `compagnies`
--
ALTER TABLE `compagnies`
  MODIFY `id_compagnies` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `info_ad`
--
ALTER TABLE `info_ad`
  MODIFY `id_info_ad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `people`
--
ALTER TABLE `people`
  MODIFY `id_people` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ad`
--
ALTER TABLE `ad`
  ADD CONSTRAINT `ad_ibfk_1` FOREIGN KEY (`id_recruteur`) REFERENCES `people` (`id_people`);

--
-- Contraintes pour la table `compagnies`
--
ALTER TABLE `compagnies`
  ADD CONSTRAINT `compagnies_ibfk_1` FOREIGN KEY (`Creator`) REFERENCES `people` (`id_people`);

--
-- Contraintes pour la table `info_ad`
--
ALTER TABLE `info_ad`
  ADD CONSTRAINT `info_ad_ibfk_1` FOREIGN KEY (`ad`) REFERENCES `ad` (`id_ad`),
  ADD CONSTRAINT `info_ad_ibfk_2` FOREIGN KEY (`compagny_ad`) REFERENCES `compagnies` (`id_compagnies`);

--
-- Contraintes pour la table `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `people_ibfk_1` FOREIGN KEY (`droit`) REFERENCES `access` (`id_access`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
