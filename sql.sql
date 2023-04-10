CREATE DATABASE  IF NOT EXISTS `novaitfl_ivanadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `novaitfl_ivanadb`;
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `assurances_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_10` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_12` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_13` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_14` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_2` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_4` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_5` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_6` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_7` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_8` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `assurances_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1679679539363 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assurances`
--

LOCK TABLES `assurances` WRITE;
/*!40000 ALTER TABLE `assurances` DISABLE KEYS */;
INSERT INTO `assurances` VALUES (1679679539361,1,'Katou Odibert','USA, Boston','67675765777','kato@odi.com','90-1909090-9',NULL,'2023-03-24 17:39:08','2023-03-24 17:39:08',NULL),(1679679539362,2,'james','8989889898','8989898989','james@gmail.com','89898989','898989898','2023-03-25 02:20:28','2023-03-25 02:20:28',NULL);
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Auths_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auths`
--

LOCK TABLES `auths` WRITE;
/*!40000 ALTER TABLE `auths` DISABLE KEYS */;
INSERT INTO `auths` VALUES (1,'a44f9640-fd09-4d45-a214-bfaa2c5939ab','admin@gmail.com','Administrador JHM',NULL,'$2a$12$pixdiWHbWdsiHehFw4R0OuP73jlOTK/M1bHdh9d5zzAccElOVoss.',NULL,NULL,NULL,'2023-03-24 16:43:37','2023-03-24 16:43:37',NULL);
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
  `state` varchar(150) NOT NULL DEFAULT 'Abierto',
  `details` longtext,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PropertyId` (`PropertyId`),
  CONSTRAINT `claims_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_10` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_11` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_12` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_13` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_14` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_2` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_3` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_4` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_5` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_6` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_7` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_8` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `claims_ibfk_9` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
INSERT INTO `claims` VALUES (1,2,'Abierto','[{\"comment\":\"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available\\nIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available\",\"date\":\"2023-03-29T02:04:42.841Z\"}]','Rompieron un vidria nuevo jugando a la pelota en la terraza ','2023-03-26 04:16:58','2023-03-29 02:05:52',NULL);
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `clientexpenses_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_10` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_12` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_13` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_14` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_2` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_4` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_5` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_6` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_7` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_8` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `clientexpenses_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientexpenses`
--

