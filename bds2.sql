-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th6 26, 2019 lúc 04:19 PM
-- Phiên bản máy phục vụ: 5.7.21
-- Phiên bản PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bds`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `activities`
--

DROP TABLE IF EXISTS `activities`;
CREATE TABLE IF NOT EXISTS `activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdBy` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `typeItem` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `note` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `activities`
--

INSERT INTO `activities` (`id`, `createdBy`, `type`, `url`, `typeItem`, `itemId`, `note`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '', 3, 1, '{\"id\":1,\"title\":\"fsdfsdf\",\"location\":\"fdsf\",\"city\":\"3\",\"district\":\"55\",\"type\":1,\"owner\":\"fsdfsdfsd\",\"price\":2,\"progress\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>fsdf</p>\\n</body>\\n</html>\",\"overview\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>fsdf</p>\\n</body>\\n</html>\",\"product\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>fsdf</p>\\n</body>\\n</html>\",\"facilities\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>fsdf</p>\\n</body>\\n</html>\",\"map\":\"\",\"state\":1,\"thumbnail\":\"/images/properties/thumb/2019-06-17-stam.png\",\"slug\":\"fsdfsdf\",\"createdBy\":1,\"hits\":0,\"saved\":0,\"totalImages\":0,\"totalComments\":0,\"updatedAt\":\"2019-06-17T16:34:38.468Z\",\"createdAt\":\"2019-06-17T16:34:38.468Z\"}', '2019-06-17 23:34:38', '2019-06-17 23:34:38'),
(2, 1, 1, '', 1, 1, '{\"type\":1,\"itemId\":1,\"parent\":0,\"text\":\"fsfsdf\",\"createdBy\":1,\"state\":1}', '2019-06-17 23:35:16', '2019-06-17 23:35:16'),
(3, 1, 1, '', 4, 1, '{\"id\":1,\"location\":\"7\",\"price\":\"8\",\"progress\":\"7\",\"quality\":\"7\",\"design\":\"6\",\"proId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T16:35:37.086Z\",\"createdAt\":\"2019-06-17T16:35:37.086Z\"}', '2019-06-17 23:35:37', '2019-06-17 23:35:37'),
(4, 1, 2, '', 1, 1, '{\"id\":1,\"type\":3,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T16:36:03.819Z\",\"createdAt\":\"2019-06-17T16:36:03.819Z\"}', '2019-06-17 23:36:03', '2019-06-17 23:36:03'),
(5, 1, 2, '', 3, 1, '{\"id\":1,\"type\":3,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T16:36:03.000Z\",\"updatedAt\":\"2019-06-17T16:36:03.000Z\"}', '2019-06-17 23:50:48', '2019-06-17 23:50:48'),
(6, 1, 3, '', 1, 2, '{\"id\":2,\"type\":3,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T16:51:55.070Z\",\"createdAt\":\"2019-06-17T16:51:55.070Z\"}', '2019-06-17 23:51:55', '2019-06-17 23:51:55'),
(7, 1, 2, '', 2, 3, '{\"id\":3,\"type\":2,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:28:40.320Z\",\"createdAt\":\"2019-06-17T17:28:40.320Z\"}', '2019-06-18 00:28:40', '2019-06-18 00:28:40'),
(8, 1, 3, '', 2, 3, '{\"id\":3,\"type\":2,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T17:28:40.000Z\",\"updatedAt\":\"2019-06-17T17:28:40.000Z\"}', '2019-06-18 00:28:48', '2019-06-18 00:28:48'),
(9, 1, 2, '', 2, 4, '{\"id\":4,\"type\":2,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:29:28.482Z\",\"createdAt\":\"2019-06-17T17:29:28.482Z\"}', '2019-06-18 00:29:28', '2019-06-18 00:29:28'),
(10, 1, 3, '', 2, 4, '{\"id\":4,\"type\":2,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T17:29:28.000Z\",\"updatedAt\":\"2019-06-17T17:29:28.000Z\"}', '2019-06-18 00:30:06', '2019-06-18 00:30:06'),
(11, 1, 2, '', 2, 5, '{\"id\":5,\"type\":2,\"itemId\":2,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:30:10.017Z\",\"createdAt\":\"2019-06-17T17:30:10.017Z\"}', '2019-06-18 00:30:10', '2019-06-18 00:30:10'),
(12, 1, 2, '', 2, 6, '{\"id\":6,\"type\":2,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:30:28.690Z\",\"createdAt\":\"2019-06-17T17:30:28.690Z\"}', '2019-06-18 00:30:28', '2019-06-18 00:30:28'),
(13, 1, 3, '', 2, 6, '{\"id\":6,\"type\":2,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T17:30:28.000Z\",\"updatedAt\":\"2019-06-17T17:30:28.000Z\"}', '2019-06-18 00:31:29', '2019-06-18 00:31:29'),
(14, 1, 2, '', 2, 7, '{\"id\":7,\"type\":2,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:31:36.975Z\",\"createdAt\":\"2019-06-17T17:31:36.975Z\"}', '2019-06-18 00:31:36', '2019-06-18 00:31:36'),
(15, 1, 3, '', 2, 7, '{\"id\":7,\"type\":2,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T17:31:36.000Z\",\"updatedAt\":\"2019-06-17T17:31:36.000Z\"}', '2019-06-18 00:34:20', '2019-06-18 00:34:20'),
(16, 1, 2, '', 2, 8, '{\"id\":8,\"type\":2,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:34:23.650Z\",\"createdAt\":\"2019-06-17T17:34:23.650Z\"}', '2019-06-18 00:34:23', '2019-06-18 00:34:23'),
(17, 1, 3, '', 2, 8, '{\"id\":8,\"type\":2,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T17:34:23.000Z\",\"updatedAt\":\"2019-06-17T17:34:23.000Z\"}', '2019-06-18 00:34:30', '2019-06-18 00:34:30'),
(18, 1, 2, '', 2, 9, '{\"id\":9,\"type\":2,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:34:33.598Z\",\"createdAt\":\"2019-06-17T17:34:33.598Z\"}', '2019-06-18 00:34:33', '2019-06-18 00:34:33'),
(19, 1, 3, '', 2, 9, '{\"id\":9,\"type\":2,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T17:34:33.000Z\",\"updatedAt\":\"2019-06-17T17:34:33.000Z\"}', '2019-06-18 00:36:34', '2019-06-18 00:36:34'),
(20, 1, 2, '', 2, 10, '{\"id\":10,\"type\":2,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:36:35.840Z\",\"createdAt\":\"2019-06-17T17:36:35.840Z\"}', '2019-06-18 00:36:35', '2019-06-18 00:36:35'),
(21, 1, 3, '', 2, 10, '{\"id\":10,\"type\":2,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T17:36:35.000Z\",\"updatedAt\":\"2019-06-17T17:36:35.000Z\"}', '2019-06-18 00:36:37', '2019-06-18 00:36:37'),
(22, 1, 2, '', 2, 11, '{\"id\":11,\"type\":2,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:36:37.675Z\",\"createdAt\":\"2019-06-17T17:36:37.675Z\"}', '2019-06-18 00:36:37', '2019-06-18 00:36:37'),
(23, 1, 3, '', 3, 2, '{\"id\":2,\"type\":3,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T16:51:55.000Z\",\"updatedAt\":\"2019-06-17T16:51:55.000Z\"}', '2019-06-18 00:36:52', '2019-06-18 00:36:52'),
(24, 1, 2, '', 3, 12, '{\"id\":12,\"type\":3,\"itemId\":1,\"createdBy\":1,\"updatedAt\":\"2019-06-17T17:36:54.409Z\",\"createdAt\":\"2019-06-17T17:36:54.409Z\"}', '2019-06-18 00:36:54', '2019-06-18 00:36:54'),
(25, 1, 3, '', 2, 11, '{\"id\":11,\"type\":2,\"itemId\":1,\"createdBy\":1,\"createdAt\":\"2019-06-17T17:36:37.000Z\",\"updatedAt\":\"2019-06-17T17:36:37.000Z\"}', '2019-06-18 00:37:02', '2019-06-18 00:37:02'),
(26, 1, 1, '', 1, 1, '{\"type\":2,\"itemId\":1,\"parent\":0,\"text\":\"fsdf fsdf\",\"createdBy\":1,\"state\":1}', '2019-06-18 00:56:39', '2019-06-18 00:56:39'),
(27, 1, 1, '', 1, 1, '{\"type\":2,\"itemId\":1,\"parent\":0,\"text\":\"@Eddy Nguyễn ok\",\"createdBy\":1,\"state\":1}', '2019-06-18 00:59:51', '2019-06-18 00:59:51'),
(28, 1, 1, '', 1, 1, '{\"type\":2,\"itemId\":1,\"parent\":0,\"text\":\"@Eddy Nguyễn ok\",\"createdBy\":1,\"state\":1}', '2019-06-18 01:01:13', '2019-06-18 01:01:13'),
(29, 1, 1, '', 1, 1, '{\"type\":2,\"itemId\":1,\"parent\":4,\"text\":\"@Eddy Nguyễn ok\",\"createdBy\":1,\"state\":1}', '2019-06-18 01:04:02', '2019-06-18 01:04:02'),
(30, 1, 1, '', 1, 1, '{\"type\":2,\"itemId\":1,\"parent\":2,\"text\":\"@Eddy Nguyễn fgdfg\",\"createdBy\":1,\"state\":1}', '2019-06-18 01:04:07', '2019-06-18 01:04:07'),
(31, 1, 1, '', 1, 1, '{\"type\":1,\"itemId\":1,\"parent\":0,\"text\":\"ok men\",\"createdBy\":1,\"state\":1}', '2019-06-18 01:36:06', '2019-06-18 01:36:06'),
(32, 1, 1, '', 3, 2, '{\"id\":2,\"title\":\"dự án test\",\"location\":\"gdfg\",\"city\":\"3\",\"district\":\"58\",\"type\":3,\"owner\":\"gdfg\",\"price\":2,\"progress\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>gdfg</p>\\n</body>\\n</html>\",\"overview\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>gdfg</p>\\n</body>\\n</html>\",\"product\":\"\",\"facilities\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>gdfg</p>\\n</body>\\n</html>\",\"map\":\"gdfg\",\"state\":-1,\"thumbnail\":\"/images/properties/thumb/2019-06-18-stam.png\",\"slug\":\"du-an-test\",\"createdBy\":1,\"hits\":0,\"saved\":0,\"totalImages\":0,\"totalComments\":0,\"updatedAt\":\"2019-06-17T18:41:37.934Z\",\"createdAt\":\"2019-06-17T18:41:37.934Z\"}', '2019-06-18 01:41:38', '2019-06-18 01:41:38'),
(33, 1, 1, '', 3, 3, '{\"id\":3,\"title\":\"fdg dfg dfg \",\"location\":\"gdf g\",\"city\":\"5\",\"district\":\"73\",\"type\":1,\"owner\":\"gd f gdf g\",\"price\":1,\"progress\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>g dfgdf&nbsp;</p>\\n</body>\\n</html>\",\"overview\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>gdf gdf g</p>\\n</body>\\n</html>\",\"product\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>g dfg</p>\\n</body>\\n</html>\",\"facilities\":\"<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n<p>&nbsp;gdf gdfg&nbsp;</p>\\n</body>\\n</html>\",\"map\":\"\",\"state\":0,\"thumbnail\":\"/images/properties/thumb/2019-06-19-thong-ke-tan-suat-loto-mien-bac-4-11-2018.PNG\",\"slug\":\"fdg-dfg-dfg\",\"createdBy\":1,\"hits\":0,\"saved\":0,\"totalImages\":0,\"totalComments\":0,\"updatedAt\":\"2019-06-19T15:46:26.185Z\",\"createdAt\":\"2019-06-19T15:46:26.185Z\"}', '2019-06-19 22:46:26', '2019-06-19 22:46:26'),
(34, 1, 1, '', 4, 2, '{\"id\":2,\"location\":\"8\",\"price\":\"7\",\"progress\":\"8\",\"quality\":\"8\",\"design\":\"9\",\"proId\":3,\"createdBy\":1,\"updatedAt\":\"2019-06-19T16:30:35.756Z\",\"createdAt\":\"2019-06-19T16:30:35.756Z\"}', '2019-06-19 23:30:36', '2019-06-19 23:30:36'),
(35, 1, 1, '', 1, 3, '{\"type\":1,\"itemId\":3,\"parent\":0,\"text\":\"<p><b>dep lam</b> <br> du ann nay rat chi ladep</p>\",\"images\":[{\"source\":\"/images/properties/2019-06-19-375-screen-mobile.png\",\"thumbnail\":\"/images/properties/thumb/2019-06-19-375-screen-mobile.png\",\"height\":300,\"width\":166},{\"source\":\"/images/properties/2019-06-19-3 Screens.png\",\"thumbnail\":\"/images/properties/thumb/2019-06-19-3 Screens.png\",\"height\":300,\"width\":400},{\"source\":\"/images/properties/2019-06-19-banner 900x600.jpg\",\"thumbnail\":\"/images/properties/thumb/2019-06-19-banner 900x600.jpg\",\"height\":300,\"width\":450}],\"createdBy\":1,\"state\":1}', '2019-06-19 23:30:35', '2019-06-19 23:30:35'),
(36, 1, 1, '', 1, 3, '{\"type\":1,\"itemId\":3,\"parent\":0,\"text\":\"<p><b>kdsf</b> <br> có ảnh</p>\",\"images\":\"[{\\\"source\\\":\\\"/images/properties/2019-06-19-Dv4EKOJVYAAzwz1.jpg large.jpg\\\",\\\"thumbnail\\\":\\\"/images/properties/thumb/2019-06-19-Dv4EKOJVYAAzwz1.jpg large.jpg\\\",\\\"height\\\":300,\\\"width\\\":460},{\\\"source\\\":\\\"/images/properties/2019-06-19-notice-mobile.jpg\\\",\\\"thumbnail\\\":\\\"/images/properties/thumb/2019-06-19-notice-mobile.jpg\\\",\\\"height\\\":300,\\\"width\\\":77},{\\\"source\\\":\\\"/images/properties/2019-06-19-mobile-design.jpg\\\",\\\"thumbnail\\\":\\\"/images/properties/thumb/2019-06-19-mobile-design.jpg\\\",\\\"height\\\":300,\\\"width\\\":534}]\",\"createdBy\":1,\"state\":1}', '2019-06-19 23:45:34', '2019-06-19 23:45:34'),
(37, 1, 1, '', 4, 3, '{\"id\":3,\"location\":\"8\",\"price\":\"7\",\"progress\":\"9\",\"quality\":\"9\",\"design\":\"8\",\"proId\":3,\"createdBy\":1,\"updatedAt\":\"2019-06-19T16:45:34.927Z\",\"createdAt\":\"2019-06-19T16:45:34.927Z\"}', '2019-06-19 23:45:35', '2019-06-19 23:45:35'),
(38, 1, 1, '', 1, 3, '{\"type\":1,\"itemId\":3,\"parent\":0,\"text\":\"<p><b>ra ảnh xem nào</b> <br> dfg</p>\",\"images\":\"[{\\\"source\\\":\\\"/images/properties/2019-06-19-header-bg-1349.jpg\\\",\\\"thumbnail\\\":\\\"/images/properties/thumb/2019-06-19-header-bg-1349.jpg\\\",\\\"height\\\":300,\\\"width\\\":222},{\\\"source\\\":\\\"/images/properties/2019-06-19-banner 900x600.jpg\\\",\\\"thumbnail\\\":\\\"/images/properties/thumb/2019-06-19-banner 900x600.jpg\\\",\\\"height\\\":300,\\\"width\\\":450}]\",\"createdBy\":1,\"state\":1}', '2019-06-19 23:51:50', '2019-06-19 23:51:50'),
(39, 1, 1, '', 4, 4, '{\"id\":4,\"location\":\"8\",\"price\":\"8\",\"progress\":\"7\",\"quality\":\"8\",\"design\":\"9\",\"proId\":3,\"createdBy\":1,\"updatedAt\":\"2019-06-19T16:51:50.506Z\",\"createdAt\":\"2019-06-19T16:51:50.506Z\"}', '2019-06-19 23:51:50', '2019-06-19 23:51:50'),
(40, 1, 1, '', 1, 3, '{\"type\":1,\"itemId\":3,\"parent\":0,\"text\":\"<p><b> gdfg dfg</b> <br> g dfgdfg</p>\",\"images\":\"[{\\\"source\\\":\\\"/images/properties/2019-06-20-1 - LD JEJU MOBILE3333.jpg\\\",\\\"thumbnail\\\":\\\"/images/properties/thumb/2019-06-20-1 - LD JEJU MOBILE3333.jpg\\\",\\\"height\\\":300,\\\"width\\\":75},{\\\"source\\\":\\\"/images/properties/2019-06-20-0_00_index.png\\\",\\\"thumbnail\\\":\\\"/images/properties/thumb/2019-06-20-0_00_index.png\\\",\\\"height\\\":300,\\\"width\\\":39}]\",\"createdBy\":1,\"state\":1}', '2019-06-20 00:08:25', '2019-06-20 00:08:25'),
(41, 1, 1, '', 4, 5, '{\"id\":5,\"location\":\"8\",\"price\":\"7\",\"progress\":\"9\",\"quality\":\"7\",\"design\":\"8\",\"proId\":3,\"createdBy\":1,\"updatedAt\":\"2019-06-19T17:08:25.446Z\",\"createdAt\":\"2019-06-19T17:08:25.446Z\"}', '2019-06-20 00:08:25', '2019-06-20 00:08:25'),
(42, 1, 1, '', 1, 1, '<p><b>fsdf</b> <br> fsdfdsf</p>', '2019-06-24 08:18:30', '2019-06-24 08:18:30'),
(43, 1, 1, '', 4, 6, 'fsdf', '2019-06-24 08:18:31', '2019-06-24 08:18:31'),
(44, 1, 2, '', 1, 13, '<p><b>Cảm giác có tí đồng quê nhưng ở chắc yên bình, dễ chịu</b> <br> Dự án này xây sắp xong, đang hoàn thiện, chắc bán cũng gần hết tương đối. Vị trí hơi xa, khó vào tí (hôm  đó mình đi xe máy nên đi đường làng :D) nhưng được cái vào phố thì nhanh và ở bên này vẫn còn thoáng, không khí thoáng, yên bình, phía sau là nhà dân và vẫn có tí ruộng vườn. Mật độ căn hộ có vẻ hơi dày nhưng giá cá cũng hợp lý, 2 tỷ hơn tí có căn 3 phòng ngủ cũng là tiện lợi cho gia đình có 1 chỗ an cư. Nói chung có con ô tô nho nhỏ thì mình thấy mua căn 2-3 phòng ngủ ở đây được (ra đi đường cầu chui luôn, to rộng thoải mái đi). Dự án có sảnh vào lối vào cũng rộng, ổn. </p>', '2019-06-24 10:29:42', '2019-06-24 10:29:42'),
(45, 1, 3, '', 1, 13, '<p><b>Cảm giác có tí đồng quê nhưng ở chắc yên bình, dễ chịu</b> <br> Dự án này xây sắp xong, đang hoàn thiện, chắc bán cũng gần hết tương đối. Vị trí hơi xa, khó vào tí (hôm  đó mình đi xe máy nên đi đường làng :D) nhưng được cái vào phố thì nhanh và ở bên này vẫn còn thoáng, không khí thoáng, yên bình, phía sau là nhà dân và vẫn có tí ruộng vườn. Mật độ căn hộ có vẻ hơi dày nhưng giá cá cũng hợp lý, 2 tỷ hơn tí có căn 3 phòng ngủ cũng là tiện lợi cho gia đình có 1 chỗ an cư. Nói chung có con ô tô nho nhỏ thì mình thấy mua căn 2-3 phòng ngủ ở đây được (ra đi đường cầu chui luôn, to rộng thoải mái đi). Dự án có sảnh vào lối vào cũng rộng, ổn. </p>', '2019-06-24 10:29:58', '2019-06-24 10:29:58'),
(46, 1, 2, '', 1, 14, '<p><b>Cảm giác có tí đồng quê nhưng ở chắc yên bình, dễ chịu</b> <br> Dự án này xây sắp xong, đang hoàn thiện, chắc bán cũng gần hết tương đối. Vị trí hơi xa, khó vào tí (hôm  đó mình đi xe máy nên đi đường làng :D) nhưng được cái vào phố thì nhanh và ở bên này vẫn còn thoáng, không khí thoáng, yên bình, phía sau là nhà dân và vẫn có tí ruộng vườn. Mật độ căn hộ có vẻ hơi dày nhưng giá cá cũng hợp lý, 2 tỷ hơn tí có căn 3 phòng ngủ cũng là tiện lợi cho gia đình có 1 chỗ an cư. Nói chung có con ô tô nho nhỏ thì mình thấy mua căn 2-3 phòng ngủ ở đây được (ra đi đường cầu chui luôn, to rộng thoải mái đi). Dự án có sảnh vào lối vào cũng rộng, ổn. </p>', '2019-06-24 10:31:30', '2019-06-24 10:31:30'),
(47, 1, 3, '', 1, 14, '<p><b>Cảm giác có tí đồng quê nhưng ở chắc yên bình, dễ chịu</b> <br> Dự án này xây sắp xong, đang hoàn thiện, chắc bán cũng gần hết tương đối. Vị trí hơi xa, khó vào tí (hôm  đó mình đi xe máy nên đi đường làng :D) nhưng được cái vào phố thì nhanh và ở bên này vẫn còn thoáng, không khí thoáng, yên bình, phía sau là nhà dân và vẫn có tí ruộng vườn. Mật độ căn hộ có vẻ hơi dày nhưng giá cá cũng hợp lý, 2 tỷ hơn tí có căn 3 phòng ngủ cũng là tiện lợi cho gia đình có 1 chỗ an cư. Nói chung có con ô tô nho nhỏ thì mình thấy mua căn 2-3 phòng ngủ ở đây được (ra đi đường cầu chui luôn, to rộng thoải mái đi). Dự án có sảnh vào lối vào cũng rộng, ổn. </p>', '2019-06-24 10:34:02', '2019-06-24 10:34:02'),
(48, 1, 2, '', 1, 15, '<p><b>Cảm giác có tí đồng quê nhưng ở chắc yên bình, dễ chịu</b> <br> Dự án này xây sắp xong, đang hoàn thiện, chắc bán cũng gần hết tương đối. Vị trí hơi xa, khó vào tí (hôm  đó mình đi xe máy nên đi đường làng :D) nhưng được cái vào phố thì nhanh và ở bên này vẫn còn thoáng, không khí thoáng, yên bình, phía sau là nhà dân và vẫn có tí ruộng vườn. Mật độ căn hộ có vẻ hơi dày nhưng giá cá cũng hợp lý, 2 tỷ hơn tí có căn 3 phòng ngủ cũng là tiện lợi cho gia đình có 1 chỗ an cư. Nói chung có con ô tô nho nhỏ thì mình thấy mua căn 2-3 phòng ngủ ở đây được (ra đi đường cầu chui luôn, to rộng thoải mái đi). Dự án có sảnh vào lối vào cũng rộng, ổn. </p>', '2019-06-24 10:36:50', '2019-06-24 10:36:50'),
(49, 1, 3, '', 1, 15, '<p><b>Cảm giác có tí đồng quê nhưng ở chắc yên bình, dễ chịu</b> <br> Dự án này xây sắp xong, đang hoàn thiện, chắc bán cũng gần hết tương đối. Vị trí hơi xa, khó vào tí (hôm  đó mình đi xe máy nên đi đường làng :D) nhưng được cái vào phố thì nhanh và ở bên này vẫn còn thoáng, không khí thoáng, yên bình, phía sau là nhà dân và vẫn có tí ruộng vườn. Mật độ căn hộ có vẻ hơi dày nhưng giá cá cũng hợp lý, 2 tỷ hơn tí có căn 3 phòng ngủ cũng là tiện lợi cho gia đình có 1 chỗ an cư. Nói chung có con ô tô nho nhỏ thì mình thấy mua căn 2-3 phòng ngủ ở đây được (ra đi đường cầu chui luôn, to rộng thoải mái đi). Dự án có sảnh vào lối vào cũng rộng, ổn. </p>', '2019-06-24 10:36:52', '2019-06-24 10:36:52'),
(50, 1, 1, '', 2, 3, 'gdfgdfggfdg gdfg ', '2019-06-24 13:53:55', '2019-06-24 13:53:55'),
(51, 1, 1, '', 3, 4, 'fd gdfg ', '2019-06-24 13:54:56', '2019-06-24 13:54:56'),
(52, 1, 2, '/news/detail/test', 2, 16, 'test', '2019-06-24 15:01:14', '2019-06-24 15:01:14'),
(53, 1, 3, '/news/detail/fsdfsdf', 2, 5, 'dsfsdf', '2019-06-24 15:01:30', '2019-06-24 15:01:30'),
(54, 1, 2, '/property/detail/3', 3, 17, 'fsdfsdf', '2019-06-24 15:01:47', '2019-06-24 15:01:47'),
(55, 1, 3, '/property/detail/1', 3, 12, 'fsdfsdf fsdfsdf fsdfsdf fsdfsdf fsdfsdf fsdfsdf', '2019-06-24 15:01:48', '2019-06-24 15:01:48'),
(56, 1, 1, '/property/detail/3', 4, 7, 'gdfg', '2019-06-24 15:02:32', '2019-06-24 15:02:32'),
(57, 1, 1, '/property/detail/3', 4, 8, 'dfg', '2019-06-24 15:05:21', '2019-06-24 15:05:21'),
(58, 1, 1, '/property/detail/3', 4, 9, 'load di', '2019-06-24 15:07:15', '2019-06-24 15:07:15'),
(59, 1, 1, '/property/detail/3', 1, 3, 'fsdfsdf', '2019-06-26 11:01:56', '2019-06-26 11:01:56'),
(60, 1, 1, '/property/detail/3', 1, 3, 'fdsfsdfv dfgdfg fh', '2019-06-26 11:03:36', '2019-06-26 11:03:36'),
(61, 1, 1, '/property/detail/3', 1, 3, 'fsdfdsf', '2019-06-26 11:03:44', '2019-06-26 11:03:44'),
(62, 1, 1, '/property/detail/3', 1, 3, 'ok nhóe', '2019-06-26 11:06:14', '2019-06-26 11:06:14'),
(63, 1, 1, '/property/detai/5', 3, 5, 'dự án vincity', '2019-06-26 22:39:18', '2019-06-26 22:39:18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `text` text,
  `createdBy` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `images` text,
  `totalWidth` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id`, `type`, `itemId`, `parent`, `text`, `createdBy`, `state`, `createdAt`, `updatedAt`, `images`, `totalWidth`) VALUES
