-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 14, 2022 at 02:53 PM
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
-- Database: `scm`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(21);

-- --------------------------------------------------------

--
-- Table structure for table `price_list`
--

CREATE TABLE `price_list` (
  `id` bigint(20) NOT NULL,
  `priceListName` int(11) NOT NULL,
  `priceListCode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `price_list_item`
--

CREATE TABLE `price_list_item` (
  `priceListId` bigint(20) NOT NULL,
  `productId` bigint(20) NOT NULL,
  `price` float NOT NULL,
  `updateDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` text NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `categoryID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

CREATE TABLE `shipment` (
  `shipmentId` bigint(20) NOT NULL,
  `transporterId` bigint(20) NOT NULL,
  `orderId` bigint(20) NOT NULL,
  `toAddress` varchar(255) NOT NULL,
  `shipmentType` varchar(255) NOT NULL,
  `toDate` date NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shipmentItem`
--

CREATE TABLE `shipmentItem` (
  `productId` bigint(20) NOT NULL,
  `shipmentId` bigint(20) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplement`
--

CREATE TABLE `supplement` (
  `id` bigint(20) NOT NULL,
  `supplierId` bigint(20) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL,
  `total` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplementItem`
--

CREATE TABLE `supplementItem` (
  `productId` bigint(20) NOT NULL,
  `supplementId` bigint(20) NOT NULL,
  `price` float NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transporter`
--

CREATE TABLE `transporter` (
  `id` bigint(20) NOT NULL,
  `transporterName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentId_FK` (`parent_id`);

--
-- Indexes for table `price_list`
--
ALTER TABLE `price_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_list_item`
--
ALTER TABLE `price_list_item`
  ADD PRIMARY KEY (`priceListId`,`productId`),
  ADD KEY `productId_FK` (`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`shipmentId`),
  ADD KEY `transporterId_FK` (`transporterId`);

--
-- Indexes for table `shipmentItem`
--
ALTER TABLE `shipmentItem`
  ADD PRIMARY KEY (`productId`,`shipmentId`),
  ADD KEY `shipmentId_FK` (`shipmentId`);

--
-- Indexes for table `supplement`
--
ALTER TABLE `supplement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `supplementItem`
--
ALTER TABLE `supplementItem`
  ADD PRIMARY KEY (`productId`,`supplementId`),
  ADD KEY `supplementID_FK` (`supplementId`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transporter`
--
ALTER TABLE `transporter`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `parentId_FK` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `price_list_item`
--
ALTER TABLE `price_list_item`
  ADD CONSTRAINT `priceListId_FK` FOREIGN KEY (`priceListId`) REFERENCES `price_list` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productId_FK` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `category_FK` FOREIGN KEY (`categoryID`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `transporterId_FK` FOREIGN KEY (`transporterId`) REFERENCES `transporter` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `shipmentItem`
--
ALTER TABLE `shipmentItem`
  ADD CONSTRAINT `product_FK` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `shipmentId_FK` FOREIGN KEY (`shipmentId`) REFERENCES `shipment` (`shipmentId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplement`
--
ALTER TABLE `supplement`
  ADD CONSTRAINT `supplierId` FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplementItem`
--
ALTER TABLE `supplementItem`
  ADD CONSTRAINT `productId2_FK` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `supplementID_FK` FOREIGN KEY (`supplementId`) REFERENCES `supplement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
