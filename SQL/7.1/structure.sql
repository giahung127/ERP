-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 26, 2022 at 06:11 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.28

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--
DROP DATABASE IF EXISTS `test`;
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test`;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` varchar(36) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` varchar(36) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parentId_FK` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `category`:
--   `parent_id`
--       `category` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `hibernate_sequence`:
--

-- --------------------------------------------------------

--
-- Table structure for table `import`
--

DROP TABLE IF EXISTS `import`;
CREATE TABLE IF NOT EXISTS `import` (
  `id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `created_by` text NOT NULL,
  `created_date` date NOT NULL,
  `supplier` text NOT NULL,
  `amount` int(11) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId5_FK` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `import`:
--   `product_id`
--       `product` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` varchar(36) NOT NULL,
  `code` text NOT NULL,
  `name` text NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `category_id` varchar(36) DEFAULT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `product`:
--   `category_id`
--       `category` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
CREATE TABLE IF NOT EXISTS `shipment` (
  `id` varchar(36) NOT NULL,
  `contact_address` text DEFAULT NULL,
  `contact_number` text DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `creator_name` text DEFAULT NULL,
  `customer_name` text DEFAULT NULL,
  `order_id` varchar(36) DEFAULT NULL,
  `receiver_name` text DEFAULT NULL,
  `shipment_code` text DEFAULT NULL,
  `shipment_status` int(11) DEFAULT NULL,
  `total_price` float NOT NULL,
  `transporter_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shipment_orderId_FK` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `shipment`:
--   `order_id`
--       `order` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `shipment_item`
--

DROP TABLE IF EXISTS `shipment_item`;
CREATE TABLE IF NOT EXISTS `shipment_item` (
  `product_id` varchar(255) NOT NULL,
  `shipment_id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`shipment_id`),
  KEY `shipmentItem_shipment_FK` (`shipment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `shipment_item`:
--   `product_id`
--       `product` -> `id`
--   `shipment_id`
--       `shipment` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `supplement`
--

DROP TABLE IF EXISTS `supplement`;
CREATE TABLE IF NOT EXISTS `supplement` (
  `id` varchar(36) NOT NULL,
  `supplier_id` varchar(36) NOT NULL,
  `created_by` text NOT NULL,
  `date` date NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `supplierId` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `supplement`:
--   `supplier_id`
--       `supplier` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `supplement_item`
--

DROP TABLE IF EXISTS `supplement_item`;
CREATE TABLE IF NOT EXISTS `supplement_item` (
  `product_id` varchar(36) NOT NULL,
  `supplement_id` varchar(36) NOT NULL,
  `price` float NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`supplement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `supplement_item`:
--   `product_id`
--       `product` -> `id`
--   `supplement_id`
--       `supplement` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
CREATE TABLE IF NOT EXISTS `supplier` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `supplier`:
--

-- --------------------------------------------------------

--
-- Table structure for table `transporter`
--

DROP TABLE IF EXISTS `transporter`;
CREATE TABLE IF NOT EXISTS `transporter` (
  `id` varchar(36) NOT NULL,
  `transporter_name` text NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `transporter`:
--

--
-- Constraints for dumped tables
--

--
-- Database: `test_account`
--
DROP DATABASE IF EXISTS `test_account`;
CREATE DATABASE IF NOT EXISTS `test_account` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test_account`;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` varchar(36) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `username` text DEFAULT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `employee_name` text DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `account`:
--
--
-- Database: `test_hrm`
--
DROP DATABASE IF EXISTS `test_hrm`;
CREATE DATABASE IF NOT EXISTS `test_hrm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test_hrm`;

-- --------------------------------------------------------

--
-- Table structure for table `company_info`
--

DROP TABLE IF EXISTS `company_info`;
CREATE TABLE IF NOT EXISTS `company_info` (
  `id` varchar(255) NOT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `contact_address` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `company_info`:
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `id` varchar(255) NOT NULL,
  `account_no` bigint(20) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `birth_place` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `change_date` date DEFAULT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `contact_address` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `join_date` date DEFAULT NULL,
  `marital_status` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `personal_email` varchar(255) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `employee`:
--
--
-- Database: `test_sale`
--
DROP DATABASE IF EXISTS `test_sale`;
CREATE DATABASE IF NOT EXISTS `test_sale` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test_sale`;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `gender` text NOT NULL,
  `age` int(11) NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `customer`:
--

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `hibernate_sequence`:
--

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE IF NOT EXISTS `invoice` (
  `id` varchar(36) NOT NULL,
  `total_tax` float NOT NULL,
  `total_discount` float NOT NULL,
  `total_price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `invoice`:
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `id` varchar(36) NOT NULL,
  `creator_name` text NOT NULL,
  `price_list_id` varchar(36) DEFAULT NULL,
  `total_include_tax` float NOT NULL DEFAULT 0,
  `total_exclude_tax` float NOT NULL DEFAULT 0,
  `tax` float NOT NULL DEFAULT 0,
  `discount` float NOT NULL DEFAULT 0,
  `shipping_fee` float NOT NULL DEFAULT 0,
  `address` text DEFAULT NULL,
  `order_statuszz` enum('WAITING','CANCEL','CONFIRMED','EDITED','SHIPPED_OUT','DELIVERING','DELIVERED','RETURNING','RETURNED') NOT NULL,
  `create_date` date DEFAULT NULL,
  `customer_id` varchar(36) DEFAULT NULL,
  `customer_name` text NOT NULL,
  `order_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId_FK` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order`:
--

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE IF NOT EXISTS `order_item` (
  `id` varchar(255) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `no_num` int(11) DEFAULT NULL,
  `product_code` varchar(255) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `productId2_FK` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order_item`:
--   `order_id`
--       `order` -> `id`
--   `product_id`
--       `product` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_to_invoice`
--

DROP TABLE IF EXISTS `order_to_invoice`;
CREATE TABLE IF NOT EXISTS `order_to_invoice` (
  `invoice_id` varchar(36) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  PRIMARY KEY (`invoice_id`,`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order_to_invoice`:
--

-- --------------------------------------------------------

--
-- Table structure for table `price_list`
--

DROP TABLE IF EXISTS `price_list`;
CREATE TABLE IF NOT EXISTS `price_list` (
  `id` varchar(36) NOT NULL,
  `price_list_code` text NOT NULL,
  `price_list_name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `price_list`:
--

-- --------------------------------------------------------

--
-- Table structure for table `price_list_item`
--

DROP TABLE IF EXISTS `price_list_item`;
CREATE TABLE IF NOT EXISTS `price_list_item` (
  `price_list_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `price` float NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`price_list_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `price_list_item`:
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `gender` text NOT NULL,
  `age` int(11) NOT NULL,
  `email` text NOT NULL,
  `phone` int(11) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `user`:
--

--
-- Constraints for dumped tables
--

USE `test`;
--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `parentId_FK` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `import`
--
ALTER TABLE `import`
  ADD CONSTRAINT `productId5_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `categoryid_FK` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `shipment_orderId_FK` FOREIGN KEY (`order_id`) REFERENCES `test_sale`.`order` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `shipment_item`
--
ALTER TABLE `shipment_item`
  ADD CONSTRAINT `shipmentItem_product_FL` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `shipmentItem_shipment_FK` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplement`
--
ALTER TABLE `supplement`
  ADD CONSTRAINT `supplierId` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplement_item`
--
ALTER TABLE `supplement_item`
  ADD CONSTRAINT `productId2_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `supplementID_FK` FOREIGN KEY (`supplement_id`) REFERENCES `supplement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

USE `test_sale`;
--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `orderId_FK` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productId2_FK` FOREIGN KEY (`product_id`) REFERENCES `test`.`product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
