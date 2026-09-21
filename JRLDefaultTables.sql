-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 21, 2026 at 02:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jrl`
--

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `match_num` int(11) DEFAULT NULL,
  `red1` int(11) DEFAULT 0,
  `red2` int(11) DEFAULT 0,
  `red3` int(11) DEFAULT 0,
  `blue1` int(11) DEFAULT NULL,
  `blue2` int(11) DEFAULT NULL,
  `blue3` int(11) DEFAULT NULL,
  `red_foul` int(11) DEFAULT 0,
  `red_tech_foul` int(11) DEFAULT 0,
  `blue_foul` int(11) DEFAULT 0,
  `blue_tech_foul` int(11) DEFAULT 0,
  `score_lock` int(11) DEFAULT 0,
  `played` int(11) DEFAULT 0,
  `red_mob` int(11) DEFAULT 0,
  `blue_mob` int(11) DEFAULT 0,
  `blue_auto_gp1_high` int(11) DEFAULT 0,
  `red_auto_gp1_high` int(11) DEFAULT 0,
  `blue_auto_gp2_high` int(11) DEFAULT 0,
  `red_auto_gp2_high` int(11) DEFAULT 0,
  `blue_auto_gp1_low` int(11) DEFAULT 0,
  `red_auto_gp1_low` int(11) DEFAULT 0,
  `blue_auto_gp2_low` int(11) DEFAULT 0,
  `red_auto_gp2_low` int(11) DEFAULT 0,
  `blue_tele_gp1_low` int(11) DEFAULT 0,
  `red_tele_gp1_low` int(11) DEFAULT 0,
  `blue_tele_gp2_low` int(11) DEFAULT 0,
  `red_tele_gp2_low` int(11) DEFAULT 0,
  `blue_tele_gp1_high` int(11) DEFAULT 0,
  `red_tele_gp1_high` int(11) DEFAULT 0,
  `blue_tele_gp2_high` int(11) DEFAULT 0,
  `red_tele_gp2_high` int(11) DEFAULT 0,
  `blue_park` int(11) DEFAULT 0,
  `red_park` int(11) DEFAULT 0,
  `blue_climb` int(11) DEFAULT 0,
  `red_climb` int(11) DEFAULT 0,
  `red_total_points` int(11) DEFAULT 0,
  `blue_total_points` int(11) NOT NULL DEFAULT 0,
  `red_quali_points` int(11) NOT NULL DEFAULT 0,
  `blue_quali_points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`match_num`, `red1`, `red2`, `red3`, `blue1`, `blue2`, `blue3`, `red_foul`, `red_tech_foul`, `blue_foul`, `blue_tech_foul`, `score_lock`, `played`, `red_mob`, `blue_mob`, `blue_auto_gp1_high`, `red_auto_gp1_high`, `blue_auto_gp2_high`, `red_auto_gp2_high`, `blue_auto_gp1_low`, `red_auto_gp1_low`, `blue_auto_gp2_low`, `red_auto_gp2_low`, `blue_tele_gp1_low`, `red_tele_gp1_low`, `blue_tele_gp2_low`, `red_tele_gp2_low`, `blue_tele_gp1_high`, `red_tele_gp1_high`, `blue_tele_gp2_high`, `red_tele_gp2_high`, `blue_park`, `red_park`, `blue_climb`, `red_climb`, `red_total_points`, `blue_total_points`, `red_quali_points`, `blue_quali_points`) VALUES
