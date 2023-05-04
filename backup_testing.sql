CREATE DATABASE  IF NOT EXISTS `ivanadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ivanadb`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: ivanadb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assurances`
--

DROP TABLE IF EXISTS `assurances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assurances` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ContractId` bigint NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cuit` varchar(255) NOT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `assurances_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assurances`
--

LOCK TABLES `assurances` WRITE;
/*!40000 ALTER TABLE `assurances` DISABLE KEYS */;
INSERT INTO `assurances` VALUES (1,3,'g1','g1 190','8908907907','g1@text.col','80909089','','2023-04-30 18:18:24','2023-04-30 18:18:24');
/*!40000 ALTER TABLE `assurances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auths`
--

DROP TABLE IF EXISTS `auths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auths` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `passwordChangedAt` datetime DEFAULT NULL,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `passwordResetExpires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auths_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auths`
--

LOCK TABLES `auths` WRITE;
/*!40000 ALTER TABLE `auths` DISABLE KEYS */;
INSERT INTO `auths` VALUES (1,'a44241e0-327a-4080-add3-a7c03717f9d6','admin@gmail.com','Test',NULL,'$2a$12$EKxyKnvqTJSJJrdBxTBpqOmSfN4NTEwL47T2MVBXsiILskd4AIQOm',NULL,NULL,NULL,'2023-04-30 18:10:13','2023-04-30 18:10:13');
/*!40000 ALTER TABLE `auths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `claims`
--

DROP TABLE IF EXISTS `claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claims` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `PropertyId` bigint NOT NULL,
  `state` varchar(10) NOT NULL DEFAULT 'Abierto',
  `details` longtext,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PropertyId` (`PropertyId`),
  CONSTRAINT `claims_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
