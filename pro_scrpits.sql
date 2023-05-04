CREATE DATABASE  IF NOT EXISTS `ivana_centro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ivana_centro`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: vps-3272208-x.dattaweb.com    Database: ivana_centro
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assurances`
--

LOCK TABLES `assurances` WRITE;
/*!40000 ALTER TABLE `assurances` DISABLE KEYS */;
INSERT INTO `assurances` VALUES (1,12,'LENCINA SUSANA MERCEDES','Eva Peron 2368 Villa Gobernador Galvez, Santa Fe','0000000','xx@gmail.com','27-11.710.912-2','empleada como personal domestico de la Sra. Scarpecci Nilda Dni: 10.922.204, Cuil/Cuit nº: 27-10.922.204-1, con domicilio en calle Av. Libertad 205 de la ciudad de Rosario desde el 01/01/2006','2023-04-21 15:18:33','2023-05-02 00:55:00'),(2,12,'LENCINA SUSANA MERCEDES','Eva Peron 2368 Villa Gobernador Galvez, Santa Fe','0000000','xx@gmail.com','27-11.710.912-2','empleada como personal domestico de la Sra. Scarpecci Nilda Dni: 10.922.204, Cuil/Cuit nº: 27-10.922.204-1, con domicilio en calle Av. Libertad 205 de la ciudad de Rosario desde el 01/01/2006','2023-04-21 15:19:38','2023-05-02 00:55:00'),(3,12,'GUZMAN GERMAN RICARDO','Eva Peron 2368 Villa Gobernador Galvez, Rosario, Santa Fe,','3415 31-3974','xx@gmail.com','30.624.693','empleado de la empresa Frigorifcio Paladini S.A. cito en calle J. Piazza 63 / 2124 Villa Gobernador Galvez desde el 13/10/2004 Cuil nº: 20-30624693-4','2023-04-21 15:23:14','2023-05-02 00:55:00'),(4,12,'VOLPE JULIO LEOPOLDO','Isola 375 Piso 3 Depto. “C” de la ciudad de Rosario','000000000','xxx@gmail.com','20-10.779.352-7','empleados del Hospital Español S.A. cito en calle Sarmiento 3150 de la ciudad de Rosario, como enfermero de piso desde 01/01/199','2023-04-21 15:25:02','2023-05-02 00:55:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auths`
--

