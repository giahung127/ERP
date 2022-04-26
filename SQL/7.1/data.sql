-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 26, 2022 at 05:46 PM
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
-- Database: `test_account`
--
DROP DATABASE IF EXISTS `test_account`;
CREATE DATABASE IF NOT EXISTS `test_account` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test_account`;

--
-- Truncate table before insert `account`
--

TRUNCATE TABLE `account`;
--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `password`, `username`, `employee_id`, `employee_name`, `role`) VALUES
('5bebc764-c98f-4117-822b-79428a6a6789', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'nmt', '', 'TriDiSale', 0),
('6d32e706-8b19-4ca3-8810-05ccd589b7a3', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'nmt2', '', 'TriDiSale', 0);
--
-- Database: `test_hrm`
--
DROP DATABASE IF EXISTS `test_hrm`;
CREATE DATABASE IF NOT EXISTS `test_hrm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test_hrm`;

--
-- Truncate table before insert `company_info`
--

TRUNCATE TABLE `company_info`;
--
-- Truncate table before insert `employee`
--

TRUNCATE TABLE `employee`;--
-- Database: `test_sale`
--
DROP DATABASE IF EXISTS `test_sale`;
CREATE DATABASE IF NOT EXISTS `test_sale` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test_sale`;

--
-- Truncate table before insert `customer`
--