/*!40000 ALTER TABLE `claims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientexpenses`
--

DROP TABLE IF EXISTS `clientexpenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientexpenses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `date` date NOT NULL,
  `ContractId` bigint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `clientexpenses_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientexpenses`
--

LOCK TABLES `clientexpenses` WRITE;
/*!40000 ALTER TABLE `clientexpenses` DISABLE KEYS */;
INSERT INTO `clientexpenses` VALUES (1,'Seguro',500,'2023-04-30',1,'2023-04-30 19:52:57','2023-04-30 19:52:57'),(2,'LUZ',1200,'2023-04-30',1,'2023-04-30 19:53:10','2023-04-30 19:53:10'),(3,'Seguro',700,'2023-04-30',2,'2023-04-30 19:53:19','2023-04-30 19:53:19'),(4,'LUZ',555,'2023-04-30',3,'2023-04-30 19:53:30','2023-04-30 19:53:30'),(5,'Expensas',200,'2023-04-30',3,'2023-04-30 19:53:39','2023-04-30 19:53:39');
/*!40000 ALTER TABLE `clientexpenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `fixedPhone` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `cuit` varchar(255) NOT NULL,
  `province` varchar(70) DEFAULT NULL,
  `city` varchar(70) DEFAULT NULL,
  `codePostal` varchar(10) DEFAULT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clients_phone_unique` (`phone`),
  UNIQUE KEY `clients_email_unique` (`email`),
  UNIQUE KEY `clients_cuit_unique` (`cuit`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Inquilin Ornnela','Richerri 1232','142414242','','ornella@gmail.com','22222222','Santa Fe','TORTUGAS','2000','','2023-04-30 18:12:32','2023-04-30 18:12:32',NULL),(2,'Inq2','Richerri 1232','4575745757','','inq2@gmail.co','47457457','San Luis','LEANDRO N. ALEM','1111','','2023-04-30 18:15:11','2023-04-30 18:15:11',NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configs`
--

DROP TABLE IF EXISTS `configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `configs_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configs`
--

LOCK TABLES `configs` WRITE;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;
INSERT INTO `configs` VALUES (1,'punitorio_diario','0.4','2023-04-30 18:13:16','2023-04-30 18:13:16'),(2,'gastos_bancarios','750','2023-04-30 18:13:43','2023-05-01 16:28:07');
/*!40000 ALTER TABLE `configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `PropertyId` bigint NOT NULL,
  `ClientId` bigint NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `state` varchar(255) DEFAULT 'En curso',
  `amount` float NOT NULL,
  `booking` float DEFAULT NULL,
  `deposit` float DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contracts__property_id__client_id_start_date_end_date_state` (`PropertyId`,`ClientId`,`startDate`,`endDate`,`state`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `contracts_ibfk_11` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_12` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,1,1,'2021-12-28','2023-05-07','En curso',80000,0,0,'','2023-04-30 18:16:15','2023-04-30 18:16:15',NULL),(2,2,1,'2020-10-01','2023-09-30','En curso',100000,0,0,'','2023-04-30 18:16:54','2023-04-30 18:16:54',NULL),(3,3,2,'2023-03-27','2023-08-27','En curso',60000,0,0,'','2023-04-30 18:18:24','2023-04-30 18:18:24',NULL);
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debtclients`
--

DROP TABLE IF EXISTS `debtclients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debtclients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ContractId` bigint NOT NULL,
  `year` int NOT NULL,
  `amount` float NOT NULL,
  `description` varchar(255) NOT NULL,
  `month` int NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `rent` tinyint(1) NOT NULL DEFAULT '0',
  `debt` tinyint(1) NOT NULL DEFAULT '1',
  `paidDate` datetime DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `debtclients_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtclients`
--

LOCK TABLES `debtclients` WRITE;
/*!40000 ALTER TABLE `debtclients` DISABLE KEYS */;
INSERT INTO `debtclients` VALUES (1,3,2023,60000,'ALQUILER Jujuy 1230 10 D Abril/2023',4,0,1,1,NULL,'2023-05-01','2023-05-01'),(2,3,2023,555,'LUZ Abril/2023',4,0,0,1,NULL,'2023-05-01','2023-05-01');
/*!40000 ALTER TABLE `debtclients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debtowners`
--

DROP TABLE IF EXISTS `debtowners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debtowners` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ContractId` bigint NOT NULL,
  `year` int NOT NULL,
  `amount` float NOT NULL,
  `description` varchar(255) NOT NULL,
  `month` int NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `rent` tinyint(1) NOT NULL DEFAULT '0',
  `debt` tinyint(1) NOT NULL DEFAULT '1',
  `paidDate` datetime DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `debtowners_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtowners`
--

LOCK TABLES `debtowners` WRITE;
/*!40000 ALTER TABLE `debtowners` DISABLE KEYS */;
INSERT INTO `debtowners` VALUES (23,2,2023,100000,'ALQUILER Pellegrinu 900 9 4-Marzo/2023',3,1,1,1,'2023-05-01 14:40:28','2023-04-30','2023-05-01'),(24,2,2023,-10000,'HONORARIOS Pellegrinu 900 9 4-Marzo/2023',3,1,0,1,'2023-05-01 14:40:28','2023-04-30','2023-05-01'),(25,2,2023,657,'API Marzo 2023',3,1,0,1,'2023-05-01 14:40:28','2023-04-30','2023-05-01'),(26,2,2023,667,'TGI Marzo 2023',3,1,0,1,'2023-05-01 14:40:28','2023-04-30','2023-05-01'),(27,3,2023,60000,'ALQUILER Jujuy 1230 10 D-Marzo/2023',3,1,1,1,'2023-04-30 21:14:59','2023-04-30','2023-04-30'),(28,3,2023,-12000,'HONORARIOS Jujuy 1230 10 D-Marzo/2023',3,1,0,1,'2023-04-30 21:14:59','2023-04-30','2023-04-30'),(29,3,2023,67,'Expensas Marzo 2023',3,1,0,1,'2023-04-30 21:14:59','2023-04-30','2023-04-30'),(30,1,2023,80000,'ALQUILER Sarmiento 909 1 2-Abril/2023',4,1,1,1,'2023-05-01 14:57:02','2023-05-01','2023-05-01'),(31,1,2023,-8000,'HONORARIOS Sarmiento 909 1 2-Abril/2023',4,1,0,1,'2023-05-01 14:57:02','2023-05-01','2023-05-01'),(33,1,2023,890,'Seguro Abril 2023',4,0,0,1,NULL,'2023-05-01','2023-05-01'),(34,2,2023,100000,'ALQUILER Pellegrinu 900 9 4-Abril/2023',4,1,1,1,'2023-05-01 14:57:02','2023-05-01','2023-05-01'),(35,2,2023,-10000,'HONORARIOS Pellegrinu 900 9 4-Abril/2023',4,1,0,1,'2023-05-01 14:57:02','2023-05-01','2023-05-01'),(36,2,2023,657,'API Abril 2023',4,1,0,1,'2023-05-01 14:57:02','2023-05-01','2023-05-01'),(37,2,2023,667,'TGI Abril 2023',4,1,0,1,'2023-05-01 14:57:02','2023-05-01','2023-05-01');
/*!40000 ALTER TABLE `debtowners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventualities`
--

DROP TABLE IF EXISTS `eventualities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventualities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `PropertyId` bigint NOT NULL,
  `paymentId` bigint DEFAULT NULL,
  `clientAmount` float NOT NULL,
  `ownerAmount` float NOT NULL,
  `clientPaid` tinyint(1) NOT NULL DEFAULT '0',
  `isReverted` tinyint(1) NOT NULL DEFAULT '0',
  `ownerPaid` tinyint(1) NOT NULL DEFAULT '0',
  `description` varchar(255) NOT NULL,
  `expiredDate` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PropertyId` (`PropertyId`),
  CONSTRAINT `eventualities_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventualities`
--

LOCK TABLES `eventualities` WRITE;
/*!40000 ALTER TABLE `eventualities` DISABLE KEYS */;
INSERT INTO `eventualities` VALUES (1,2,1,12500,0,0,1,1,'Saldo Abril/2023','2023-05-30','2023-04-30 18:23:27','2023-04-30 18:23:27'),(2,2,NULL,200,400,0,0,1,'COMIDA CUALQUIER','2023-04-30','2023-04-30 19:52:09','2023-05-01 14:57:02'),(3,1,NULL,2000,892,0,0,1,'BANANA ','2023-04-30','2023-04-30 19:52:19','2023-05-01 14:57:02'),(4,3,NULL,90,90,0,0,0,'Jugo de naranja','2023-04-30','2023-04-30 19:52:33','2023-04-30 19:52:33');
/*!40000 ALTER TABLE `eventualities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joblogs`
--

DROP TABLE IF EXISTS `joblogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `joblogs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joblogs`
--

LOCK TABLES `joblogs` WRITE;
/*!40000 ALTER TABLE `joblogs` DISABLE KEYS */;
INSERT INTO `joblogs` VALUES (1,'debts','success','DEBTS OWNER JOB DONE SUCCESSFULLY.','2023-04-30 20:02:43','2023-04-30 20:02:43'),(2,'debts','success','DEBTS OWNER JOB DONE SUCCESSFULLY.','2023-04-30 20:23:56','2023-04-30 20:23:56'),(3,'debts','success','DEBTS OWNER JOB DONE SUCCESSFULLY.','2023-04-30 20:28:00','2023-04-30 20:28:00'),(4,'debts','success','DEBTS OWNER JOB DONE SUCCESSFULLY.','2023-04-30 20:40:25','2023-04-30 20:40:25'),(5,'debts','success','DEBTS CLIENT JOB DONE SUCCESSFULLY.','2023-05-01 14:12:05','2023-05-01 14:12:05'),(6,'debts','success','DEBTS OWNER JOB DONE SUCCESSFULLY.','2023-05-01 14:12:06','2023-05-01 14:12:06');
/*!40000 ALTER TABLE `joblogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ownerexpenses`
--

DROP TABLE IF EXISTS `ownerexpenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ownerexpenses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `date` date NOT NULL,
  `ContractId` bigint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `ownerexpenses_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerexpenses`
--

LOCK TABLES `ownerexpenses` WRITE;
/*!40000 ALTER TABLE `ownerexpenses` DISABLE KEYS */;
INSERT INTO `ownerexpenses` VALUES (1,'Expensas',500,'2023-04-30',1,'2023-04-30 19:53:52','2023-04-30 19:53:52'),(2,'Seguro',890,'2023-04-30',1,'2023-04-30 19:54:01','2023-04-30 19:54:01'),(3,'API',657,'2023-04-30',2,'2023-04-30 19:54:09','2023-04-30 19:54:09'),(4,'TGI',667,'2023-04-30',2,'2023-04-30 19:54:20','2023-04-30 19:54:20'),(5,'Expensas',67,'2023-04-30',3,'2023-04-30 19:54:28','2023-04-30 19:54:28');
/*!40000 ALTER TABLE `ownerexpenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ownerrentpaids`
--

DROP TABLE IF EXISTS `ownerrentpaids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ownerrentpaids` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `PaymentOwnerId` bigint NOT NULL,
  `ContractId` bigint NOT NULL,
  `OwnerId` bigint NOT NULL,
  `month` varchar(15) NOT NULL,
  `year` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerrentpaids`
--

LOCK TABLES `ownerrentpaids` WRITE;
/*!40000 ALTER TABLE `ownerrentpaids` DISABLE KEYS */;
INSERT INTO `ownerrentpaids` VALUES (1,'ALQUILER Sarmiento 909 1-2 Abril/2023',80000,1,1,1,'Marzo',2023,'2023-04-30 19:40:34','2023-04-30 19:40:34'),(2,'ALQUILER Jujuy 1230 10-D Abril/2023',60000,6,3,2,'Abril',2023,'2023-04-30 21:20:04','2023-04-30 21:20:04'),(3,'ALQUILER Pellegrinu 900 9-4 Mayo/2023',100000,14,2,1,'Mayo',2023,'2023-05-01 14:47:52','2023-05-01 14:47:52'),(4,'ALQUILER Sarmiento 909 1-2 Mayo/2023',80000,14,1,1,'Mayo',2023,'2023-05-01 14:47:52','2023-05-01 14:47:52'),(5,'ALQUILER Sarmiento 909 1-2 Mayo/2023',80000,16,1,1,'Mayo',2023,'2023-05-01 14:57:02','2023-05-01 14:57:02'),(6,'ALQUILER Pellegrinu 900 9-4 Mayo/2023',100000,16,2,1,'Mayo',2023,'2023-05-01 14:57:02','2023-05-01 14:57:02');
/*!40000 ALTER TABLE `ownerrentpaids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owners` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fullName` varchar(150) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `fixedPhone` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `commision` float NOT NULL,
  `cuit` varchar(255) NOT NULL,
  `province` varchar(70) DEFAULT NULL,
  `city` varchar(70) DEFAULT NULL,
  `codePostal` varchar(10) DEFAULT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `owners_phone_unique` (`phone`),
  UNIQUE KEY `owners_email_unique` (`email`),
  UNIQUE KEY `owners_cuit_unique` (`cuit`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'Jean','Sarmiento 777','1111111111','','jean@gmail.com',10,'1111111111','Santa Fe','ROSARIO','2000','','2023-04-30 18:11:51','2023-04-30 18:11:51',NULL),(2,'Test2','San Lorenzo 1111','34534634564','','test@gail.com',20,'235252353','Misiones','AZARA','2000','','2023-04-30 18:14:45','2023-04-30 18:14:45',NULL);
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentclients`
--

DROP TABLE IF EXISTS `paymentclients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentclients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ContractId` bigint NOT NULL,
  `PaymentTypeId` bigint NOT NULL,
  `recharge` float NOT NULL DEFAULT '0',
  `year` int NOT NULL,
  `month` varchar(15) NOT NULL,
  `total` float NOT NULL,
  `paidTotal` float DEFAULT NULL,
  `obs` varchar(500) DEFAULT NULL,
  `paidCurrentMonth` tinyint(1) NOT NULL DEFAULT '0',
  `expenseDetails` longtext,
  `eventualityDetails` longtext,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `paymentclients__contract_id_month_year_paid_current_month` (`ContractId`,`month`,`year`,`paidCurrentMonth`),
  KEY `PaymentTypeId` (`PaymentTypeId`),
  CONSTRAINT `paymentclients_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_12` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentclients`
--

LOCK TABLES `paymentclients` WRITE;
/*!40000 ALTER TABLE `paymentclients` DISABLE KEYS */;
INSERT INTO `paymentclients` VALUES (1,2,1,10000,2023,'Abril',112500,100000,'',1,'[{\"ContractId\":2,\"date\":\"2023-04-30\",\"updatedAt\":\"2023-04-30T18:20:26.222Z\",\"deletedAt\":null,\"description\":\"ALQUILERES  Pellegrinu 900 9 4 Abril/2023\",\"amount\":100000,\"createdAt\":\"1682878826222\",\"paidCurrentMonth\":true,\"id\":\"8c7e4b6b-02ef-4d59-859a-7df282f9f11e\"},{\"ContractId\":2,\"date\":\"2023-04-30\",\"updatedAt\":\"2023-04-30T18:20:26.223Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS   Abril/2023\",\"amount\":500,\"createdAt\":\"1682878826223\",\"id\":\"6f85765b-b22a-4202-8be4-a01cc8c34323\"},{\"ContractId\":2,\"date\":\"2023-04-30\",\"updatedAt\":\"2023-04-30T18:20:26.223Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION   Abril/2023\",\"amount\":\"2000.00\",\"createdAt\":\"1682878826223\",\"id\":\"e4038c9b-cba2-4912-bd1b-9509e6c9ec97\",\"checked\":true}]','[]','2023-04-30','2023-04-30',NULL),(2,1,1,8000,2023,'Abril',90100,0,'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',1,'[{\"ContractId\":1,\"date\":\"2023-04-30\",\"updatedAt\":\"2023-04-30T18:49:10.991Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS   Abril/2023\",\"amount\":500,\"createdAt\":\"1682880550991\",\"id\":\"a5f3cfdb-813d-47fe-8755-1939bf66cf5d\"},{\"ContractId\":1,\"date\":\"2023-04-30\",\"updatedAt\":\"2023-04-30T18:49:10.991Z\",\"deletedAt\":null,\"description\":\"ALQUILERES  Sarmiento 909 1 2 Abril/2023\",\"amount\":80000,\"createdAt\":\"1682880550991\",\"paidCurrentMonth\":true,\"id\":\"674f557b-06c8-4c3c-857f-111a48c030be\"},{\"ContractId\":1,\"date\":\"2023-04-30\",\"updatedAt\":\"2023-04-30T18:49:10.991Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION   Abril/2023\",\"amount\":1600,\"createdAt\":\"1682880550991\",\"id\":\"71a45872-dac7-484b-96e6-522f56dd99a8\",\"checked\":true}]','[]','2023-04-30','2023-04-30',NULL);
/*!40000 ALTER TABLE `paymentclients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentowners`
--

DROP TABLE IF EXISTS `paymentowners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentowners` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `OwnerId` bigint NOT NULL,
  `PaymentTypeId` bigint NOT NULL,
  `obs` varchar(500) DEFAULT NULL,
  `month` varchar(15) NOT NULL,
  `year` int NOT NULL,
  `total` float NOT NULL,
  `expenseDetails` longtext,
  `eventualityDetails` longtext,
  `createdAt` date DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `paidCurrentMonth` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `paymentowners__owner_id_month_year_paid_current_month` (`OwnerId`,`month`,`year`,`paidCurrentMonth`),
  KEY `PaymentTypeId` (`PaymentTypeId`),
  CONSTRAINT `paymentowners_ibfk_11` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_12` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentowners`
--

LOCK TABLES `paymentowners` WRITE;
/*!40000 ALTER TABLE `paymentowners` DISABLE KEYS */;
INSERT INTO `paymentowners` VALUES (1,1,1,'una descripcion fgf f gfgsfg g  ','Marzo',2023,72000,'[{\"amount\":80000,\"description\":\"ALQUILER Sarmiento 909 1-2 Abril/2023\",\"id\":8466911682883571000,\"ContractId\":1,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-04-30T19:39:30.254Z\",\"updatedAt\":\"2023-04-30T19:39:30.254Z\"},{\"amount\":-8000,\"description\":\"HONORARIOS Sarmiento 909 1-2 Abril/2023\",\"id\":453411682883570240,\"createdAt\":\"2023-04-30T19:39:30.254Z\",\"updatedAt\":\"2023-04-30T19:39:30.254Z\"}]','[]','2023-04-30','2023-04-30 19:40:34',NULL,0),(3,2,1,'','Abril',2023,48067,'[{\"id\":27,\"ContractId\":3,\"year\":2023,\"amount\":60000,\"description\":\"ALQUILER Jujuy 1230 10 D-Marzo/2023\",\"month\":3,\"paid\":false,\"rent\":true,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-04-30\",\"updatedAt\":\"2023-04-30\",\"Contract\":{\"id\":3,\"PropertyId\":3,\"ClientId\":2,\"startDate\":\"2023-03-27\",\"endDate\":\"2023-08-27\",\"state\":\"En curso\",\"amount\":60000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:18:24.000Z\",\"updatedAt\":\"2023-04-30T18:18:24.000Z\",\"deletedAt\":null}},{\"id\":28,\"ContractId\":3,\"year\":2023,\"amount\":-12000,\"description\":\"HONORARIOS Jujuy 1230 10 D-Marzo/2023\",\"month\":3,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-04-30\",\"updatedAt\":\"2023-04-30\",\"Contract\":{\"id\":3,\"PropertyId\":3,\"ClientId\":2,\"startDate\":\"2023-03-27\",\"endDate\":\"2023-08-27\",\"state\":\"En curso\",\"amount\":60000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:18:24.000Z\",\"updatedAt\":\"2023-04-30T18:18:24.000Z\",\"deletedAt\":null}},{\"id\":29,\"ContractId\":3,\"year\":2023,\"amount\":67,\"description\":\"Expensas Marzo 2023\",\"month\":3,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-04-30\",\"updatedAt\":\"2023-04-30\",\"Contract\":{\"id\":3,\"PropertyId\":3,\"ClientId\":2,\"startDate\":\"2023-03-27\",\"endDate\":\"2023-08-27\",\"state\":\"En curso\",\"amount\":60000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:18:24.000Z\",\"updatedAt\":\"2023-04-30T18:18:24.000Z\",\"deletedAt\":null}}]','[]','2023-04-30','2023-04-30 21:14:59',NULL,0),(6,2,1,'','Abril',2023,48067,'[{\"amount\":-12000,\"description\":\"HONORARIOS Jujuy 1230 10-D Abril/2023\",\"id\":159731682889597540,\"ContractId\":3,\"createdAt\":\"2023-04-30T21:19:57.536Z\",\"updatedAt\":\"2023-04-30T21:19:57.536Z\"},{\"amount\":60000,\"description\":\"ALQUILER Jujuy 1230 10-D Abril/2023\",\"id\":4182731682889597400,\"ContractId\":3,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-04-30T21:19:57.536Z\",\"updatedAt\":\"2023-04-30T21:19:57.536Z\"},{\"id\":5,\"description\":\"Expensas Abril/2023\",\"amount\":67,\"date\":\"2023-04-30\",\"ContractId\":3,\"createdAt\":\"2023-04-30T19:54:28.000Z\",\"updatedAt\":\"2023-04-30T19:54:28.000Z\"}]','[]','2023-04-30','2023-04-30 21:20:04',NULL,1),(10,1,1,'pago  deudas mes de marzo','Mayo',2023,91324,'[{\"id\":26,\"ContractId\":2,\"year\":2023,\"amount\":667,\"description\":\"TGI Marzo 2023\",\"month\":3,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-04-30\",\"updatedAt\":\"2023-04-30\",\"Contract\":{\"id\":2,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2020-10-01\",\"endDate\":\"2023-09-30\",\"state\":\"En curso\",\"amount\":100000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:54.000Z\",\"updatedAt\":\"2023-04-30T18:16:54.000Z\",\"deletedAt\":null}},{\"id\":25,\"ContractId\":2,\"year\":2023,\"amount\":657,\"description\":\"API Marzo 2023\",\"month\":3,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-04-30\",\"updatedAt\":\"2023-04-30\",\"Contract\":{\"id\":2,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2020-10-01\",\"endDate\":\"2023-09-30\",\"state\":\"En curso\",\"amount\":100000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:54.000Z\",\"updatedAt\":\"2023-04-30T18:16:54.000Z\",\"deletedAt\":null}},{\"id\":24,\"ContractId\":2,\"year\":2023,\"amount\":-10000,\"description\":\"HONORARIOS Pellegrinu 900 9 4-Marzo/2023\",\"month\":3,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-04-30\",\"updatedAt\":\"2023-04-30\",\"Contract\":{\"id\":2,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2020-10-01\",\"endDate\":\"2023-09-30\",\"state\":\"En curso\",\"amount\":100000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:54.000Z\",\"updatedAt\":\"2023-04-30T18:16:54.000Z\",\"deletedAt\":null}},{\"id\":23,\"ContractId\":2,\"year\":2023,\"amount\":100000,\"description\":\"ALQUILER Pellegrinu 900 9 4-Marzo/2023\",\"month\":3,\"paid\":false,\"rent\":true,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-04-30\",\"updatedAt\":\"2023-04-30\",\"Contract\":{\"id\":2,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2020-10-01\",\"endDate\":\"2023-09-30\",\"state\":\"En curso\",\"amount\":100000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:54.000Z\",\"updatedAt\":\"2023-04-30T18:16:54.000Z\",\"deletedAt\":null}}]','[]','2023-05-01','2023-05-01 14:40:28',NULL,0),(16,1,1,'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final. Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica','Mayo',2023,329330,'[{\"amount\":80000,\"description\":\"ALQUILER Sarmiento 909 1-2 Mayo/2023\",\"id\":5039611682952930000,\"ContractId\":1,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-01T14:55:30.782Z\",\"updatedAt\":\"2023-05-01T14:55:30.782Z\"},{\"amount\":-8000,\"description\":\"HONORARIOS Sarmiento 909 1-2 Mayo/2023\",\"id\":203111682952930780,\"ContractId\":1,\"createdAt\":\"2023-05-01T14:55:30.782Z\",\"updatedAt\":\"2023-05-01T14:55:30.782Z\"},{\"id\":1,\"description\":\"Expensas Mayo/2023\",\"amount\":500,\"date\":\"2023-04-30\",\"ContractId\":1,\"createdAt\":\"2023-04-30T19:53:52.000Z\",\"updatedAt\":\"2023-04-30T19:53:52.000Z\"},{\"id\":2,\"description\":\"Seguro Mayo/2023\",\"amount\":890,\"date\":\"2023-04-30\",\"ContractId\":1,\"createdAt\":\"2023-04-30T19:54:01.000Z\",\"updatedAt\":\"2023-04-30T19:54:01.000Z\"},{\"amount\":100000,\"description\":\"ALQUILER Pellegrinu 900 9-4 Mayo/2023\",\"id\":7707621682952931000,\"ContractId\":2,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-01T14:55:30.870Z\",\"updatedAt\":\"2023-05-01T14:55:30.870Z\"},{\"amount\":-10000,\"description\":\"HONORARIOS Pellegrinu 900 9-4 Mayo/2023\",\"id\":510621682952930900,\"ContractId\":2,\"createdAt\":\"2023-05-01T14:55:30.870Z\",\"updatedAt\":\"2023-05-01T14:55:30.870Z\"},{\"id\":3,\"description\":\"API Mayo/2023\",\"amount\":657,\"date\":\"2023-04-30\",\"ContractId\":2,\"createdAt\":\"2023-04-30T19:54:09.000Z\",\"updatedAt\":\"2023-04-30T19:54:09.000Z\"},{\"id\":4,\"description\":\"TGI Mayo/2023\",\"amount\":667,\"date\":\"2023-04-30\",\"ContractId\":2,\"createdAt\":\"2023-04-30T19:54:20.000Z\",\"updatedAt\":\"2023-04-30T19:54:20.000Z\"},{\"id\":30,\"ContractId\":1,\"year\":2023,\"amount\":80000,\"description\":\"ALQUILER Sarmiento 909 1 2-Abril/2023\",\"month\":4,\"paid\":false,\"rent\":true,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-05-01\",\"updatedAt\":\"2023-05-01\",\"Contract\":{\"id\":1,\"PropertyId\":1,\"ClientId\":1,\"startDate\":\"2021-12-28\",\"endDate\":\"2023-05-07\",\"state\":\"En curso\",\"amount\":80000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:15.000Z\",\"updatedAt\":\"2023-04-30T18:16:15.000Z\",\"deletedAt\":null}},{\"id\":34,\"ContractId\":2,\"year\":2023,\"amount\":100000,\"description\":\"ALQUILER Pellegrinu 900 9 4-Abril/2023\",\"month\":4,\"paid\":false,\"rent\":true,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-05-01\",\"updatedAt\":\"2023-05-01\",\"Contract\":{\"id\":2,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2020-10-01\",\"endDate\":\"2023-09-30\",\"state\":\"En curso\",\"amount\":100000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:54.000Z\",\"updatedAt\":\"2023-04-30T18:16:54.000Z\",\"deletedAt\":null}},{\"id\":35,\"ContractId\":2,\"year\":2023,\"amount\":-10000,\"description\":\"HONORARIOS Pellegrinu 900 9 4-Abril/2023\",\"month\":4,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-05-01\",\"updatedAt\":\"2023-05-01\",\"Contract\":{\"id\":2,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2020-10-01\",\"endDate\":\"2023-09-30\",\"state\":\"En curso\",\"amount\":100000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:54.000Z\",\"updatedAt\":\"2023-04-30T18:16:54.000Z\",\"deletedAt\":null}},{\"id\":36,\"ContractId\":2,\"year\":2023,\"amount\":657,\"description\":\"API Abril 2023\",\"month\":4,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-05-01\",\"updatedAt\":\"2023-05-01\",\"Contract\":{\"id\":2,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2020-10-01\",\"endDate\":\"2023-09-30\",\"state\":\"En curso\",\"amount\":100000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:54.000Z\",\"updatedAt\":\"2023-04-30T18:16:54.000Z\",\"deletedAt\":null}},{\"id\":37,\"ContractId\":2,\"year\":2023,\"amount\":667,\"description\":\"TGI Abril 2023\",\"month\":4,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-05-01\",\"updatedAt\":\"2023-05-01\",\"Contract\":{\"id\":2,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2020-10-01\",\"endDate\":\"2023-09-30\",\"state\":\"En curso\",\"amount\":100000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:54.000Z\",\"updatedAt\":\"2023-04-30T18:16:54.000Z\",\"deletedAt\":null}},{\"id\":31,\"ContractId\":1,\"year\":2023,\"amount\":-8000,\"description\":\"HONORARIOS Sarmiento 909 1 2-Abril/2023\",\"month\":4,\"paid\":false,\"rent\":false,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-05-01\",\"updatedAt\":\"2023-05-01\",\"Contract\":{\"id\":1,\"PropertyId\":1,\"ClientId\":1,\"startDate\":\"2021-12-28\",\"endDate\":\"2023-05-07\",\"state\":\"En curso\",\"amount\":80000,\"booking\":0,\"deposit\":0,\"description\":\"\",\"createdAt\":\"2023-04-30T18:16:15.000Z\",\"updatedAt\":\"2023-04-30T18:16:15.000Z\",\"deletedAt\":null}}]','[{\"id\":3,\"PropertyId\":1,\"paymentId\":null,\"clientAmount\":2000,\"ownerAmount\":892,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"BANANA  | Sarmiento 909 1-2 Mayo/2023\",\"expiredDate\":\"2023-04-30\",\"createdAt\":\"2023-04-30T19:52:19.000Z\",\"updatedAt\":\"2023-05-01T14:55:22.000Z\",\"ContractId\":1},{\"id\":2,\"PropertyId\":2,\"paymentId\":null,\"clientAmount\":200,\"ownerAmount\":400,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"COMIDA CUALQUIER | Pellegrinu 900 9-4 Mayo/2023\",\"expiredDate\":\"2023-04-30\",\"createdAt\":\"2023-04-30T19:52:09.000Z\",\"updatedAt\":\"2023-05-01T14:55:22.000Z\",\"ContractId\":2}]','2023-05-01','2023-05-01 14:57:02',NULL,1);
/*!40000 ALTER TABLE `paymentowners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymenttypes`
--

DROP TABLE IF EXISTS `paymenttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymenttypes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `true` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymenttypes`
--

LOCK TABLES `paymenttypes` WRITE;
/*!40000 ALTER TABLE `paymenttypes` DISABLE KEYS */;
INSERT INTO `paymenttypes` VALUES (1,'Efectivo','2023-04-30 18:11:08','2023-04-30 18:11:08',NULL);
/*!40000 ALTER TABLE `paymenttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricehistorials`
--

DROP TABLE IF EXISTS `pricehistorials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pricehistorials` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ContractId` bigint NOT NULL,
  `amount` float NOT NULL,
  `year` int NOT NULL,
  `percent` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `avoidMorethanonepriceForContractAtTheSameYear` (`ContractId`,`year`),
  CONSTRAINT `pricehistorials_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricehistorials`
--

LOCK TABLES `pricehistorials` WRITE;
/*!40000 ALTER TABLE `pricehistorials` DISABLE KEYS */;
INSERT INTO `pricehistorials` VALUES (1,1,80000,1,0,'2023-04-30 18:16:15','2023-04-30 18:16:15'),(2,2,100000,1,0,'2023-04-30 18:16:54','2023-04-30 18:16:54'),(3,3,4000,1,0,'2023-04-30 18:18:24','2023-05-01 15:20:21');
/*!40000 ALTER TABLE `pricehistorials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ZoneId` bigint NOT NULL,
  `PropertyTypeId` bigint NOT NULL,
  `OwnerId` bigint NOT NULL,
  `street` varchar(100) NOT NULL,
  `number` varchar(5) NOT NULL,
  `floor` varchar(2) DEFAULT NULL,
  `dept` varchar(2) DEFAULT NULL,
  `isFor` varchar(8) NOT NULL DEFAULT 'Alquiler',
  `nroPartWater` varchar(50) DEFAULT NULL,
  `nroPartMuni` varchar(50) DEFAULT NULL,
  `nroPartAPI` varchar(50) DEFAULT NULL,
  `nroPartGas` varchar(50) DEFAULT NULL,
  `state` varchar(7) NOT NULL DEFAULT 'Libre',
  `description` longtext,
  `folderNumber` varchar(10) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `properties_folderNumber_unique` (`folderNumber`),
  UNIQUE KEY `uniqueKeyProperty` (`street`,`number`,`floor`,`dept`),
  KEY `ZoneId` (`ZoneId`),
  KEY `PropertyTypeId` (`PropertyTypeId`),
  KEY `OwnerId` (`OwnerId`),
  CONSTRAINT `properties_ibfk_16` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_17` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_18` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,1,1,1,'Sarmiento','909','1','2','Alquiler','','','','','Ocupado','','1','2023-04-30 18:13:00','2023-04-30 18:16:15',NULL),(2,1,1,1,'Pellegrinu','900','9','4','Alquiler','','','','','Ocupado','','2','2023-04-30 18:14:15','2023-04-30 18:16:54',NULL),(3,1,1,2,'Jujuy','1230','10','D','Alquiler','','','','','Ocupado','','3','2023-04-30 18:15:40','2023-04-30 18:18:24',NULL);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propertytypes`
--

DROP TABLE IF EXISTS `propertytypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertytypes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `propertytypes_description_unique` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertytypes`
--

LOCK TABLES `propertytypes` WRITE;
/*!40000 ALTER TABLE `propertytypes` DISABLE KEYS */;
INSERT INTO `propertytypes` VALUES (1,'CASA','2023-04-30 18:11:15','2023-04-30 18:11:15');
/*!40000 ALTER TABLE `propertytypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `PropertyId` bigint NOT NULL,
  `date` datetime NOT NULL,
  `fullName` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `participants` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitUnique` (`PropertyId`,`date`,`phone`,`fullName`),
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,3,'2023-05-27 21:34:00','jamesd','433234234','','2023-05-01 17:35:19','2023-05-01 17:35:19',NULL),(2,3,'2023-05-01 17:40:00','test','345345','a little note for you baby','2023-05-01 17:41:20','2023-05-01 17:41:20','[{\"phone\":\"9090909090\",\"fullName\":\"james\",\"id\":\"6dc9292f-445e-4503-a104-1c24bb434a71\"},{\"phone\":\"827852535\",\"fullName\":\"Hllo\",\"id\":\"a18f3ddf-6a7d-4924-9eff-682fa5f27962\"}]');
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zones`
--

DROP TABLE IF EXISTS `zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zones` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `true` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones`
--

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;
INSERT INTO `zones` VALUES (1,'Centro','2023-04-30 18:11:01','2023-04-30 18:11:01');
/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-01 14:57:39