LOCK TABLES `auths` WRITE;
/*!40000 ALTER TABLE `auths` DISABLE KEYS */;
INSERT INTO `auths` VALUES (1,'9b2df0fe-26a0-4acf-9b42-ed3d1fdbf6a8','prod_dev@gmail.com','DEV',NULL,'$2a$12$6gxWOa6Fub..j0MyhCID8ekPnoHfNODO/TI0XHzI7TTxW6hO/eSTW',NULL,NULL,NULL,'2023-04-14 21:24:56','2023-05-02 00:54:58'),(2,'48b21f23-0446-4a44-ab10-685b2ea86e12','Inmobiliaria.centro.1980@gmail.com','Ivana Anabel','https://res.cloudinary.com/draxircbk/image/upload/v1681669846/ivana_inmobilaria/representacion-3d-avatar-llamada-zoom_3_pq8blk.jpg','$2a$12$xKT4wWNDRO7wHscguPLo5OFBQpEdtYOsNZbDr6EOPxNGRuHGZLEOS',NULL,NULL,NULL,'2023-04-16 18:33:33','2023-05-02 00:54:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
INSERT INTO `claims` VALUES (1,9,'Abierto','[]','Filtracion seca en techo de baño y cocina. Se reclama a administracion del edificio para que reparen y pinten','2023-04-26 16:06:14','2023-05-02 00:54:58',NULL),(2,22,'Abierto','[]','REAPARACION BAÑO por cambio desagüe - Verificar montos de alquileres pagados a propietario y descuentos de expensas extraordinarias - ','2023-04-26 16:08:23','2023-05-02 00:54:58',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientexpenses`
--

LOCK TABLES `clientexpenses` WRITE;
/*!40000 ALTER TABLE `clientexpenses` DISABLE KEYS */;
INSERT INTO `clientexpenses` VALUES (1,'Seguro',3224,'2023-04-24',2,'2023-04-24 14:52:06','2023-05-02 00:55:00'),(2,'Seguro',3224,'2023-04-24',50,'2023-04-24 14:52:18','2023-05-02 00:55:00'),(3,'Seguro',3224,'2023-04-24',50,'2023-04-24 14:52:31','2023-05-02 00:55:00'),(4,'Seguro',3224,'2023-04-24',50,'2023-04-24 14:52:43','2023-05-02 00:55:00'),(5,'Seguro',3224,'2023-04-24',49,'2023-04-24 14:53:04','2023-05-02 00:55:00'),(6,'Seguro',3224,'2023-04-24',48,'2023-04-24 14:53:13','2023-05-02 00:55:00'),(7,'Seguro',3224,'2023-04-24',47,'2023-04-24 14:53:26','2023-05-02 00:55:00'),(8,'Seguro',6300,'2023-04-24',46,'2023-04-24 14:59:43','2023-05-02 00:55:00'),(9,'Seguro',3241,'2023-04-24',45,'2023-04-24 15:00:27','2023-05-02 00:55:00'),(10,'Seguro',2824,'2023-04-24',44,'2023-04-24 15:00:47','2023-05-02 00:55:00'),(11,'Seguro',3224,'2023-04-24',43,'2023-04-24 15:00:59','2023-05-02 00:55:00'),(12,'Seguro',3224,'2023-04-24',42,'2023-04-24 15:01:11','2023-05-02 00:55:00'),(13,'Seguro',3224,'2023-04-24',41,'2023-04-24 15:01:21','2023-05-02 00:55:00'),(14,'Seguro',3224,'2023-04-24',40,'2023-04-24 15:01:31','2023-05-02 00:55:00'),(15,'Seguro',3224,'2023-04-24',39,'2023-04-24 15:01:47','2023-05-02 00:55:00'),(16,'Seguro',3224,'2023-04-24',35,'2023-04-24 15:01:57','2023-05-02 00:55:00'),(17,'Seguro',3224,'2023-04-24',32,'2023-04-24 15:02:08','2023-05-02 00:55:00'),(18,'Seguro',3224,'2023-04-24',31,'2023-04-24 15:02:19','2023-05-02 00:55:00'),(19,'Seguro',3224,'2023-04-24',30,'2023-04-24 15:02:31','2023-05-02 00:55:00'),(20,'Seguro',3224,'2023-04-24',29,'2023-04-24 15:02:44','2023-05-02 00:55:00'),(21,'Seguro',3224,'2023-04-24',28,'2023-04-24 15:02:53','2023-05-02 00:55:00'),(22,'Seguro',3224,'2023-04-24',27,'2023-04-24 15:03:14','2023-05-02 00:55:00'),(23,'Seguro',3224,'2023-04-24',27,'2023-04-24 15:03:25','2023-05-02 00:55:00'),(24,'Seguro',3224,'2023-04-24',26,'2023-04-24 15:03:37','2023-05-02 00:55:00'),(25,'Seguro',3224,'2023-04-24',25,'2023-04-24 15:03:49','2023-05-02 00:55:00'),(26,'Seguro',3224,'2023-04-24',24,'2023-04-24 15:04:02','2023-05-02 00:55:00'),(27,'Seguro',3224,'2023-04-24',23,'2023-04-24 15:04:11','2023-05-02 00:55:00'),(28,'Seguro',3224,'2023-04-24',22,'2023-04-24 15:04:24','2023-05-02 00:55:00'),(29,'Seguro',3224,'2023-04-24',21,'2023-04-24 15:04:34','2023-05-02 00:55:00'),(30,'Seguro',3224,'2023-04-24',20,'2023-04-24 15:04:50','2023-05-02 00:55:00'),(31,'Seguro',3224,'2023-04-24',19,'2023-04-24 15:05:06','2023-05-02 00:55:00'),(32,'Seguro',3224,'2023-04-24',18,'2023-04-24 15:05:35','2023-05-02 00:55:00'),(33,'Seguro',3224,'2023-04-24',17,'2023-04-24 15:05:48','2023-05-02 00:55:00'),(34,'Seguro',3224,'2023-04-24',16,'2023-04-24 15:06:01','2023-05-02 00:55:00'),(35,'Seguro',3224,'2023-04-24',15,'2023-04-24 15:06:16','2023-05-02 00:55:00'),(36,'Seguro',3224,'2023-04-24',13,'2023-04-24 15:06:28','2023-05-02 00:55:00'),(37,'Seguro',3224,'2023-04-24',12,'2023-04-24 15:06:48','2023-05-02 00:55:00'),(38,'Seguro',3224,'2023-04-24',11,'2023-04-24 15:07:12','2023-05-02 00:55:00'),(39,'Seguro',3224,'2023-04-24',10,'2023-04-24 15:07:24','2023-05-02 00:55:00'),(40,'Seguro',3224,'2023-04-24',9,'2023-04-24 15:07:34','2023-05-02 00:55:00'),(41,'Seguro',3224,'2023-04-24',9,'2023-04-24 15:07:52','2023-05-02 00:55:00'),(42,'Seguro',3224,'2023-04-24',8,'2023-04-24 15:08:25','2023-05-02 00:55:00'),(43,'Seguro',3224,'2023-04-24',7,'2023-04-24 15:08:47','2023-05-02 00:55:00'),(44,'Seguro',3224,'2023-04-24',6,'2023-04-24 15:09:01','2023-05-02 00:55:00'),(45,'Seguro',3224,'2023-04-24',5,'2023-04-24 15:09:14','2023-05-02 00:55:00'),(46,'Seguro',3224,'2023-04-24',4,'2023-04-24 15:09:25','2023-05-02 00:55:00'),(47,'Seguro',3224,'2023-04-24',3,'2023-04-24 15:09:36','2023-05-02 00:55:00'),(48,'Seguro',3224,'2023-04-24',2,'2023-04-24 15:09:48','2023-05-02 00:55:00'),(49,'Seguro',3224,'2023-04-24',1,'2023-04-24 15:09:57','2023-05-02 00:55:00'),(50,'Expensas',1200,'2023-04-24',35,'2023-04-24 15:12:49','2023-05-02 00:55:00'),(51,'Expensas',1500,'2023-04-24',32,'2023-04-24 15:14:25','2023-05-02 00:55:00'),(52,'Gastos Bancarios',500,'2023-04-24',50,'2023-04-24 15:26:47','2023-05-02 00:55:00'),(53,'Gastos Bancarios',500,'2023-04-24',49,'2023-04-24 15:26:57','2023-05-02 00:55:00'),(54,'Gastos Bancarios',500,'2023-04-24',48,'2023-04-24 15:27:04','2023-05-02 00:55:00'),(55,'Gastos Bancarios',500,'2023-04-24',47,'2023-04-24 15:27:16','2023-05-02 00:55:00'),(56,'Gastos Bancarios',500,'2023-04-24',46,'2023-04-24 15:27:26','2023-05-02 00:55:00'),(57,'Gastos Bancarios',500,'2023-04-24',45,'2023-04-24 15:27:35','2023-05-02 00:55:00'),(58,'Gastos Bancarios',500,'2023-04-24',44,'2023-04-24 15:27:47','2023-05-02 00:55:00'),(59,'Gastos Bancarios',500,'2023-04-24',43,'2023-04-24 15:27:58','2023-05-02 00:55:00'),(60,'Gastos Bancarios',500,'2023-04-24',42,'2023-04-24 15:28:09','2023-05-02 00:55:00'),(61,'Gastos Bancarios',500,'2023-04-24',41,'2023-04-24 15:28:19','2023-05-02 00:55:00'),(62,'Gastos Bancarios',500,'2023-04-24',40,'2023-04-24 15:28:30','2023-05-02 00:55:00'),(63,'Gastos Bancarios',500,'2023-04-24',39,'2023-04-24 15:28:40','2023-05-02 00:55:00'),(64,'Gastos Bancarios',500,'2023-04-24',39,'2023-04-24 15:28:59','2023-05-02 00:55:00'),(65,'Gastos Bancarios',500,'2023-04-24',35,'2023-04-24 15:29:10','2023-05-02 00:55:00'),(66,'Gastos Bancarios',500,'2023-04-24',35,'2023-04-24 15:29:21','2023-05-02 00:55:00'),(67,'Gastos Bancarios',500,'2023-04-24',32,'2023-04-24 15:29:35','2023-05-02 00:55:00'),(68,'Gastos Bancarios',500,'2023-04-24',31,'2023-04-24 15:29:45','2023-05-02 00:55:00'),(69,'Gastos Bancarios',500,'2023-04-24',30,'2023-04-24 15:30:04','2023-05-02 00:55:00'),(70,'Gastos Bancarios',500,'2023-04-24',29,'2023-04-24 15:30:17','2023-05-02 00:55:00'),(71,'Gastos Bancarios',500,'2023-04-24',28,'2023-04-24 15:30:25','2023-05-02 00:55:00'),(72,'Gastos Bancarios',500,'2023-04-24',27,'2023-04-24 15:30:50','2023-05-02 00:55:00'),(73,'Gastos Bancarios',500,'2023-04-24',26,'2023-04-24 15:31:02','2023-05-02 00:55:00'),(74,'Gastos Bancarios',500,'2023-04-24',25,'2023-04-24 15:31:13','2023-05-02 00:55:00'),(75,'Gastos Bancarios',500,'2023-04-24',24,'2023-04-24 15:31:24','2023-05-02 00:55:00'),(76,'Gastos Bancarios',500,'2023-04-24',23,'2023-04-24 15:31:34','2023-05-02 00:55:00'),(77,'Gastos Bancarios',500,'2023-04-24',22,'2023-04-24 15:31:46','2023-05-02 00:55:00'),(78,'Gastos Bancarios',500,'2023-04-24',21,'2023-04-24 15:31:58','2023-05-02 00:55:00'),(79,'Gastos Bancarios',500,'2023-04-24',20,'2023-04-24 15:32:15','2023-05-02 00:55:00'),(80,'Gastos Bancarios',500,'2023-04-24',19,'2023-04-24 15:32:27','2023-05-02 00:55:00'),(81,'Gastos Bancarios',500,'2023-04-24',18,'2023-04-24 15:32:50','2023-05-02 00:55:00'),(82,'Gastos Bancarios',500,'2023-04-24',17,'2023-04-24 15:33:06','2023-05-02 00:55:00'),(83,'Gastos Bancarios',500,'2023-04-24',16,'2023-04-24 15:33:18','2023-05-02 00:55:00'),(84,'Gastos Bancarios',500,'2023-04-24',15,'2023-04-24 15:33:37','2023-05-02 00:55:00'),(85,'Gastos Bancarios',500,'2023-04-24',13,'2023-04-24 15:33:47','2023-05-02 00:55:00'),(86,'Gastos Bancarios',500,'2023-04-24',12,'2023-04-24 15:33:58','2023-05-02 00:55:00'),(87,'Gastos Bancarios',500,'2023-04-24',11,'2023-04-24 15:34:25','2023-05-02 00:55:00'),(88,'Gastos Bancarios',500,'2023-04-24',10,'2023-04-24 15:34:37','2023-05-02 00:55:00'),(89,'Gastos Bancarios',500,'2023-04-24',9,'2023-04-24 15:34:58','2023-05-02 00:55:00'),(90,'Gastos Bancarios',500,'2023-04-24',8,'2023-04-24 15:35:14','2023-05-02 00:55:00'),(91,'Gastos Bancarios',500,'2023-04-24',7,'2023-04-24 15:35:25','2023-05-02 00:55:00'),(92,'Gastos Bancarios',500,'2023-04-24',6,'2023-04-24 15:35:34','2023-05-02 00:55:00'),(93,'Gastos Bancarios',500,'2023-04-24',5,'2023-04-24 15:35:46','2023-05-02 00:55:00'),(94,'Gastos Bancarios',500,'2023-04-24',4,'2023-04-24 15:35:59','2023-05-02 00:55:00'),(95,'Gastos Bancarios',500,'2023-04-24',3,'2023-04-24 15:36:16','2023-05-02 00:55:00'),(96,'Gastos Bancarios',500,'2023-04-24',2,'2023-04-24 15:36:30','2023-05-02 00:55:00'),(97,'Gastos Bancarios',500,'2023-04-24',1,'2023-04-24 15:36:43','2023-05-02 00:55:00'),(98,'Aguas',2564,'2023-04-24',27,'2023-04-24 16:03:45','2023-05-02 00:55:00'),(99,'Tgi',2874,'2023-04-24',27,'2023-04-24 16:04:04','2023-05-02 00:55:00'),(100,'Api',845,'2023-04-24',27,'2023-04-24 16:04:18','2023-05-02 00:55:00'),(101,'Tgi',2987,'2023-04-24',26,'2023-04-24 16:04:48','2023-05-02 00:55:00'),(102,'Aguas',3145,'2023-04-24',26,'2023-04-24 16:05:05','2023-05-02 00:55:00'),(103,'Api',748,'2023-04-24',26,'2023-04-24 16:05:23','2023-05-02 00:55:00'),(104,'Tgi',2054,'2023-04-24',17,'2023-04-24 16:10:58','2023-05-02 00:55:00'),(105,'Aguas',2190,'2023-04-24',17,'2023-04-24 16:11:13','2023-05-02 00:55:00'),(106,'Api',868,'2023-04-24',17,'2023-04-24 16:11:29','2023-05-02 00:55:00'),(107,'Expensas',1200,'2023-04-26',54,'2023-04-26 12:27:38','2023-05-02 00:55:00'),(108,'Seguro',3224,'2023-04-26',54,'2023-04-26 12:28:58','2023-05-02 00:55:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'ALEJANDRA ZERBONIA','Riobamba 137','3412170930','00','andreazrb12@gmail.com','23.559.067','Santa Fe','ROSARIO','2000','C 104','2023-04-19 15:53:51','2023-05-02 00:54:58',NULL),(2,'ALEJANDRO OVIEDO','REGIMIENTO 11 178','3412825203','00','alenatsanovi@gmail.com','93.720.616','Santa Fe','ROSARIO','2000','C 196','2023-04-19 15:55:54','2023-05-02 00:54:58',NULL),(3,'ANDRY GOLDCHEID IRUMBE','San Lorenzo 750 01-02','3416198362','00','goldcheidvalentina@hotmail.com','96.114.014','Santa Fe','ROSARIO','2000','C 185','2023-04-19 15:57:50','2023-05-02 00:54:58',NULL),(4,'BARBARA SILVA','Fontezuela 2661 monoblok 36 piso 2 depto. 662','3412165263','00','barbarabsilva@hotmail.es','34.420.390','Santa Fe','ROSARIO','2000','C 118','2023-04-19 15:59:40','2023-05-02 00:54:58',NULL),(5,'BRISA R. CAMPOS','Necochea 1334 05-02','3416004559','00','brisa.rcf@gmail.com','PASAP. FX722199','Santa Fe','ROSARIO','2000','C 192','2023-04-19 16:03:14','2023-05-02 00:54:58',NULL),(6,'CARMEN CANDIA','cochabamba 4781','37.534.693','00','milacandia21@gmail.com','3416991215','Santa Fe','ROSARIO','2000','C 199','2023-04-19 16:04:43','2023-05-02 00:54:58',NULL),(7,'CARMEN ZULEMA ESCOBAR','Ituzaigo 744 00-06','153-238910','00','999999@gmail.com','17.094.138','Santa Fe','ROSARIO','2000','C 150','2023-04-19 16:07:31','2023-05-02 00:54:58',NULL),(8,'DAMIAN LUIS FUNES','Mitre 757 08-06','152-129318','00','datakefu20@gmail.com','25.615.672','Santa Fe','ROSARIO','2000','C 202','2023-04-19 16:10:03','2023-05-02 00:54:58',NULL),(9,'DANIELA VERA','Mendoza 989 05-03','3483433392','','dany_vera88@hotmail.com','33.856.699','Santa Fe','ROSARIO','2000','C 116','2023-04-19 16:12:07','2023-05-02 00:54:58',NULL),(10,'DIEGO DEMARCHI','Entre Rios 1147 00-04','3415838721','','dieguitodemarchi@gmail.com','23.344.542','Santa Fe','ROSARIO','2000','C 176','2023-04-19 17:19:37','2023-05-02 00:54:58',NULL),(11,'EVELYN BERGAGLIO','La paz 1138 00-03','3415475361','','cccccccc@hotmail.com','33364021','Santa Fe','ROSARIO','2000','C 161','2023-04-19 17:20:56','2023-05-02 00:54:58',NULL),(12,'FATIMA MARÍA BERTOLOTTI','Urquiza 1949 13-04','153-734426','4217846','sssss@hotmail.com','20.882.689','Santa Fe','ROSARIO','2000','C 197','2023-04-19 17:22:34','2023-05-02 00:54:58',NULL),(13,'FERNANDO MIGUELES','Gaboto 3573 00-04','3416160135','','fernob_87@hotmail.com','32.753.642','Santa Fe','ROSARIO','2000','C 209','2023-04-19 17:23:53','2023-05-02 00:54:58',NULL),(14,'FRANCISCO JOSE CASTELLI','Castelli 1429, Pergamino, Bs.As','2477 30-9574','','santicastelli1990@gmail.com',' 32.345.184','Buenos Aires','PERGAMINO','2700','C 122','2023-04-19 17:28:09','2023-05-02 00:54:58',NULL),(15,'GARY LUXAMA','San Luis 1914 02-01','3416282361','','111111111@gmail.com','95.887.111','Santa Fe','ROSARIO','2000','C 123','2023-04-19 17:29:12','2023-05-02 00:54:58',NULL),(17,'GERMAN TION','Mitre 2458 02-03','3416 61-1653','','vikingo.tion@gmail.com','22.129.952','Santa Fe','ROSARIO','2000','C 186','2023-04-19 17:32:43','2023-05-02 00:54:58',NULL),(18,'JEAN MESSEROUX','Sarmiento 1247 07-02','3417207882','','messerouxhilare@gmail.com','95.904.838','Santa Fe','ROSARIO','2000','C 182','2023-04-19 17:34:02','2023-05-02 00:54:58',NULL),(19,'jeremias bue','Gaboto 1821 04-02','3413318506','','Jeremiasbue12@hotmail.com','43.767.991','Santa Fe','ROSARIO','2000','C ','2023-04-19 17:35:26','2023-05-02 00:54:58',NULL),(20,'JOSE HUGO CARDACI','cta. Ricardone 1373 04-02','153-250852','','777777@gmail.com','6.054.600','Santa Fe','ROSARIO','2000','C 127','2023-04-19 17:37:12','2023-05-02 00:54:58',NULL),(21,'JOSÉ MARÍA CARLETTA','Riobamba 40 Bis 01-04','156-213042','','jmcarletta@gmail.com','25.689.029','Santa Fe','ROSARIO','2000','C 196','2023-04-19 17:38:22','2023-05-02 00:54:58',NULL),(22,'JOSE RAMON OCAMPO','gaboto 3573 00-03','3415060449','','66666666@gmail.com','7.877.930','Santa Fe','ROSARIO','2000','C 208','2023-04-19 17:39:46','2023-05-02 00:54:58',NULL),(23,'JUAN IGNACIO KERN','Cabildo 1439 Pueblo Esther','3416646338','','juani10caju@gmail.com','42.704.295','Santa Fe','PUEBLO ESTHER','2126','C 192','2023-04-19 17:41:44','2023-05-02 00:54:58',NULL),(24,'JULIO CESAR NUÑEZ','Parkinson 1856 ','37048023137','','jcnunez1963@gmail.com','16.168.338','Formosa','FORMOSA','3600','C 175','2023-04-19 17:43:19','2023-05-02 00:54:58',NULL),(25,'LEANDRO CICLER','Virasoro 6326','3413768826','','leancicler8@gmail.com','39.567.918','Santa Fe','ROSARIO','2000','C 184','2023-04-19 17:45:07','2023-05-02 00:54:58',NULL),(26,'LUCAS OMAR DIAZ','Nicaragua 1936','3415504611','','lucasnano112@gmail.com','35.586.298','Santa Fe','ROSARIO','2000','C 110','2023-04-19 17:46:35','2023-05-02 00:54:58',NULL),(27,'MAKARENA YUDICHE','TUCUMAN 2679 02-02','3413 00-7498','','makarenayudiche028@gmail.com','39.046.028','Santa Fe','ROSARIO','2000','C 127','2023-04-19 17:48:35','2023-05-02 00:54:58',NULL),(28,'JORGE // MARCOS CESAR CORREA','San Lorenzo 863 04-02','156723532','370-4585003','nattyvg_02@hotmail.com','28.094.295','Santa Fe','ROSARIO','2000','c 153','2023-04-19 17:50:32','2023-05-02 00:54:58',NULL),(29,'MARCOS MARTINEZ','Conte de Alio 7681','3412732853','','mmdebelluit@gmail.com','38.420.856','Santa Fe','ROSARIO','2000','C 109','2023-04-19 17:52:24','2023-05-02 00:54:58',NULL),(30,'MARIA ELISA BRUSSA','Matienzo 383 Bis','155-646801','','ebrussa@gmail.com','25.453.226','Santa Fe','ROSARIO','2000','C 106','2023-04-19 17:54:55','2023-05-02 00:54:58',NULL),(31,'MARÍA PAULA VOLPE','Isola 375 Bis piso 3 dto. C','153-114148','3415313974','mariapaulavolpe@gmail.com','30.838.261','Santa Fe','ROSARIO','2000','C 131 //  German --> guzman.german.r@gmail.com Tel: 3415313974','2023-04-19 17:57:17','2023-05-02 00:54:58',NULL),(32,'NATALIA ENZETTI','sarmiento 1414','156848118','','nataliaenzetti@hotmail.com','27.668.457','Santa Fe','ROSARIO','2000','C 108','2023-04-19 17:59:32','2023-05-02 00:54:58',NULL),(33,'PABLO PIGNATA','Colon 1256 04-05','155790523','','psps1977@outlook.com','26005443','Santa Fe','ROSARIO','2000','C 151','2023-04-19 18:01:14','2023-05-02 00:54:58',NULL),(34,'RODOLFO OJEDA','Pj Costarelli 5368','3415909366','','ojedarodolfo5@gmail.com','30.838.415','Santa Fe','ROSARIO','2000','C 195','2023-04-19 18:02:59','2023-05-02 00:54:58',NULL),(35,'ROLANDO SALTI','Buenos Aires 2521 01-04','155-991471','','rolosalti@gmail.com','21.044.579','Santa Fe','ROSARIO','2000','C 114','2023-04-19 18:04:44','2023-05-02 00:54:58',NULL),(36,'SOL ANA BASUALDO','J. Rucci 495, Galvez','3404 49-2729','','solbasualdo360@gmail.com','41.633.544','Santa Fe','GALVEZ','2252','C 200','2023-04-19 18:06:50','2023-05-02 00:54:58',NULL),(37,'TAMARA AYLEN GARCIA','lisandro de la torre 964','152-777707','','tamaraailengarcia95@hotmail.com','39.455.231','Santa Fe','PEREZ','2121','C 175','2023-04-19 18:09:18','2023-05-02 00:54:58',NULL),(38,'TAMARA CARRERA MAIDANA','Maipu 2351 03-05','3416910365','','cabreratamara03@gmail.com','38.140.697','Santa Fe','ROSARIO','2000','C 203','2023-04-19 18:10:52','2023-05-02 00:54:58',NULL),(39,'TAMARA CELESTE GODOY','Pj. Libertad 788, San Jeronimo','3401405105','','godoytamara327@gmail.com','41.975.433','Santa Fe','SAN JERONIMO SUD','2136','C 168','2023-04-19 18:12:44','2023-05-02 00:54:58',NULL),(40,'VICTORIA ANALIA JAZMIN','Crespo 3239','153-598125','4-324289','vic_jaz@outlook.com.ar','36.000.166','Santa Fe','ROSARIO','2000','C 206','2023-04-19 18:15:25','2023-05-02 00:54:58',NULL),(41,'BRISA ANABELLA RIGALLI','Rincon 354 Depto. 03','3364001539','','rigalibrisa@gmail.com','27-44867165-3','Buenos Aires','RAMALLO','2914','','2023-04-21 14:59:34','2023-05-02 00:54:58',NULL),(42,'RAUL TOMAS BOTTAZZI','Roca 2017','3364210639','','tomibottazzi@gmail.com','20-44867243-4','Buenos Aires','SAN NICOLAS DE LOS ARROYOS','2900','','2023-04-21 15:02:18','2023-05-02 00:54:58',NULL),(43,'MARTIN RODRIGUEZ','davalos 2556 2ºh','3415022187','','martinro_981@hotmail.com','28.578.790','Santa Fe','ROSARIO','2000','C 143','2023-04-21 15:50:38','2023-05-02 00:54:58',NULL),(44,'DANIEL HERNAN IBARRA','3 DE FEB 2289 01-04','3483417594','','dhibarra@gmail.com','23.577.243','Santa Fe','ROSARIO','2000','C 171','2023-04-21 16:42:46','2023-05-02 00:54:58',NULL),(45,'ROMINA ALTAMIRANO','Ayacucho 1360 02-03','3412- 028656','','rominaaltamirano85@gmail.com','27-31339300-9','Santa Fe','ROSARIO','2000','C 177','2023-04-21 16:55:05','2023-05-02 00:54:58',NULL),(46,'MARGARITA CASTAGNAVIS','J. Manuel de Rosas 2094 01-04 ','3416 42-7777','','margaritabeatrizcatagnavis@gamil.com','27-11874740-8','Santa Fe','ROSARIO','2000','C 165','2023-04-21 17:50:32','2023-05-02 00:54:58',NULL);
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
INSERT INTO `configs` VALUES (1,'punitorio_diario','0.4','2023-04-16 06:35:39','2023-05-02 00:54:58'),(2,'gastos_bancarios','500','2023-04-16 06:36:08','2023-05-02 00:54:58');
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
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,31,23,'2021-11-01','2024-10-31','En curso',12500,0,0,'Monoambiente - contrato del 01/11/2021 al 31/10/2024 // C 192','2023-04-21 14:17:13','2023-05-02 00:54:58',NULL),(2,22,38,'2022-06-01','2025-05-31','En curso',36200,0,0,'CARPETA 203   Nuevo contrato del 01/06/22 al 31/05/25','2023-04-21 14:24:41','2023-05-02 00:54:58',NULL),(3,16,30,'2022-04-01','2025-03-31','En curso',24278,0,0,'C 106','2023-04-21 14:28:16','2023-05-02 00:54:58',NULL),(4,54,29,'2020-10-01','2023-09-30','En curso',11515,0,0,'CARPETA 109 -  CONTRATO DEL 01/10/2020 AL 30/09/2023','2023-04-21 14:36:49','2023-05-02 00:54:58',NULL),(5,47,26,'2021-05-01','2024-04-30','En curso',15092,0,0,'CARPETA 110  // CONTRATO 01/05/2021 AL  30/04/2024','2023-04-21 14:38:36','2023-05-02 00:54:58',NULL),(6,6,35,'2020-12-01','2023-11-30','En curso',22404,0,0,'C 114  //   CONTRATO DEL  01/12/2020 AL 30/11/2023','2023-04-21 14:40:47','2023-05-02 00:54:58',NULL),(7,17,9,'2021-11-01','2022-10-31','En curso',16800,0,0,'CARPETA 116 ver fechas de contrato','2023-04-21 14:42:30','2023-05-02 00:54:58',NULL),(8,7,19,'2022-08-01','2025-07-31','En curso',25800,0,0,'CARPETA 117 - Contrato del 1/8/22 al 31/07/2025 OJO QUE A LA PROPIETARIA SE LE ESTUVO PAGANDO SOBRE $ 35000','2023-04-21 14:52:24','2023-05-02 00:54:58',NULL),(9,9,4,'2022-02-01','2026-01-31','En curso',21800,0,0,'C 118   // Contrato del 01/02/2022 al 31/01/2026','2023-04-21 14:53:42','2023-05-02 00:54:58',NULL),(10,8,15,'2021-09-01','2024-08-31','En curso',27830,0,0,'CARPETA 123  // CONTRATO DEL 01/09/21 AL 31/08/2024','2023-04-21 14:55:10','2023-05-02 00:54:58',NULL),(11,40,41,'2023-05-01','2026-06-30','En curso',38800,19400,0,'CARPETA 132 // Contrato Nº 11783303 Persona 1367499  GAS nº persona 1367499 Cliente: 11783303','2023-04-21 15:13:12','2023-05-02 00:54:58',NULL),(12,12,31,'2021-08-01','2023-07-31','En curso',30193,0,0,'CARPETA 131  // contrato del 01/08/2021 al 31/07/2023','2023-04-21 15:16:58','2023-05-02 00:54:58',NULL),(13,39,42,'2023-05-01','2026-06-30','En curso',42000,21000,0,'CARPETA 136','2023-04-21 15:27:23','2023-05-02 00:54:58',NULL),(15,21,43,'2022-03-01','2025-02-28','En curso',49200,0,0,'CARPETA 143  // contrato de 1/3/22 al 28/02/25 // Gas Contrato Nº 13160803 Persona 1197846','2023-04-21 15:34:40','2023-05-02 00:54:58',NULL),(16,1,7,'2021-01-01','2023-12-30','En curso',13440,0,0,'CARPETA 150  // CONTRATO DEL  01/01/2021 AL 30/12/2023','2023-04-21 15:52:08','2023-05-02 00:54:58',NULL),(17,14,1,'2021-11-01','2024-01-31','En curso',19800,0,0,'C - 104  //   2º AÑO  1/11/22','2023-04-21 15:54:20','2023-05-02 00:54:58',NULL),(18,13,28,'2020-09-01','2023-08-30','En curso',35841,0,0,'CARPETA 153 // CONTRATO DEL 01/09/2020 AL 30/08/2023','2023-04-21 15:55:49','2023-05-02 00:54:58',NULL),(19,45,3,'2021-09-01','2024-08-31','En curso',2525,0,0,'CARPETA 185 // Contrato del 01/09/2021 al 31/08/2024','2023-04-21 16:29:01','2023-05-02 00:54:58',NULL),(20,25,5,'2021-02-01','2024-01-31','En curso',22644,0,0,'CARPETA 191  // Contrato del 01/02/2021 al 31/01/24','2023-04-21 16:30:50','2023-05-02 00:54:58',NULL),(21,18,10,'2021-01-01','2023-12-31','En curso',12500,0,0,'CARPETA 176 //  hija Borga Carina 0343-154544959','2023-04-21 16:33:27','2023-05-02 00:54:58',NULL),(22,46,14,'2022-01-01','2024-12-31','En curso',36036,0,0,'CARPETA C 112  // Contrato del 01/01/2022 al 31/12/2024  // BANCO NACION - CBU 0110183230018309 SUC. 1320 CAJA DE AHORRO 1830910435  ','2023-04-21 16:36:32','2023-05-02 00:54:58',NULL),(23,10,32,'2021-01-01','2023-12-31','En curso',65100,0,0,'Carpeta 108 // CONTRATO DEL 01/01/2021 AL 31/12/23','2023-04-21 16:38:19','2023-05-02 00:54:58',NULL),(24,24,44,'2022-03-01','2025-02-28','En curso',44623,0,0,'C 171','2023-04-21 16:47:43','2023-05-02 00:54:58',NULL),(25,55,33,'2020-12-01','2023-12-31','En curso',22350,0,0,'CARPETA 151 // CONTRATO DEL  01/12/2020 AL 31/12/2023','2023-04-21 16:50:54','2023-05-02 00:54:58',NULL),(26,36,45,'2022-10-01','2025-09-30','En curso',36800,0,0,'C 177','2023-04-21 16:56:29','2023-05-02 00:54:58',NULL),(27,37,21,'2022-05-01','2025-04-30','En curso',44010,0,0,'CARPETA 196 // VTO. CONTRATO EL 30/04/2025','2023-04-21 16:58:07','2023-05-02 00:54:58',NULL),(28,50,12,'2021-01-01','2023-12-31','En curso',59600,0,0,'CARPÈTA 197 // CONTRATO DEL 01/01/2021 AL 31/12/2023','2023-04-21 17:00:14','2023-05-02 00:54:58',NULL),(29,52,6,'2021-11-01','2024-10-31','En curso',22000,0,0,'CARPETA 199 // Contrato del 1/11/21 AL 31/10/2024','2023-04-21 17:04:30','2023-05-02 00:54:58',NULL),(30,51,36,'2022-02-01','2025-01-31','En curso',52050,0,0,'CARPETA 200 Adm. Sordoni- empleado Cristian 156-689428 - 4476411 // contrato del 01/02/22 al 31/01/25','2023-04-21 17:06:40','2023-05-02 00:54:58',NULL),(31,19,8,'2022-04-01','2025-03-31','En curso',32038,0,0,'C 202','2023-04-21 17:08:37','2023-05-02 00:54:58',NULL),(32,5,40,'2021-04-01','2024-03-31','En curso',22700,0,0,'CARPETA 206  -  EXPENSAS 18%  - Contrato del 01/4/2021 al 31/03/2024','2023-04-21 17:11:36','2023-05-02 00:54:58',NULL),(35,3,13,'2020-10-15','2023-09-30','En curso',23586,0,0,'CARPETA 209 //CONTRATO DEL 15/10/2020 AL 30/09/2023  // EXP. 10% gas Cliente Nº 103774201 Persona 226277','2023-04-21 17:28:00','2023-05-02 00:54:58',NULL),(39,11,17,'2021-02-01','2024-01-31','En curso',18500,0,0,'CARPETA 186 // CONTRATO DEL 01/02/2021 AL 31/01/2024','2023-04-21 17:34:01','2023-05-02 00:54:58',NULL),(40,23,20,'2021-09-01','2024-08-31','En curso',30960,0,0,'CARPETA 183 // Contrato del 01/09/21 al 31/08/24','2023-04-21 17:35:55','2023-05-02 00:54:58',NULL),(41,32,37,'2023-02-01','2026-01-31','En curso',56000,0,0,'C 152','2023-04-21 17:37:57','2023-05-02 00:54:58',NULL),(42,20,27,'2022-02-01','2025-01-31','En curso',50000,0,0,'C 127 // Contrato con vigencia del 01/02/2022 al 31/01/25  // Gas Contrato Nº 6534402 Persona 54110  ','2023-04-21 17:40:12','2023-05-02 00:54:58',NULL),(43,34,24,'2022-01-01','2024-12-31','En curso',13800,0,0,'C 175 // Contrato  del 01/01/2022 al 31/12/2024','2023-04-21 17:41:54','2023-05-02 00:54:58',NULL),(44,15,18,'2020-10-01','2023-09-30','En curso',13290,0,0,'c 182  // CONTRATO DEL 01/10/2020 AL 30/09/2023 ','2023-04-21 17:43:22','2023-05-02 00:54:58',NULL),(45,42,2,'2022-07-01','2025-06-30','En curso',70000,0,0,'Contrato del 01/7/22 al 30/6/25','2023-04-21 17:44:40','2023-05-02 00:54:58',NULL),(46,44,46,'2023-03-01','2026-02-28','En curso',66800,0,0,'C 165','2023-04-21 17:53:09','2023-05-02 00:54:58',NULL),(47,38,11,'2021-05-01','2024-04-30','En curso',17710,0,0,'C 161  // CONTRATO del  01/05/202l AL  30/04/2024','2023-04-21 17:54:48','2023-05-02 00:54:58',NULL),(48,41,34,'2022-06-04','2025-05-31','En curso',26800,0,0,'C - 195 // contrato del 1/06/2022 al 31/05/2025','2023-04-21 17:56:03','2023-05-02 00:54:58',NULL),(49,2,25,'2021-09-01','2024-08-31','En curso',24700,0,0,'C 184 // Contrato del 01/09/2021 al 31/08/2024','2023-04-21 17:58:58','2023-05-02 00:54:58',NULL),(50,53,39,'2022-01-01','2024-12-31','En curso',26300,0,0,'C 168 // Contrato del 01/01/22 al 31/12/2024','2023-04-21 18:00:43','2023-05-02 00:54:58',NULL),(54,4,22,'2023-02-27','2023-04-28','En curso',0,0,0,'','2023-04-26 01:40:40','2023-05-02 00:54:58',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `debtowners_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventualities`
--

LOCK TABLES `eventualities` WRITE;
/*!40000 ALTER TABLE `eventualities` DISABLE KEYS */;
INSERT INTO `eventualities` VALUES (1,53,NULL,8298.8,0,0,0,1,'Diferencia a favor sobre el cobro Abril/2023','2023-05-24','2023-04-24 14:41:29','2023-05-02 00:55:01'),(2,11,NULL,0,-10807,0,0,0,'Fac 20079 Accesaniga compra cerámicos piso baño','2023-04-24','2023-04-24 17:46:43','2023-05-02 00:55:01'),(3,11,NULL,0,-9312,0,0,0,'Fac. 9135 Sanitarios Pasco, compra conexiones baño','2023-04-24','2023-04-24 17:47:55','2023-05-02 00:55:01'),(4,4,NULL,424,0,0,0,1,'Diferencia a favor sobre el cobro Abril/2023','2023-05-26','2023-04-26 12:33:25','2023-05-02 00:55:01'),(5,39,NULL,0,-15000,0,0,0,'Pintura alacenas y bajo mesada materiales y m.o. y limpieza gral.','2023-04-26','2023-04-26 14:11:28','2023-05-02 00:55:01'),(6,7,NULL,0,-4273,0,0,0,'Cambio piloto calefón Fac. 9226','2023-04-26','2023-04-26 16:43:22','2023-05-02 00:55:01'),(7,7,NULL,0,-3610,0,0,0,'Reparar canillas x perdida Fac. 13300','2023-04-26','2023-04-26 16:44:19','2023-05-02 00:55:01'),(8,17,NULL,0,-12040,0,0,0,'Fac. 248 trabajos electricidad','2023-04-27','2023-04-27 15:33:23','2023-05-02 00:55:01'),(9,17,NULL,0,-14800,0,0,0,'Fac. 062 trabajos plomería x filtración en baño a depto. de abajo','2023-04-27','2023-04-27 15:34:31','2023-05-02 00:55:01');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  PRIMARY KEY (`id`),
  KEY `ContractId` (`ContractId`),
  CONSTRAINT `ownerexpenses_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerexpenses`
--

LOCK TABLES `ownerexpenses` WRITE;
/*!40000 ALTER TABLE `ownerexpenses` DISABLE KEYS */;
INSERT INTO `ownerexpenses` VALUES (1,'Aguas',1021,'2023-04-24',17,'2023-04-24 16:08:03','2023-05-02 00:55:00'),(2,'Tgi',1312,'2023-04-24',17,'2023-04-24 16:09:24','2023-05-02 00:55:00'),(3,'Tgi',1914,'2023-04-24',27,'2023-04-24 16:12:02','2023-05-02 00:55:01'),(4,'Aguas',1853,'2023-04-24',27,'2023-04-24 16:12:19','2023-05-02 00:55:01'),(5,'Api',305,'2023-04-24',27,'2023-04-24 16:12:34','2023-05-02 00:55:01'),(6,'Tgi',2054,'2023-04-24',26,'2023-04-24 16:13:10','2023-05-02 00:55:01'),(7,'Aguas',2190,'2023-04-24',26,'2023-04-24 16:13:32','2023-05-02 00:55:01'),(8,'Api',453,'2023-04-24',26,'2023-04-24 16:13:46','2023-05-02 00:55:01');
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
  `PaymentOwnerId` bigint NOT NULL,
  `ContractId` bigint NOT NULL,
  `OwnerId` bigint NOT NULL,
  `month` varchar(15) NOT NULL,
  `year` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerrentpaids`
--

LOCK TABLES `ownerrentpaids` WRITE;
/*!40000 ALTER TABLE `ownerrentpaids` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'ABEL DOMINGO MARI','Pje. Juan Thorne 5447','155068197','4620608','abelmari@live.com.ar',10,'12.110.099','Santa Fe','','2000','C 150','2023-04-18 16:41:06','2023-05-02 00:54:58',NULL),(2,'ADRIANA CIRAOLO','Montevideo 3478','Alberto 3415662232','00','ahc2729@gmail.com',10,'13.077.780','Santa Fe','ROSARIO','2000','C 184  mAIL: adricira18@hotmail.com','2023-04-18 16:46:00','2023-05-02 00:54:58',NULL),(3,'ALDO / BARBARA FERNÁNDEZ','San Martín 812','155-812512','03466-420207','barbarafernandez@hotmail.com',10,'L.E. 6.022.807','Santa Fe','BARRANCAS','2246','GABOTO 1821 04-02 C- 117 //  CERRITO 553 02-03  C-123 // GABOTO 1875 06-04 C- 118','2023-04-18 16:52:52','2023-05-02 00:54:58',NULL),(4,'ALEJANDRO TORASSA','Bv. Segui 1164','154-003183','00','torassa@gmail.com',10,'7.624.684','Santa Fe','ROSARIO','2000','C 108','2023-04-18 16:56:12','2023-05-02 00:54:58',NULL),(5,'ALFREDO FÉLIX PAPIS','Cda. Ricardone 1242 piso 10 B','156-010871','4406894','papisalfredo@hotmail.com',10,'24-06052100-6','Santa Fe','ROSARIO','2000','C 186','2023-04-18 16:58:36','2023-05-02 00:54:58',NULL),(6,'ANTONIO RAUL CIPRIANI','Tucumán 893','3402484090/109','03402-461362 CASA','farmacip@yahoo.com.ar',10,'8.523.713','Santa Fe','ALVAREZ','2107','C 131','2023-04-18 17:08:44','2023-05-02 00:54:58',NULL),(8,'CLIBE ELOISA GARCIA','Saavedra 1966','HIJA 3415947158','4-818738','lilianavargastaller@gmail.com',10,'F.2.793.571','Santa Fe','ROSARIO','2000','C 104','2023-04-18 17:17:24','2023-05-02 00:54:58',NULL),(9,'ATILIO GUILLERMO GRAZZIUTTI','SARMIENTO 1274 07-01','3489 51-9750','','aggrazziutti@gmail.com',10,'11.874.157 ','Santa Fe','ROSARIO','2000','C 182','2023-04-18 17:28:50','2023-05-02 00:54:58',NULL),(10,'RUBEN ALEGRA','Larrea 1949','3415210276 ','','alegraivann@gmail.com',10,'14.426.280','Santa Fe','ROSARIO','2000','C 106','2023-04-18 17:31:54','2023-05-02 00:54:58',NULL),(12,'ELIDA IANNOTI','Alsina 1050','3416457387','4386267','lalalalala@hotmail.com',10,'3.756.753','Santa Fe','ROSARIO','2000','C 116','2023-04-18 17:39:25','2023-05-02 00:54:58',NULL),(13,'ESTHER BRUNETTI DE BORGA','Pje. Chilavert 5616','153218041','4639167','carinabbor@gmail.com',10,'16.812.916','Santa Fe','ROSARIO','2000','C 176','2023-04-18 17:45:32','2023-05-02 00:54:58',NULL),(14,'FERNANDO FABIO CESCO','el inmigrante 1142','3464-15507353','','cescofernando@hotmail.com',10,'20.478.573','Santa Fe','AREQUITO','2183','C 202','2023-04-18 17:48:24','2023-05-02 00:54:58',NULL),(15,'HAYDEE ELIDA BERTOLDO','CORRIENTES 1273','3416588041','00','nanci_1514@hotmail.com',1,'11447701','Santa Fe','ROSARIO','2000','C 143','2023-04-18 17:51:13','2023-05-02 00:54:58',NULL),(16,'HUGO PEDRO MOTTA','Av. Julian de Bustinza 1323','341 642-2856 Flor ','','inmobiliaria.centro.1980@gmail.com',10,'7.649.952','Santa Fe','PIAMONTE','2529','C 203','2023-04-18 17:57:31','2023-05-02 00:54:58',NULL),(17,'JOSÉ ALBERTO RAISSIGUIER','Suipacha 978','3416762224','4399577','ivana.a.corazza@gmail.com',10,'Suipacha 978','Santa Fe','ROSARIO','2000','C 183','2023-04-18 18:00:31','2023-05-02 00:54:58',NULL),(18,'LILIANA LARRICQ','Necochea 1334 10 A','156-173130','152618073','ivanacorazza018@gmail.com',8,' 3.896.263','Santa Fe','ROSARIO','2000','C 171','2023-04-18 18:03:21','2023-05-02 00:54:58',NULL),(19,'LILIANA VENANZI','Pedro del Castillo 1814 \"B\" ','0261-3366056','','hvenanzi@gmail.com',8,'22.095.369','Mendoza','GODOY CRUZ','5501','C 152','2023-04-18 18:05:55','2023-05-02 00:54:58',NULL),(20,'MARCELO EDGARDO HERNANDEZ','España 437 01-04','341-5941580','','mh042769@gmail.com',10,'20.745.397','Santa Fe','ROSARIO','2000','C 198','2023-04-18 18:11:05','2023-05-02 00:54:58',NULL),(21,'EDUARDO BATTISTON','Juez Zuviria 228 Bis','3416407902','','ivana.corazza@hotmail.com',10,'******','','ROSARIO','2000','C 153','2023-04-18 18:17:55','2023-05-02 00:54:58',NULL),(22,'M. DE LOS ANGELES PESCE','Tucuman 524 - Leones','3472-25437882','','mariapesce1984@gmail.com',10,'30.350.315','Córdoba','MARCOS JUAREZ','2580','C 175','2023-04-19 14:16:47','2023-05-02 00:54:58',NULL),(26,'MARCELA FERNÁNDEZ','Laprida 1170 5ºB','3415 026541','3416 138921 Alcira','fernandezmachi@hotmail.com',10,'22.777.818','Santa Fe','ROSARIO','2000','C 114','2023-04-19 14:26:05','2023-05-02 00:54:58',NULL),(28,'MARIA TERESA ANTEZZA','Av. Francia 3825','3416 715437','4317352','lalalal.ala@hotmail.com',10,'93.125.098','Santa Fe','ROSARIO','2000','Sarmiento 1247 01-02  C 177   //  Riobamba 40 Bis C 196','2023-04-19 14:30:29','2023-05-02 00:54:58',NULL),(29,'NESTOR GAUNA / MARIANELA GONZALEZ','Italia 3539 timbre 4','3415 71-8164','00','gauna0758@gmail.com',10,'20.176.116','Santa Fe','ROSARIO','2000','C 161','2023-04-19 14:36:02','2023-05-02 00:54:58',NULL),(30,'MARIELA ARANDA','PPPPPPPPPPPPP','2284224812','','aranda.mariela@gmail.com',10,'23.438.649','Santa Fe','ROSARIO','2000','C 151','2023-04-19 14:51:23','2023-05-02 00:54:58',NULL),(31,'MARTA NELIDA CARBONELLA','Pellegrini 1146 02-01','3416657650','4484555','555555555555@HOTMAIL.COM',10,'5.081.550','Santa Fe','ROSARIO','2000','C 136','2023-04-19 15:09:21','2023-05-02 00:54:58',NULL),(37,'OSVALDO VALLE BIGLIA','Santa Fe 242','3464-461412','3464-692695','lilivallebiglia@gmail.com',10,'6.121.041','Santa Fe','BIGAND','2177','C 132','2023-04-19 15:14:45','2023-05-02 00:54:58',NULL),(38,'PATRICIA PILAR ECEIZA','Rioja 1021 10-03','156226867','Josefa 3416680933','patriciaeceiza@gmail.con',10,'27-16418810-3','Santa Fe','ROSARIO','2000','C 103','2023-04-19 15:20:03','2023-05-02 00:54:58',NULL),(39,'ROBERTO ANGHINOLFI','San Martín 230','03404-15631001','03404-431287','33333333333@hotmail.com',10,'6.245.088','Santa Fe','GALVEZ','2252','C 188','2023-04-19 15:24:58','2023-05-02 00:54:58',NULL),(40,'ROSA CRISTINA LACASIN','Rioja 2739 02-03','156439530','4404920','888888888@hotmail.com',10,'5.819.502','Santa Fe','ROSARIO','2000','C 165','2023-04-19 15:27:30','2023-05-02 00:54:58',NULL),(41,'ROSA GIURICICH','SARMIENTO 1247 08-03','3416492071','','xxxxxxxxx@hotmail.com',10,'8.788.066','Santa Fe','ROSARIO','2000','c 185','2023-04-19 15:29:26','2023-05-02 00:54:58',NULL),(42,'RUBEN MARIO BENELLI','Maivinas Argentinas 827','Diego 341-3061480','4941718','arqbenelli@yahoo.com.ar',10,'6.172.548','Santa Fe','CARCARAÑA','2138','C 112','2023-04-19 15:38:46','2023-05-02 00:54:58',NULL),(43,'SARA I. C. ERNALZ DE ZACCARÍA','Tucumán 166','0343-4225039','','666666666@hotmail.com',10,'23-02354836-4','Entre Ríos','PARANA','3100','C 110','2023-04-19 15:46:23','2023-05-02 00:54:58',NULL),(44,'STELLA MARIS CHIAPPE','Bv. jose maria aldao 1650','3468-15640224','3468-416240','chiappe.sm@gmail.com',10,'27-05751260-7','Córdoba','CAMILO ALDAO','2585','C 197','2023-04-19 15:50:32','2023-05-02 00:54:58',NULL),(45,'JOSÉ ALBERTO RAISSIGUIER','Suipacha 978','156-762224','4399577','XXXXXX@GMAIL.COM',10,'6.541.535','Santa Fe','ROSARIO','2000','','2023-04-20 17:48:06','2023-05-02 00:54:58',NULL),(46,'BEATRIZ SCARMIATTI','9 de julio 1475 03-02','3415316739','','000000000@GMAIL.COM',10,'00000000','Santa Fe','ROSARIO','2000','','2023-04-20 17:49:45','2023-05-02 00:54:58',NULL),(47,'ANTONIETA FERNANDEZ','San Martin 815','3416 520469','','fernandez.antonieta@hotmail.com',10,'23-30.374.816-4','Santa Fe','BARRANCAS','2246','','2023-04-21 14:34:37','2023-05-02 00:54:58',NULL);
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
  CONSTRAINT `paymentclients_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentclients_ibfk_2` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `obs` varchar(500) DEFAULT NULL,
  `month` varchar(15) NOT NULL,
  `year` int NOT NULL,
  `total` float NOT NULL,
  `paidCurrentMonth` tinyint(1) NOT NULL DEFAULT '0',
  `expenseDetails` longtext,
  `eventualityDetails` longtext,
  `createdAt` date DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `paymentowners__owner_id_month_year_paid_current_month` (`OwnerId`,`month`,`year`,`paidCurrentMonth`),
  KEY `PaymentTypeId` (`PaymentTypeId`),
  CONSTRAINT `paymentowners_ibfk_1` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_2` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymenttypes`
--

LOCK TABLES `paymenttypes` WRITE;
/*!40000 ALTER TABLE `paymenttypes` DISABLE KEYS */;
INSERT INTO `paymenttypes` VALUES (1,'Efectivo','2023-04-16 18:39:09','2023-05-02 00:54:58',NULL),(2,'Tarjeta','2023-04-16 18:39:24','2023-05-02 00:54:58',NULL),(3,'Cheques','2023-04-16 18:39:30','2023-05-02 00:54:58',NULL),(4,'Transferencia Bancaria','2023-04-16 18:40:13','2023-05-02 00:54:58',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricehistorials`
--

LOCK TABLES `pricehistorials` WRITE;
/*!40000 ALTER TABLE `pricehistorials` DISABLE KEYS */;
INSERT INTO `pricehistorials` VALUES (1,1,12500,1,0,'2023-04-21 14:17:13','2023-05-02 00:55:00'),(2,2,36200,1,0,'2023-04-21 14:24:41','2023-05-02 00:55:00'),(3,3,24278,1,0,'2023-04-21 14:28:16','2023-05-02 00:55:00'),(4,4,11515,1,0,'2023-04-21 14:36:49','2023-05-02 00:55:00'),(5,5,15092,1,0,'2023-04-21 14:38:36','2023-05-02 00:55:00'),(6,6,22404,1,0,'2023-04-21 14:40:47','2023-05-02 00:55:00'),(7,7,16800,1,0,'2023-04-21 14:42:30','2023-05-02 00:55:00'),(8,8,25800,1,0,'2023-04-21 14:52:25','2023-05-02 00:55:00'),(9,9,21800,1,0,'2023-04-21 14:53:42','2023-05-02 00:55:00'),(10,10,27830,1,0,'2023-04-21 14:55:10','2023-05-02 00:55:00'),(11,11,38800,1,0,'2023-04-21 15:13:12','2023-05-02 00:55:00'),(12,12,30193,1,0,'2023-04-21 15:16:58','2023-05-02 00:55:00'),(13,15,49200,1,0,'2023-04-21 15:34:41','2023-05-02 00:55:00'),(14,16,13440,1,0,'2023-04-21 15:52:08','2023-05-02 00:55:00'),(15,17,19800,1,0,'2023-04-21 15:54:20','2023-05-02 00:55:00'),(16,18,35841,1,0,'2023-04-21 15:55:49','2023-05-02 00:55:00'),(17,19,2525,1,0,'2023-04-21 16:29:02','2023-05-02 00:55:00'),(18,20,22644,1,0,'2023-04-21 16:30:50','2023-05-02 00:55:00'),(19,21,12500,1,0,'2023-04-21 16:33:28','2023-05-02 00:55:00'),(20,22,36036,1,0,'2023-04-21 16:36:33','2023-05-02 00:55:00'),(21,23,65100,1,0,'2023-04-21 16:38:19','2023-05-02 00:55:00'),(22,24,44623,1,0,'2023-04-21 16:47:43','2023-05-02 00:55:00'),(23,25,22350,1,0,'2023-04-21 16:50:54','2023-05-02 00:55:00'),(24,26,36800,1,0,'2023-04-21 16:56:29','2023-05-02 00:55:00'),(25,27,44010,1,0,'2023-04-21 16:58:07','2023-05-02 00:55:00'),(26,28,59600,1,0,'2023-04-21 17:00:14','2023-05-02 00:55:00'),(27,29,22000,1,0,'2023-04-21 17:04:30','2023-05-02 00:55:00'),(28,30,52050,1,0,'2023-04-21 17:06:41','2023-05-02 00:55:00'),(29,31,32038,1,0,'2023-04-21 17:08:37','2023-05-02 00:55:00'),(30,32,22700,1,0,'2023-04-21 17:11:36','2023-05-02 00:55:00'),(33,35,23586,1,0,'2023-04-21 17:28:00','2023-05-02 00:55:00'),(34,39,18500,1,0,'2023-04-21 17:34:01','2023-05-02 00:55:00'),(35,40,30960,1,0,'2023-04-21 17:35:55','2023-05-02 00:55:00'),(36,41,56000,1,0,'2023-04-21 17:37:57','2023-05-02 00:55:00'),(37,42,50000,1,0,'2023-04-21 17:40:12','2023-05-02 00:55:00'),(38,43,13800,1,0,'2023-04-21 17:41:54','2023-05-02 00:55:00'),(39,44,13290,1,0,'2023-04-21 17:43:22','2023-05-02 00:55:00'),(40,45,70000,1,0,'2023-04-21 17:44:40','2023-05-02 00:55:00'),(41,46,66800,1,0,'2023-04-21 17:53:10','2023-05-02 00:55:00'),(42,47,17710,1,0,'2023-04-21 17:54:48','2023-05-02 00:55:00'),(43,48,26800,1,0,'2023-04-21 17:56:03','2023-05-02 00:55:00'),(44,49,24700,1,0,'2023-04-21 17:58:58','2023-05-02 00:55:00'),(45,50,26300,1,0,'2023-04-21 18:00:43','2023-05-02 00:55:00'),(46,13,0,1,0,'2023-04-21 18:00:43','2023-05-02 00:55:00'),(47,54,0,1,0,'2023-04-26 01:40:41','2023-05-02 00:55:00');
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
  CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,3,2,1,'Ituzaingo','744','00','06','Alquiler','109-016-7256-006-5','22033705 C. de gestion 10510204','16-03-02-224915/0010-4','','Ocupado','Adm. no tiene','150','2023-04-20 17:15:53','2023-05-02 00:54:58',NULL),(2,2,2,2,'Caferatta','2033','03','03','Alquiler','','','','','Ocupado','Administración Neiman // Tel.: 3415632420 // \nMail: maira_neiman@hotmail.com','184','2023-04-20 17:17:35','2023-05-02 00:54:58',NULL),(3,3,2,15,'Gaboto','3573','00','04','Alquiler','','1107197-04 c. DE GESTION 34185710','16-03-11-309378/0016-1','','Ocupado','','207','2023-04-20 17:19:13','2023-05-02 00:54:58',NULL),(4,3,2,15,'Gaboto','3573','00','03','Alquiler','','1107204-11 C. de gestion 34186402','16-03-11-309378/0015-2','','Ocupado','','208','2023-04-20 17:19:57','2023-05-02 00:54:58',NULL),(5,3,3,15,'Gaboto','3573','00','05','Alquiler','','1107203-02 C. de gestion 34186304','16-03-11-309378/0017-0','','Ocupado','','209','2023-04-20 17:20:36','2023-05-02 00:54:58',NULL),(6,5,3,26,'Buenos Aires','880','01','04','Alquiler','109-0023226-009-1','0111930-03','16-03-01-217000/0009-0','','Ocupado','Adm. Sergio Gasparroni Tel 4402573 Mail: adm.gasparroni@gmail.com','114','2023-04-20 17:21:19','2023-05-02 00:54:58',NULL),(7,3,3,3,'Gaboto','1821','04','02','Alquiler','109-0114791-038-2','31186311','16-03-237250/0388-1','','Ocupado','Adm. Grappiolo Tel: 4494529 / 155520337 / ','117','2023-04-20 17:24:32','2023-05-02 00:54:58',NULL),(8,3,2,3,'Cerrito','553','02','03','Alquiler','109-0147175-009-9','','16-03-02-226541/0011-8','','Ocupado','Adm. ESTUDIO FENIX / Tel: 3415 85-7622 / Mail: estudio-fenix@hotmail.com \n\n','123','2023-04-20 17:25:33','2023-05-02 00:54:58',NULL),(9,3,3,3,'Gaboto','1875','06','04','Alquiler','109-0108064-028-5','','16-03-03-237250/0228-6','','Ocupado','Adm. Ana Maria Eraso / Tel: 3415 66-6959','118','2023-04-20 17:27:09','2023-05-02 00:54:58',NULL),(10,5,7,4,'Maipu ','1431','02','01','Alquiler','','Cuenta 0012127002 Cod. gestion 0002083808','16-03-01-221119/0004-9','','Ocupado','No tiene adm.','108','2023-04-20 17:27:59','2023-05-02 00:54:58',NULL),(11,3,1,5,'Mitre','2458','02','03','Alquiler','','','','','Ocupado','','186','2023-04-20 17:29:12','2023-05-02 00:54:58',NULL),(12,5,3,6,'San Lorenzo','863','03','02','Alquiler','109-0014756-009-8','0176626-11 C. de Gestion 7372607','16-03-01-216127/0008-0','','Ocupado','Adm. ','131','2023-04-20 17:30:47','2023-05-02 00:54:58',NULL),(13,5,3,21,'san lorenzo','863','04','02','Alquiler','','0176628-07  C. de Gestion 7372803','','','Ocupado','','153','2023-04-20 17:31:52','2023-05-02 00:54:58',NULL),(14,3,3,8,'Gaboto','1821','01','02','Alquiler','','','','','Ocupado','','104','2023-04-20 17:34:41','2023-05-02 00:54:58',NULL),(15,5,2,9,'sarmiento','1247','07','02','Alquiler','','','','','Ocupado','','182','2023-04-20 17:35:34','2023-05-02 00:54:58',NULL),(16,5,3,10,'San Martin','1421','01','04','Alquiler','','','','','Ocupado','','106','2023-04-20 17:36:23','2023-05-02 00:54:58',NULL),(17,5,2,12,'Mendoza','989','05','03','Alquiler','109-0013842-019-5   0000359084','0140997-02','16-03-01-219393/0015-2','','Ocupado','Adm. Centro','116','2023-04-20 17:37:57','2023-05-02 00:54:58',NULL),(18,5,1,13,'Sarmiento','1247','02','05','Alquiler','','172461-04 C. de gestion 6990505','16-03-01-219389/0017-7','','Ocupado','Adm. Centro','176','2023-04-20 17:40:03','2023-05-02 00:54:58',NULL),(19,5,1,14,'Mitre','757','08','06','Alquiler','','109166-02 C. de gestion 896103','16-03-01-216479/0020-4','','Ocupado','Adm. Bone - Tel: 4110033 / 156984300 / 152036094 / Mail: contacto@bone.com.ar','202','2023-04-20 17:41:01','2023-05-02 00:54:58',NULL),(20,5,2,15,'Corrientes','1273','07','02','Alquiler','','','','','Ocupado','','127','2023-04-20 17:42:20','2023-05-02 00:54:58',NULL),(21,3,6,15,'Vera Mujica','2106','','','Alquiler','109-0107762-000-1','1003725-10 C. de Gestion 13329405','16-03-10-302763/002-8','','Ocupado','','143','2023-04-20 17:42:56','2023-05-02 00:54:58',NULL),(22,3,3,16,'1º de Mayo','2551','05','02','Alquiler','','','','','Ocupado','','203','2023-04-20 17:43:55','2023-05-02 00:54:58',NULL),(23,5,3,45,'Cda. Ricardone','1376','04','02','Alquiler','00367660','141943-09  Código gestión 4116505','16-03-01-217387/0007-0','','Ocupado','Adm. gordito boludo Nicolás García / Tel: 3416 89-8359 / Mail: nicolasrgarcia@hotmail.com','183','2023-04-20 17:50:37','2023-05-02 00:54:58',NULL),(24,5,2,18,'3 de Febrero ','2289','01','04','Alquiler','109-0032850-008- 7 unidad fac. 412598','TGI 91531001   //  12211008','16030928729600133  // 729734','','Ocupado','Adm. Centro','171','2023-04-20 17:51:49','2023-05-02 00:54:58',NULL),(25,5,2,18,'Necochea','1334','05','02','Alquiler','1090009026209','TGI  18602106 // 8206611','16030122055300202','','Ocupado','Adm. Centro','191','2023-04-20 17:53:05','2023-05-02 00:54:58',NULL),(26,5,2,18,'Zeballos','74','01','04','Alquiler','','14275211 //  4190110','','','Libre','Adm. Joaquín García 341 3075960  // Mail: joaquin.luc.garcia@hotmail.es ','155','2023-04-20 17:54:29','2023-05-02 00:54:58',NULL),(31,5,1,18,'Necochea','1334','01','03','Alquiler','00822041','18601011 / 8205603','160301-220553/0009-9 cod. 1819838','cliente 21790304 persona 1224213','Ocupado','C 192','192','2023-04-20 17:57:03','2023-05-02 00:54:58',NULL),(32,5,2,19,'Zeballos','867','08','03','Alquiler','nº 109-0013500-027-1 Uni. Fac. 0000356282','17952110  Código gestión 76420005','Partida 160301-221855/0028-2 Codigo 0924314','','Ocupado','Adm. Centro','152','2023-04-20 17:57:52','2023-05-02 00:54:58',NULL),(33,5,1,20,'España','437','01','04','Alquiler','109-0011125-017-1 unidad fac. 335946','Cuenta 13259910 Cod. personal 3198604','16-03-01-215066/0039-5','Cliente 0004390207 Persona 2238139','Libre','Adm. Veronica Valdez / Sarmiento 424 / Tel. 3412 669222 / 7923403 / Mail:  info.v.valdez@gmail.com','198','2023-04-20 17:58:29','2023-05-02 00:54:58',NULL),(34,5,1,22,'Sarmiento','1247','06','07','Alquiler','','','','','Ocupado','','175','2023-04-20 17:59:33','2023-05-02 00:54:58',NULL),(36,5,2,28,'Sarmiento ','1247','01','02','Alquiler','','','','','Ocupado','','177','2023-04-20 18:01:34','2023-05-02 00:54:58',NULL),(37,3,2,28,'Riobamba','40 bi','01','02','Alquiler','','','','','Ocupado','','196','2023-04-20 18:02:13','2023-05-02 00:54:58',NULL),(38,5,2,29,'La Paz','1138','00','03','Alquiler','','','','','Ocupado','','161','2023-04-20 18:03:47','2023-05-02 00:54:58',NULL),(39,5,1,31,'Pellegrini','1068','01','03','Alquiler','109-0014428-005-4 punto suministro: 00363346','Cuenta: 17260506 Cod.: 7004905','16-03-01-222550/0004-9 Cod.: 0285334','','Libre','Adm. Cuenca // Mail: flocuenca@hotmail.com // Paraguay 1227 PB B Teléfono 6799965\nCunata Banco: PAGO POR TRANSFERENCIA Y/O DEPOSITO BANCARIO:\nBANCO NACIÓN - CAJA DE AHORROS EN PESOS No 4442648095 SUCURSAL 3020\nCBU 0110444230044426480951 ALIAS HUEVO.DIOS.PEON TITULARES FLORENCIA CUENCA CUIT 27250077063/IGNACIO AGUILAR 20239788026','136','2023-04-20 18:04:42','2023-05-02 00:54:58',NULL),(40,5,1,37,'Sarmiento','1247','00','03','Alquiler','109-0008869-003-7 /  320995','17244611   /  6989003',' 16030121938900025','','Ocupado','Adm. Centro','132','2023-04-20 18:05:32','2023-05-02 00:54:58',NULL),(41,3,6,38,'Pj. Costarelli','5368','01','','Alquiler','','','','','Ocupado','','195','2023-04-20 18:06:33','2023-05-02 00:54:58',NULL),(42,3,8,38,'Regimiento 11 ','178','','','Alquiler','','','','','Ocupado','','195 bis','2023-04-20 18:07:15','2023-05-02 00:54:58',NULL),(43,5,2,39,'3 de Febrero 2289','2289','02','04','Alquiler','109-0032850-008-7 unidad de fac. 412598','915313-06   Código de gestión 12211302','16-03-09-287296/0007-2   781554',' Gas Contrato Nº 4572903 Persona 1268262','Libre','Adm. Centro','188','2023-04-20 18:08:46','2023-05-02 00:54:58',NULL),(44,5,5,40,'Corrientes','1591','00','06','Alquiler','109-0016591-006-8 unidad 381185 cuenta 0016591','Cuenta 12234209 Cod. personal 2189709','160301-221732/0001-1 partida 0246734','','Ocupado','','165','2023-04-20 18:09:42','2023-05-02 00:54:58',NULL),(45,5,2,41,'Sarmiento','1247','08','03','Alquiler','','','','','Ocupado','','185','2023-04-20 18:11:00','2023-05-02 00:54:58',NULL),(46,5,2,42,'Buenos Aires','1659','00','03','Alquiler','','0012397008 gestion personal 0002348206','16030122268700107','','Ocupado','Adm. Centro','112','2023-04-20 18:12:10','2023-05-02 00:54:58',NULL),(47,5,1,43,'Sarmiento','1247','07','04','Alquiler','109-0008869-057-3   0000321049','','16-03-01-219389/0056-6','','Ocupado','Administracion Centro','110','2023-04-20 18:13:47','2023-05-02 00:54:58',NULL),(50,5,3,44,'Urquiza ','1949','13','04','Alquiler','','','','','Ocupado','Adm. German Sordoni Tel: 4476411 // 3416 68-9428 // Mail: c-a-abdala@hotmail.com','197','2023-04-20 18:15:49','2023-05-02 00:54:58',NULL),(51,5,2,44,'Urquiza','1949','07','06','Alquiler','punto de suministro 00335557','161923-03 C. de gestion 5962310','16-03-01-215356/0271-9','cliente 0009410701 persona 94107','Ocupado','Adm. German Sordoni Tel: 4476411 // 3416 68-9428 // Mail: c-a-abdala@hotmail.com','200','2023-04-20 18:18:01','2023-05-02 00:54:58',NULL),(52,5,3,44,'Sarmiento','1247','06','08','Alquiler','','172395-02 C. de gestion 6983903','16-03-01-219389/0052-0','','Ocupado','','199','2023-04-20 18:18:38','2023-05-02 00:54:58',NULL),(53,5,1,46,'Sarmiento','1247','03','07','Alquiler','','','','','Ocupado','','168','2023-04-20 18:19:49','2023-05-02 00:54:58',NULL),(54,5,1,47,'3 de Febrero ','1366','01','04','Alquiler','','','','','Ocupado','','109','2023-04-21 14:35:36','2023-05-02 00:54:58',NULL),(55,5,2,18,'COLON','1256','04','05','Alquiler','','17240405','16-03-01-219389/0061-8','','Ocupado','“Administración O.D.A.I.” // Rioja 2935 PB // Te.: (0341) 4-391016/4-215840 // Mail: cdoino@hotmail.com','151','2023-04-21 16:49:30','2023-05-02 00:54:58',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertytypes`
--

LOCK TABLES `propertytypes` WRITE;
/*!40000 ALTER TABLE `propertytypes` DISABLE KEYS */;
INSERT INTO `propertytypes` VALUES (1,'Monoambiente','2023-04-20 17:13:10','2023-05-02 00:54:58'),(2,'Depto. 1 dormitorio','2023-04-20 17:13:26','2023-05-02 00:54:58'),(3,'Depto. 2 dormitorios','2023-04-20 17:13:34','2023-05-02 00:54:58'),(4,'Cochera','2023-04-20 17:13:40','2023-05-02 00:54:58'),(5,'Local','2023-04-20 17:13:46','2023-05-02 00:54:58'),(6,'Casa 2 dormitorios','2023-04-20 17:14:01','2023-05-02 00:54:58'),(7,'Depto. 3 dormitorios','2023-04-20 17:14:31','2023-05-02 00:54:58'),(8,'Casa 3 dormitorios','2023-04-20 17:14:43','2023-05-02 00:54:58');
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
  `participants` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
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
INSERT INTO `visits` VALUES (1,26,'2023-04-28 12:30:00','Diego','3416 54-9886','otro 3464 58-1379','\"\"','2023-04-26 16:55:03','2023-05-02 00:54:58'),(2,33,'2023-05-02 12:30:00','miguel angel','3412595915','','\"\"','2023-04-26 18:17:24','2023-05-02 00:54:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones`
--

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;
INSERT INTO `zones` VALUES (2,'Norte','2023-04-16 18:37:52','2023-05-02 00:54:58'),(3,'Sur','2023-04-16 18:38:02','2023-05-02 00:54:58'),(4,'Oeste','2023-04-16 18:38:14','2023-05-02 00:54:58'),(5,'Centro','2023-04-16 18:38:19','2023-05-02 00:54:58'),(6,'Este','2023-04-16 18:38:25','2023-05-02 00:54:58'),(8,'nuevo','2023-04-16 22:06:34','2023-05-02 00:54:58');
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

-- Dump completed on 2023-05-01 22:05:20