TRUNCATE TABLE `customer`;
--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `gender`, `age`, `email`, `phone`, `address`) VALUES
('5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'chu manh truong', 'female', 16, 'truongchu69@gmail.pon', '12309', 'hochiminh city');

--
-- Truncate table before insert `hibernate_sequence`
--

TRUNCATE TABLE `hibernate_sequence`;
--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(1);

--
-- Truncate table before insert `invoice`
--

TRUNCATE TABLE `invoice`;
--
-- Truncate table before insert `order`
--

TRUNCATE TABLE `order`;
--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `creator_name`, `price_list_id`, `total_include_tax`, `total_exclude_tax`, `tax`, `discount`, `shipping_fee`, `address`, `order_statuszz`, `create_date`, `customer_id`, `customer_name`, `order_status`) VALUES
('144fbcb4-204a-4ff4-93b1-67a6cd57194b', 'giahung', '0828452a-7696-4459-813b-f9bf73e3faf2', 0, 0, 0, 0, 0, 'abc', 'WAITING', '2022-04-21', 'd9b533e5-f4c4-4500-bede-66d3d69fc4fa', 'chu manh truong', 0),
('1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 'NMT', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 123.446, 345.123, 12313.5, 45, 100.444, '617, ba dinh quan 8', 'WAITING', '2022-03-22', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'superIdol', 0),
('26d1e7f4-6217-4e32-b9ee-443df4c95d48', 'nmt', '136db32b-5f88-473d-9d8a-a011a6113f1e', 123.133, 123, 21, 12, 1234, 'Badinh Thu Duc', 'WAITING', '2022-04-11', '5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'Duc Adree', 0),
('42a02847-cd19-40a8-adba-fde15f383e02', 'giahung', '136db32b-5f88-473d-9d8a-a011a6113f1e', 122.121, 122.121, 0, 0, 0, 'abc', 'WAITING', '2022-04-13', '5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'chu manh truong', 0),
('5156ed08-b6c5-4ab4-9d31-83ba8a575c0d', 'giahung', '136db32b-5f88-473d-9d8a-a011a6113f1e', 0, 0, 0, 0, 0, 'abc', 'WAITING', NULL, 'd9b533e5-f4c4-4500-bede-66d3d69fc4fa', 'chu manh truong', 0),
('8ee2be40-2ca9-40ac-87bc-7f323b58d557', 'nmt', '136db32b-5f88-473d-9d8a-a011a6113f1e', 123.133, 123, 21, 12, 1234, 'Badinh Thu Duc', 'WAITING', '2022-04-11', '5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'Duc Adree', 0),
('8f3a262a-b5f4-42f4-84a9-89948e661ba8', 'nmt', '136db32b-5f88-473d-9d8a-a011a6113f1e', 123.133, 123, 21, 12, 1234, 'Badinh Thu Duc', 'WAITING', '2022-04-11', '5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'Duc Adree', 0),
('b9e5e859-816e-47a8-a2f0-a7d8c0540bec', 'nmt', '136db32b-5f88-473d-9d8a-a011a6113f1e', 123.133, 123, 21, 12, 1234, 'Badinh Thu Duc', 'WAITING', '2022-04-11', '5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'Duc Adree', 0),
('c93c752c-8614-4d2d-b6dd-2599398b5fa9', 'giahung', '136db32b-5f88-473d-9d8a-a011a6113f1e', 122.121, 122.121, 0, 0, 0, 'abc', 'WAITING', NULL, 'd9b533e5-f4c4-4500-bede-66d3d69fc4fa', 'chu manh truong', 0),
('cd3f4d79-1cee-496b-8945-46df1b946088', 'nmt', '136db32b-5f88-473d-9d8a-a011a6113f1e', 123.133, 123, 21, 12, 1234, 'Badinh Thu Duc', 'WAITING', '2022-04-11', '5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'Duc Adree', 0),
('db43f996-3f80-4cbd-9bc1-4183d1eeb234', 'nmt', '136db32b-5f88-473d-9d8a-a011a6113f1e', 123.133, 123, 21, 12, 1234, 'Badinh Thu Duc', 'WAITING', '2022-04-11', '5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'Duc Adree', 0),
('fd54d9b2-fc84-4e12-80d6-9d0b5fe1f8db', 'nmt', '136db32b-5f88-473d-9d8a-a011a6113f1e', 123.133, 123, 21, 12, 1234, 'Badinh Thu Duc', 'WAITING', '2022-04-11', '5d79065a-d4a1-4ce6-bb0c-d013c9d2a835', 'Duc Adree', 0);

--
-- Truncate table before insert `order_item`
--

TRUNCATE TABLE `order_item`;
--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `amount`, `no_num`, `product_code`, `product_id`, `product_name`) VALUES
('2bd8069d-874d-496b-ac10-4c1c279427fb', '8ee2be40-2ca9-40ac-87bc-7f323b58d557', 5, 1, 'P0001', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tam trang'),
('4a627736-2bfb-4d34-87a5-f077b0719ea8', '1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 10, 2, 'ckjvhkjdhf333', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'Skincare2'),
('53a99316-9ffa-4160-82ef-ad5f19d66267', '42a02847-cd19-40a8-adba-fde15f383e02', 1, NULL, 'aa trang', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tay trang chau phi'),
('5e1aa7a0-3dfe-4405-871e-39f370bc3497', 'fd54d9b2-fc84-4e12-80d6-9d0b5fe1f8db', 5, 1, 'P0001', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tam trang'),
('9b235636-794d-4e68-9130-8150c7157d4e', '1e3298f6-f3cb-49e0-95c6-7f5cdfa49706', 100, 1, 'asdjh897', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'Skincare'),
('9bf83626-dd4b-4502-97b7-0075f1745169', '8f3a262a-b5f4-42f4-84a9-89948e661ba8', 5, 1, 'P0001', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tam trang'),
('b6908245-54f9-4bf5-bba7-686a81dfc4fb', 'b9e5e859-816e-47a8-a2f0-a7d8c0540bec', 5, 1, 'P0001', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tam trang'),
('bd3a55aa-ce25-484f-9938-fd9556016e54', 'cd3f4d79-1cee-496b-8945-46df1b946088', 5, 1, 'P0001', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tam trang'),
('dbf554a0-340f-495f-ae2d-7fc4f04cd532', '26d1e7f4-6217-4e32-b9ee-443df4c95d48', 5, 1, 'P0001', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tam trang'),
('ef5fd6ea-ab54-43e2-bb19-166ae86b7795', 'db43f996-3f80-4cbd-9bc1-4183d1eeb234', 5, 1, 'P0001', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tam trang'),
('f5c70c8d-8163-47de-a58c-e2d09bb8cca4', 'c93c752c-8614-4d2d-b6dd-2599398b5fa9', 1, NULL, 'aa trang', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 'tay trang chau phi');

--
-- Truncate table before insert `order_to_invoice`
--

TRUNCATE TABLE `order_to_invoice`;
--
-- Truncate table before insert `price_list`
--

TRUNCATE TABLE `price_list`;
--
-- Dumping data for table `price_list`
--

INSERT INTO `price_list` (`id`, `price_list_code`, `price_list_name`) VALUES
('136db32b-5f88-473d-9d8a-a011a6113f1e', 'G001', 'General');

--
-- Truncate table before insert `price_list_item`
--

TRUNCATE TABLE `price_list_item`;
--
-- Dumping data for table `price_list_item`
--

INSERT INTO `price_list_item` (`price_list_id`, `product_id`, `price`, `update_time`, `timestamp`) VALUES
('136db32b-5f88-473d-9d8a-a011a6113f1e', '3d222e59-23a7-47d5-b2ea-937ac950a66e', 122.121, '2022-03-28 07:42:58', '2022-03-28 14:42:58');

--
-- Truncate table before insert `user`
--

TRUNCATE TABLE `user`;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
