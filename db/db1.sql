-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.34 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table bhawa.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `a_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` text,
  `tg` text,
  `password` text,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.admin: ~0 rows (approximately)

-- Dumping structure for table bhawa.admin_history
CREATE TABLE IF NOT EXISTS `admin_history` (
  `ah_id` int NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `comment` text,
  `admin_a_id` int NOT NULL,
  PRIMARY KEY (`ah_id`),
  KEY `fk_admin_history_admin1_idx` (`admin_a_id`),
  CONSTRAINT `fk_admin_history_admin1` FOREIGN KEY (`admin_a_id`) REFERENCES `admin` (`a_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.admin_history: ~0 rows (approximately)

-- Dumping structure for table bhawa.developer
CREATE TABLE IF NOT EXISTS `developer` (
  `d_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `dev_type_dt_id` int NOT NULL,
  `profile_url` text,
  `linkedIn` text COMMENT '1 = true its a linedin url\n2 = no',
  PRIMARY KEY (`d_id`),
  KEY `fk_developer_dev_type1_idx` (`dev_type_dt_id`),
  CONSTRAINT `fk_developer_dev_type1` FOREIGN KEY (`dev_type_dt_id`) REFERENCES `dev_type` (`dt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.developer: ~4 rows (approximately)
INSERT INTO `developer` (`d_id`, `name`, `dev_type_dt_id`, `profile_url`, `linkedIn`) VALUES
	(1, 'kamal jahgd', 1, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'https://google.com'),
	(2, 'kamal jahgd', 1, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'https://google.com'),
	(3, 'kamal jahgd', 1, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'https://google.com'),
	(4, 'kamal jahgd', 1, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'https://google.com');

-- Dumping structure for table bhawa.dev_type
CREATE TABLE IF NOT EXISTS `dev_type` (
  `dt_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL COMMENT 'front end/ back/full-stack',
  PRIMARY KEY (`dt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.dev_type: ~2 rows (approximately)
INSERT INTO `dev_type` (`dt_id`, `type`) VALUES
	(1, 'Full-stack Developer'),
	(2, 'Ui/Ux Developer ');

-- Dumping structure for table bhawa.done_vote
CREATE TABLE IF NOT EXISTS `done_vote` (
  `dv_id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(100) DEFAULT NULL,
  `token` varchar(150) DEFAULT NULL,
  `pageant_p_id` int NOT NULL,
  `user_u_id` int NOT NULL,
  PRIMARY KEY (`dv_id`),
  KEY `fk_done_vote_pageant1_idx` (`pageant_p_id`),
  KEY `fk_done_vote_user1_idx` (`user_u_id`),
  CONSTRAINT `fk_done_vote_pageant1` FOREIGN KEY (`pageant_p_id`) REFERENCES `pageant` (`p_id`),
  CONSTRAINT `fk_done_vote_user1` FOREIGN KEY (`user_u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.done_vote: ~0 rows (approximately)

-- Dumping structure for table bhawa.event
CREATE TABLE IF NOT EXISTS `event` (
  `e_id` int NOT NULL AUTO_INCREMENT,
  `picture_url` text,
  `name` varchar(45) DEFAULT NULL,
  `event_type_et_id` int NOT NULL,
  `event_category_ec_id` int NOT NULL,
  `performStatus` int DEFAULT '1' COMMENT '1 = not performed\n2 = performed\n3 = performing',
  PRIMARY KEY (`e_id`),
  KEY `fk_event_event_type_idx` (`event_type_et_id`),
  KEY `fk_event_event_category1_idx` (`event_category_ec_id`),
  CONSTRAINT `fk_event_event_category1` FOREIGN KEY (`event_category_ec_id`) REFERENCES `event_category` (`ec_id`),
  CONSTRAINT `fk_event_event_type` FOREIGN KEY (`event_type_et_id`) REFERENCES `event_type` (`et_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.event: ~6 rows (approximately)
INSERT INTO `event` (`e_id`, `picture_url`, `name`, `event_type_et_id`, `event_category_ec_id`, `performStatus`) VALUES
	(1, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'jghvb', 1, 3, 1),
	(2, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'jghvb', 1, 3, 1),
	(3, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'jghvb', 1, 3, 1),
	(4, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'jghvb', 1, 3, 3),
	(5, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'jghvb', 1, 3, 1),
	(6, 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png', 'jghvb', 1, 3, 1);

-- Dumping structure for table bhawa.event_category
CREATE TABLE IF NOT EXISTS `event_category` (
  `ec_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(20) DEFAULT NULL COMMENT 'dancing/drama/music',
  PRIMARY KEY (`ec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.event_category: ~7 rows (approximately)
INSERT INTO `event_category` (`ec_id`, `category`) VALUES
	(1, 'Dancing'),
	(2, 'Drama'),
	(3, 'Music'),
	(4, 'Martial Art'),
	(5, 'Speech'),
	(6, 'Welcome'),
	(7, 'Pageant Show');

-- Dumping structure for table bhawa.event_type
CREATE TABLE IF NOT EXISTS `event_type` (
  `et_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(15) DEFAULT NULL COMMENT 'solo/team',
  PRIMARY KEY (`et_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.event_type: ~2 rows (approximately)
INSERT INTO `event_type` (`et_id`, `type`) VALUES
	(1, 'Solo'),
	(2, 'Team');

-- Dumping structure for table bhawa.pageant
CREATE TABLE IF NOT EXISTS `pageant` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `talent` varchar(50) NOT NULL,
  `performStatus` varchar(45) DEFAULT '2' COMMENT '1 = performed\n2 = not performed\n3 = performing',
  `url` text,
  PRIMARY KEY (`p_id`),
  KEY `p_id` (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.pageant: ~14 rows (approximately)
INSERT INTO `pageant` (`p_id`, `name`, `talent`, `performStatus`, `url`) VALUES
	(1, 'dddddddd', 'ddddddd', '3', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(2, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(3, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(15, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(16, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(17, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(18, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(19, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(20, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(21, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(22, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(23, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(24, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png'),
	(25, 'dddddddd', 'ddddddd', '2', 'http://192.168.155.162:80/bhawa/resources/profileImages/profile.png');

-- Dumping structure for table bhawa.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `floatingButton` int NOT NULL DEFAULT '2' COMMENT '1=true 2=false',
  `launchApp` int NOT NULL DEFAULT '2' COMMENT '1=true 2=false',
  `update` int NOT NULL DEFAULT '2',
  `liveStream` int DEFAULT '2' COMMENT '1=started 2= no',
  `leadboard` int DEFAULT '2' COMMENT '1=started 2=no',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.status: ~1 rows (approximately)
INSERT INTO `status` (`id`, `floatingButton`, `launchApp`, `update`, `liveStream`, `leadboard`) VALUES
	(1, 1, 1, 2, 1, 2);

-- Dumping structure for table bhawa.stream
CREATE TABLE IF NOT EXISTS `stream` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `fb_url` text,
  `youtube_url` text,
  `youtubeLink` text,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.stream: ~1 rows (approximately)
INSERT INTO `stream` (`s_id`, `fb_url`, `youtube_url`, `youtubeLink`) VALUES
	(1, 'https://www.facebook.com', 'axM2BBcmKgQ', 'https://www.youtube.com/watch?v=gDUzaANQ01A');

-- Dumping structure for table bhawa.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(45) DEFAULT NULL,
  `user_u_id` int NOT NULL,
  `paid` int DEFAULT NULL COMMENT '1 = paid\n2 = not paid',
  PRIMARY KEY (`t_id`),
  KEY `fk_ticket_user1_idx` (`user_u_id`),
  CONSTRAINT `fk_ticket_user1` FOREIGN KEY (`user_u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.ticket: ~9 rows (approximately)
INSERT INTO `ticket` (`t_id`, `number`, `user_u_id`, `paid`) VALUES
	(1, '138', 1, 2),
	(2, '656ea47ff0bf4', 2, 2),
	(3, '656ea56fc717b', 3, 2),
	(4, '656ea5a969933', 4, 2),
	(5, '656ea66bb976b', 5, 2),
	(6, '656ea7165df3d', 6, 2),
	(7, '656ea786c852d', 7, 2),
	(8, '656ea7b90b99c', 8, 2),
	(9, '65756511d22f9', 9, 2);

-- Dumping structure for table bhawa.user
CREATE TABLE IF NOT EXISTS `user` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `tg` text,
  `password` text,
  `profile_pic_url` text,
  `name` varchar(45) DEFAULT NULL,
  `token` text,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.user: ~9 rows (approximately)
INSERT INTO `user` (`u_id`, `tg`, `password`, `profile_pic_url`, `name`, `token`) VALUES
	(1, 'NGjVE6Ng2pYzzrovDFzRFw==', '/kA7Yb3NKO+kBAtO1mzUeg==', 'http://192.168.185.162:80/bhawa/resources/profileImages/6570d5ddd9fe11000059463.jpg', 'Pasindu Bhathiya Wijerathna Jayasundara ', NULL),
	(2, 'g8iW/JE9a7Ly1SMn8lOLaA==', 'NETMqtF0iJfR8sbOAU9z1w==', '../resources/profileImages/sample.png', 'Pasindu Bathiya', NULL),
	(3, NULL, NULL, '../resources/profileImages/sample.png', NULL, NULL),
	(4, NULL, NULL, '../resources/profileImages/sample.png', NULL, NULL),
	(5, NULL, NULL, '../resources/profileImages/sample.png', NULL, NULL),
	(6, NULL, NULL, '../resources/profileImages/sample.png', NULL, NULL),
	(7, NULL, NULL, '../resources/profileImages/sample.png', NULL, NULL),
	(8, 'ZNBIwDUZyxIW04yOacGV8A==', 'REGG24t4dEBWi9m2QnK2kQ==', '../resources/profileImages/sample.png', 'Hdjdndnd', NULL),
	(9, 'BkU93V4QPntJpInP6dMhQm6Rbf1G9PsBmOWFzCxctqQ=', '/kA7Yb3NKO+kBAtO1mzUeg==', '../resources/profileImages/6575caa374c43rn_image_picker_lib_temp_c6fd832b-bb40-4f0f-a0c2-6277fc805b01.jpg', 'Pasindu Bathiya Wijerathna Jayasundara ', 'ZVGm6i/FwHdsg4tn4jKQZfWWLDe3IPoEMpRIVIFolKQ=');

-- Dumping structure for table bhawa.vote
CREATE TABLE IF NOT EXISTS `vote` (
  `v_id` int NOT NULL AUTO_INCREMENT,
  `count` int DEFAULT '0',
  `pageant_p_id` int NOT NULL,
  PRIMARY KEY (`v_id`),
  KEY `fk_vote_pageant1_idx` (`pageant_p_id`),
  CONSTRAINT `fk_vote_pageant1` FOREIGN KEY (`pageant_p_id`) REFERENCES `pageant` (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bhawa.vote: ~1 rows (approximately)
INSERT INTO `vote` (`v_id`, `count`, `pageant_p_id`) VALUES
	(16, 0, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