(1, 1, 1, 0, 'fsfsdf', 1, 1, '2019-06-17 23:35:16', '2019-06-17 23:35:16', NULL, 0),
(2, 2, 1, 0, 'fsdf fsdf', 1, 1, '2019-06-18 00:56:39', '2019-06-18 00:56:39', NULL, 0),
(4, 2, 1, 0, '@Eddy Nguyễn ok', 1, 1, '2019-06-18 01:01:13', '2019-06-18 01:01:13', NULL, 0),
(5, 2, 1, 4, '@Eddy Nguyễn ok', 1, 1, '2019-06-18 01:04:02', '2019-06-18 01:04:02', NULL, 0),
(6, 2, 1, 2, '@Eddy Nguyễn fgdfg', 1, 1, '2019-06-18 01:04:07', '2019-06-18 01:04:07', NULL, 0),
(7, 1, 1, 0, 'ok men', 3, 1, '2019-06-18 01:36:06', '2019-06-18 01:36:06', NULL, 0),
(9, 1, 3, 0, '<p><b>Cảm giác có tí đồng quê nhưng ở chắc yên bình, dễ chịu</b> <br> Dự án này xây sắp xong, đang hoàn thiện, chắc bán cũng gần hết tương đối. Vị trí hơi xa, khó vào tí (hôm  đó mình đi xe máy nên đi đường làng :D) nhưng được cái vào phố thì nhanh và ở bên này vẫn còn thoáng, không khí thoáng, yên bình, phía sau là nhà dân và vẫn có tí ruộng vườn. Mật độ căn hộ có vẻ hơi dày nhưng giá cá cũng hợp lý, 2 tỷ hơn tí có căn 3 phòng ngủ cũng là tiện lợi cho gia đình có 1 chỗ an cư. Nói chung có con ô tô nho nhỏ thì mình thấy mua căn 2-3 phòng ngủ ở đây được (ra đi đường cầu chui luôn, to rộng thoải mái đi). Dự án có sảnh vào lối vào cũng rộng, ổn. </p>', 1, 1, '2019-06-19 23:45:34', '2019-06-19 23:45:34', '[{\"source\":\"/images/properties/2019-06-19-Dv4EKOJVYAAzwz1.jpg large.jpg\",\"thumbnail\":\"/images/properties/thumb/2019-06-19-Dv4EKOJVYAAzwz1.jpg large.jpg\",\"height\":300,\"width\":460},{\"source\":\"/images/properties/2019-06-19-notice-mobile.jpg\",\"thumbnail\":\"/images/properties/thumb/2019-06-19-notice-mobile.jpg\",\"height\":300,\"width\":77},{\"source\":\"/images/properties/2019-06-19-mobile-design.jpg\",\"thumbnail\":\"/images/properties/thumb/2019-06-19-mobile-design.jpg\",\"height\":300,\"width\":534}]', 999),
(10, 1, 3, 0, '<p><b>ra ảnh xem nào</b> <br> dfg</p>', 2, 1, '2019-06-19 23:51:50', '2019-06-19 23:51:50', '[{\"source\":\"/images/properties/2019-06-19-header-bg-1349.jpg\",\"thumbnail\":\"/images/properties/thumb/2019-06-19-header-bg-1349.jpg\",\"height\":300,\"width\":222},{\"source\":\"/images/properties/2019-06-19-banner 900x600.jpg\",\"thumbnail\":\"/images/properties/thumb/2019-06-19-banner 900x600.jpg\",\"height\":300,\"width\":450}]', 1234),
(12, 1, 1, 0, '<p><b>fsdf</b> <br> fsdfdsf</p>', 1, 1, '2019-06-24 08:18:30', '2019-06-24 08:18:30', '[]', 0),
(13, 1, 3, 0, '<p><b>gdfg</b> <br> gdfgdfg</p>', 1, 1, '2019-06-24 15:02:32', '2019-06-24 15:02:32', '[]', 0),
(14, 1, 3, 0, '<p><b>dfg</b> <br> gdfgdfg</p>', 1, 1, '2019-06-24 15:05:21', '2019-06-24 15:05:21', '[]', 0),
(15, 1, 3, 0, '<p><b>load di</b> <br> ok nhe</p>', 1, 1, '2019-06-24 15:07:15', '2019-06-24 15:07:15', '[]', 0),
(16, 1, 3, 9, 'fsdfsdf', 1, 1, '2019-06-26 11:01:56', '2019-06-26 11:01:56', NULL, 0),
(17, 1, 3, 9, 'fdsfsdfv dfgdfg fh', 1, 1, '2019-06-26 11:03:36', '2019-06-26 11:03:36', NULL, 0),
(18, 1, 3, 14, 'fsdfdsf', 1, 1, '2019-06-26 11:03:44', '2019-06-26 11:03:44', NULL, 0),
(19, 1, 3, 9, 'ok nhóe', 1, 1, '2019-06-26 11:06:14', '2019-06-26 11:06:14', NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text,
  `thumbnail` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `hits` int(11) DEFAULT NULL,
  `saved` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `category`, `slug`, `description`, `thumbnail`, `state`, `createdBy`, `hits`, `saved`, `createdAt`, `updatedAt`) VALUES
