-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 12, 2022 at 03:55 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` bigint(20) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `sex` int(11) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `change_date` date NOT NULL,
  `join_date` date NOT NULL,
  `birthday` date NOT NULL,
  `birth_place` varchar(255) DEFAULT NULL,
  `marital_status` tinyint(1) DEFAULT NULL,
  `contact_address` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `personal_email` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_no` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fname`, `lname`, `sex`, `department`, `position`, `change_date`, `join_date`, `birthday`, `birth_place`, `marital_status`, `contact_address`, `phone`, `company_email`, `personal_email`, `bank_name`, `account_no`) VALUES
(0, 'nguyen', 'tri', 1, NULL, NULL, '2022-02-01', '2022-02-01', '2022-02-15', NULL, NULL, 'hcm', 949189496, 'okok@company.com', NULL, NULL, NULL),
(2, 'giahung', 'giahung', 1, 'giahung', 'giahung', '2021-08-09', '2021-08-09', '2021-08-09', 'giahung', 1, 'giahung', 123123123, 'giahung', 'giahung', 'giahung', 123123),
(3, 'giahung2', 'giahung', 1, 'giahung', 'giahung', '2021-08-09', '2021-08-09', '2021-08-09', 'giahung', 1, 'giahung', 123123123, 'giahung', 'giahung', 'giahung', 123123),
(4, 'giahung4', 'giahung', 1, 'giahung', 'giahung', '2021-08-09', '2021-08-09', '2021-08-09', 'giahung', 1, 'giahung', 123123123, 'giahung', 'giahung', 'giahung', 123123);

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD UNIQUE KEY `id` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
