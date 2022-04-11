-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 05, 2022 at 12:50 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.28

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
CREATE TABLE `category` (
  `id` varchar(36) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` varchar(36) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `category`:
--   `parent_id`
--       `category` -> `id`
--

--
-- Truncate table before insert `category`
--

TRUNCATE TABLE `category`;
--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `level`, `name`, `parent_id`, `code`) VALUES
('05556312-9593-4290-a6f8-bccf36069e3e', 0, 'Lipstick', NULL, NULL),
('0a3dddb7-cb41-467d-88d3-7e8038ab6f59', 0, 'Tay Trang', NULL, NULL),
('2a979943-5e89-4747-a3ad-a52ef3a13e8b', 1, 'sua de', '36d311a9-5996-4c79-bdb2-9c58c97037c5', NULL),
('36d311a9-5996-4c79-bdb2-9c58c97037c5', 0, 'Sua tam', NULL, NULL),
('853e554b-d3c8-4656-832a-158c3c032a2c', 1, 'Vim', '0a3dddb7-cb41-467d-88d3-7e8038ab6f59', NULL),
('b1377d69-e266-475e-a01d-894e9bff7073', 1, 'Tay Trang', NULL, NULL),
('c981b7a1-8d6a-4683-babf-d369d82e9bda', 1, '3CE', '05556312-9593-4290-a6f8-bccf36069e3e', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `hibernate_sequence`:
--

--
-- Truncate table before insert `hibernate_sequence`
--

TRUNCATE TABLE `hibernate_sequence`;
--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(21);

-- --------------------------------------------------------

--
-- Table structure for table `price_list`
--

DROP TABLE IF EXISTS `price_list`;
CREATE TABLE `price_list` (
  `id` varchar(36) NOT NULL,
  `priceListName` int(11) NOT NULL,
  `priceListCode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `price_list`:
--

--
-- Truncate table before insert `price_list`
--

TRUNCATE TABLE `price_list`;
-- --------------------------------------------------------

--
-- Table structure for table `price_list_item`
--

DROP TABLE IF EXISTS `price_list_item`;
CREATE TABLE `price_list_item` (
  `priceListId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `price` float NOT NULL,
  `updateDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `price_list_item`:
--   `priceListId`
--       `price_list` -> `id`
--

--
-- Truncate table before insert `price_list_item`
--

TRUNCATE TABLE `price_list_item`;
-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` varchar(36) NOT NULL,
  `code` text NOT NULL,
  `name` text NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `category_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `product`:
--   `category_id`
--       `category` -> `id`
--

--
-- Truncate table before insert `product`
--

TRUNCATE TABLE `product`;
--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `code`, `name`, `price`, `description`, `category_id`) VALUES
('3d222e59-23a7-47d5-b2ea-937ac950a66e', 'aa trang', 'tay trang chau phi', 123123, 'good onesdfsdf', '05556312-9593-4290-a6f8-bccf36069e3e');

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
CREATE TABLE `shipment` (
  `id` varchar(36) NOT NULL,
  `transporter_id` varchar(36) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `to_address` varchar(255) NOT NULL,
  `shipment_type` varchar(255) NOT NULL,
  `to_date` date NOT NULL,
  `status` enum('IN_STOCK','DELIVERING','DELIVERED','RETURNING') NOT NULL,
  `shipment_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `shipment`:
--   `order_id`
--       `order` -> `id`
--   `transporter_id`
--       `transporter` -> `id`
--

--
-- Truncate table before insert `shipment`
--

TRUNCATE TABLE `shipment`;
--
-- Dumping data for table `shipment`
--

INSERT INTO `shipment` (`id`, `transporter_id`, `order_id`, `to_address`, `shipment_type`, `to_date`, `status`, `shipment_status`) VALUES
('a2a70100-7707-468a-bd48-5941c5dcc3d7', '8c35a097-ccf2-4a64-8974-f056d6008d85', '1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 'Ba Dinh Q8', 'COD', '2022-11-10', 'IN_STOCK', 0);

-- --------------------------------------------------------

--
-- Table structure for table `shipment_item`
--

DROP TABLE IF EXISTS `shipment_item`;
CREATE TABLE `shipment_item` (
  `product_id` varchar(36) NOT NULL,
  `shipment_id` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `shipment_item`:
--   `product_id`
--       `product` -> `id`
--   `shipment_id`
--       `shipment` -> `id`
--

--
-- Truncate table before insert `shipment_item`
--

TRUNCATE TABLE `shipment_item`;
--
-- Dumping data for table `shipment_item`
--

INSERT INTO `shipment_item` (`product_id`, `shipment_id`, `amount`) VALUES
('3d222e59-23a7-47d5-b2ea-937ac950a66e', 'a2a70100-7707-468a-bd48-5941c5dcc3d7', 10);

-- --------------------------------------------------------

--
-- Table structure for table `supplement`
--

DROP TABLE IF EXISTS `supplement`;
CREATE TABLE `supplement` (
  `id` varchar(36) NOT NULL,
  `supplierId` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL,
  `total` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `supplement`:
--   `supplierId`
--       `supplier` -> `id`
--

--
-- Truncate table before insert `supplement`
--

TRUNCATE TABLE `supplement`;
-- --------------------------------------------------------

--
-- Table structure for table `supplemen_item`
--

DROP TABLE IF EXISTS `supplemen_item`;
CREATE TABLE `supplemen_item` (
  `product_id` varchar(36) NOT NULL,
  `supplement_id` varchar(36) NOT NULL,
  `price` float NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `supplemen_item`:
--   `product_id`
--       `product` -> `id`
--   `supplement_id`
--       `supplement` -> `id`
--

--
-- Truncate table before insert `supplemen_item`
--

TRUNCATE TABLE `supplemen_item`;
-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `supplier`:
--

--
-- Truncate table before insert `supplier`
--

TRUNCATE TABLE `supplier`;
-- --------------------------------------------------------

--
-- Table structure for table `transporter`
--

DROP TABLE IF EXISTS `transporter`;
CREATE TABLE `transporter` (
  `id` varchar(36) NOT NULL,
  `transporter_name` text NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `transporter`:
--

--
-- Truncate table before insert `transporter`
--

TRUNCATE TABLE `transporter`;
--
-- Dumping data for table `transporter`
--

INSERT INTO `transporter` (`id`, `transporter_name`, `phone`, `address`, `description`) VALUES
('8c35a097-ccf2-4a64-8974-f056d6008d85', 'sontungMTP', '012039801', 'hanoi', 'gojeck khang khuan x5');

--
-- Indexes for dumped tables
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
CREATE TABLE `customer` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `gender` text NOT NULL,
  `age` int(11) NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `customer`:
--

--
-- Truncate table before insert `customer`
--

TRUNCATE TABLE `customer`;
--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `gender`, `age`, `email`, `phone`, `address`) VALUES
('5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'chu manh truong', 'female', 16, 'truongchu69@gmail.pon', '12309', 'hochiminh city'),
('d9b533e5-f4c4-4500-bede-66d3d69fc4fa', 'chu manh truong', 'bê đê', 16, 'truongchu69@gmail.pon', '12309kzjxhckjahsdu', 'hochiminh city');

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `hibernate_sequence`:
--

--
-- Truncate table before insert `hibernate_sequence`
--

TRUNCATE TABLE `hibernate_sequence`;
--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE `invoice` (
  `id` varchar(36) NOT NULL,
  `total_tax` int(11) NOT NULL,
  `total_discount` int(11) NOT NULL,
  `total_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `invoice`:
--

--
-- Truncate table before insert `invoice`
--

TRUNCATE TABLE `invoice`;
-- --------------------------------------------------------

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
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
  `order_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order`:
--

--
-- Truncate table before insert `order`
--

TRUNCATE TABLE `order`;
--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `creator_name`, `price_list_id`, `total_include_tax`, `total_exclude_tax`, `tax`, `discount`, `shipping_fee`, `address`, `order_statuszz`, `create_date`, `customer_id`, `customer_name`, `order_status`) VALUES
('1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 'NMT', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 123.446, 345.123, 12313.5, 45, 100.444, '617, ba dinh quan 8', 'WAITING', '2022-03-22', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'superIdol', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `id` varchar(255) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `no_num` int(11) DEFAULT NULL,
  `product_code` varchar(255) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order_item`:
--   `order_id`
--       `order` -> `id`
--   `product_id`
--       `product` -> `id`
--

--
-- Truncate table before insert `order_item`
--

TRUNCATE TABLE `order_item`;
--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `amount`, `no_num`, `product_code`, `product_id`, `product_name`) VALUES
('4a627736-2bfb-4d34-87a5-f077b0719ea8', '1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 10, 2, 'ckjvhkjdhf333', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'Skincare2'),
('9b235636-794d-4e68-9130-8150c7157d4e', '1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 100, 1, 'asdjh897', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'Skincare');

-- --------------------------------------------------------

--
-- Table structure for table `order_to_invoices`
--

DROP TABLE IF EXISTS `order_to_invoices`;
CREATE TABLE `order_to_invoices` (
  `orderId` varchar(36) NOT NULL,
  `invoicesId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `order_to_invoices`:
--   `invoicesId`
--       `invoice` -> `id`
--   `orderId`
--       `order` -> `id`
--

--
-- Truncate table before insert `order_to_invoices`
--

TRUNCATE TABLE `order_to_invoices`;
-- --------------------------------------------------------

--
-- Table structure for table `price_list`
--

DROP TABLE IF EXISTS `price_list`;
CREATE TABLE `price_list` (
  `id` varchar(36) NOT NULL,
  `price_list_code` text NOT NULL,
  `price_list_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `price_list`:
--

--
-- Truncate table before insert `price_list`
--

TRUNCATE TABLE `price_list`;
--
-- Dumping data for table `price_list`
--

INSERT INTO `price_list` (`id`, `price_list_code`, `price_list_name`) VALUES
('0828452a-7696-4459-813b-f9bf73e3faf2', 'G001', 'General'),
('136db32b-5f88-473d-9d8a-a011a6113f1e', 'G001', 'General'),
('552b4fe4-e898-42b0-83e3-beb756ba0cfb', 'G001', 'General'),
('835d6b43-28d9-48f4-996e-8711550f714e', 'G001', 'General'),
('b17a4517-e41a-4e47-b9d3-c6ba824ef18e', 'G001', 'General'),
('d8e08342-0de5-4f3c-9c41-c5f47ef21d4d', 'G001', 'General');

-- --------------------------------------------------------

--
-- Table structure for table `price_list_item`
--

DROP TABLE IF EXISTS `price_list_item`;
CREATE TABLE `price_list_item` (
  `price_list_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `price` float NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `price_list_item`:
--

--
-- Truncate table before insert `price_list_item`
--

TRUNCATE TABLE `price_list_item`;
--
-- Dumping data for table `price_list_item`
--

INSERT INTO `price_list_item` (`price_list_id`, `product_id`, `price`, `update_time`, `timestamp`) VALUES
('136db32b-5f88-473d-9d8a-a011a6113f1e', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 122.121, '2022-03-28 07:42:58', '2022-03-28 14:42:58'),
('136db32b-5f88-473d-9d8a-a011a6113f1e', 'b59f888f-7c5a-4003-85a0-2cd4f7ebfec0', 122.121, '2022-03-28 07:42:58', '2022-03-28 14:42:58'),
('835d6b43-28d9-48f4-996e-8711550f714e', 'b59f888f-7c5a-4003-85a0-2cd4f7ebfec0', 123.123, '2022-03-31 13:01:35', '2022-03-31 20:01:35');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `gender` text NOT NULL,
  `age` int(11) NOT NULL,
  `email` text NOT NULL,
  `phone` int(11) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `user`:
--

--
-- Truncate table before insert `user`
--

TRUNCATE TABLE `user`;
--
-- Indexes for dumped tables
--
USE `test`;
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
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transporterId_FK` (`transporter_id`),
  ADD KEY `orderId_FK` (`order_id`);

--
-- Indexes for table `shipment_item`
--
ALTER TABLE `shipment_item`
  ADD PRIMARY KEY (`product_id`,`shipment_id`),
  ADD KEY `shipmentId_FK` (`shipment_id`);

--
-- Indexes for table `supplement`
--
ALTER TABLE `supplement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `supplemen_item`
--
ALTER TABLE `supplemen_item`
  ADD PRIMARY KEY (`product_id`,`supplement_id`);

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
  ADD CONSTRAINT `priceListId_FK` FOREIGN KEY (`priceListId`) REFERENCES `price_list` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `categoryid_FK` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `orderId_FK` FOREIGN KEY (`order_id`) REFERENCES `test_sale`.`order` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `transporterId_FK` FOREIGN KEY (`transporter_id`) REFERENCES `transporter` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `shipment_item`
--
ALTER TABLE `shipment_item`
  ADD CONSTRAINT `productId3_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `shipmentId_FK` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplement`
--
ALTER TABLE `supplement`
  ADD CONSTRAINT `supplierId` FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplemen_item`
--
ALTER TABLE `supplemen_item`
  ADD CONSTRAINT `productId2_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `supplementID_FK` FOREIGN KEY (`supplement_id`) REFERENCES `supplement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
--
--
-- Indexes for table `customer`
--
USE `test_sale`;
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId_FK` (`customer_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `productId2_FK` (`product_id`);

--
-- Indexes for table `order_to_invoices`
--
ALTER TABLE `order_to_invoices`
  ADD PRIMARY KEY (`orderId`,`invoicesId`),
  ADD KEY `invoicesId_FK` (`invoicesId`);

--
-- Indexes for table `price_list`
--
ALTER TABLE `price_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_list_item`
--
ALTER TABLE `price_list_item`
  ADD PRIMARY KEY (`price_list_id`,`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `orderId_FK` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productId2_FK` FOREIGN KEY (`product_id`) REFERENCES `test`.`product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `order_to_invoices`
--
ALTER TABLE `order_to_invoices`
  ADD CONSTRAINT `invoicesId_FK` FOREIGN KEY (`invoicesId`) REFERENCES `invoice` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `oderId_FK` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;


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
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transporterId_FK` (`transporter_id`),
  ADD KEY `orderId_FK` (`order_id`);

--
-- Indexes for table `shipment_item`
--
ALTER TABLE `shipment_item`
  ADD PRIMARY KEY (`product_id`,`shipment_id`),
  ADD KEY `shipmentId_FK` (`shipment_id`);

--
-- Indexes for table `supplement`
--
ALTER TABLE `supplement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `supplemen_item`
--
ALTER TABLE `supplemen_item`
  ADD PRIMARY KEY (`product_id`,`supplement_id`);

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
  ADD CONSTRAINT `priceListId_FK` FOREIGN KEY (`priceListId`) REFERENCES `price_list` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `categoryid_FK` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `orderId_FK` FOREIGN KEY (`order_id`) REFERENCES `test_sale`.`order` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `transporterId_FK` FOREIGN KEY (`transporter_id`) REFERENCES `transporter` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `shipment_item`
--
ALTER TABLE `shipment_item`
  ADD CONSTRAINT `productId3_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `shipmentId_FK` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplement`
--
ALTER TABLE `supplement`
  ADD CONSTRAINT `supplierId` FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplemen_item`
--
ALTER TABLE `supplemen_item`
  ADD CONSTRAINT `productId2_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `supplementID_FK` FOREIGN KEY (`supplement_id`) REFERENCES `supplement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