(1, 'test', 'blog', 'test', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>dfgdfg</p>\n<p>gdfg</p>\n</body>\n</html>', '/images/news/thumb/2019-06-16-stam.png', 1, 1, 26, 0, '2019-06-03 23:12:33', '2019-06-24 09:49:05'),
(2, 'dsfsdf', 'static', 'fsdfsdf', 'fsdf sdf sdf', 'fff', 1, 1, 7, NULL, '2019-06-10 00:00:00', '2019-06-24 09:48:25'),
(3, 'gdfgdfggfdg gdfg ', 'blog', 'gdfgdfggfdg-gdfg', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p><strong>fdsfsdf sfg fdg dfg</strong></p>\n</body>\n</html>', '', -1, 1, 1, 0, '2019-06-24 13:53:55', '2019-06-24 13:54:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `properties`
--

DROP TABLE IF EXISTS `properties`;
CREATE TABLE IF NOT EXISTS `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `hits` int(11) DEFAULT NULL,
  `saved` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `district` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `progress` text,
  `overview` text,
  `product` text,
  `facilities` text,
  `map` text,
  `createdBy` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `totalWidth` int(11) DEFAULT NULL,
  `totalImages` int(11) DEFAULT NULL,
  `totalComments` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `totalWidth2` int(11) DEFAULT NULL,
  `totalImages2` int(11) DEFAULT NULL,
  `handover` text NOT NULL,
  `search` text NOT NULL,
  `priceOther` varchar(255) DEFAULT NULL,
  `typeOther` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `properties`
--

INSERT INTO `properties` (`id`, `title`, `slug`, `hits`, `saved`, `location`, `city`, `district`, `type`, `owner`, `thumbnail`, `price`, `progress`, `overview`, `product`, `facilities`, `map`, `createdBy`, `state`, `totalWidth`, `totalImages`, `totalComments`, `createdAt`, `updatedAt`, `totalWidth2`, `totalImages2`, `handover`, `search`, `priceOther`, `typeOther`) VALUES
(1, 'fsdfsdf fsdfsdf fsdfsdf fsdfsdf fsdfsdf fsdfsdf', 'fsdfsdf', 30, 0, 'fương xa gai lam hanoi jgldfjg g dfgdf gdf ggd fgdf g', 3, 55, 1, 'fsdfsdfsd', '/images/properties/thumb/2019-06-17-stam.png', 2, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>fsdf</p>\n</body>\n</html>', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>fsdf</p>\n</body>\n</html>', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>fsdf</p>\n</body>\n</html>', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>fsdf</p>\n</body>\n</html>', '', 1, 1, NULL, 0, 8, '2019-06-17 23:34:38', '2019-06-24 14:42:50', 0, 0, '', '', NULL, NULL),
(2, 'dự án test', 'du-an-test', 2, 0, 'gdfg', 3, 58, 3, 'gdfg', '/images/properties/thumb/2019-06-18-stam.png', 2, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>gdfg</p>\n</body>\n</html>', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>gdfg</p>\n</body>\n</html>', '', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>gdfg</p>\n</body>\n</html>', 'gdfg', 1, -1, NULL, 0, 0, '2019-06-18 01:41:37', '2019-06-18 01:48:01', 0, 0, '', '', NULL, NULL),
(3, 'fsdfsdf', 'fdg-dfg-dfg', 82, 0, 'dsg fdg dfg ghfh gfh fgh fghfg hfg hfg hfg hfg h  fương xa gai lam hanoi jgldfjg g dfgdf gdf ggd fgdf g\r\n', 5, 73, 1, 'gd f gdf g', '/images/properties/thumb/2019-06-19-thong-ke-tan-suat-loto-mien-bac-4-11-2018.PNG', 1, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>g dfgdf&nbsp;</p>\n</body>\n</html>', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>gdf gdf g</p>\n</body>\n</html>', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>g dfg</p>\n</body>\n</html>', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>&nbsp;gdf gdfg&nbsp;</p>\n</body>\n</html>', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14898.389691303064!2d105.9582376!3d21.008768649999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1675732354c08e42!2zTmjDoCBIw6BuZyBLaW0gVGhhbmg!5e0!3m2!1svi!2s!4v1561363682368!5m2!1svi!2s\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen></iframe>', 1, 1, 364, 2, 11, '2019-06-19 22:46:26', '2019-06-26 11:06:15', 994, 2, '', '', NULL, NULL),
(4, 'fd gdfg ', 'fd-gdfg', 1, 0, 'g dfg', 3, 56, 2, 'g dfg dfg', '/images/properties/thumb/2019-06-24-Thich ung tren nhieu loai thiet bi.jpg', 2, 'gdf gdfg', 'g dfg', 'g dfg dfgdf', 'gdfg dfg', 'gdfg', 1, -1, 0, 0, 0, '2019-06-24 13:54:56', '2019-06-24 13:55:00', 0, 0, 'g dfgdf g', '', NULL, NULL),
(5, 'dự án vincity', 'du-an-vincity', 6, 0, 'Dương Xá Gia Lâm ', 2, 28, 9, 'Vingroup', '/images/properties/thumb/2019-06-26-750-design.jpg', 9, 'đang san đất', 'dự án này đẹp', '450 căn hộ\n780 biệt thự', 'biển', '', 1, 1, 35, 1, 0, '2019-06-26 22:39:17', '2019-06-26 22:50:42', 39, 1, 'nội thấtđầy đủ', 'dự án vincity Dương Xá Gia Lâm  Vingroup đang san đất dự án này đẹp 450 căn hộ\n780 biệt thự biển nội thấtđầy đủ chả biết', '3 tỷ - 5 tỷ', 'chả biết');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `propertymedia`
--

DROP TABLE IF EXISTS `propertymedia`;
CREATE TABLE IF NOT EXISTS `propertymedia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proId` int(11) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdBy` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `propertymedia`
--

INSERT INTO `propertymedia` (`id`, `proId`, `source`, `thumbnail`, `height`, `width`, `createdAt`, `updatedAt`, `createdBy`, `type`) VALUES
(1, 3, '/images/properties/2019-06-19-5- chucmung mobile.jpg', '/images/properties/thumb/2019-06-19-5- chucmung mobile.jpg', 300, 198, '2019-06-19 22:46:26', '2019-06-19 22:46:26', 1, 1),
(2, 3, '/images/properties/2019-06-19-375-screen-mobile.png', '/images/properties/thumb/2019-06-19-375-screen-mobile.png', 300, 166, '2019-06-19 22:46:26', '2019-06-19 22:46:26', 1, 1),
(3, 3, '/images/properties/2019-06-19-Dv4EKOJVYAAzwz1.jpg large.jpg', '/images/properties/thumb/2019-06-19-Dv4EKOJVYAAzwz1.jpg large.jpg', 300, 460, '2019-06-19 22:46:26', '2019-06-19 22:46:26', 1, 2),
(4, 3, '/images/properties/2019-06-19-mobile-design.jpg', '/images/properties/thumb/2019-06-19-mobile-design.jpg', 300, 534, '2019-06-19 22:46:26', '2019-06-19 22:46:26', 1, 2),
(5, 3, '/images/properties/2019-06-19-375-screen-mobile.png', '/images/properties/thumb/2019-06-19-375-screen-mobile.png', 300, 166, '2019-06-19 23:30:36', '2019-06-19 23:30:36', 1, 3),
(6, 3, '/images/properties/2019-06-19-3 Screens.png', '/images/properties/thumb/2019-06-19-3 Screens.png', 300, 400, '2019-06-19 23:30:36', '2019-06-19 23:30:36', 1, 3),
(7, 3, '/images/properties/2019-06-19-banner 900x600.jpg', '/images/properties/thumb/2019-06-19-banner 900x600.jpg', 300, 450, '2019-06-19 23:30:36', '2019-06-19 23:30:36', 1, 3),
(8, 5, '/images/properties/2019-06-26-1- landing page jeju mobile (1).jpg', '/images/properties/thumb/2019-06-26-1- landing page jeju mobile (1).jpg', 300, 35, '2019-06-26 22:39:18', '2019-06-26 22:39:18', 1, 1),
(9, 5, '/images/properties/2019-06-26-0_00_index.png', '/images/properties/thumb/2019-06-26-0_00_index.png', 300, 39, '2019-06-26 22:39:18', '2019-06-26 22:39:18', 1, 2),
(13, 1, '/images/banner/2019-06-26-Dv4EKOJVYAAzwz1.jpg large.jpg', '/images/banner/thumb/2019-06-26-Dv4EKOJVYAAzwz1.jpg large.jpg', 300, 460, '2019-06-26 23:02:52', '2019-06-26 23:02:52', 1, 1),
(14, 1, '/images/banner/2019-06-26-passport.jpg', '/images/banner/thumb/2019-06-26-passport.jpg', 300, 216, '2019-06-26 23:03:06', '2019-06-26 23:03:06', 1, 2),
(15, 1, '/images/banner/2019-06-26-download (1).jpg', '/images/banner/thumb/2019-06-26-download (1).jpg', 300, 300, '2019-06-26 23:03:26', '2019-06-26 23:03:26', 1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `propertyratings`
--

DROP TABLE IF EXISTS `propertyratings`;
CREATE TABLE IF NOT EXISTS `propertyratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proId` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `progress` int(11) DEFAULT NULL,
  `quality` int(11) DEFAULT NULL,
  `design` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `propertyratings`
--

INSERT INTO `propertyratings` (`id`, `proId`, `createdBy`, `location`, `price`, `progress`, `quality`, `design`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 7, 8, 7, 7, 6, '2019-06-17 23:35:37', '2019-06-17 23:35:37'),
(2, 3, 1, 8, 7, 8, 8, 9, '2019-06-19 23:30:35', '2019-06-19 23:30:35'),
(3, 3, 1, 8, 7, 9, 9, 8, '2019-06-19 23:45:34', '2019-06-19 23:45:34'),
(4, 3, 1, 8, 8, 7, 8, 9, '2019-06-19 23:51:50', '2019-06-19 23:51:50'),
(5, 3, 1, 8, 7, 9, 7, 8, '2019-06-20 00:08:25', '2019-06-20 00:08:25'),
(6, 1, 1, 8, 8, 8, 6, 6, '2019-06-24 08:18:30', '2019-06-24 08:18:30'),
(7, 3, 1, 7, 8, 6, 8, 7, '2019-06-24 15:02:32', '2019-06-24 15:02:32'),
(8, 3, 1, 2, 2, 1, 2, 2, '2019-06-24 15:05:21', '2019-06-24 15:05:21'),
(9, 3, 1, 7, 7, 6, 7, 7, '2019-06-24 15:07:15', '2019-06-24 15:07:15');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `saveds`
--

DROP TABLE IF EXISTS `saveds`;
CREATE TABLE IF NOT EXISTS `saveds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `saveds`
--

INSERT INTO `saveds` (`id`, `type`, `itemId`, `createdBy`, `createdAt`, `updatedAt`) VALUES
(16, 2, 1, 1, '2019-06-24 15:01:14', '2019-06-24 15:01:14'),
(17, 3, 3, 1, '2019-06-24 15:01:47', '2019-06-24 15:01:47'),
(18, 1, 9, 1, '2019-06-24 15:02:05', '2019-06-24 15:02:05'),
(19, 1, 13, 1, '2019-06-24 15:05:57', '2019-06-24 15:05:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20190612100824-create-user.js'),
('20190613074723-create-news.js'),
('20190613081545-create-property.js'),
('20190613082228-create-property-media.js'),
('20190613082647-create-comment.js'),
('20190617065746-create-property-rating.js'),
('20190617074756-create-saved.js'),
('20190617090012-create-activity.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `dob`, `gender`, `status`, `state`, `level`, `avatar`, `token`, `createdAt`, `updatedAt`) VALUES
(1, 'huy', 'Eddy Nguyễn', 'anjakahuy@gmail.com', 'sha1$9afb1826$1$d22cb730c96596e08c66b6e01000c94647847acb', '2019-06-06', 1, 2, 1, 2, 'https://graph.facebook.com/1746997325403176/picture', NULL, '2019-06-16 18:10:32', '2019-06-16 18:10:32'),
(3, 'gdfg', 'Eddy Nguyễn', 'anjakahuy2@gmail.com', 'sha1$4a88aa93$1$f64f7d2043298916afa1418da94346114a0028e4', '2019-06-15', 1, 2, 1, 1, 'https://graph.facebook.com/1746997325403176/picture', NULL, '2019-06-16 18:28:50', '2019-06-16 18:28:50');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
