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
  CONSTRAINT `assurances_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assurances`
--

LOCK TABLES `assurances` WRITE;
/*!40000 ALTER TABLE `assurances` DISABLE KEYS */;
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
  UNIQUE KEY `auths_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auths`
--

LOCK TABLES `auths` WRITE;
/*!40000 ALTER TABLE `auths` DISABLE KEYS */;
INSERT INTO `auths` VALUES (1,'9b2df0fe-26a0-4acf-9b42-ed3d1fdbf6a8','admin@gmail.com','Test',NULL,'$2a$12$6gxWOa6Fub..j0MyhCID8ekPnoHfNODO/TI0XHzI7TTxW6hO/eSTW',NULL,NULL,NULL,'2023-04-14 21:24:56','2023-04-14 21:24:56',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `clientexpenses_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientexpenses`
--

LOCK TABLES `clientexpenses` WRITE;
/*!40000 ALTER TABLE `clientexpenses` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
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
  UNIQUE KEY `configs_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configs`
--

LOCK TABLES `configs` WRITE;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;
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
  UNIQUE KEY `contracts__property_id__client_id_start_date_end_date` (`PropertyId`,`ClientId`,`startDate`,`endDate`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `debtclients_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtclients`
--

LOCK TABLES `debtclients` WRITE;
/*!40000 ALTER TABLE `debtclients` DISABLE KEYS */;
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `debtowners_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtowners`
--

LOCK TABLES `debtowners` WRITE;
/*!40000 ALTER TABLE `debtowners` DISABLE KEYS */;
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
  CONSTRAINT `eventualities_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventualities`
--

LOCK TABLES `eventualities` WRITE;
/*!40000 ALTER TABLE `eventualities` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joblogs`
--

LOCK TABLES `joblogs` WRITE;
/*!40000 ALTER TABLE `joblogs` DISABLE KEYS */;
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
  CONSTRAINT `ownerexpenses_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerexpenses`
--

LOCK TABLES `ownerexpenses` WRITE;
/*!40000 ALTER TABLE `ownerexpenses` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
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
  `expenseDetails` longtext,
  `eventualityDetails` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `paymentclients__contract_id_month_year` (`ContractId`,`month`,`year`),
  KEY `PaymentTypeId` (`PaymentTypeId`),
  CONSTRAINT `paymentclients_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_2` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentclients`
--

LOCK TABLES `paymentclients` WRITE;
/*!40000 ALTER TABLE `paymentclients` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `paymentowners__owner_id_month_year` (`OwnerId`,`month`,`year`),
  KEY `PaymentTypeId` (`PaymentTypeId`),
  CONSTRAINT `paymentowners_ibfk_1` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_2` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentowners`
--

LOCK TABLES `paymentowners` WRITE;
/*!40000 ALTER TABLE `paymentowners` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymenttypes`
--

LOCK TABLES `paymenttypes` WRITE;
/*!40000 ALTER TABLE `paymenttypes` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricehistorials`
--

LOCK TABLES `pricehistorials` WRITE;
/*!40000 ALTER TABLE `pricehistorials` DISABLE KEYS */;
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
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`PropertyTypeId`) REFERENCES `propertytypes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertytypes`
--

LOCK TABLES `propertytypes` WRITE;
/*!40000 ALTER TABLE `propertytypes` DISABLE KEYS */;
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
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones`
--

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;
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

-- Dump completed on 2023-04-14 18:28:05