LOCK TABLES `clientexpenses` WRITE;
/*!40000 ALTER TABLE `clientexpenses` DISABLE KEYS */;
INSERT INTO `clientexpenses` VALUES (1,'SEGURO',1670,'2023-03-24',2,'2023-03-25 19:27:23','2023-03-25 19:27:23',NULL),(2,'GASTOS GESTION ADMINISTRATIVA',900,'2023-03-25',2,'2023-03-25 19:28:11','2023-03-25 19:28:11',NULL),(3,'GASTOS GESTION ADMINISTRATIVA',1230,'2023-03-26',3,'2023-03-25 19:28:57','2023-03-25 19:28:57',NULL),(4,'SEGURO',890,'2023-03-27',4,'2023-03-27 02:39:33','2023-03-27 02:39:33',NULL),(5,'GASTOS ADMINISTRATIVOS',1390,'2023-03-26',4,'2023-03-27 02:39:55','2023-03-27 02:39:55',NULL),(6,'GASTOS BANCARIOS',350,'2023-03-27',4,'2023-03-27 02:40:14','2023-03-27 02:40:14',NULL),(7,'TEST 01',890,'2023-03-28',5,'2023-03-29 02:17:02','2023-03-29 02:17:02',NULL),(8,'TEST 02',787,'2023-03-29',5,'2023-03-29 02:17:14','2023-03-29 02:17:14',NULL),(9,'GASTOS BANCARIOS',350,'2023-03-29',5,'2023-03-29 02:19:59','2023-03-29 02:19:59',NULL);
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
  UNIQUE KEY `Clients_phone_unique` (`phone`),
  UNIQUE KEY `Clients_email_unique` (`email`),
  UNIQUE KEY `Clients_cuit_unique` (`cuit`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Evenson Pieere','Samiento 9090','3413413413','','evenson@gmail.com','9090990000','Santa Fe','ARMSTRONG','2000','Soy el desarrollador del sistema','2023-03-24 17:23:01','2023-03-24 17:23:01',NULL),(2,'Danache Messeroux','Canada Montreal','427777779','887777','danache@gmail.com','123123231','Santa Cruz','PUERTO DESEADO','CAMO89','','2023-03-27 02:36:25','2023-03-27 02:36:25',NULL);
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Configs_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configs`
--

LOCK TABLES `configs` WRITE;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;
INSERT INTO `configs` VALUES (1,'phone','38094385552','2023-03-25 18:28:39','2023-03-25 18:28:39','2023-03-25 18:58:58'),(3,'Email','ivana@centro.com','2023-03-25 18:29:23','2023-03-25 18:29:23','2023-03-26 01:22:59'),(5,'telefono','+543417207782','2023-03-25 18:30:47','2023-04-02 18:58:49',NULL),(6,'linkinstagram','132312424','2023-03-25 18:31:21','2023-03-25 18:31:21','2023-03-26 01:23:28'),(7,'mywife','mywife','2023-03-25 18:47:33','2023-03-25 18:50:05','2023-03-25 18:59:03'),(8,'yes','oui in creole','2023-03-25 18:49:24','2023-03-25 18:49:38','2023-03-25 18:58:50'),(9,'dailypunitive','0.4','2023-03-25 18:58:10','2023-03-25 19:15:14',NULL),(10,'mail','example@gmail.com','2023-03-26 01:23:14','2023-03-26 01:23:14',NULL),(11,'instagram','www.instagram.com/centro','2023-03-26 01:23:56','2023-03-26 01:23:56',NULL),(12,'test','NEW VALUE TEST','2023-04-02 18:50:41','2023-04-02 19:02:50','2023-04-02 19:02:59'),(13,'punitorio_diario','0.4','2023-04-02 19:03:44','2023-04-02 19:03:44',NULL);
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
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `booking` float DEFAULT NULL,
  `deposit` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contracts__property_id__client_id_start_date_end_date` (`PropertyId`,`ClientId`,`startDate`,`endDate`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_10` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_11` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_12` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_13` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_14` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_15` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_16` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_17` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_18` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_19` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_20` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_21` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_22` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_23` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_24` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_25` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_26` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_27` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_28` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_3` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_4` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_5` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_6` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_7` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_8` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_9` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,1,1,'2023-03-25','2026-02-27','Finalizado',123123,'es el primer contrato ','2023-03-24 17:39:08','2023-03-25 01:58:44','2023-03-25 02:18:49',30000,3000),(2,1,1,'2023-04-01','2023-05-01','En curso',50000,'second one','2023-03-25 02:19:50','2023-03-31 03:41:19',NULL,1200,1212),(3,2,1,'2023-02-01','2023-04-15','En curso',34543,'nuevo descripcion del contrato','2023-03-25 03:04:02','2023-03-26 06:01:20',NULL,43545,3454),(4,3,2,'2023-03-01','2025-02-28','Finalizado',59000,'','2023-03-27 02:37:59','2023-03-27 04:33:57','2023-03-27 04:33:57',40000,45000),(5,3,2,'2023-02-01','2023-03-01','En curso',68000,'','2023-03-29 02:07:43','2023-03-31 03:40:49',NULL,0,0);
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
  `debt` tinyint(1) NOT NULL DEFAULT '1',
  `paidDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `rent` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `debtclients_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_10` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_12` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_13` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_14` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_2` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_4` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_5` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_6` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_7` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_8` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtclients_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtclients`
--

LOCK TABLES `debtclients` WRITE;
/*!40000 ALTER TABLE `debtclients` DISABLE KEYS */;
INSERT INTO `debtclients` VALUES (22,3,2023,34543,'ALQUILER Richerri 1011 C-02 Febrero 2023',2,0,1,NULL,'2023-03-29 02:35:00','2023-03-29 02:35:00',NULL,1),(23,3,2023,1230,'GASTOS GESTION ADMINISTRATIVA Febrero 2023',2,0,1,NULL,'2023-03-29 02:35:00','2023-03-29 02:35:00',NULL,0),(24,5,2023,121040,'ALQUILER Pellegrini 590 D-3 Febrero 2023',2,0,1,NULL,'2023-03-29 02:35:00','2023-03-29 02:35:00',NULL,1),(25,5,2023,890,'TEST 01 Febrero 2023',2,0,1,NULL,'2023-03-29 02:35:00','2023-03-29 02:35:00',NULL,0),(26,5,2023,787,'TEST 02 Febrero 2023',2,0,1,NULL,'2023-03-29 02:35:00','2023-03-29 02:35:00',NULL,0),(27,5,2023,350,'GASTOS BANCARIOS Febrero 2023',2,0,1,NULL,'2023-03-29 02:35:00','2023-03-29 02:35:00',NULL,0),(28,5,2023,121040,'ALQUILER Pellegrini 590 D-3 Marzo 2023',3,0,1,NULL,'2023-04-01 03:00:00','2023-04-01 03:00:00',NULL,1),(29,5,2023,890,'TEST 01 Marzo 2023',3,0,1,NULL,'2023-04-01 03:00:00','2023-04-01 03:00:00',NULL,0),(30,5,2023,787,'TEST 02 Marzo 2023',3,0,1,NULL,'2023-04-01 03:00:00','2023-04-01 03:00:00',NULL,0),(31,5,2023,350,'GASTOS BANCARIOS Marzo 2023',3,0,1,NULL,'2023-04-01 03:00:00','2023-04-01 03:00:00',NULL,0);
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
  `month` int NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `amount` float NOT NULL,
  `description` varchar(255) NOT NULL,
  `rent` tinyint(1) NOT NULL DEFAULT '0',
  `debt` tinyint(1) NOT NULL DEFAULT '1',
  `paidDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `debtowners_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_10` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_12` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_13` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_14` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_2` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_4` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_5` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_6` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_7` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_8` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `debtowners_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtowners`
--

LOCK TABLES `debtowners` WRITE;
/*!40000 ALTER TABLE `debtowners` DISABLE KEYS */;
INSERT INTO `debtowners` VALUES (2,3,2023,3,1,'2023-04-02 00:00:00','2023-04-02 00:00:00',NULL,34543,'ALQUILER Richerri 1011 C-02 Marzo 2023',1,1,'2023-04-03 02:39:32');
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
  `ContractId` bigint NOT NULL,
  `clientAmount` float NOT NULL,
  `ownerAmount` float NOT NULL,
  `clientPaid` tinyint(1) NOT NULL DEFAULT '0',
  `ownerPaid` tinyint(1) NOT NULL DEFAULT '0',
  `description` varchar(255) NOT NULL,
  `expiredDate` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `eventualities_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_10` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_12` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_13` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_14` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_2` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_4` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_5` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_6` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_7` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_8` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventualities_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventualities`
--

LOCK TABLES `eventualities` WRITE;
/*!40000 ALTER TABLE `eventualities` DISABLE KEYS */;
INSERT INTO `eventualities` VALUES (2,2,3800,-2900,1,1,'Reparacion de una cano roto','2023-03-28','2023-03-25 19:25:47','2023-03-26 05:53:24','2023-03-26 20:49:46'),(3,2,2300,-2300,1,1,'Compras de repuestos MAYO 2023','2023-04-01','2023-03-25 19:26:22','2023-03-26 20:52:22',NULL),(4,3,1220,-1220,1,1,'Buena description...','2023-03-23','2023-03-26 21:22:38','2023-04-03 02:39:32',NULL),(6,5,379,89,1,1,'HONORARIOS 2023 CUOTA 1','2023-03-11','2023-03-29 02:16:22','2023-04-01 02:12:18',NULL),(7,5,900,-990,1,1,'Eventualidad para est 01','2023-03-30','2023-03-30 01:37:42','2023-04-01 02:12:18',NULL),(8,5,323,343,1,1,'fdfdf  fdfa df d fdf','2023-03-23','2023-03-30 01:39:33','2023-04-01 02:12:18',NULL),(9,2,1313,-123,1,1,'TEST EVEN ESPANA 02','2023-03-31','2023-03-30 01:39:55','2023-04-01 02:12:18',NULL);
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joblogs`
--

LOCK TABLES `joblogs` WRITE;
/*!40000 ALTER TABLE `joblogs` DISABLE KEYS */;
INSERT INTO `joblogs` VALUES (1,'debts','success',NULL,'2023-03-27 02:58:39','2023-03-27 02:58:39',NULL),(2,'debts','success',NULL,'2023-03-27 03:03:15','2023-03-27 03:03:15',NULL),(3,'debts','success',NULL,'2023-03-27 03:35:16','2023-03-27 03:35:16',NULL),(4,'debts','success',NULL,'2023-03-27 03:55:07','2023-03-27 03:55:07',NULL),(5,'debts','success',NULL,'2023-03-27 04:34:29','2023-03-27 04:34:29',NULL),(6,'debts','success',NULL,'2023-03-27 04:35:31','2023-03-27 04:35:31',NULL),(7,'debts','success',NULL,'2023-03-29 02:32:00','2023-03-29 02:32:00',NULL),(8,'debts','success',NULL,'2023-03-29 02:35:00','2023-03-29 02:35:00',NULL),(9,'debts','success',NULL,'2023-03-29 02:36:00','2023-03-29 02:36:00',NULL),(10,'debts','success',NULL,'2023-03-29 02:37:00','2023-03-29 02:37:00',NULL),(11,'debts','success',NULL,'2023-03-29 02:38:00','2023-03-29 02:38:00',NULL),(12,'debts','success',NULL,'2023-04-01 03:00:00','2023-04-01 03:00:00',NULL),(13,'debts','success','DEBTS OWNER JOB DONE SUCCESSFULLY.','2023-04-03 02:27:25','2023-04-03 02:27:25',NULL),(14,'debts','success','DEBTS OWNER JOB DONE SUCCESSFULLY.','2023-04-03 02:31:08','2023-04-03 02:31:08',NULL),(15,'debts','success','DEBTS OWNER JOB DONE SUCCESSFULLY.','2023-04-03 02:32:14','2023-04-03 02:32:14',NULL);
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `ownerexpenses_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_10` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_12` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_13` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_14` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_2` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_4` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_5` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_6` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_7` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_8` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerexpenses_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerexpenses`
--

LOCK TABLES `ownerexpenses` WRITE;
/*!40000 ALTER TABLE `ownerexpenses` DISABLE KEYS */;
INSERT INTO `ownerexpenses` VALUES (1,'PRIMER GASTOS DUENO',20,'2023-03-24',2,'2023-03-30 23:34:47','2023-03-30 23:34:47',NULL);
/*!40000 ALTER TABLE `ownerexpenses` ENABLE KEYS */;
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
  `cuit` varchar(255) NOT NULL,
  `province` varchar(70) DEFAULT NULL,
  `city` varchar(70) DEFAULT NULL,
  `codePostal` varchar(10) DEFAULT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `commision` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Owners_phone_unique` (`phone`),
  UNIQUE KEY `Owners_email_unique` (`email`),
  UNIQUE KEY `Owners_cuit_unique` (`cuit`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'Ivana Desasu','Entre rios 1380','01010101010','','ivanadesasu@gmail.com','011010101010','Santa Fe','ROSARIO','2000','Dueña de la casa ','2023-03-24 17:13:44','2023-03-24 17:15:44',NULL,8),(2,'James Lebon','Cayes 1239','020202020220','','jameslebon@yahho.fr','02200202020','Misiones','AZARA','','Mi primo desde Haiti ','2023-03-24 17:19:04','2023-03-24 17:19:04',NULL,11);
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
  `rentingAmount` float NOT NULL,
  `month` varchar(15) NOT NULL,
  `total` float NOT NULL,
  `expenseDetails` longtext,
  `eventualityDetails` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_clients__contract_id_month_year` (`ContractId`,`month`,`year`),
  KEY `PaymentTypeId` (`PaymentTypeId`),
  CONSTRAINT `paymentclients_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_10` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_12` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_13` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_14` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_15` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_16` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_17` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_18` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_19` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_2` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_20` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_21` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_22` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_23` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_24` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_25` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_26` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_27` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_28` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_4` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_5` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_6` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_7` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_8` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentclients`
--

LOCK TABLES `paymentclients` WRITE;
/*!40000 ALTER TABLE `paymentclients` DISABLE KEYS */;
INSERT INTO `paymentclients` VALUES (16,3,2,3776,2023,59000,'Marzo',80406,'[{\"id\":6,\"description\":\"GASTOS BANCARIOS\",\"amount\":350,\"date\":\"2023-03-27\",\"ContractId\":4,\"createdAt\":\"2023-03-27T02:40:14.000Z\",\"updatedAt\":\"2023-03-27T02:40:14.000Z\",\"deletedAt\":null},{\"id\":4,\"description\":\"SEGURO\",\"amount\":890,\"date\":\"2023-03-27\",\"ContractId\":4,\"createdAt\":\"2023-03-27T02:39:33.000Z\",\"updatedAt\":\"2023-03-27T02:39:33.000Z\",\"deletedAt\":null},{\"id\":5,\"description\":\"GASTOS ADMINISTRATIVOS\",\"amount\":1390,\"date\":\"2023-03-26\",\"ContractId\":4,\"createdAt\":\"2023-03-27T02:39:55.000Z\",\"updatedAt\":\"2023-03-27T02:39:55.000Z\",\"deletedAt\":null}]','[{\"id\":5,\"ContractId\":4,\"clientAmount\":15000,\"ownerAmount\":0,\"clientPaid\":false,\"ownerPaid\":false,\"description\":\"HONORARIOS CUOTA 01\",\"expiredDate\":\"2023-04-10\",\"createdAt\":\"2023-03-27T02:39:04.000Z\",\"updatedAt\":\"2023-03-27T02:39:04.000Z\",\"deletedAt\":null}]','2023-03-27 02:47:23','2023-03-27 02:47:23',NULL);
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
  `month` varchar(15) NOT NULL,
  `year` int NOT NULL,
  `total` float NOT NULL,
  `expenseDetails` longtext,
  `eventualityDetails` longtext,
  `createdAt` date DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `ContractId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_owners__owner_id_month_year` (`OwnerId`,`month`,`year`),
  KEY `PaymentTypeId` (`PaymentTypeId`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `paymentowners_ibfk_1` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_10` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_11` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_12` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_13` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_14` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_15` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_2` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_4` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_5` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_6` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_7` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_8` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentowners`
--

LOCK TABLES `paymentowners` WRITE;
/*!40000 ALTER TABLE `paymentowners` DISABLE KEYS */;
INSERT INTO `paymentowners` VALUES (8,1,2,'Marzo',2023,156696,'[{\"id\":1,\"description\":\"PRIMER GASTOS DUENO\",\"amount\":20,\"date\":\"2023-03-24\",\"ContractId\":2,\"createdAt\":\"2023-03-30T23:34:47.000Z\",\"updatedAt\":\"2023-03-30T23:34:47.000Z\",\"deletedAt\":null},{\"amount\":46000,\"description\":\"ALQUILER Espana 876 10-4\",\"id\":1680315005495,\"ContractId\":2,\"createdAt\":\"2023-04-01T02:10:05.495Z\",\"updatedAt\":\"2023-04-01T02:10:05.495Z\"},{\"amount\":111356.8,\"description\":\"ALQUILER Pellegrini 590 3-D\",\"id\":1680315005577,\"ContractId\":5,\"createdAt\":\"2023-04-01T02:10:05.577Z\",\"updatedAt\":\"2023-04-01T02:10:05.577Z\"}]','[{\"id\":8,\"ContractId\":5,\"clientAmount\":323,\"ownerAmount\":343,\"clientPaid\":true,\"ownerPaid\":false,\"description\":\"fdfdf  fdfa df d fdf\",\"expiredDate\":\"2023-03-23\",\"createdAt\":\"2023-03-30T01:39:33.000Z\",\"updatedAt\":\"2023-03-31T02:46:30.000Z\",\"deletedAt\":null},{\"id\":9,\"ContractId\":2,\"clientAmount\":1313,\"ownerAmount\":-123,\"clientPaid\":true,\"ownerPaid\":false,\"description\":\"TEST EVEN ESPANA 02\",\"expiredDate\":\"2023-03-31\",\"createdAt\":\"2023-03-30T01:39:55.000Z\",\"updatedAt\":\"2023-03-31T02:46:30.000Z\",\"deletedAt\":null},{\"id\":7,\"ContractId\":5,\"clientAmount\":900,\"ownerAmount\":-990,\"clientPaid\":true,\"ownerPaid\":false,\"description\":\"Eventualidad para est 01\",\"expiredDate\":\"2023-03-30\",\"createdAt\":\"2023-03-30T01:37:42.000Z\",\"updatedAt\":\"2023-03-31T02:46:30.000Z\",\"deletedAt\":null},{\"id\":6,\"ContractId\":5,\"clientAmount\":379,\"ownerAmount\":89,\"clientPaid\":true,\"ownerPaid\":false,\"description\":\"HONORARIOS 2023 CUOTA 1\",\"expiredDate\":\"2023-03-11\",\"createdAt\":\"2023-03-29T02:16:22.000Z\",\"updatedAt\":\"2023-03-31T02:46:30.000Z\",\"deletedAt\":null}]','2023-03-31','2023-04-01 02:12:17',NULL,NULL),(9,2,2,'Abril',2023,64066.3,'[{\"amount\":30743.27,\"description\":\"ALQUILER Richerri 1011 02-C\",\"id\":1680489493426,\"ContractId\":3,\"createdAt\":\"2023-04-03T02:38:13.426Z\",\"updatedAt\":\"2023-04-03T02:38:13.426Z\"},{\"id\":2,\"ContractId\":3,\"year\":2023,\"amount\":34543,\"description\":\"ALQUILER Richerri 1011 C-02 Marzo 2023\",\"month\":3,\"paid\":false,\"rent\":true,\"debt\":true,\"paidDate\":null,\"createdAt\":\"2023-04-02T00:00:00.000Z\",\"updatedAt\":\"2023-04-02T00:00:00.000Z\",\"deletedAt\":null,\"Contract\":{\"id\":3,\"PropertyId\":2,\"ClientId\":1,\"startDate\":\"2023-02-01\",\"endDate\":\"2023-04-15\",\"state\":\"En curso\",\"amount\":34543,\"booking\":43545,\"deposit\":3454,\"description\":\"nuevo descripcion del contrato\",\"createdAt\":\"2023-03-25T03:04:02.000Z\",\"updatedAt\":\"2023-03-26T06:01:20.000Z\",\"deletedAt\":null}}]','[{\"id\":4,\"ContractId\":3,\"clientAmount\":1220,\"ownerAmount\":-1220,\"clientPaid\":true,\"ownerPaid\":false,\"description\":\"Buena description...\",\"expiredDate\":\"2023-03-23\",\"createdAt\":\"2023-03-26T21:22:38.000Z\",\"updatedAt\":\"2023-03-31T02:44:23.000Z\",\"deletedAt\":null}]','2023-04-02','2023-04-03 02:39:31',NULL,NULL),(10,1,2,'Abril',2023,157377,'[{\"amount\":46000,\"description\":\"ALQUILER Espana 876 10-4 Abril/2023\",\"id\":1680489795800,\"ContractId\":2,\"createdAt\":\"2023-04-03T02:43:15.800Z\",\"updatedAt\":\"2023-04-03T02:43:15.800Z\"},{\"amount\":111356.8,\"description\":\"ALQUILER Pellegrini 590 3-D Abril/2023\",\"id\":1680489795848,\"ContractId\":5,\"createdAt\":\"2023-04-03T02:43:15.848Z\",\"updatedAt\":\"2023-04-03T02:43:15.848Z\"},{\"id\":1,\"description\":\"PRIMER GASTOS DUENO\",\"amount\":20,\"date\":\"2023-03-24\",\"ContractId\":2,\"createdAt\":\"2023-03-30T23:34:47.000Z\",\"updatedAt\":\"2023-03-30T23:34:47.000Z\",\"deletedAt\":null}]','[]','2023-04-02','2023-04-03 02:43:40',NULL,NULL),(11,2,6,'Mayo',2023,30743.3,'[{\"amount\":30743.27,\"description\":\"ALQUILER Richerri 1011 02-C Mayo/2023\",\"id\":1680490522463,\"ContractId\":3,\"createdAt\":\"2023-04-03T02:55:22.463Z\",\"updatedAt\":\"2023-04-03T02:55:22.463Z\"}]','[]','2023-04-02','2023-04-03 02:55:34',NULL,NULL);
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
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PaymentTypes_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymenttypes`
--

LOCK TABLES `paymenttypes` WRITE;
/*!40000 ALTER TABLE `paymenttypes` DISABLE KEYS */;
INSERT INTO `paymenttypes` VALUES (1,'Debito','2023-03-24 17:20:11','2023-03-24 17:20:11',NULL),(2,'Efectivo','2023-03-24 17:20:16','2023-03-24 17:20:16',NULL),(3,'Tarjeta','2023-03-24 17:20:27','2023-03-24 17:20:27',NULL),(4,'oposition Modi','2023-04-02 16:37:48','2023-04-02 16:39:14','2023-04-02 16:39:31'),(6,'otro','2023-04-02 16:45:24','2023-04-02 16:45:24',NULL);
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
  CONSTRAINT `pricehistorials_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_10` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_11` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_12` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_13` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_2` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_3` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_4` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_5` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_6` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_7` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_8` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pricehistorials_ibfk_9` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricehistorials`
--

LOCK TABLES `pricehistorials` WRITE;
/*!40000 ALTER TABLE `pricehistorials` DISABLE KEYS */;
INSERT INTO `pricehistorials` VALUES (1,1,75000,1,0,'2023-03-24 17:39:08','2023-03-24 17:50:44'),(2,1,126750,2,69,'2023-03-24 17:51:55','2023-03-24 17:51:55'),(3,2,50000,1,0,'2023-03-25 02:19:50','2023-03-25 02:19:50'),(4,3,34543,1,0,'2023-03-25 03:04:02','2023-03-25 03:04:02'),(5,4,59000,1,0,'2023-03-27 02:37:59','2023-03-27 02:37:59'),(6,5,68000,1,0,'2023-03-29 02:07:43','2023-03-29 02:07:43'),(7,5,121040,2,78,'2023-03-29 02:29:15','2023-03-29 02:29:15');
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
  `isFor` varchar(255) NOT NULL DEFAULT 'Alquiler',
  `nroPartWater` varchar(255) DEFAULT NULL,
  `nroPartMuni` varchar(255) DEFAULT NULL,
  `nroPartAPI` varchar(255) DEFAULT NULL,
  `nroPartGas` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'Libre',
  `description` longtext,
  `folderNumber` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Properties_folderNumber_unique` (`folderNumber`),
  UNIQUE KEY `uniqueKeyProperty` (`street`,`number`,`floor`,`dept`),
  KEY `ZoneId` (`ZoneId`),
  KEY `PropertyTypeId` (`PropertyTypeId`),
  KEY `OwnerId` (`OwnerId`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_10` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_11` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_12` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_13` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_14` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_15` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_16` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_17` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_18` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_19` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_20` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_21` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_22` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_23` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_24` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_25` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_26` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_27` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_28` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_29` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_30` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_31` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_32` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_33` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_34` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_35` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_36` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_37` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_38` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_39` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_4` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_40` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_41` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_42` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_5` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_6` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_7` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_8` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_9` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,2,1,1,'Espana','876','10','4','Venta','','','','','Ocupado','','011','2023-03-24 17:22:04','2023-03-29 01:24:40',NULL),(2,4,5,2,'Richerri','1011','02','C','Alquiler','','','','','Ocupado','','009','2023-03-25 03:03:19','2023-03-25 03:04:02',NULL),(3,5,3,1,'Pellegrini','590','3','D','Alquiler','','','','','Ocupado','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, nemo, dicta explicabo rerum obcaecati impedit vitae totam earum ea est maxime! Molestiae tenetur soluta minus, ipsam molestias esse aperiam quia inventore ad itaque reiciendis, aspernatur necessitatibus sit quae possimus dolor aliquam in vitae eius rerum? Inventore, aspernatur qui? Eius tempora accusamus sunt eum veniam officiis, magnam tempore modi, ab maxime doloremque necessitatibus quod porro nobis ex impedit dolore sequi quis facilis voluptatem quibusdam dicta iste nisi dolorum. Voluptate porro iure magni? Nemo ducimus corrupti vel nisi! Non nemo quos id suscipit eos exercitationem consectetur explicabo quasi atque rerum minima, cupiditate ab cumque itaque autem ipsum, consequuntur recusandae corporis aspernatur laborum dolor dolorem voluptatem! Quis est ipsa fugiat dolorem odio asperiores aliquam recusandae voluptate animi, vel quas corporis doloribus sapiente ipsam error deserunt reiciendis fugit. Sit quidem laboriosam debitis, delectus ratione nam harum expedita error veniam quibusdam porro minima incidunt praesentium ullam. Facere quae quibusdam commodi saepe animi? Voluptatem harum, vitae suscipit aliquam tempora maxime dolore voluptatum optio ipsum recusandae minus a sunt officiis! Consequuntur quos quis voluptatibus, repudiandae rem esse non. Nemo facere perspiciatis nulla temporibus debitis, necessitatibus, unde vitae ducimus ex libero ratione nobis natus rem eius aperiam quaerat.\n','678','2023-03-27 02:35:22','2023-03-29 02:07:43',NULL),(4,2,4,2,'fff','ff','re','re','Alquiler','ewrtwertfdgsf','retwretwrfgsfdg','wetwertfdsgfsgf','52352352353523fgsf','Libre','wetwr rt rt rwr rfdg sf','1231','2023-04-02 20:08:14','2023-04-02 20:14:16',NULL);
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
  UNIQUE KEY `PropertyTypes_description_unique` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertytypes`
--

LOCK TABLES `propertytypes` WRITE;
/*!40000 ALTER TABLE `propertytypes` DISABLE KEYS */;
INSERT INTO `propertytypes` VALUES (1,'Casa 2 Dormitorios','2023-03-24 17:20:41','2023-03-24 17:20:41'),(2,'Casa','2023-03-24 17:20:47','2023-03-24 17:20:47'),(3,'Depto 3 Dormitorios','2023-03-24 17:21:02','2023-03-24 17:21:02'),(4,'Garaje','2023-03-24 17:21:09','2023-03-24 17:21:09'),(5,'Mono Ambiente','2023-03-24 17:21:17','2023-03-24 17:21:24');
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitUnique` (`PropertyId`,`date`,`phone`,`fullName`),
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_10` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_11` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_12` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_13` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_2` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_3` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_4` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_5` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_6` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_7` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_8` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_9` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,2,'2023-03-31 13:30:00','James Morvan','90989978788','Vienen en auto','2023-03-26 04:03:45','2023-03-26 04:08:44',NULL),(2,2,'2023-03-27 18:10:00','Ivo Tomas','34419093123','AUto Blanco','2023-03-26 04:06:00','2023-03-26 04:08:12',NULL),(3,1,'2023-04-07 04:13:00','test','63463464','','2023-03-26 04:13:22','2023-03-26 04:13:22',NULL),(4,1,'2023-02-15 07:20:00','test2','235235235','5','2023-03-26 04:14:58','2023-03-26 04:14:58',NULL);
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `true` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones`
--

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;
INSERT INTO `zones` VALUES (1,'Sur','2023-03-24 16:49:11','2023-03-24 16:49:11',NULL),(2,'Centro','2023-03-24 16:49:28','2023-04-02 01:50:05',NULL),(3,'Norte','2023-03-24 16:49:33','2023-03-24 16:49:33',NULL),(4,'Este','2023-03-24 16:49:39','2023-03-24 16:49:39',NULL),(5,'Oeste','2023-03-24 16:49:44','2023-03-24 16:49:44',NULL),(6,'test','2023-04-02 00:38:24','2023-04-02 00:38:24','2023-04-02 00:38:28'),(7,'editing...22222','2023-04-02 01:16:32','2023-04-02 02:40:55',NULL),(8,'dghdg','2023-04-02 01:53:25','2023-04-02 01:53:25','2023-04-02 01:54:12'),(9,'test after moveing btns','2023-04-02 02:37:27','2023-04-02 02:37:27',NULL),(10,'jajajajaj','2023-04-02 02:39:48','2023-04-02 03:16:49',NULL),(11,'remove trash','2023-04-02 03:18:12','2023-04-02 19:01:04',NULL);
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

-- Dump completed on 2023-04-03  0:05:45
