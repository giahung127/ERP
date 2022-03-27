-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 27, 2022 at 09:38 AM
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
-- Database: `phpmyadmin`
--

--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test`;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(36) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` varchar(36) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `id` varchar(36) NOT NULL,
  `priceListName` int(11) NOT NULL,
  `priceListCode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `price_list_item`
--

CREATE TABLE `price_list_item` (
  `priceListId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `price` float NOT NULL,
  `updateDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(36) NOT NULL,
  `code` text NOT NULL,
  `name` text NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `category_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `code`, `name`, `price`, `description`, `category_id`) VALUES
('3d222e59-23a7-47d5-b2ea-937ac950a66e', 'aa trang', 'tay trang chau phi', 123123, 'good onesdfsdf', '05556312-9593-4290-a6f8-bccf36069e3e'),
('b59f888f-7c5a-4003-85a0-2cd4f7ebfec0', 'aa trang', 'tay trang chau phi', 123123, 'good onesdfsdf', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

CREATE TABLE `shipment` (
  `shipmentId` varchar(36) NOT NULL,
  `transporterId` varchar(36) NOT NULL,
  `orderId` varchar(36) NOT NULL,
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
  `productId` varchar(36) NOT NULL,
  `shipmentId` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplement`
--

CREATE TABLE `supplement` (
  `id` varchar(36) NOT NULL,
  `supplierId` varchar(36) NOT NULL,
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
  `productId` varchar(36) NOT NULL,
  `supplementId` varchar(36) NOT NULL,
  `price` float NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` varchar(36) NOT NULL,
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
  `id` varchar(36) NOT NULL,
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
  ADD KEY `category_id` (`category_id`);

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
  ADD CONSTRAINT `categoryid_FK` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
--
-- Database: `test_sale`
--
CREATE DATABASE IF NOT EXISTS `test_sale` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test_sale`;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `gender` text NOT NULL,
  `age` int(11) NOT NULL,
  `email` text NOT NULL,
  `phone` int(11) NOT NULL,
  `address` text NOT NULL
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
(1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` varchar(36) NOT NULL,
  `total_tax` int(11) NOT NULL,
  `total_discount` int(11) NOT NULL,
  `total_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

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
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `creator_name`, `price_list_id`, `total_include_tax`, `total_exclude_tax`, `tax`, `discount`, `shipping_fee`, `address`, `order_statuszz`, `create_date`, `customer_id`, `customer_name`, `order_status`) VALUES
('1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 'NMT', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 123.446, 345.123, 12313.5, 45, 100.444, '617, ba dinh quan 8', 'WAITING', '2022-03-22', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'superIdol', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

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
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `amount`, `no_num`, `product_code`, `product_id`, `product_name`) VALUES
('4a627736-2bfb-4d34-87a5-f077b0719ea8', '1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 10, 2, 'ckjvhkjdhf333', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'Skincare2'),
('9b235636-794d-4e68-9130-8150c7157d4e', '1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 100, 1, 'asdjh897', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'Skincare');

-- --------------------------------------------------------

--
-- Table structure for table `order_to_invoices`
--

CREATE TABLE `order_to_invoices` (
  `orderId` varchar(36) NOT NULL,
  `invoicesId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

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
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