(1, 6, 11, 211, 201, 8, 200, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 34, 26, 2, 0),
(2, 12, 203, 2, 7, 209, 212, 0, 0, 1, 1, 1, 1, 3, 0, 0, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 132, 55, 2, 0),
(3, 1, 206, 207, 3, 202, 205, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 36, 1, 1),
(4, 4, 210, 5, 208, 10, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 2, 11, 205, 204, 209, 203, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 1, 1),
(6, 9, 201, 10, 7, 212, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 4, 210, 208, 202, 211, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 3, 206, 1, 5, 207, 204, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 9, 203, 201, 8, 12, 211, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 2, 11, 6, 209, 208, 212, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(11, 12, 10, 8, 202, 3, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 4, 7, 206, 210, 1, 207, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(13, 208, 211, 209, 205, 5, 204, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(14, 203, 12, 1, 2, 202, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(15, 7, 4, 206, 210, 200, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(16, 205, 201, 207, 8, 9, 212, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(17, 10, 5, 4, 6, 204, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(18, 209, 212, 201, 7, 1, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(19, 9, 3, 204, 211, 207, 205, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(20, 202, 8, 10, 6, 206, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(21, 2, 208, 205, 11, 210, 203, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 3, 201, 211, 207, 1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(23, 209, 200, 2, 7, 5, 204, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(24, 11, 12, 203, 8, 9, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(25, 206, 10, 202, 212, 210, 208, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 5, 1, 7, 200, 2, 205, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 11, 4, 208, 12, 8, 210, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(28, 211, 202, 9, 201, 6, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(29, 212, 203, 204, 207, 209, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(30, 10, 201, 5, 206, 210, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(31, 8, 12, 209, 2, 202, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(32, 208, 4, 203, 3, 205, 206, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 207, 11, 204, 211, 9, 212, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(34, 5, 206, 200, 1, 6, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(35, 8, 212, 205, 209, 203, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(36, 10, 211, 207, 3, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(37, 11, 9, 7, 1, 208, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(38, 206, 205, 5, 201, 210, 204, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(201, 4, 5, 6, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `match_time` int(11) DEFAULT 140,
  `match_num` int(11) DEFAULT 0,
  `red_score` int(11) DEFAULT NULL,
  `blue_score` int(11) DEFAULT NULL,
  `red1` int(11) DEFAULT 0,
  `red2` int(11) DEFAULT 0,
  `red3` int(11) DEFAULT 0,
  `blue1` int(11) DEFAULT 0,
  `blue2` int(11) DEFAULT 0,
  `blue3` int(11) DEFAULT 0,
  `red_auto_score` int(11) DEFAULT NULL,
  `red_tele_score` int(11) DEFAULT NULL,
  `red_endgame_score` int(11) DEFAULT NULL,
  `blue_auto_score` int(11) DEFAULT NULL,
  `blue_tele_score` int(11) DEFAULT NULL,
  `blue_endgame_score` int(11) DEFAULT NULL,
  `display_state` int(11) DEFAULT 0,
  `ranking_page_state` int(11) DEFAULT 0,
  `score_lock` int(11) DEFAULT 0,
  `blue_confirm` int(11) DEFAULT 0,
  `red_confirm` int(11) DEFAULT 0,
  `red_penalties` int(11) DEFAULT NULL,
  `blue_penalties` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`match_time`, `match_num`, `red_score`, `blue_score`, `red1`, `red2`, `red3`, `blue1`, `blue2`, `blue3`, `red_auto_score`, `red_tele_score`, `red_endgame_score`, `blue_auto_score`, `blue_tele_score`, `blue_endgame_score`, `display_state`, `ranking_page_state`, `score_lock`, `blue_confirm`, `red_confirm`, `red_penalties`, `blue_penalties`) VALUES
(140, 201, 0, 0, 4, 5, 6, 1, 2, 3, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_num` int(4) NOT NULL,
  `team_name` text NOT NULL,
  `matches_played` int(11) DEFAULT 0,
  `qualification_score` int(11) DEFAULT 0,
  `endgame_score` int(11) DEFAULT 0,
  `auto_score` int(11) DEFAULT 0,
  `tele_score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_num`, `team_name`, `matches_played`, `qualification_score`, `endgame_score`, `auto_score`, `tele_score`) VALUES
(1, 'Team 1', 1, 1, 0, 36, 0),
(2, 'Team 2', 2, 3, 14, 58, 42),
(3, 'Team 3', 1, 1, 0, 36, 0),
(4, 'Team 4', 0, 0, 0, 0, 0),
(5, 'Team 5', 0, 0, 0, 0, 0),
(6, 'Team 6', 1, 2, 22, 0, 21),
(7, 'Team 7', 1, 0, 7, 0, 42),
(8, 'Team 8', 1, 0, 0, 36, 0),
(9, 'Team 9', 0, 0, 0, 0, 0),
(10, 'Team 10', 0, 0, 0, 0, 0),
(11, 'Team 11', 2, 3, 22, 8, 21),
(12, 'Team 12', 1, 2, 14, 50, 42),
(200, 'Team 200', 1, 0, 0, 36, 0),
(201, 'Team 201', 1, 0, 0, 36, 0),
(202, 'Team 202', 1, 1, 0, 36, 0),
(203, 'Team 203', 2, 3, 14, 58, 42),
(204, 'Team 204', 1, 1, 0, 8, 0),
(205, 'Team 205', 2, 2, 0, 44, 0),
(206, 'Team 206', 1, 1, 0, 36, 0),
(207, 'Team 207', 1, 1, 0, 36, 0),
(208, 'Team 208', 0, 0, 0, 0, 0),
(209, 'Team 209', 2, 1, 7, 8, 42),
(210, 'Team 210', 0, 0, 0, 0, 0),
(211, 'Team 211', 1, 2, 22, 0, 21),
(212, 'Team 212', 1, 0, 7, 0, 42);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
