-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 10, 2026 at 12:07 AM
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
  `red_total_points` int(11) NOT NULL,
  `blue_total_points` int(11) NOT NULL,
  `red_quali_points` int(11) NOT NULL,
  `blue_quali_points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`match_num`, `red1`, `red2`, `red3`, `blue1`, `blue2`, `blue3`, `red_foul`, `red_tech_foul`, `blue_foul`, `blue_tech_foul`, `score_lock`, `played`, `red_mob`, `blue_mob`, `blue_auto_gp1_high`, `red_auto_gp1_high`, `blue_auto_gp2_high`, `red_auto_gp2_high`, `blue_auto_gp1_low`, `red_auto_gp1_low`, `blue_auto_gp2_low`, `red_auto_gp2_low`, `blue_tele_gp1_low`, `red_tele_gp1_low`, `blue_tele_gp2_low`, `red_tele_gp2_low`, `blue_tele_gp1_high`, `red_tele_gp1_high`, `blue_tele_gp2_high`, `red_tele_gp2_high`, `blue_park`, `red_park`, `blue_climb`, `red_climb`, `red_total_points`, `blue_total_points`, `red_quali_points`, `blue_quali_points`) VALUES
(3, 11, 2, 28, 12, 15, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 19, 24, 6, 26, 8, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 25, 16, 23, 14, 36, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 17, 10, 3, 4, 5, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 9, 30, 13, 20, 7, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1, 21, 34, 18, 22, 35, 1, 0, 0, 0, 0, 0, 0, 3, 2, 1, 4, 1, 4, 1, 4, 1, 4, 1, 3, 1, 3, 1, 4, 1, 3, 1, 0, 2, 0, 0, 0, 0, 0),
(8, 30, 31, 26, 13, 25, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 22, 19, 35, 11, 2, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 10, 14, 15, 5, 20, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 33, 23, 28, 8, 6, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(11, 32, 4, 7, 24, 27, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 17, 12, 1, 34, 3, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(13, 14, 28, 2, 19, 21, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(15, 12, 35, 18, 10, 3, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(14, 33, 11, 25, 4, 20, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(16, 16, 15, 7, 6, 8, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(17, 34, 5, 27, 29, 32, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(20, 18, 32, 2, 29, 6, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(19, 3, 30, 7, 4, 21, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(18, 24, 36, 17, 9, 26, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(21, 16, 1, 13, 11, 8, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(24, 34, 20, 19, 12, 9, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 15, 24, 25, 22, 10, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(23, 31, 36, 27, 5, 26, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 1, 26, 9, 34, 6, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 10, 33, 7, 4, 11, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(25, 2, 8, 22, 15, 21, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(31, 11, 21, 7, 5, 16, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(30, 30, 20, 31, 25, 12, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(28, 5, 24, 3, 27, 36, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(29, 18, 19, 13, 23, 14, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(32, 10, 17, 1, 13, 23, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 25, 33, 4, 12, 32, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(34, 6, 18, 14, 22, 30, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(35, 35, 24, 26, 20, 31, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(38, 31, 8, 20, 6, 7, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(36, 34, 19, 9, 27, 29, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(37, 23, 14, 10, 17, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, 9, 35, 34, 2, 21, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(40, 18, 13, 33, 22, 25, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(42, 19, 3, 29, 4, 11, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(44, 9, 20, 30, 22, 21, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(41, 12, 15, 24, 30, 28, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(43, 26, 2, 23, 18, 8, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(46, 24, 11, 33, 4, 28, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(45, 36, 10, 31, 12, 15, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(47, 5, 34, 17, 3, 14, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(52, 24, 7, 36, 26, 13, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(49, 33, 32, 18, 4, 28, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(48, 13, 6, 29, 1, 25, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(51, 3, 10, 6, 27, 16, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(50, 35, 21, 19, 2, 22, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(53, 23, 17, 31, 29, 14, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(54, 1, 20, 9, 34, 15, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `match_time` int(11) DEFAULT NULL,
  `match_num` int(11) DEFAULT NULL,
  `red_score` int(11) DEFAULT NULL,
  `blue_score` int(11) DEFAULT NULL,
  `red1` tinyint(4) DEFAULT NULL,
  `red2` tinyint(4) DEFAULT NULL,
  `red3` tinyint(4) DEFAULT NULL,
  `blue1` tinyint(4) DEFAULT NULL,
  `blue2` tinyint(4) DEFAULT NULL,
  `blue3` tinyint(4) DEFAULT NULL,
  `red_auto_score` int(11) DEFAULT NULL,
  `red_tele_score` int(11) DEFAULT NULL,
  `red_endgame_score` int(11) DEFAULT NULL,
  `blue_auto_score` int(11) DEFAULT NULL,
  `blue_tele_score` int(11) DEFAULT NULL,
  `blue_endgame_score` int(11) DEFAULT NULL,
  `display_state` int(11) DEFAULT NULL,
  `ranking_page_state` int(11) DEFAULT NULL,
  `score_lock` int(11) DEFAULT 0,
  `blue_confirm` int(11) DEFAULT NULL,
  `red_confirm` int(11) DEFAULT NULL,
  `red_penalties` int(11) DEFAULT NULL,
  `blue_penalties` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`match_time`, `match_num`, `red_score`, `blue_score`, `red1`, `red2`, `red3`, `blue1`, `blue2`, `blue3`, `red_auto_score`, `red_tele_score`, `red_endgame_score`, `blue_auto_score`, `blue_tele_score`, `blue_endgame_score`, `display_state`, `ranking_page_state`, `score_lock`, `blue_confirm`, `red_confirm`, `red_penalties`, `blue_penalties`) VALUES
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL),
(140, 1, 0, 0, 21, 34, 18, 22, 35, 1, 0, 0, 0, 43, 21, 37, 2, NULL, 0, 0, NULL, 0, 0);

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
(1, 'Team 1', 1, 2, 3, 6, 3),
(2, 'Team 2', 1, 2, 3, 6, 3),
(4, 'Team 4', 1, 2, 3, 6, 3),
(5, 'Team 5', 1, 2, 3, 6, 3),
(3, 'Team 3', 1, 2, 3, 6, 3),
(7, 'Team 7', 1, 2, 3, 6, 3),
(8, 'Team 8', 1, 2, 3, 6, 3),
(9, 'Team 9', 1, 2, 3, 6, 3),
(10, 'Team 10', 1, 2, 3, 6, 3),
(11, 'Team 11', 1, 2, 3, 6, 3),
(6, 'Team 6', 1, 2, 3, 6, 3),
(12, 'Team 12', 1, 2, 3, 6, 3),
(13, 'Team 13', 1, 2, 3, 6, 3),
(14, 'Team 14', 1, 2, 3, 6, 3),
(16, 'Team 16', 1, 2, 3, 6, 3),
(19, 'Team 19', 1, 2, 3, 6, 3),
(18, 'Team 18', 1, 2, 3, 6, 3),
(15, 'Team 15', 1, 2, 3, 6, 3),
(17, 'Team 17', 1, 2, 3, 6, 3),
(20, 'Team 20', 1, 2, 3, 6, 3),
(21, 'Team 21', 1, 2, 3, 6, 3),
(24, 'Team 24', 1, 2, 3, 6, 3),
(23, 'Team 23', 1, 2, 3, 6, 3),
(22, 'Team 22', 1, 2, 3, 6, 3),
(26, 'Team 26', 1, 2, 3, 6, 3),
(25, 'Team 25', 1, 2, 3, 6, 3),
(27, 'Team 27', 1, 2, 3, 6, 3),
(28, 'Team 28', 1, 2, 3, 6, 3),
(30, 'Team 30', 1, 2, 3, 6, 3),
(29, 'Team 29', 1, 2, 3, 6, 3),
(33, 'Team 33', 1, 2, 3, 6, 3),
(32, 'Team 32', 1, 2, 3, 6, 3),
(31, 'Team 31', 1, 2, 3, 6, 3),
(34, 'Team 34', 1, 2, 3, 6, 3),
(35, 'Team 35', 1, 2, 3, 6, 3),
(36, 'Team 36', 1, 2, 3, 6, 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
