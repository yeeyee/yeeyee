-- phpMyAdmin SQL Dump
-- Host: localhost

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `yeeyee`
--

-- --------------------------------------------------------

--
-- Table structure for table `category_booksrolling`
--

CREATE TABLE IF NOT EXISTS `category_booksrolling` (
  `cid` int(8) NOT NULL AUTO_INCREMENT,
  `cname` varchar(64) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=100 ;

--
-- Dumping data for table `category_booksrolling`
--

INSERT INTO `category_booksrolling` (`cid`, `cname`) VALUES
(1, '我的漂流'),
(2, '历史'),
(3, '经济'),
(4, '文学'),
(5, '数学'),
(6, '物理'),
(7, '科普'),
(8, '艺术'),
(9, '政治'),
(10, '文体'),
(11, '计算机'),
(12, '语言'),
(13, '军事'),
(99, '其他');

-- --------------------------------------------------------

--
-- Table structure for table `category_items`
--

CREATE TABLE IF NOT EXISTS `category_items` (
  `cid` int(8) NOT NULL AUTO_INCREMENT,
  `cname` varchar(64) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=101 ;

--
-- Dumping data for table `category_items`
--

INSERT INTO `category_items` (`cid`, `cname`) VALUES
(1, '图书'),
(2, '单车'),
(3, '电子产品'),
(4, '音乐/运动'),
(5, '乐器'),
(6, '电器'),
(7, '服饰/箱包'),
(8, '家具/日用品'),
(9, '化妆品'),
(10, '电脑/网络'),
(11, '文具/礼品'),
(12, '免费赠送'),
(13, '收购'),
(99, '其他'),
(100, '食品');

-- --------------------------------------------------------

--
-- Table structure for table `category_school`
--

CREATE TABLE IF NOT EXISTS `category_school` (
  `cid` int(8) NOT NULL AUTO_INCREMENT,
  `cname` varchar(64) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=100 ;

--
-- Dumping data for table `category_school`
--

INSERT INTO `category_school` (`cid`, `cname`) VALUES
(1, '学校信息'),
(2, '校园信息'),
(3, '学院信息'),
(4, '社团信息'),
(5, '活动公告'),
(6, '同乡会'),
(7, '海报墙'),
(8, '电子传单'),
(99, '其他');

-- --------------------------------------------------------

--
-- Table structure for table `message_record`
--

CREATE TABLE IF NOT EXISTS `message_record` (
  `mid` int(8) NOT NULL AUTO_INCREMENT,
  `uid` int(8) NOT NULL,
  `sid` int(8) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=202 ;

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE IF NOT EXISTS `profile` (
  `pid` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL,
  `nickname` varchar(64) NOT NULL,
  `avatar` varchar(128) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `shortnum` varchar(6) DEFAULT NULL,
  `qq` varchar(12) DEFAULT NULL,
  `weibo` varchar(128) DEFAULT NULL,
  `renren` varchar(128) DEFAULT NULL,
  `realname` varchar(64) DEFAULT NULL,
  `grade` varchar(64) DEFAULT NULL,
  `degree` varchar(64) DEFAULT NULL,
  `college` varchar(64) DEFAULT NULL,
  `major` varchar(64) DEFAULT NULL,
  `note` varchar(256) DEFAULT NULL,
  `auth` varchar(1) NOT NULL DEFAULT 'n',
  `signintimes` int(11) NOT NULL COMMENT '登录次数',
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=220 ;

-- --------------------------------------------------------

--
-- Table structure for table `sms`
--

CREATE TABLE IF NOT EXISTS `sms` (
  `smsid` int(10) NOT NULL AUTO_INCREMENT,
  `sender` int(10) NOT NULL,
  `receiver` int(10) NOT NULL,
  `time` datetime NOT NULL,
  `read` varchar(1) NOT NULL DEFAULT 'n',
  `content` text NOT NULL,
  PRIMARY KEY (`smsid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=97 ;

-- --------------------------------------------------------

--
-- Table structure for table `stream_booksrolling`
--

CREATE TABLE IF NOT EXISTS `stream_booksrolling` (
  `sid` int(8) NOT NULL AUTO_INCREMENT,
  `uid` int(8) NOT NULL,
  `name` varchar(256) NOT NULL,
  `descp` text NOT NULL,
  `price` varchar(10) NOT NULL,
  `pic` varchar(256) DEFAULT NULL,
  `time` datetime NOT NULL,
  `cid` int(5) NOT NULL DEFAULT '99',
  `clicktimes` int(11) NOT NULL COMMENT '执行“点击联系”的次数',
  `method` int(1) NOT NULL,
  `href` varchar(256) NOT NULL,
  `status` int(1) NOT NULL,
  KEY `sid` (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=83 ;

-- --------------------------------------------------------

--
-- Table structure for table `stream_items`
--

CREATE TABLE IF NOT EXISTS `stream_items` (
  `sid` int(8) NOT NULL AUTO_INCREMENT,
  `uid` int(8) NOT NULL,
  `name` varchar(256) NOT NULL,
  `descp` text NOT NULL,
  `price` varchar(10) NOT NULL,
  `pic` varchar(256) DEFAULT NULL,
  `time` datetime NOT NULL,
  `cid` int(5) NOT NULL DEFAULT '99',
  `clicktimes` int(11) NOT NULL COMMENT '执行“点击联系”的次数',
  `method` int(1) NOT NULL,
  `href` varchar(256) NOT NULL,
  `status` int(1) NOT NULL,
  KEY `sid` (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=317 ;

-- --------------------------------------------------------

--
-- Table structure for table `stream_school`
--

CREATE TABLE IF NOT EXISTS `stream_school` (
  `sid` int(8) NOT NULL AUTO_INCREMENT,
  `uid` int(8) NOT NULL,
  `name` varchar(256) NOT NULL,
  `descp` text NOT NULL,
  `price` varchar(10) NOT NULL,
  `pic` varchar(256) DEFAULT NULL,
  `time` datetime NOT NULL,
  `cid` int(5) NOT NULL DEFAULT '99',
  `clicktimes` int(11) NOT NULL COMMENT '执行“点击联系”的次数',
  `method` int(1) NOT NULL,
  `href` varchar(256) NOT NULL,
  `status` int(1) NOT NULL,
  KEY `sid` (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=200 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `hash` varchar(100) NOT NULL,
  `regtime` datetime NOT NULL,
  `activate` char(1) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=220 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
