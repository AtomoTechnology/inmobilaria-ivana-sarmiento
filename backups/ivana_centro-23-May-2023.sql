-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: ivana_centro
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
INSERT INTO `auths` VALUES (1,'9b2df0fe-26a0-4acf-9b42-ed3d1fdbf6a8','prod_dev@gmail.com','DEV','https://res.cloudinary.com/draxircbk/image/upload/v1649478136/jhmesseroux/hilaire_qzluvj.jpg','$2a$12$6gxWOa6Fub..j0MyhCID8ekPnoHfNODO/TI0XHzI7TTxW6hO/eSTW',NULL,NULL,NULL,'2023-04-14 21:24:56','2023-05-02 00:54:58'),(2,'48b21f23-0446-4a44-ab10-685b2ea86e12','Inmobiliaria.centro.1980@gmail.com','Ivana Anabel','https://res.cloudinary.com/draxircbk/image/upload/v1682991310/ivana_inmobilaria/ivana-prod_mttvjh.jpg','$2a$12$xKT4wWNDRO7wHscguPLo5OFBQpEdtYOsNZbDr6EOPxNGRuHGZLEOS',NULL,NULL,NULL,'2023-04-16 18:33:33','2023-05-02 00:54:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
INSERT INTO `claims` VALUES (1,9,'Abierto','[]','Filtracion seca en techo de baño y cocina. Se reclama a administracion del edificio para que reparen y pinten','2023-04-26 16:06:14','2023-05-02 00:54:58','2023-05-08 14:03:25'),(2,22,'Abierto','[]','REAPARACION BAÑO por cambio desagüe - Verificar montos de alquileres pagados a propietario y descuentos de expensas extraordinarias - ','2023-04-26 16:08:23','2023-05-02 00:54:58',NULL),(3,23,'Abierto','[{\"comment\":\"Se reparo Filtracion arriba. Se reclama a administracion del edificio para que repare y pinte techo de baño. En Junio/Julio se realizaria para que seque bien\",\"date\":\"2023-05-08T14:04:25.639Z\"}]','Filtración en baño y lavadero x caños desagüe bajo bañera del departamento de arriba. Corresponde al Consorcio la reparación','2023-05-08 14:03:02','2023-05-08 14:05:06',NULL),(4,46,'Abierto','[]','Se rompió un posible flexible de la Bacha de cocina y está perdiendo mucha agua. Se llamo a Barreto - 15/05/2023','2023-05-16 15:13:54','2023-05-16 15:13:54',NULL),(5,51,'Abierto','[{\"comment\":\"Se le realizo reclamos a la administracion \",\"date\":\"2023-05-16T15:22:48.761Z\"}]','En febrero la chica del piso de arriba (08-06 Valeria 3402 54-6472) hizo unos arreglos en su baño por el cual tuvieron que romper el techo de mi baño. Hoy sigue goteando de ese agujero. Es un arreglo de consorcio ','2023-05-16 15:19:49','2023-05-16 15:22:49',NULL),(6,44,'Abierto','[]','Filtración en ante baño que viene del Local de la esquina, que tiene  un baño que pierde permanentemente el deposito. Se notifico al empleado de coyote para que solucionen el problema','2023-05-17 17:55:04','2023-05-17 17:55:04',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientexpenses`
--

LOCK TABLES `clientexpenses` WRITE;
/*!40000 ALTER TABLE `clientexpenses` DISABLE KEYS */;
INSERT INTO `clientexpenses` VALUES (1,'Seguro',3224,'2023-04-24',2,'2023-04-24 14:52:06','2023-05-02 00:55:00'),(2,'Seguro',3224,'2023-04-24',50,'2023-04-24 14:52:18','2023-05-02 00:55:00'),(5,'Seguro',3224,'2023-04-24',49,'2023-04-24 14:53:04','2023-05-02 00:55:00'),(6,'Seguro',3224,'2023-04-24',48,'2023-04-24 14:53:13','2023-05-02 00:55:00'),(7,'Seguro',3224,'2023-04-24',47,'2023-04-24 14:53:26','2023-05-02 00:55:00'),(8,'Seguro',6300,'2023-04-24',46,'2023-04-24 14:59:43','2023-05-02 00:55:00'),(9,'Seguro',3241,'2023-04-24',45,'2023-04-24 15:00:27','2023-05-02 00:55:00'),(10,'Seguro',2824,'2023-04-24',44,'2023-04-24 15:00:47','2023-05-02 00:55:00'),(11,'Seguro',3224,'2023-04-24',43,'2023-04-24 15:00:59','2023-05-02 00:55:00'),(12,'Seguro',3224,'2023-04-24',42,'2023-04-24 15:01:11','2023-05-02 00:55:00'),(13,'Seguro',1532,'2023-04-24',41,'2023-04-24 15:01:21','2023-05-08 18:03:26'),(14,'Seguro',3224,'2023-04-24',40,'2023-04-24 15:01:31','2023-05-02 00:55:00'),(15,'Seguro',3224,'2023-04-24',39,'2023-04-24 15:01:47','2023-05-02 00:55:00'),(16,'Seguro',3224,'2023-04-24',35,'2023-04-24 15:01:57','2023-05-02 00:55:00'),(17,'Seguro',3224,'2023-04-24',32,'2023-04-24 15:02:08','2023-05-02 00:55:00'),(18,'Seguro',3224,'2023-04-24',31,'2023-04-24 15:02:19','2023-05-02 00:55:00'),(19,'Seguro',3224,'2023-04-24',30,'2023-04-24 15:02:31','2023-05-02 00:55:00'),(20,'Seguro',3224,'2023-04-24',29,'2023-04-24 15:02:44','2023-05-02 00:55:00'),(21,'Seguro',3224,'2023-04-24',28,'2023-04-24 15:02:53','2023-05-02 00:55:00'),(23,'Seguro',3224,'2023-04-24',27,'2023-04-24 15:03:25','2023-05-02 00:55:00'),(24,'Seguro',3224,'2023-04-24',26,'2023-04-24 15:03:37','2023-05-02 00:55:00'),(25,'Seguro',3224,'2023-04-24',25,'2023-04-24 15:03:49','2023-05-02 00:55:00'),(26,'Seguro',3224,'2023-04-24',24,'2023-04-24 15:04:02','2023-05-02 00:55:00'),(27,'Seguro',3224,'2023-04-24',23,'2023-04-24 15:04:11','2023-05-02 00:55:00'),(28,'Seguro',3224,'2023-04-24',22,'2023-04-24 15:04:24','2023-05-02 00:55:00'),(29,'Seguro',3224,'2023-04-24',21,'2023-04-24 15:04:34','2023-05-02 00:55:00'),(30,'Seguro',3224,'2023-04-24',20,'2023-04-24 15:04:50','2023-05-02 00:55:00'),(31,'Seguro',3224,'2023-04-24',19,'2023-04-24 15:05:06','2023-05-02 00:55:00'),(32,'Seguro',3224,'2023-04-24',18,'2023-04-24 15:05:35','2023-05-02 00:55:00'),(33,'Seguro',3224,'2023-04-24',17,'2023-04-24 15:05:48','2023-05-02 00:55:00'),(34,'Seguro',3224,'2023-04-24',16,'2023-04-24 15:06:01','2023-05-02 00:55:00'),(35,'Seguro',3224,'2023-04-24',15,'2023-04-24 15:06:16','2023-05-02 00:55:00'),(36,'Seguro',3224,'2023-04-24',13,'2023-04-24 15:06:28','2023-05-02 00:55:00'),(37,'Seguro',3224,'2023-04-24',12,'2023-04-24 15:06:48','2023-05-02 00:55:00'),(38,'Seguro',3224,'2023-04-24',11,'2023-04-24 15:07:12','2023-05-02 00:55:00'),(39,'Seguro',3224,'2023-04-24',10,'2023-04-24 15:07:24','2023-05-02 00:55:00'),(40,'Seguro',3224,'2023-04-24',9,'2023-04-24 15:07:34','2023-05-02 00:55:00'),(41,'Seguro',3224,'2023-04-24',9,'2023-04-24 15:07:52','2023-05-02 00:55:00'),(42,'Seguro',3224,'2023-04-24',8,'2023-04-24 15:08:25','2023-05-02 00:55:00'),(43,'Seguro',3224,'2023-04-24',7,'2023-04-24 15:08:47','2023-05-02 00:55:00'),(44,'Seguro',3224,'2023-04-24',6,'2023-04-24 15:09:01','2023-05-02 00:55:00'),(45,'Seguro',3224,'2023-04-24',5,'2023-04-24 15:09:14','2023-05-02 00:55:00'),(46,'Seguro',3224,'2023-04-24',4,'2023-04-24 15:09:25','2023-05-02 00:55:00'),(47,'Seguro',3224,'2023-04-24',3,'2023-04-24 15:09:36','2023-05-02 00:55:00'),(48,'Seguro',3224,'2023-04-24',2,'2023-04-24 15:09:48','2023-05-02 00:55:00'),(49,'Seguro',3224,'2023-04-24',1,'2023-04-24 15:09:57','2023-05-02 00:55:00'),(50,'Expensas',1200,'2023-04-24',35,'2023-04-24 15:12:49','2023-05-02 00:55:00'),(51,'Expensas',1500,'2023-04-24',32,'2023-04-24 15:14:25','2023-05-02 00:55:00'),(75,'Gastos Bancarios',500,'2023-04-24',24,'2023-04-24 15:31:24','2023-05-02 00:55:00'),(98,'Aguas',2564,'2023-04-24',27,'2023-04-24 16:03:45','2023-05-02 00:55:00'),(99,'Tgi',2874,'2023-04-24',27,'2023-04-24 16:04:04','2023-05-02 00:55:00'),(100,'Api',845,'2023-04-24',27,'2023-04-24 16:04:18','2023-05-02 00:55:00'),(101,'Tgi',2987,'2023-04-24',26,'2023-04-24 16:04:48','2023-05-02 00:55:00'),(102,'Aguas',3145,'2023-04-24',26,'2023-04-24 16:05:05','2023-05-02 00:55:00'),(103,'Api',748,'2023-04-24',26,'2023-04-24 16:05:23','2023-05-02 00:55:00'),(104,'Tgi',2054,'2023-04-24',17,'2023-04-24 16:10:58','2023-05-02 00:55:00'),(105,'Aguas',2190,'2023-04-24',17,'2023-04-24 16:11:13','2023-05-02 00:55:00'),(106,'Api',868,'2023-04-24',17,'2023-04-24 16:11:29','2023-05-02 00:55:00'),(107,'Expensas',1200,'2023-04-26',54,'2023-04-26 12:27:38','2023-05-02 00:55:00'),(108,'Seguro',3224,'2023-04-26',54,'2023-04-26 12:28:58','2023-05-02 00:55:00'),(109,'Compensación',5500,'2023-06-01',40,'2023-05-08 13:23:14','2023-05-08 13:23:14');
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'ALEJANDRA ZERBONIA','Riobamba 137','3412170930','00','andreazrb12@gmail.com','23.559.067','Santa Fe','ROSARIO','2000','C 104','2023-04-19 15:53:51','2023-05-02 00:54:58',NULL),(2,'ALEJANDRO OVIEDO','REGIMIENTO 11 178','3412825203','00','alenatsanovi@gmail.com','93.720.616','Santa Fe','ROSARIO','2000','C 196','2023-04-19 15:55:54','2023-05-02 00:54:58',NULL),(3,'ANDRY GOLDCHEID IRUMBE','San Lorenzo 750 01-02','3416198362','00','goldcheidvalentina@hotmail.com','96.114.014','Santa Fe','ROSARIO','2000','C 185','2023-04-19 15:57:50','2023-05-02 00:54:58',NULL),(4,'BARBARA SILVA','Fontezuela 2661 monoblok 36 piso 2 depto. 662','3412165263','00','barbarabsilva@hotmail.es','34.420.390','Santa Fe','ROSARIO','2000','C 118','2023-04-19 15:59:40','2023-05-02 00:54:58',NULL),(5,'BRISA R. CAMPOS','Necochea 1334 05-02','3416004559','00','brisa.rcf@gmail.com','PASAP. FX722199','Santa Fe','ROSARIO','2000','C 192','2023-04-19 16:03:14','2023-05-02 00:54:58',NULL),(6,'CARMEN CANDIA','cochabamba 4781','37.534.693','00','milacandia21@gmail.com','3416991215','Santa Fe','ROSARIO','2000','C 199','2023-04-19 16:04:43','2023-05-02 00:54:58',NULL),(7,'CARMEN ZULEMA ESCOBAR','Ituzaigo 744 00-06','153-238910','00','999999@gmail.com','17.094.138','Santa Fe','ROSARIO','2000','C 150','2023-04-19 16:07:31','2023-05-02 00:54:58',NULL),(8,'DAMIAN LUIS FUNES','Mitre 757 08-06','152-129318','00','datakefu20@gmail.com','25.615.672','Santa Fe','ROSARIO','2000','C 202','2023-04-19 16:10:03','2023-05-02 00:54:58',NULL),(9,'DANIELA VERA','Mendoza 989 05-03','3483433392','','dany_vera88@hotmail.com','33.856.699','Santa Fe','ROSARIO','2000','C 116','2023-04-19 16:12:07','2023-05-02 00:54:58',NULL),(10,'DIEGO DEMARCHI','Entre Rios 1147 00-04','3415838721','','dieguitodemarchi@gmail.com','23.344.542','Santa Fe','ROSARIO','2000','C 176','2023-04-19 17:19:37','2023-05-02 00:54:58',NULL),(11,'EVELYN BERGAGLIO','La paz 1138 00-03','3415475361','','cccccccc@hotmail.com','33364021','Santa Fe','ROSARIO','2000','C 161','2023-04-19 17:20:56','2023-05-02 00:54:58',NULL),(12,'FATIMA MARÍA BERTOLOTTI','Urquiza 1949 13-04','153-734426','4217846','sssss@hotmail.com','20.882.689','Santa Fe','ROSARIO','2000','C 197','2023-04-19 17:22:34','2023-05-02 00:54:58',NULL),(13,'FERNANDO MIGUELES','Gaboto 3573 00-04','3416160135','','fernob_87@hotmail.com','32.753.642','Santa Fe','ROSARIO','2000','C 209','2023-04-19 17:23:53','2023-05-02 00:54:58',NULL),(14,'FRANCISCO JOSE CASTELLI','Castelli 1429, Pergamino, Bs.As','2477 30-9574','','santicastelli1990@gmail.com',' 32.345.184','Buenos Aires','PERGAMINO','2700','C 122','2023-04-19 17:28:09','2023-05-02 00:54:58',NULL),(15,'GARY LUXAMA','San Luis 1914 02-01','3416282361','','111111111@gmail.com','95.887.111','Santa Fe','ROSARIO','2000','C 123','2023-04-19 17:29:12','2023-05-02 00:54:58',NULL),(17,'GERMAN TION','Mitre 2458 02-03','3416 61-1653','','vikingo.tion@gmail.com','22.129.952','Santa Fe','ROSARIO','2000','C 186','2023-04-19 17:32:43','2023-05-02 00:54:58',NULL),(18,'JEAN MESSEROUX','Sarmiento 1247 07-02','3417207882','','messerouxhilare@gmail.com','95.904.838','Santa Fe','ROSARIO','2000','C 182','2023-04-19 17:34:02','2023-05-02 00:54:58',NULL),(19,'jeremias bue','Gaboto 1821 04-02','3413318506','','Jeremiasbue12@hotmail.com','43.767.991','Santa Fe','ROSARIO','2000','C ','2023-04-19 17:35:26','2023-05-02 00:54:58',NULL),(20,'JOSE HUGO CARDACI','cta. Ricardone 1373 04-02','153-250852','','777777@gmail.com','6.054.600','Santa Fe','ROSARIO','2000','C 127','2023-04-19 17:37:12','2023-05-02 00:54:58',NULL),(21,'JOSÉ MARÍA CARLETTA','Riobamba 40 Bis 01-04','156-213042','','jmcarletta@gmail.com','25.689.029','Santa Fe','ROSARIO','2000','C 196','2023-04-19 17:38:22','2023-05-02 00:54:58',NULL),(22,'JOSE RAMON OCAMPO','gaboto 3573 00-03','3415060449','','66666666@gmail.com','7.877.930','Santa Fe','ROSARIO','2000','C 208','2023-04-19 17:39:46','2023-05-02 00:54:58',NULL),(23,'JUAN IGNACIO KERN','Cabildo 1439 Pueblo Esther','3416646338','','juani10caju@gmail.com','42.704.295','Santa Fe','PUEBLO ESTHER','2126','C 192','2023-04-19 17:41:44','2023-05-02 00:54:58',NULL),(24,'JULIO CESAR NUÑEZ','Parkinson 1856 ','37048023137','','jcnunez1963@gmail.com','16.168.338','Formosa','FORMOSA','3600','C 175','2023-04-19 17:43:19','2023-05-02 00:54:58',NULL),(25,'LEANDRO CICLER','Virasoro 6326','3413768826','','leancicler8@gmail.com','39.567.918','Santa Fe','ROSARIO','2000','C 184','2023-04-19 17:45:07','2023-05-02 00:54:58',NULL),(26,'LUCAS OMAR DIAZ','Nicaragua 1936','3415504611','','lucasnano112@gmail.com','35.586.298','Santa Fe','ROSARIO','2000','C 110','2023-04-19 17:46:35','2023-05-02 00:54:58',NULL),(27,'MAKARENA YUDICHE','TUCUMAN 2679 02-02','3413 00-7498','','makarenayudiche028@gmail.com','39.046.028','Santa Fe','ROSARIO','2000','C 127','2023-04-19 17:48:35','2023-05-02 00:54:58',NULL),(28,'JORGE // MARCOS CESAR CORREA','San Lorenzo 863 04-02','156723532','370-4585003','nattyvg_02@hotmail.com','28.094.295','Santa Fe','ROSARIO','2000','c 153','2023-04-19 17:50:32','2023-05-02 00:54:58',NULL),(29,'MARCOS MARTINEZ','Conte de Alio 7681','3412732853','','mmdebelluit@gmail.com','38.420.856','Santa Fe','ROSARIO','2000','C 109','2023-04-19 17:52:24','2023-05-02 00:54:58',NULL),(30,'MARIA ELISA BRUSSA','Matienzo 383 Bis','155-646801','','ebrussa@gmail.com','25.453.226','Santa Fe','ROSARIO','2000','C 106','2023-04-19 17:54:55','2023-05-02 00:54:58',NULL),(31,'MARÍA PAULA VOLPE','Isola 375 Bis piso 3 dto. C','153-114148','3415313974','mariapaulavolpe@gmail.com','30.838.261','Santa Fe','ROSARIO','2000','C 131 //  German --> guzman.german.r@gmail.com Tel: 3415313974','2023-04-19 17:57:17','2023-05-02 00:54:58',NULL),(32,'NATALIA ENZETTI','sarmiento 1414','156848118','','nataliaenzetti@hotmail.com','27.668.457','Santa Fe','ROSARIO','2000','C 108','2023-04-19 17:59:32','2023-05-02 00:54:58',NULL),(33,'PABLO PIGNATA','Colon 1256 04-05','155790523','','psps1977@outlook.com','26005443','Santa Fe','ROSARIO','2000','C 151','2023-04-19 18:01:14','2023-05-02 00:54:58',NULL),(34,'RODOLFO OJEDA','Pj Costarelli 5368','3415909366','','ojedarodolfo5@gmail.com','30.838.415','Santa Fe','ROSARIO','2000','C 195','2023-04-19 18:02:59','2023-05-02 00:54:58',NULL),(35,'ROLANDO SALTI','Buenos Aires 2521 01-04','155-991471','','rolosalti@gmail.com','21.044.579','Santa Fe','ROSARIO','2000','C 114','2023-04-19 18:04:44','2023-05-02 00:54:58',NULL),(36,'SOL ANA BASUALDO','J. Rucci 495, Galvez','3404 49-2729','','solbasualdo360@gmail.com','41.633.544','Santa Fe','GALVEZ','2252','C 200','2023-04-19 18:06:50','2023-05-02 00:54:58',NULL),(37,'TAMARA AYLEN GARCIA','lisandro de la torre 964','152-777707','','tamaraailengarcia95@hotmail.com','39.455.231','Santa Fe','PEREZ','2121','C 175','2023-04-19 18:09:18','2023-05-02 00:54:58',NULL),(38,'TAMARA CARRERA MAIDANA','Maipu 2351 03-05','3416910365','','cabreratamara03@gmail.com','38.140.697','Santa Fe','ROSARIO','2000','C 203','2023-04-19 18:10:52','2023-05-02 00:54:58',NULL),(39,'TAMARA CELESTE GODOY','Pj. Libertad 788, San Jeronimo','3401405105','','godoytamara327@gmail.com','41.975.433','Santa Fe','SAN JERONIMO SUD','2136','C 168','2023-04-19 18:12:44','2023-05-02 00:54:58',NULL),(40,'VICTORIA ANALIA JAZMIN','Crespo 3239','153-598125','4-324289','vic_jaz@outlook.com.ar','36.000.166','Santa Fe','ROSARIO','2000','C 206','2023-04-19 18:15:25','2023-05-02 00:54:58',NULL),(41,'BRISA ANABELLA RIGALLI','Rincon 354 Depto. 03','3364001539','','rigalibrisa@gmail.com','27-44867165-3','Buenos Aires','RAMALLO','2914','','2023-04-21 14:59:34','2023-05-02 00:54:58',NULL),(42,'RAUL TOMAS BOTTAZZI','Roca 2017','3364210639','','tomibottazzi@gmail.com','20-44867243-4','Buenos Aires','SAN NICOLAS DE LOS ARROYOS','2900','','2023-04-21 15:02:18','2023-05-02 00:54:58',NULL),(43,'MARTIN RODRIGUEZ','davalos 2556 2ºh','3415022187','','martinro_981@hotmail.com','28.578.790','Santa Fe','ROSARIO','2000','C 143','2023-04-21 15:50:38','2023-05-02 00:54:58',NULL),(44,'DANIEL HERNAN IBARRA','3 DE FEB 2289 01-04','3483417594','','dhibarra@gmail.com','23.577.243','Santa Fe','ROSARIO','2000','C 171','2023-04-21 16:42:46','2023-05-02 00:54:58',NULL),(45,'ROMINA ALTAMIRANO','Ayacucho 1360 02-03','3412- 028656','','rominaaltamirano85@gmail.com','27-31339300-9','Santa Fe','ROSARIO','2000','C 177','2023-04-21 16:55:05','2023-05-02 00:54:58',NULL),(46,'MARGARITA CASTAGNAVIS','J. Manuel de Rosas 2094 01-04 ','3416 42-7777','','margaritabeatrizcatagnavis@gamil.com','27-11874740-8','Santa Fe','ROSARIO','2000','C 165','2023-04-21 17:50:32','2023-05-02 00:54:58',NULL),(47,'YAMIL IVAN GALARZA','Blas Parera 598','3412798106','','yamilgalarzab@gmail.com','20-3626686-4','Santa Fe','ROSARIO','2000','C 198','2023-05-22 13:17:59','2023-05-22 13:17:59',NULL),(48,'DIEGO ADRIAN GOMEZ','Hernandarias 1525','3425843966','','dglds77@gmail.com','20-39503761-8','Santa Fe','SANTA FE','3000','C 155','2023-05-23 13:33:08','2023-05-23 13:33:08',NULL);
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
  `motive` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contracts__property_id__client_id_start_date_end_date_state` (`PropertyId`,`ClientId`,`startDate`,`endDate`,`state`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,31,23,'2021-11-01','2024-10-31','En curso',12500,0,0,'Monoambiente - contrato del 01/11/2021 al 31/10/2024 // C 192','2023-04-21 14:17:13','2023-05-02 00:54:58',NULL,NULL),(2,22,38,'2022-06-01','2025-05-31','En curso',36200,0,0,'CARPETA 203   Nuevo contrato del 01/06/22 al 31/05/25','2023-04-21 14:24:41','2023-05-02 00:54:58',NULL,NULL),(3,16,30,'2022-04-01','2025-03-31','En curso',24278,0,0,'C 106','2023-04-21 14:28:16','2023-05-02 00:54:58',NULL,NULL),(4,54,29,'2020-10-01','2023-09-30','En curso',11515,0,0,'CARPETA 109 -  CONTRATO DEL 01/10/2020 AL 30/09/2023','2023-04-21 14:36:49','2023-05-02 00:54:58',NULL,NULL),(5,47,26,'2021-05-01','2024-04-30','En curso',15092,0,0,'CARPETA 110  // CONTRATO 01/05/2021 AL  30/04/2024','2023-04-21 14:38:36','2023-05-02 00:54:58',NULL,NULL),(6,6,35,'2020-12-01','2023-11-30','En curso',22404,0,0,'C 114  //   CONTRATO DEL  01/12/2020 AL 30/11/2023','2023-04-21 14:40:47','2023-05-02 00:54:58',NULL,NULL),(7,17,9,'2021-11-01','2024-10-31','En curso',16800,0,0,'CARPETA 116 ver fechas de contrato','2023-04-21 14:42:30','2023-05-15 16:59:49',NULL,NULL),(8,7,19,'2022-08-01','2025-07-31','En curso',25800,0,0,'CARPETA 117 - Contrato del 1/8/22 al 31/07/2025 OJO QUE A LA PROPIETARIA SE LE ESTUVO PAGANDO SOBRE $ 35000','2023-04-21 14:52:24','2023-05-02 00:54:58',NULL,NULL),(9,9,4,'2022-02-01','2026-01-31','En curso',21800,0,0,'C 118   // Contrato del 01/02/2022 al 31/01/2026','2023-04-21 14:53:42','2023-05-02 00:54:58',NULL,NULL),(10,8,15,'2021-09-01','2024-08-31','En curso',27830,0,0,'CARPETA 123  // CONTRATO DEL 01/09/21 AL 31/08/2024','2023-04-21 14:55:10','2023-05-02 00:54:58',NULL,NULL),(11,40,41,'2023-05-01','2026-06-30','En curso',38800,19400,0,'CARPETA 132 // Contrato Nº 11783303 Persona 1367499  GAS nº persona 1367499 Cliente: 11783303','2023-04-21 15:13:12','2023-05-02 00:54:58',NULL,NULL),(12,12,31,'2021-08-01','2023-07-31','En curso',30193,0,0,'CARPETA 131  // contrato del 01/08/2021 al 31/07/2023','2023-04-21 15:16:58','2023-05-02 00:54:58',NULL,NULL),(13,39,42,'2023-05-01','2026-06-30','En curso',42000,21000,0,'CARPETA 136','2023-04-21 15:27:23','2023-05-02 00:54:58',NULL,NULL),(15,21,43,'2022-03-01','2025-02-28','En curso',49200,0,0,'CARPETA 143  // contrato de 1/3/22 al 28/02/25 // Gas Contrato Nº 13160803 Persona 1197846','2023-04-21 15:34:40','2023-05-02 00:54:58',NULL,NULL),(16,1,7,'2021-01-01','2023-12-30','En curso',13440,0,0,'CARPETA 150  // CONTRATO DEL  01/01/2021 AL 30/12/2023','2023-04-21 15:52:08','2023-05-02 00:54:58',NULL,NULL),(17,14,1,'2021-11-01','2024-01-31','En curso',19800,0,0,'C - 104  //   2º AÑO  1/11/22','2023-04-21 15:54:20','2023-05-02 00:54:58',NULL,NULL),(18,13,28,'2020-09-01','2023-08-30','En curso',35841,0,0,'CARPETA 153 // CONTRATO DEL 01/09/2020 AL 30/08/2023','2023-04-21 15:55:49','2023-05-02 00:54:58',NULL,NULL),(19,45,3,'2021-09-01','2024-08-31','En curso',2525,0,0,'CARPETA 185 // Contrato del 01/09/2021 al 31/08/2024','2023-04-21 16:29:01','2023-05-02 00:54:58',NULL,NULL),(20,25,5,'2021-02-01','2024-01-31','En curso',22644,0,0,'CARPETA 191  // Contrato del 01/02/2021 al 31/01/24','2023-04-21 16:30:50','2023-05-02 00:54:58',NULL,NULL),(21,18,10,'2021-01-01','2023-12-31','En curso',12500,0,0,'CARPETA 176 //  hija Borga Carina 0343-154544959','2023-04-21 16:33:27','2023-05-02 00:54:58',NULL,NULL),(22,46,14,'2022-01-01','2024-12-31','En curso',36036,0,0,'CARPETA C 112  // Contrato del 01/01/2022 al 31/12/2024  // BANCO NACION - CBU 0110183230018309 SUC. 1320 CAJA DE AHORRO 1830910435  ','2023-04-21 16:36:32','2023-05-02 00:54:58',NULL,NULL),(23,10,32,'2021-01-01','2023-12-31','En curso',65100,0,0,'Carpeta 108 // CONTRATO DEL 01/01/2021 AL 31/12/23','2023-04-21 16:38:19','2023-05-02 00:54:58',NULL,NULL),(24,24,44,'2022-03-01','2025-02-28','En curso',44623,0,0,'C 171','2023-04-21 16:47:43','2023-05-02 00:54:58',NULL,NULL),(25,55,33,'2020-12-01','2023-12-31','En curso',22350,0,0,'CARPETA 151 // CONTRATO DEL  01/12/2020 AL 31/12/2023','2023-04-21 16:50:54','2023-05-02 00:54:58',NULL,NULL),(26,36,45,'2022-10-01','2025-09-30','En curso',36800,0,0,'C 177','2023-04-21 16:56:29','2023-05-02 00:54:58',NULL,NULL),(27,37,21,'2022-05-01','2025-04-30','En curso',44010,0,0,'CARPETA 196 // VTO. CONTRATO EL 30/04/2025','2023-04-21 16:58:07','2023-05-02 00:54:58',NULL,NULL),(28,50,12,'2021-01-01','2023-12-31','En curso',59600,0,0,'CARPÈTA 197 // CONTRATO DEL 01/01/2021 AL 31/12/2023','2023-04-21 17:00:14','2023-05-02 00:54:58',NULL,NULL),(29,52,6,'2021-11-01','2024-10-31','En curso',22000,0,0,'CARPETA 199 // Contrato del 1/11/21 AL 31/10/2024','2023-04-21 17:04:30','2023-05-02 00:54:58',NULL,NULL),(30,51,36,'2022-02-01','2025-01-31','En curso',52050,0,0,'CARPETA 200 Adm. Sordoni- empleado Cristian 156-689428 - 4476411 // contrato del 01/02/22 al 31/01/25','2023-04-21 17:06:40','2023-05-02 00:54:58',NULL,NULL),(31,19,8,'2022-04-01','2025-03-31','En curso',32038,0,0,'C 202','2023-04-21 17:08:37','2023-05-02 00:54:58',NULL,NULL),(32,5,40,'2021-04-01','2024-03-31','En curso',22700,0,0,'CARPETA 206  -  EXPENSAS 18%  - Contrato del 01/4/2021 al 31/03/2024','2023-04-21 17:11:36','2023-05-02 00:54:58',NULL,NULL),(35,3,13,'2020-10-15','2023-09-30','En curso',23586,0,0,'CARPETA 209 //CONTRATO DEL 15/10/2020 AL 30/09/2023  // EXP. 10% gas Cliente Nº 103774201 Persona 226277','2023-04-21 17:28:00','2023-05-02 00:54:58',NULL,NULL),(39,11,17,'2021-02-01','2024-01-31','En curso',18500,0,0,'CARPETA 186 // CONTRATO DEL 01/02/2021 AL 31/01/2024','2023-04-21 17:34:01','2023-05-02 00:54:58',NULL,NULL),(40,23,20,'2021-09-01','2024-08-31','En curso',30960,0,0,'CARPETA 183 // Contrato del 01/09/21 al 31/08/24','2023-04-21 17:35:55','2023-05-02 00:54:58',NULL,NULL),(41,32,37,'2023-02-01','2026-01-31','En curso',56000,0,0,'C 152','2023-04-21 17:37:57','2023-05-02 00:54:58',NULL,NULL),(42,20,27,'2022-02-01','2025-01-31','En curso',50000,0,0,'C 127 // Contrato con vigencia del 01/02/2022 al 31/01/25  // Gas Contrato Nº 6534402 Persona 54110  ','2023-04-21 17:40:12','2023-05-02 00:54:58',NULL,NULL),(43,34,24,'2022-01-01','2024-12-31','En curso',13800,0,0,'C 175 // Contrato  del 01/01/2022 al 31/12/2024','2023-04-21 17:41:54','2023-05-02 00:54:58',NULL,NULL),(44,15,18,'2020-10-01','2023-09-30','En curso',13290,0,0,'c 182  // CONTRATO DEL 01/10/2020 AL 30/09/2023 ','2023-04-21 17:43:22','2023-05-02 00:54:58',NULL,NULL),(45,42,2,'2022-07-01','2025-06-30','En curso',70000,0,0,'Contrato del 01/7/22 al 30/6/25','2023-04-21 17:44:40','2023-05-02 00:54:58',NULL,NULL),(46,44,46,'2023-03-01','2026-02-28','En curso',66800,0,0,'C 165','2023-04-21 17:53:09','2023-05-02 00:54:58',NULL,NULL),(47,38,11,'2021-05-01','2024-04-30','En curso',17710,0,0,'C 161  // CONTRATO del  01/05/202l AL  30/04/2024','2023-04-21 17:54:48','2023-05-02 00:54:58',NULL,NULL),(48,41,34,'2022-06-04','2025-05-31','En curso',26800,0,0,'C - 195 // contrato del 1/06/2022 al 31/05/2025','2023-04-21 17:56:03','2023-05-02 00:54:58',NULL,NULL),(49,2,25,'2021-09-01','2024-08-31','En curso',24700,0,0,'C 184 // Contrato del 01/09/2021 al 31/08/2024','2023-04-21 17:58:58','2023-05-02 00:54:58',NULL,NULL),(50,53,39,'2022-01-01','2024-12-31','En curso',26300,0,0,'C 168 // Contrato del 01/01/22 al 31/12/2024','2023-04-21 18:00:43','2023-05-02 00:54:58',NULL,NULL),(54,4,22,'2020-10-15','2023-09-30','En curso',0,0,0,'','2023-04-26 01:40:40','2023-05-04 13:53:51',NULL,NULL),(55,33,47,'2023-06-01','2026-05-31','En curso',47800,23900,0,'','2023-05-22 13:19:03','2023-05-22 13:19:03',NULL,NULL),(56,26,48,'2023-06-01','2026-05-31','En curso',57800,0,0,'','2023-05-23 13:34:36','2023-05-23 13:34:36',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventualities`
--

LOCK TABLES `eventualities` WRITE;
/*!40000 ALTER TABLE `eventualities` DISABLE KEYS */;
INSERT INTO `eventualities` VALUES (2,11,NULL,0,-10807,0,0,0,'Fac 20079 Accesaniga compra cerámicos piso baño','2023-04-24','2023-04-24 17:46:43','2023-05-02 00:55:01'),(3,11,NULL,0,-9312,0,0,0,'Fac. 9135 Sanitarios Pasco, compra conexiones baño','2023-04-24','2023-04-24 17:47:55','2023-05-02 00:55:01'),(5,39,NULL,0,-15000,0,0,1,'Pintura alacenas y bajo mesada materiales y m.o. y limpieza gral.','2023-04-26','2023-04-26 14:11:28','2023-05-18 14:22:39'),(6,7,NULL,0,-4273,0,0,0,'Cambio piloto calefón Fac. 9226','2023-04-26','2023-04-26 16:43:22','2023-05-02 00:55:01'),(7,7,NULL,0,-3610,0,0,0,'Reparar canillas x perdida Fac. 13300','2023-04-26','2023-04-26 16:44:19','2023-05-02 00:55:01'),(8,17,NULL,0,-12040,0,0,0,'Fac. 248 trabajos electricidad','2023-04-27','2023-04-27 15:33:23','2023-05-02 00:55:01'),(9,17,NULL,0,-14800,0,0,0,'Fac. 062 trabajos plomería x filtración en baño a depto. de abajo','2023-04-27','2023-04-27 15:34:31','2023-05-02 00:55:01'),(10,15,NULL,-1370,-1370,1,0,1,'Expensas extraordinarias Abril/23','2023-05-04','2023-05-04 15:19:25','2023-05-16 14:34:28'),(12,11,NULL,0,-20920,0,0,0,'Accesaniga Fac. 4818 compra Bidet','2023-05-04','2023-05-04 17:12:52','2023-05-04 17:12:52'),(13,23,8,1174.72,0,0,1,1,'Saldo Mayo/2023','2023-06-07','2023-05-08 13:12:28','2023-05-08 13:12:28'),(14,50,10,2251.2,0,0,1,1,'Saldo Mayo/2023','2023-06-07','2023-05-08 17:42:06','2023-05-08 17:42:06'),(15,32,NULL,18500,0,0,0,0,'Honorarios Cuota 4/6','2023-06-08','2023-05-08 18:06:35','2023-05-08 18:06:35'),(16,32,NULL,18500,0,0,0,0,'Honorarios Cuota 5/6','2023-07-08','2023-05-08 18:07:02','2023-05-08 18:07:02'),(17,32,NULL,18500,0,0,0,0,'Honorarios Cuota 6/6','2023-08-08','2023-05-08 18:07:31','2023-05-08 18:07:31'),(18,17,NULL,0,-554,0,0,0,'Expe ext. marzo/23','2023-05-10','2023-05-10 15:20:17','2023-05-10 15:20:17'),(19,25,NULL,-1925,-1925,0,0,1,'Expensas extraordinarias Abril/23','2023-05-11','2023-05-11 13:26:36','2023-05-11 14:15:53'),(20,31,NULL,0,-900,0,0,1,'Expensas extraordinarias Abril/23','2023-05-11','2023-05-11 13:27:50','2023-05-11 14:15:53'),(21,17,NULL,-0,-329,0,0,0,'Expensas extraordinarias Abril/23','2023-05-11','2023-05-11 13:47:59','2023-05-15 12:33:49'),(22,12,NULL,-1000,0,0,0,0,'Dif. transferido de mas con alq. Mayo/23','2023-05-11','2023-05-11 14:24:18','2023-05-11 14:24:18'),(23,16,NULL,-1770,-1770,0,0,1,'Exp. extraordinarias Abril/23','2023-05-11','2023-05-11 15:24:19','2023-05-16 14:35:15'),(24,19,NULL,0,-3460,0,0,1,'Ultima cuota compra termotanque cuota 12/12 $ 3460','2023-05-16','2023-05-15 12:49:44','2023-05-16 14:35:54'),(27,6,NULL,0,-3537,0,0,1,'Ajuste desde nov/22 a Abril/23 x pagar $ 39344 en lugar de $ 35807, CUOTA 1/5','2023-05-17','2023-05-16 15:47:06','2023-05-16 15:55:16'),(28,6,NULL,0,-3537,0,0,0,'Ajuste desde nov/22 a Abril/23 x pagar $ 39344 en lugar de $ 35807, CUOTA 2/5','2023-06-17','2023-05-16 15:47:42','2023-05-16 15:47:42'),(29,6,NULL,0,-3537,0,0,0,'Ajuste desde nov/22 a Abril/23 x pagar $ 39344 en lugar de $ 35807, CUOTA 3/5','2023-07-17','2023-05-16 15:48:03','2023-05-16 15:48:03'),(30,6,NULL,0,-3537,0,0,0,'Ajuste desde nov/22 a Abril/23 x pagar $ 39344 en lugar de $ 35807, CUOTA 4/5','2023-08-17','2023-05-16 15:48:45','2023-05-16 15:48:45'),(31,6,NULL,0,-3540,0,0,0,'Ajuste desde nov/22 a Abril/23 x pagar $ 39344 en lugar de $ 35807, CUOTA 5/5','2023-09-17','2023-05-16 15:49:07','2023-05-16 15:49:07'),(32,44,NULL,-8200,0,1,0,0,'Reintegro Fac. 1682 trabajos plomeria','2023-05-18','2023-05-17 17:42:33','2023-05-17 17:49:59'),(33,44,NULL,0,-2650,0,0,0,'Proporcional Fac. 1682 trabajos plomeria x destape','2023-05-18','2023-05-17 17:43:00','2023-05-17 17:43:00'),(34,44,NULL,-8500,0,1,0,0,'Reintegro Fac. 1682 por limpieza y service aire acondicionado y compra control remoto','2023-05-18','2023-05-17 17:45:44','2023-05-17 17:49:59'),(35,44,NULL,0,-4250,0,0,0,'Proporcional Fac. 1682 por limpieza y service aire acondicionado ','2023-05-18','2023-05-17 17:46:28','2023-05-17 17:46:28'),(36,39,NULL,0,-12000,0,0,1,'Barreto: perdida termotanque y arreglo canilla patio y cocina','2023-05-19','2023-05-18 14:09:23','2023-05-18 14:22:39'),(37,39,NULL,23305,18900,0,0,1,'Proporcional 15 dias alq. Abril/2023','2023-05-19','2023-05-18 14:19:42','2023-05-18 14:22:39'),(38,36,NULL,876,876,0,0,0,'Ajuste aguas','2023-05-20','2023-05-19 14:02:34','2023-05-19 14:02:34'),(39,37,NULL,740,740,0,0,0,'Ajuste aguas','2023-05-20','2023-05-19 14:02:56','2023-05-19 14:02:56'),(40,39,NULL,0,-32119,0,0,0,'Expensas Enero, Febrero y Marzo/23 depto. desocupado','2023-05-20','2023-05-19 15:02:30','2023-05-19 15:02:30'),(41,33,NULL,94800,0,1,0,0,'Honorarios administracion','2023-05-23','2023-05-22 13:19:41','2023-05-22 13:22:11'),(42,33,NULL,34416,0,1,0,0,'Sellado contrato y averiguaciones de garantias','2023-05-23','2023-05-22 13:20:04','2023-05-22 13:22:11'),(43,33,NULL,-23900,0,1,0,0,'Reintegro reserva alquiler realizada por transferencia 11/05/2023','2023-05-23','2023-05-22 13:20:56','2023-05-22 13:22:11'),(44,43,NULL,0,-90000,0,0,0,'Barreto: Cambio tramo caño de gas en cocina y coneccion artefactos, Mat. y m.o.','2023-05-23','2023-05-22 17:30:51','2023-05-22 18:03:32'),(45,33,NULL,0,-95700,0,0,0,'Martinez: Trabajos de albañilería y pintura en baño, cocina y marco ventana materiales y m.o.','2023-05-23','2023-05-22 17:43:53','2023-05-22 18:03:54'),(46,33,NULL,0,-3500,0,0,0,'Espacio Green: Rec. 5038 desinfección general x insectos y murciélagos depto desocupado','2023-05-23','2023-05-22 17:53:20','2023-05-22 18:04:18'),(47,33,NULL,0,-35000,0,0,0,'Barreto: Materiales y mano de obra reparar cocina y bisagras horno, verificar funcionamiento termotanque. Presupuesto fecha 07/12/2022','2023-05-23','2023-05-22 17:56:04','2023-05-22 17:56:04'),(48,33,NULL,0,-28116,0,0,0,'Berkley: Cuotas póliza de seguro depto. desocupado desde Mayo/22 a Mayo/23','2023-05-23','2023-05-22 18:01:05','2023-05-22 18:04:38'),(49,33,NULL,0,-55000,0,0,0,'Soria: trabajos de plomeria en baño y cocina por perdidas. Reemplazo llave de paso en cocina y desague bajo mesasda. Mat. y m.o.','2023-05-23','2023-05-22 18:03:03','2023-05-22 18:03:03'),(50,26,NULL,58212,0,1,0,0,'Honorarios administracion Cuota 1/2','2023-05-24','2023-05-23 13:37:39','2023-05-23 13:42:49'),(51,26,NULL,42336,0,1,0,0,'Sellado y averiguaciones de garantías','2023-05-24','2023-05-23 13:38:23','2023-05-23 13:42:49'),(52,26,NULL,58212,0,0,0,0,'Honorarios administracion Cuota 2/2','2023-05-24','2023-05-23 13:41:30','2023-05-23 13:41:30');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerexpenses`
--

LOCK TABLES `ownerexpenses` WRITE;
/*!40000 ALTER TABLE `ownerexpenses` DISABLE KEYS */;
INSERT INTO `ownerexpenses` VALUES (1,'Aguas',1021,'2023-04-24',17,'2023-04-24 16:08:03','2023-05-02 00:55:00'),(2,'Tgi',1312,'2023-04-24',17,'2023-04-24 16:09:24','2023-05-02 00:55:00'),(3,'Tgi',1914,'2023-04-24',27,'2023-04-24 16:12:02','2023-05-02 00:55:01'),(4,'AGUAS',2593,'2023-05-19',27,'2023-04-24 16:12:19','2023-05-19 13:56:30'),(5,'Api',305,'2023-04-24',27,'2023-04-24 16:12:34','2023-05-02 00:55:01'),(6,'Tgi',2054,'2023-04-24',26,'2023-04-24 16:13:10','2023-05-02 00:55:01'),(7,'AGUAS',3067,'2023-05-19',26,'2023-04-24 16:13:32','2023-05-19 13:55:53'),(8,'Api',453,'2023-04-24',26,'2023-04-24 16:13:46','2023-05-02 00:55:01'),(9,'Compensación',5000,'2023-06-01',40,'2023-05-08 13:23:44','2023-05-08 13:23:44');
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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'ABEL DOMINGO MARI','Pje. Juan Thorne 5447','155068197','4620608','abelmari@live.com.ar',10,'12.110.099','Santa Fe','','2000','C 150','2023-04-18 16:41:06','2023-05-02 00:54:58',NULL),(2,'ADRIANA CIRAOLO','Montevideo 3478','Alberto 3415662232','00','ahc2729@gmail.com',10,'13.077.780','Santa Fe','ROSARIO','2000','C 184  mAIL: adricira18@hotmail.com','2023-04-18 16:46:00','2023-05-02 00:54:58',NULL),(3,'ALDO / BARBARA FERNÁNDEZ','San Martín 812','155-812512','03466-420207','barbarafernandez@hotmail.com',10,'L.E. 6.022.807','Santa Fe','BARRANCAS','2246','GABOTO 1821 04-02 C- 117 //  CERRITO 553 02-03  C-123 // GABOTO 1875 06-04 C- 118','2023-04-18 16:52:52','2023-05-02 00:54:58',NULL),(4,'ALEJANDRO TORASSA','Bv. Segui 1164','154-003183','00','torassa@gmail.com',10,'7.624.684','Santa Fe','ROSARIO','2000','C 108','2023-04-18 16:56:12','2023-05-02 00:54:58',NULL),(5,'ALFREDO FÉLIX PAPIS','Cda. Ricardone 1242 piso 10 B','156-010871','4406894','papisalfredo@hotmail.com',10,'24-06052100-6','Santa Fe','ROSARIO','2000','C 186','2023-04-18 16:58:36','2023-05-02 00:54:58',NULL),(6,'ANTONIO RAUL CIPRIANI','Tucumán 893','3402484090/109','03402-461362 CASA','farmacip@yahoo.com.ar',10,'8.523.713','Santa Fe','ALVAREZ','2107','C 131','2023-04-18 17:08:44','2023-05-02 00:54:58',NULL),(8,'CLIBE ELOISA GARCIA','Saavedra 1966','HIJA 3415947158','4-818738','lilianavargastaller@gmail.com',10,'F.2.793.571','Santa Fe','ROSARIO','2000','C 104','2023-04-18 17:17:24','2023-05-02 00:54:58',NULL),(9,'ATILIO GUILLERMO GRAZZIUTTI','SARMIENTO 1274 07-01','3489 51-9750','','aggrazziutti@gmail.com',10,'11.874.157 ','Santa Fe','ROSARIO','2000','C 182','2023-04-18 17:28:50','2023-05-02 00:54:58',NULL),(10,'RUBEN ALEGRA','Larrea 1949','3415210276 ','','alegraivann@gmail.com',10,'14.426.280','Santa Fe','ROSARIO','2000','C 106','2023-04-18 17:31:54','2023-05-02 00:54:58',NULL),(12,'ELIDA IANNOTI','Alsina 1050','3416457387','4386267','lalalalala@hotmail.com',10,'3.756.753','Santa Fe','ROSARIO','2000','C 116','2023-04-18 17:39:25','2023-05-02 00:54:58',NULL),(13,'ESTHER BRUNETTI DE BORGA','Pje. Chilavert 5616','153218041','4639167','carinabbor@gmail.com',10,'16.812.916','Santa Fe','ROSARIO','2000','C 176','2023-04-18 17:45:32','2023-05-02 00:54:58',NULL),(14,'FERNANDO FABIO CESCO','el inmigrante 1142','3464-15507353','','cescofernando@hotmail.com',10,'20.478.573','Santa Fe','AREQUITO','2183','C 202','2023-04-18 17:48:24','2023-05-02 00:54:58',NULL),(15,'HAYDEE ELIDA BERTOLDO','CORRIENTES 1273','3416588041','00','nanci_1514@hotmail.com',1,'11447701','Santa Fe','ROSARIO','2000','C 143','2023-04-18 17:51:13','2023-05-02 00:54:58',NULL),(16,'HUGO PEDRO MOTTA','Av. Julian de Bustinza 1323','341 642-2856 Flor ','','inmobiliaria.centro.1980@gmail.com',10,'7.649.952','Santa Fe','PIAMONTE','2529','C 203','2023-04-18 17:57:31','2023-05-02 00:54:58',NULL),(17,'JOSÉ ALBERTO RAISSIGUIER','Suipacha 978','3416762224','4399577','ivana.a.corazza@gmail.com',10,'Suipacha 978','Santa Fe','ROSARIO','2000','C 183','2023-04-18 18:00:31','2023-05-02 00:54:58','2023-05-15 17:07:09'),(18,'LILIANA LARRICQ','Necochea 1334 10 A','156-173130','152618073','ivanacorazza018@gmail.com',8,' 3.896.263','Santa Fe','ROSARIO','2000','C 171','2023-04-18 18:03:21','2023-05-02 00:54:58',NULL),(19,'LILIANA VENANZI','Pedro del Castillo 1814 \"B\" ','0261-3366056','','hvenanzi@gmail.com',8,'22.095.369','Mendoza','GODOY CRUZ','5501','C 152','2023-04-18 18:05:55','2023-05-02 00:54:58',NULL),(20,'MARCELO EDGARDO HERNANDEZ','España 437 01-04','341-5941580','','mh042769@gmail.com',10,'20.745.397','Santa Fe','ROSARIO','2000','C 198','2023-04-18 18:11:05','2023-05-02 00:54:58',NULL),(21,'EDUARDO BATTISTON','Juez Zuviria 228 Bis','3416407902','','ivana.corazza@hotmail.com',10,'******','','ROSARIO','2000','C 153','2023-04-18 18:17:55','2023-05-02 00:54:58',NULL),(22,'M. DE LOS ANGELES PESCE','Tucuman 524 - Leones','3472-25437882','','mariapesce1984@gmail.com',10,'30.350.315','Córdoba','MARCOS JUAREZ','2580','C 175','2023-04-19 14:16:47','2023-05-02 00:54:58',NULL),(26,'MARCELA FERNÁNDEZ','Laprida 1170 5ºB','3415 026541','3416 138921 Alcira','fernandezmachi@hotmail.com',10,'22.777.818','Santa Fe','ROSARIO','2000','C 114','2023-04-19 14:26:05','2023-05-02 00:54:58',NULL),(28,'MARIA TERESA ANTEZZA','Av. Francia 3825','3416 715437','4317352','lalalal.ala@hotmail.com',10,'93.125.098','Santa Fe','ROSARIO','2000','Sarmiento 1247 01-02  C 177   //  Riobamba 40 Bis C 196','2023-04-19 14:30:29','2023-05-02 00:54:58',NULL),(29,'NESTOR GAUNA / MARIANELA GONZALEZ','Italia 3539 timbre 4','3415 71-8164','00','gauna0758@gmail.com',10,'20.176.116','Santa Fe','ROSARIO','2000','C 161','2023-04-19 14:36:02','2023-05-02 00:54:58',NULL),(30,'MARIELA ARANDA','PPPPPPPPPPPPP','2284224812','','aranda.mariela@gmail.com',10,'23.438.649','Santa Fe','ROSARIO','2000','C 151','2023-04-19 14:51:23','2023-05-02 00:54:58',NULL),(31,'MARTA NELIDA CARBONELLA','Pellegrini 1146 02-01','3416657650','4484555','555555555555@HOTMAIL.COM',10,'5.081.550','Santa Fe','ROSARIO','2000','C 136','2023-04-19 15:09:21','2023-05-02 00:54:58',NULL),(37,'OSVALDO VALLE BIGLIA','Santa Fe 242','3464-461412','3464-692695','lilivallebiglia@gmail.com',10,'6.121.041','Santa Fe','BIGAND','2177','C 132','2023-04-19 15:14:45','2023-05-02 00:54:58',NULL),(38,'PATRICIA PILAR ECEIZA','Rioja 1021 10-03','156226867','Josefa 3416680933','patriciaeceiza@gmail.con',10,'27-16418810-3','Santa Fe','ROSARIO','2000','C 103','2023-04-19 15:20:03','2023-05-02 00:54:58',NULL),(39,'ROBERTO ANGHINOLFI','San Martín 230','03404-15631001','03404-431287','33333333333@hotmail.com',10,'6.245.088','Santa Fe','GALVEZ','2252','C 188','2023-04-19 15:24:58','2023-05-02 00:54:58',NULL),(40,'ROSA CRISTINA LACASIN','Rioja 2739 02-03','156439530','4404920','888888888@hotmail.com',10,'5.819.502','Santa Fe','ROSARIO','2000','C 165','2023-04-19 15:27:30','2023-05-02 00:54:58',NULL),(41,'ROSA GIURICICH','SARMIENTO 1247 08-03','3416492071','','xxxxxxxxx@hotmail.com',10,'8.788.066','Santa Fe','ROSARIO','2000','c 185','2023-04-19 15:29:26','2023-05-02 00:54:58',NULL),(42,'RUBEN MARIO BENELLI','Maivinas Argentinas 827','Diego 341-3061480','4941718','arqbenelli@yahoo.com.ar',10,'6.172.548','Santa Fe','CARCARAÑA','2138','C 112','2023-04-19 15:38:46','2023-05-02 00:54:58',NULL),(43,'SARA I. C. ERNALZ DE ZACCARÍA','Tucumán 166','0343-4225039','','666666666@hotmail.com',10,'23-02354836-4','Entre Ríos','PARANA','3100','C 110','2023-04-19 15:46:23','2023-05-02 00:54:58',NULL),(44,'STELLA MARIS CHIAPPE','Bv. jose maria aldao 1650','3468-15640224','3468-416240','chiappe.sm@gmail.com',10,'27-05751260-7','Córdoba','CAMILO ALDAO','2585','C 197','2023-04-19 15:50:32','2023-05-02 00:54:58',NULL),(45,'JOSÉ ALBERTO RAISSIGUIER','Suipacha 978','156-762224','4399577','XXXXXX@GMAIL.COM',10,'6.541.535','Santa Fe','ROSARIO','2000','','2023-04-20 17:48:06','2023-05-15 17:07:17',NULL),(46,'BEATRIZ SCARMIATTI','9 de julio 1475 03-02','3415316739','','graciela.comasco@hotmail.com',10,'00000000','Santa Fe','ROSARIO','2000','','2023-04-20 17:49:45','2023-05-10 17:20:07',NULL),(47,'ANTONIETA FERNANDEZ','San Martin 815','3416 520469','','fernandez.antonieta@hotmail.com',10,'23-30.374.816-4','Santa Fe','BARRANCAS','2246','','2023-04-21 14:34:37','2023-05-02 00:54:58',NULL);
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
  KEY `PaymentTypeId` (`PaymentTypeId`),
  KEY `paymentclients_ibfk_1_idx` (`ContractId`),
  CONSTRAINT `paymentclients_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `contracts` (`id`),
  CONSTRAINT `paymentclients_ibfk_2` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentclients`
--

LOCK TABLES `paymentclients` WRITE;
/*!40000 ALTER TABLE `paymentclients` DISABLE KEYS */;
INSERT INTO `paymentclients` VALUES (1,44,4,0,2023,'Mayo',25924,25924,'TRANSFERENCIA BANCARIA DIA 04/05/2023',1,'[{\"ContractId\":44,\"date\":\"2023-05-04\",\"updatedAt\":\"2023-05-04T15:26:25.378Z\",\"deletedAt\":null,\"description\":\"ALQUILER sarmiento 1247 07 02 Mayo/2023\",\"amount\":23500,\"createdAt\":\"1683213985378\",\"paidCurrentMonth\":true,\"id\":\"2653d2d6-aa14-4a93-9561-57f697ae45f8\"},{\"ContractId\":44,\"date\":\"2023-05-04\",\"updatedAt\":\"2023-05-04T15:26:25.378Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683213985378\",\"id\":\"04b65e52-44fa-4c15-a038-ed1ad382f3d2\"},{\"id\":10,\"description\":\"Seguro Mayo/2023\",\"amount\":2824,\"date\":\"2023-04-24\",\"ContractId\":44,\"createdAt\":\"2023-04-24T15:00:47.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":44,\"date\":\"2023-05-04\",\"updatedAt\":\"2023-05-04T15:26:25.379Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":470,\"createdAt\":\"1683213985379\",\"id\":\"c5a6b81e-44eb-45d7-8a0c-581e4a723371\",\"checked\":true}]','[{\"id\":10,\"PropertyId\":15,\"paymentId\":null,\"clientAmount\":-1370,\"ownerAmount\":-1370,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Expensas extraordinarias Abril/23\",\"expiredDate\":\"2023-05-04\",\"createdAt\":\"2023-05-04T15:19:25.000Z\",\"updatedAt\":\"2023-05-04T15:19:25.000Z\"}]','2023-05-04','2023-05-04',NULL),(7,17,1,0,2023,'Mayo',43322,0,'',1,'[{\"ContractId\":17,\"date\":\"2023-05-05\",\"updatedAt\":\"2023-05-05T14:37:15.796Z\",\"deletedAt\":null,\"description\":\"ALQUILER Gaboto 1821 01 02 Mayo/2023\",\"amount\":34300,\"createdAt\":\"1683297435796\",\"paidCurrentMonth\":true,\"id\":\"bdc484cc-ad9d-4700-aa90-d8d5ad23a607\"},{\"id\":105,\"description\":\"Aguas Mayo/2023\",\"amount\":2190,\"date\":\"2023-04-24\",\"ContractId\":17,\"createdAt\":\"2023-04-24T16:11:13.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"id\":33,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":17,\"createdAt\":\"2023-04-24T15:05:48.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"id\":104,\"description\":\"Tgi Mayo/2023\",\"amount\":2054,\"date\":\"2023-04-24\",\"ContractId\":17,\"createdAt\":\"2023-04-24T16:10:58.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"id\":106,\"description\":\"Api Mayo/2023\",\"amount\":868,\"date\":\"2023-04-24\",\"ContractId\":17,\"createdAt\":\"2023-04-24T16:11:29.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":17,\"date\":\"2023-05-05\",\"updatedAt\":\"2023-05-05T14:37:15.797Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":686,\"createdAt\":\"1683297435797\",\"id\":\"e1591ac2-0c2b-47c6-83b3-11ea5b239ed9\",\"checked\":true}]','[]','2023-05-05','2023-05-05',NULL),(8,40,1,371.52,2023,'Mayo',35174.7,34000,'',1,'[{\"ContractId\":40,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T13:08:49.374Z\",\"deletedAt\":null,\"description\":\"ALQUILER Cda. Ricardone 1376 04 02 Mayo/2023\",\"amount\":30960,\"createdAt\":\"1683551329374\",\"paidCurrentMonth\":true,\"id\":\"1fd620a4-38f4-41ae-a3a9-489618dcbc3a\"},{\"id\":14,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":40,\"createdAt\":\"2023-04-24T15:01:31.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":40,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T13:08:49.374Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":619.2,\"createdAt\":\"1683551329374\",\"id\":\"4130129f-9443-442e-955e-3be15c9cd5e8\",\"checked\":true}]','[]','2023-05-08','2023-05-08',NULL),(9,42,4,600,2023,'Mayo',55324,0,'Transferecia 8/5/2023',1,'[{\"ContractId\":42,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:27:34.224Z\",\"deletedAt\":null,\"description\":\"ALQUILER Corrientes 1273 07 02 Mayo/2023\",\"amount\":50000,\"createdAt\":\"1683566854224\",\"paidCurrentMonth\":true,\"id\":\"12a42763-21e9-43dd-8dcc-e55c49b7fe3a\"},{\"ContractId\":42,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:27:34.224Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683566854224\",\"id\":\"d4a2fc3d-4527-4292-87d6-58e4d49f0ef0\"},{\"id\":12,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":42,\"createdAt\":\"2023-04-24T15:01:11.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":42,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:27:34.224Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":1000,\"createdAt\":\"1683566854224\",\"id\":\"80c22b7f-2fdc-41d0-a209-2f1b423e9ab1\",\"checked\":true}]','[]','2023-05-08','2023-05-08',NULL),(10,28,4,715.2,2023,'Mayo',65231.2,62980,'Trasnferencia  $ 62.980 el  07/05/2023  ',1,'[{\"ContractId\":28,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:37:20.948Z\",\"deletedAt\":null,\"description\":\"ALQUILER Urquiza  1949 13 04 Mayo/2023\",\"amount\":59600,\"createdAt\":\"1683567440948\",\"paidCurrentMonth\":true,\"id\":\"cbc9628d-120d-4212-9f43-f2b6649fdd63\"},{\"ContractId\":28,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:37:20.948Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683567440948\",\"id\":\"d5a3d56d-4374-4cd7-857c-8539da29a90d\"},{\"id\":21,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":28,\"createdAt\":\"2023-04-24T15:02:53.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":28,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:37:20.948Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":1192,\"createdAt\":\"1683567440948\",\"id\":\"6a2d3cbf-7036-485b-ae44-c17496564013\",\"checked\":true}]','[]','2023-05-08','2023-05-08',NULL),(11,13,4,504,2023,'Mayo',47068,0,'Trasnferencia 05/05/2023',1,'[{\"ContractId\":13,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:51:17.674Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683568277674\",\"id\":\"58b1b103-780a-41f2-baaa-f0fce4e29021\"},{\"ContractId\":13,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:51:17.674Z\",\"deletedAt\":null,\"description\":\"ALQUILER Pellegrini 1068 01 03 Mayo/2023\",\"amount\":42000,\"createdAt\":\"1683568277674\",\"paidCurrentMonth\":true,\"id\":\"ce0cbe9c-86af-46f9-9cbd-cc1161224ea6\"},{\"id\":36,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":13,\"createdAt\":\"2023-04-24T15:06:28.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":13,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T17:51:17.674Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":840,\"createdAt\":\"1683568277674\",\"id\":\"1322c063-bf46-412c-b393-c3d9235dbc7c\",\"checked\":true}]','[]','2023-05-08','2023-05-08',NULL),(12,1,4,260.4,2023,'Mayo',26118.4,0,'Transferencia 07/05/2023 $ 28691',1,'[{\"ContractId\":1,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:11:18.057Z\",\"deletedAt\":null,\"description\":\"ALQUILER Necochea 1334 01 03 Mayo/2023\",\"amount\":21700,\"createdAt\":\"1683569478057\",\"paidCurrentMonth\":true,\"id\":\"c0acc0c9-4d46-4f14-83bd-b8b82beb09e2\"},{\"ContractId\":1,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:11:18.057Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683569478057\",\"id\":\"eec68612-704d-440f-add8-15abad4366f0\"},{\"id\":49,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":1,\"createdAt\":\"2023-04-24T15:09:57.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":1,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:11:18.057Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":434,\"createdAt\":\"1683569478057\",\"id\":\"8aadb829-8aab-40b6-af04-e13b41213f99\",\"checked\":true}]','[]','2023-05-08','2023-05-08',NULL),(13,24,4,535.48,2023,'Mayo',50274.9,0,'Transferencia 08/5/2023 $ 50.275',1,'[{\"id\":75,\"description\":\"Gastos Bancarios Mayo/2023\",\"amount\":500,\"date\":\"2023-04-24\",\"ContractId\":24,\"createdAt\":\"2023-04-24T15:31:24.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":24,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:13:02.566Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683569582566\",\"id\":\"919a3012-24dc-4973-bd97-7e962ee695cb\"},{\"ContractId\":24,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:13:02.566Z\",\"deletedAt\":null,\"description\":\"ALQUILER 3 de Febrero  2289 01 04 Mayo/2023\",\"amount\":44623,\"createdAt\":\"1683569582566\",\"paidCurrentMonth\":true,\"id\":\"5c597554-eb53-4966-b31b-49e4da2eb590\"},{\"id\":26,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":24,\"createdAt\":\"2023-04-24T15:04:02.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":24,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:13:02.566Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":892.46,\"createdAt\":\"1683569582566\",\"id\":\"0a988620-724b-49eb-b1d5-f5397a655d93\",\"checked\":true}]','[]','2023-05-08','2023-05-08',NULL),(14,12,4,362.32,2023,'Mayo',34883.2,0,'Transferencia 08/05/2023 $ 35883',1,'[{\"ContractId\":12,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:16:11.152Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683569771152\",\"id\":\"4e57ff55-2de7-4fd7-8af9-2a6a2dab6982\"},{\"ContractId\":12,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:16:11.152Z\",\"deletedAt\":null,\"description\":\"ALQUILER San Lorenzo 863 03 02 Mayo/2023\",\"amount\":30193,\"createdAt\":\"1683569771152\",\"paidCurrentMonth\":true,\"id\":\"e9f33cb2-7e77-4ba1-bee0-8073d65668f7\"},{\"id\":37,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":12,\"createdAt\":\"2023-04-24T15:06:48.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":12,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:16:11.152Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":603.86,\"createdAt\":\"1683569771152\",\"id\":\"f3ea432c-99da-4364-a1ca-4203b065ff03\",\"checked\":true}]','[]','2023-05-08','2023-05-08',NULL),(15,35,4,0,2023,'Mayo',19714,0,'Trasnferencia 08/05/2023   $ 19714.-',1,'[{\"id\":50,\"description\":\"Expensas Mayo/2023\",\"amount\":1200,\"date\":\"2023-04-24\",\"ContractId\":35,\"createdAt\":\"2023-04-24T15:12:49.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":35,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:20:05.457Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683570005457\",\"id\":\"c36d2d7e-e6f3-4901-8138-1176c7ebd1d5\"},{\"ContractId\":35,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:20:05.456Z\",\"deletedAt\":null,\"description\":\"ALQUILER Gaboto 3573 00 04 Mayo/2023\",\"amount\":14500,\"createdAt\":\"1683570005456\",\"paidCurrentMonth\":true,\"id\":\"d41776fc-bc3e-4b14-8ea9-683b160c2767\"},{\"id\":16,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":35,\"createdAt\":\"2023-04-24T15:01:57.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":35,\"date\":\"2023-05-08\",\"updatedAt\":\"2023-05-08T18:20:05.457Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":290,\"createdAt\":\"1683570005457\",\"id\":\"6a9aa165-424e-4b23-a799-4f9a02188941\",\"checked\":true}]','[]','2023-05-08','2023-05-08',NULL),(16,54,1,232,2023,'Mayo',19946,0,'',1,'[{\"ContractId\":54,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T14:39:33.398Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683729573398\",\"id\":\"f86d3cf0-afe1-4147-816d-bfc3831988c0\"},{\"id\":107,\"description\":\"Expensas Mayo/2023\",\"amount\":1200,\"date\":\"2023-04-26\",\"ContractId\":54,\"createdAt\":\"2023-04-26T12:27:38.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":54,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T14:39:33.397Z\",\"deletedAt\":null,\"description\":\"ALQUILER Gaboto 3573 00 03 Mayo/2023\",\"amount\":14500,\"createdAt\":\"1683729573397\",\"paidCurrentMonth\":true,\"id\":\"5a74be1c-7180-4c73-b5ef-39f0ee562342\"},{\"id\":108,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-26\",\"ContractId\":54,\"createdAt\":\"2023-04-26T12:28:58.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":54,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T14:39:33.398Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":290,\"createdAt\":\"1683729573398\",\"id\":\"0007d9af-47af-4a34-b41a-4fab40a833b8\",\"checked\":true}]','[]','2023-05-10','2023-05-10',NULL),(17,22,4,0,2023,'Mayo',40480.7,0,'Trasnferencia bancaria 10/05 por $ 38500.- ADEUDA SALDO $ 1981.-',1,'[{\"ContractId\":22,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T14:45:11.549Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683729911549\",\"id\":\"4f1b8452-9de0-4171-9c4f-19a44d51009f\"},{\"ContractId\":22,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T14:45:11.549Z\",\"deletedAt\":null,\"description\":\"ALQUILER Buenos Aires 1659 00 03 Mayo/2023\",\"amount\":36036,\"createdAt\":\"1683729911549\",\"paidCurrentMonth\":true,\"id\":\"4f78074b-5fb9-4909-879d-910d66d702a3\"},{\"id\":28,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":22,\"createdAt\":\"2023-04-24T15:04:24.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":22,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T14:45:11.550Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":720.72,\"createdAt\":\"1683729911550\",\"id\":\"fb82ef7e-2e09-4b4c-b1d3-87a53aef3f2f\",\"checked\":true}]','[]','2023-05-10','2023-05-10',NULL),(18,45,1,1400,2023,'Mayo',76541,0,'',1,'[{\"ContractId\":45,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T15:21:54.834Z\",\"deletedAt\":null,\"description\":\"ALQUILER Regimiento 11  178   Mayo/2023\",\"amount\":70000,\"createdAt\":\"1683732114834\",\"paidCurrentMonth\":true,\"id\":\"6c731d62-c7ff-43ab-9518-c7334c940999\"},{\"ContractId\":45,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T15:21:54.835Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683732114835\",\"id\":\"dbffbd07-949e-46ad-ad0f-e5a6e3d3265a\"},{\"id\":9,\"description\":\"Seguro Mayo/2023\",\"amount\":3241,\"date\":\"2023-04-24\",\"ContractId\":45,\"createdAt\":\"2023-04-24T15:00:27.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":45,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T15:21:54.835Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":1400,\"createdAt\":\"1683732114835\",\"id\":\"62170c63-0517-4d4c-b64d-7a0983814283\",\"checked\":true}]','[]','2023-05-10','2023-05-10',NULL),(19,23,1,0,2023,'Mayo',69626,0,'',1,'[{\"ContractId\":23,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T16:29:48.732Z\",\"deletedAt\":null,\"description\":\"ALQUILER Maipu  1431 02 01 Mayo/2023\",\"amount\":65100,\"createdAt\":\"1683736188732\",\"paidCurrentMonth\":true,\"id\":\"9c06e0e4-8d27-4293-8051-a81e0de41a39\"},{\"id\":27,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":23,\"createdAt\":\"2023-04-24T15:04:11.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":23,\"date\":\"2023-05-10\",\"updatedAt\":\"2023-05-10T16:29:48.733Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":1302,\"createdAt\":\"1683736188733\",\"id\":\"8f9a0247-4c22-4078-b2a9-ddc4b89ab0b2\",\"checked\":true}]','[]','2023-05-10','2023-05-10',NULL),(20,31,4,0,2023,'Mayo',36402.8,0,'Trasferencia 09/05/2023 $ 36170 y transferencia 10/05/2023 $ 873',0,'[{\"ContractId\":31,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:13:57.288Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683810837288\",\"id\":\"c9ffad96-974a-4173-b281-2a188efec771\"},{\"ContractId\":31,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:13:57.287Z\",\"deletedAt\":null,\"description\":\"ALQUILER Mitre 757 08 06 Mayo/2023\",\"amount\":32038,\"createdAt\":\"1683810837287\",\"paidCurrentMonth\":true,\"id\":\"689a8671-64d4-405f-af95-f033a20d1b8d\"},{\"id\":18,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":31,\"createdAt\":\"2023-04-24T15:02:19.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":31,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:13:57.288Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":640.76,\"createdAt\":\"1683810837288\",\"id\":\"f8053414-257e-44de-a9cf-8b21a8baf653\",\"checked\":true}]','[]','2023-05-11','2023-05-11',NULL),(21,7,1,0,2023,'Mayo',32906,0,'',0,'[{\"ContractId\":7,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:32:57.735Z\",\"deletedAt\":null,\"description\":\"ALQUILER Mendoza 989 05 03 Mayo/2023\",\"amount\":29100,\"createdAt\":\"1683811977735\",\"paidCurrentMonth\":true,\"id\":\"02cb2e6d-fe54-4556-a5a4-105bb1649841\"},{\"id\":43,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":7,\"createdAt\":\"2023-04-24T15:08:47.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":7,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:32:57.735Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":582,\"createdAt\":\"1683811977735\",\"id\":\"e801d7a9-a681-4670-b9f5-218fe72436e4\",\"checked\":true}]','[]','2023-05-11','2023-05-11',NULL),(22,20,4,0,2023,'Mayo',46666,0,'Transferencia el 10/05 $ 45.415 y transferencia el 11/05 $ 1.285',0,'[{\"ContractId\":20,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:38:13.446Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683812293446\",\"id\":\"bf6ef2f7-c144-4451-b4ba-db4c5e49035b\"},{\"ContractId\":20,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:38:13.445Z\",\"deletedAt\":null,\"description\":\"ALQUILER Necochea 1334 05 02 Mayo/2023\",\"amount\":42100,\"createdAt\":\"1683812293445\",\"paidCurrentMonth\":true,\"id\":\"8dac6310-2801-4c98-afa1-786434a093c7\"},{\"id\":30,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":20,\"createdAt\":\"2023-04-24T15:04:50.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":20,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:38:13.446Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":842,\"createdAt\":\"1683812293446\",\"id\":\"979d3403-3f1c-4476-80da-6f4eadc9837e\",\"checked\":true}]','[]','2023-05-11','2023-05-11',NULL),(23,18,4,860.18,2023,'Mayo',41142,0,'Transferencia 11/05/2023 $ 41.150',0,'[{\"ContractId\":18,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:58:00.990Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683813480990\",\"id\":\"c7f2fe04-5b3d-4894-a6f5-cd2446cbc4b9\"},{\"ContractId\":18,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:58:00.989Z\",\"deletedAt\":null,\"description\":\"ALQUILER san lorenzo 863 04 02 Mayo/2023\",\"amount\":35841,\"createdAt\":\"1683813480989\",\"paidCurrentMonth\":true,\"id\":\"dab5186b-0e91-4cb0-a106-2c8e5279c9f3\"},{\"id\":32,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":18,\"createdAt\":\"2023-04-24T15:05:35.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":18,\"date\":\"2023-05-11\",\"updatedAt\":\"2023-05-11T13:58:00.990Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":716.82,\"createdAt\":\"1683813480990\",\"id\":\"6953a199-9897-4a8e-ab35-22bc4a14cd8a\",\"checked\":true}]','[]','2023-05-11','2023-05-11',NULL),(24,30,4,1249.2,2023,'Mayo',58064.2,0,'Deposito $ 58065 el 12/05/23',0,'[{\"ContractId\":30,\"date\":\"2023-05-12\",\"updatedAt\":\"2023-05-12T14:49:18.204Z\",\"deletedAt\":null,\"description\":\"ALQUILER Urquiza 1949 07 06 Mayo/2023\",\"amount\":52050,\"createdAt\":\"1683902958204\",\"paidCurrentMonth\":true,\"id\":\"b19c8bc4-27ce-4564-956d-b124f3020730\"},{\"ContractId\":30,\"date\":\"2023-05-12\",\"updatedAt\":\"2023-05-12T14:49:18.205Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1683902958205\",\"id\":\"07481d42-9757-435f-8b6c-204ae8e6e228\"},{\"id\":19,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":30,\"createdAt\":\"2023-04-24T15:02:31.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":30,\"date\":\"2023-05-12\",\"updatedAt\":\"2023-05-12T14:49:18.206Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":1041,\"createdAt\":\"1683902958206\",\"id\":\"4a0bf0b6-028e-4668-949d-ffad4ee4b633\",\"checked\":true}]','[]','2023-05-12','2023-05-12',NULL),(25,47,4,563.89,2023,'Mayo',40235.6,0,'Pago transferencia 13/05/2023',0,'[{\"ContractId\":47,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T16:42:59.266Z\",\"deletedAt\":null,\"description\":\"ALQUILER La Paz 1138 00 03 Mayo/2023\",\"amount\":35242.9,\"createdAt\":\"1684341779266\",\"paidCurrentMonth\":true,\"id\":\"57f46ce7-4d12-4440-9a34-c11c96474fea\"},{\"ContractId\":47,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T16:42:59.267Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1684341779267\",\"id\":\"cb34ea31-00c4-4e6c-a4aa-1c2493f4f04a\"},{\"id\":7,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":47,\"createdAt\":\"2023-04-24T14:53:26.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":47,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T16:42:59.267Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":704.8580000000001,\"createdAt\":\"1684341779267\",\"id\":\"ab7d2554-84bc-41d8-8311-78e729c5cdd5\",\"checked\":true}]','[]','2023-05-17','2023-05-17',NULL),(26,50,4,631.2,2023,'Mayo',31181.2,0,'Pagos x transferencia bancaria dia 15/05 $ 30.550 y dia 17/05/23 $ 630.-',0,'[{\"ContractId\":50,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T16:54:04.236Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1684342444236\",\"id\":\"dc12b729-cf5f-43a2-8bf5-8e354e2a5a04\"},{\"ContractId\":50,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T16:54:04.236Z\",\"deletedAt\":null,\"description\":\"ALQUILER Sarmiento 1247 03 07 Mayo/2023\",\"amount\":26300,\"createdAt\":\"1684342444236\",\"paidCurrentMonth\":true,\"id\":\"58b18fe6-e9a3-4aa2-b0c5-82d5daf8ce71\"},{\"id\":2,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":50,\"createdAt\":\"2023-04-24T14:52:18.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":50,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T16:54:04.236Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":526,\"createdAt\":\"1684342444236\",\"id\":\"6168968f-3230-4840-b364-7a56e0364340\",\"checked\":true}]','[]','2023-05-17','2023-05-17',NULL),(27,46,1,3206.4,2023,'Mayo',61442.4,0,'SE COBRA SALDO ALQ ABRIL/23 DE $ 4440.- Y SE REINTEGRAN EL 100% DE LAS FACTURAS PRESENTADAS POR REPARACIONES AIRE Y PLOMERIA',0,'[{\"ContractId\":46,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T17:46:44.762Z\",\"deletedAt\":null,\"description\":\"ALQUILER Corrientes 1591 00 06 Mayo/2023\",\"amount\":66800,\"createdAt\":\"1684345604762\",\"paidCurrentMonth\":true,\"id\":\"227f1011-eb78-48b1-8670-be7523896e98\"},{\"ContractId\":46,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T17:46:44.763Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1684345604763\",\"id\":\"2d01b183-f111-43b0-a8a8-f41052e7eb61\"},{\"id\":8,\"description\":\"Seguro Mayo/2023\",\"amount\":6300,\"date\":\"2023-04-24\",\"ContractId\":46,\"createdAt\":\"2023-04-24T14:59:43.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":46,\"date\":\"2023-05-17\",\"updatedAt\":\"2023-05-17T17:46:44.763Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":1336,\"createdAt\":\"1684345604763\",\"id\":\"79b39e39-aa26-4b2a-bb95-43f8bd20013a\",\"checked\":true}]','[{\"id\":34,\"PropertyId\":44,\"paymentId\":null,\"clientAmount\":-8500,\"ownerAmount\":0,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Reintegro Fac. 1682 por limpieza y service aire acondicionado y compra control remoto\",\"expiredDate\":\"2023-05-18\",\"createdAt\":\"2023-05-17T17:45:44.000Z\",\"updatedAt\":\"2023-05-17T17:45:44.000Z\"},{\"id\":32,\"PropertyId\":44,\"paymentId\":null,\"clientAmount\":-8200,\"ownerAmount\":0,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Reintegro Fac. 1682 trabajos plomeria\",\"expiredDate\":\"2023-05-18\",\"createdAt\":\"2023-05-17T17:42:33.000Z\",\"updatedAt\":\"2023-05-17T17:42:33.000Z\"}]','2023-05-17','2023-05-17',NULL),(28,39,4,962,2023,'Mayo',23556,0,'Transferencia dia 18/05/2023',0,'[{\"ContractId\":39,\"date\":\"2023-05-18\",\"updatedAt\":\"2023-05-18T15:31:13.636Z\",\"deletedAt\":null,\"description\":\"ALQUILER Mitre 2458 02 03 Mayo/2023\",\"amount\":18500,\"createdAt\":\"1684423873636\",\"paidCurrentMonth\":true,\"id\":\"94f6fc6c-de57-4ada-aaa3-409dc37f6313\"},{\"ContractId\":39,\"date\":\"2023-05-18\",\"updatedAt\":\"2023-05-18T15:31:13.636Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1684423873636\",\"id\":\"6575567d-18ac-4c5d-bfdb-827477e3ced7\"},{\"id\":15,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":39,\"createdAt\":\"2023-04-24T15:01:47.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":39,\"date\":\"2023-05-18\",\"updatedAt\":\"2023-05-18T15:31:13.636Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":370,\"createdAt\":\"1684423873636\",\"id\":\"5825f785-6643-4952-a509-878f7a3784b8\",\"checked\":true}]','[]','2023-05-18','2023-05-18',NULL),(29,8,4,928.8,2023,'Mayo',30968.8,0,'Transferencia bancaria dia 03/05/2023 $ 30.954',0,'[{\"ContractId\":8,\"date\":\"2023-05-18\",\"updatedAt\":\"2023-05-18T15:56:45.630Z\",\"deletedAt\":null,\"description\":\"ALQUILER Gaboto 1821 04 02 Mayo/2023\",\"amount\":25800,\"createdAt\":\"1684425405630\",\"paidCurrentMonth\":true,\"id\":\"a2861c17-754d-4e0e-a892-99321b291dbf\"},{\"ContractId\":8,\"date\":\"2023-05-18\",\"updatedAt\":\"2023-05-18T15:56:45.630Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1684425405630\",\"id\":\"d9f5b13a-8933-4317-952d-1cc75a002bab\"},{\"id\":42,\"description\":\"Seguro Mayo/2023\",\"amount\":3224,\"date\":\"2023-04-24\",\"ContractId\":8,\"createdAt\":\"2023-04-24T15:08:25.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"ContractId\":8,\"date\":\"2023-05-18\",\"updatedAt\":\"2023-05-18T15:56:45.630Z\",\"deletedAt\":null,\"description\":\"GASTOS DE GESTION Mayo/2023\",\"amount\":516,\"createdAt\":\"1684425405630\",\"id\":\"bb5c846c-04de-492f-8957-cd5dde9dfddd\",\"checked\":true}]','[]','2023-05-18','2023-05-18',NULL),(30,55,4,3250.4,2023,'Mayo',105816,0,'Transferencia bancaria realizada dia 22/05/2023',0,'[{\"ContractId\":55,\"date\":\"2023-05-22\",\"updatedAt\":\"2023-05-22T13:21:04.986Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1684761664986\",\"id\":\"364d8c66-b310-4264-8510-83a029bfcae6\"}]','[{\"id\":43,\"PropertyId\":33,\"paymentId\":null,\"clientAmount\":-23900,\"ownerAmount\":0,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Reintegro reserva alquiler realizada por transferencia 11/05/2023\",\"expiredDate\":\"2023-05-23\",\"createdAt\":\"2023-05-22T13:20:56.000Z\",\"updatedAt\":\"2023-05-22T13:20:56.000Z\"},{\"id\":42,\"PropertyId\":33,\"paymentId\":null,\"clientAmount\":34416,\"ownerAmount\":0,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Sellado contrato y averiguaciones de garantias\",\"expiredDate\":\"2023-05-23\",\"createdAt\":\"2023-05-22T13:20:04.000Z\",\"updatedAt\":\"2023-05-22T13:20:04.000Z\"},{\"id\":41,\"PropertyId\":33,\"paymentId\":null,\"clientAmount\":94800,\"ownerAmount\":0,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Honorarios administracion\",\"expiredDate\":\"2023-05-23\",\"createdAt\":\"2023-05-22T13:19:41.000Z\",\"updatedAt\":\"2023-05-22T13:19:41.000Z\"}]','2023-05-22','2023-05-22',NULL),(31,56,4,4161.6,2023,'Mayo',101048,0,'Pago x transferencia 23/05/2023',0,'[{\"ContractId\":56,\"date\":\"2023-05-23\",\"updatedAt\":\"2023-05-23T13:41:37.096Z\",\"deletedAt\":null,\"description\":\"GASTOS BANCARIOS Mayo/2023\",\"amount\":500,\"createdAt\":\"1684849297096\",\"id\":\"ab8a6615-6403-4d26-8201-1771b1f54884\"}]','[{\"id\":50,\"PropertyId\":26,\"paymentId\":null,\"clientAmount\":58212,\"ownerAmount\":0,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Honorarios administracion Cuota 1/2\",\"expiredDate\":\"2023-05-24\",\"createdAt\":\"2023-05-23T13:37:39.000Z\",\"updatedAt\":\"2023-05-23T13:41:10.000Z\"},{\"id\":51,\"PropertyId\":26,\"paymentId\":null,\"clientAmount\":42336,\"ownerAmount\":0,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Sellado y averiguaciones de garantías\",\"expiredDate\":\"2023-05-24\",\"createdAt\":\"2023-05-23T13:38:23.000Z\",\"updatedAt\":\"2023-05-23T13:38:23.000Z\"}]','2023-05-23','2023-05-23',NULL);
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
  KEY `PaymentTypeId` (`PaymentTypeId`),
  KEY `paymentowners_ibfk_1_idx` (`OwnerId`),
  CONSTRAINT `paymentowners_ibfk_1` FOREIGN KEY (`OwnerId`) REFERENCES `owners` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `paymentowners_ibfk_2` FOREIGN KEY (`PaymentTypeId`) REFERENCES `paymenttypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentowners`
--

LOCK TABLES `paymentowners` WRITE;
/*!40000 ALTER TABLE `paymentowners` DISABLE KEYS */;
INSERT INTO `paymentowners` VALUES (16,46,1,'','Mayo',2023,23670,0,'[{\"amount\":26300,\"description\":\"ALQUILER Sarmiento 1247 03 07 Mayo/2023\",\"id\":1007501683746912900,\"ContractId\":50,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-10T19:28:32.837Z\",\"updatedAt\":\"2023-05-10T19:28:32.837Z\"},{\"amount\":-2630,\"description\":\"HONORARIOS Sarmiento 1247 03 07 Mayo/2023\",\"id\":5384501683746913000,\"ContractId\":50,\"createdAt\":\"2023-05-10T19:28:32.837Z\",\"updatedAt\":\"2023-05-10T19:28:32.837Z\"}]','[]','2023-05-10','2023-05-10 19:28:44',NULL),(17,18,1,'','Mayo',2023,96924.2,0,'[{\"amount\":44623,\"description\":\"ALQUILER 3 de Febrero  2289 01 04 Mayo/2023\",\"id\":44268241683814330000,\"ContractId\":24,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-11T14:12:04.871Z\",\"updatedAt\":\"2023-05-11T14:12:04.871Z\"},{\"amount\":-3569.84,\"description\":\"HONORARIOS 3 de Febrero  2289 01 04 Mayo/2023\",\"id\":6404241683814325000,\"ContractId\":24,\"createdAt\":\"2023-05-11T14:12:04.871Z\",\"updatedAt\":\"2023-05-11T14:12:04.871Z\"},{\"amount\":21700,\"description\":\"ALQUILER Necochea 1334 01 03 Mayo/2023\",\"id\":6130211683814325000,\"ContractId\":1,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-11T14:12:04.898Z\",\"updatedAt\":\"2023-05-11T14:12:04.898Z\"},{\"amount\":-1736,\"description\":\"HONORARIOS Necochea 1334 01 03 Mayo/2023\",\"id\":156511683814324900,\"ContractId\":1,\"createdAt\":\"2023-05-11T14:12:04.898Z\",\"updatedAt\":\"2023-05-11T14:12:04.898Z\"},{\"amount\":42100,\"description\":\"ALQUILER Necochea 1334 05 02 Mayo/2023\",\"id\":96568201683814320000,\"ContractId\":20,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-11T14:12:04.915Z\",\"updatedAt\":\"2023-05-11T14:12:04.915Z\"},{\"amount\":-3368,\"description\":\"HONORARIOS Necochea 1334 05 02 Mayo/2023\",\"id\":4077201683814324700,\"ContractId\":20,\"createdAt\":\"2023-05-11T14:12:04.915Z\",\"updatedAt\":\"2023-05-11T14:12:04.915Z\"}]','[{\"id\":20,\"PropertyId\":31,\"paymentId\":null,\"clientAmount\":0,\"ownerAmount\":-900,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Expensas extraordinarias Abril/23 | Necochea 1334 01-03 Mayo/2023\",\"expiredDate\":\"2023-05-11\",\"createdAt\":\"2023-05-11T13:27:50.000Z\",\"updatedAt\":\"2023-05-11T13:27:50.000Z\",\"ContractId\":1},{\"id\":19,\"PropertyId\":25,\"paymentId\":null,\"clientAmount\":-1925,\"ownerAmount\":-1925,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Expensas extraordinarias Abril/23 | Necochea 1334 05-02 Mayo/2023\",\"expiredDate\":\"2023-05-11\",\"createdAt\":\"2023-05-11T13:26:36.000Z\",\"updatedAt\":\"2023-05-11T13:26:36.000Z\",\"ContractId\":20}]','2023-05-11','2023-05-11 14:15:53',NULL),(18,4,4,'','Mayo',2023,58590,0,'[{\"amount\":65100,\"description\":\"ALQUILER Maipu  1431 02 01 Mayo/2023\",\"id\":57968231683902340000,\"ContractId\":23,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-12T14:39:02.088Z\",\"updatedAt\":\"2023-05-12T14:39:02.088Z\"},{\"amount\":-6510,\"description\":\"HONORARIOS Maipu  1431 02 01 Mayo/2023\",\"id\":6338231683902342000,\"ContractId\":23,\"createdAt\":\"2023-05-12T14:39:02.088Z\",\"updatedAt\":\"2023-05-12T14:39:02.088Z\"}]','[]','2023-05-12','2023-05-12 14:39:37',NULL),(19,21,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,32256.9,0,'[{\"amount\":35841,\"description\":\"ALQUILER san lorenzo 863 04 02 Mayo/2023\",\"id\":40191181684155110000,\"ContractId\":18,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T12:51:55.245Z\",\"updatedAt\":\"2023-05-15T12:51:55.245Z\"},{\"amount\":-3584.1,\"description\":\"HONORARIOS san lorenzo 863 04 02 Mayo/2023\",\"id\":3550181684155115000,\"ContractId\":18,\"createdAt\":\"2023-05-15T12:51:55.245Z\",\"updatedAt\":\"2023-05-15T12:51:55.245Z\"}]','[]','2023-05-15','2023-05-15 12:52:33',NULL),(20,6,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,27173.7,0,'[{\"amount\":-3019.3,\"description\":\"HONORARIOS San Lorenzo 863 03 02 Mayo/2023\",\"id\":3005121684155163600,\"ContractId\":12,\"createdAt\":\"2023-05-15T12:52:43.457Z\",\"updatedAt\":\"2023-05-15T12:52:43.457Z\"},{\"amount\":30193,\"description\":\"ALQUILER San Lorenzo 863 03 02 Mayo/2023\",\"id\":8158121684155164000,\"ContractId\":12,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T12:52:43.456Z\",\"updatedAt\":\"2023-05-15T12:52:43.457Z\"}]','[]','2023-05-15','2023-05-15 12:53:06',NULL),(21,29,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,31718.6,0,'[{\"amount\":35242.9,\"description\":\"ALQUILER La Paz 1138 00 03 Mayo/2023\",\"id\":37105471684155335000,\"ContractId\":47,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T12:55:34.060Z\",\"updatedAt\":\"2023-05-15T12:55:34.060Z\"},{\"amount\":-3524.29,\"description\":\"HONORARIOS La Paz 1138 00 03 Mayo/2023\",\"id\":71471684155334060,\"ContractId\":47,\"createdAt\":\"2023-05-15T12:55:34.060Z\",\"updatedAt\":\"2023-05-15T12:55:34.060Z\"}]','[]','2023-05-15','2023-05-15 12:55:56',NULL),(22,22,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,12420,0,'[{\"amount\":13800,\"description\":\"ALQUILER Sarmiento 1247 06 07 Mayo/2023\",\"id\":19605431684155810000,\"ContractId\":43,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:03:29.169Z\",\"updatedAt\":\"2023-05-15T13:03:29.169Z\"},{\"amount\":-1380,\"description\":\"HONORARIOS Sarmiento 1247 06 07 Mayo/2023\",\"id\":2593431684155809300,\"ContractId\":43,\"createdAt\":\"2023-05-15T13:03:29.169Z\",\"updatedAt\":\"2023-05-15T13:03:29.169Z\"}]','[]','2023-05-15','2023-05-15 13:05:12',NULL),(23,16,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,32580,0,'[{\"amount\":36200,\"description\":\"ALQUILER 1º de Mayo 2551 05 02 Mayo/2023\",\"id\":7716421684155926000,\"ContractId\":2,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:05:25.386Z\",\"updatedAt\":\"2023-05-15T13:05:25.386Z\"},{\"amount\":-3620,\"description\":\"HONORARIOS 1º de Mayo 2551 05 02 Mayo/2023\",\"id\":379321684155925400,\"ContractId\":2,\"createdAt\":\"2023-05-15T13:05:25.386Z\",\"updatedAt\":\"2023-05-15T13:05:25.386Z\"}]','[]','2023-05-15','2023-05-15 13:06:12',NULL),(24,43,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,27036,0,'[{\"amount\":30040,\"description\":\"ALQUILER Sarmiento 1247 07 04 Mayo/2023\",\"id\":47051684156037624,\"ContractId\":5,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:07:17.624Z\",\"updatedAt\":\"2023-05-15T13:07:17.624Z\"},{\"amount\":-3004,\"description\":\"HONORARIOS Sarmiento 1247 07 04 Mayo/2023\",\"id\":549351684156037600,\"ContractId\":5,\"createdAt\":\"2023-05-15T13:07:17.624Z\",\"updatedAt\":\"2023-05-15T13:07:17.624Z\"}]','[]','2023-05-15','2023-05-15 13:08:20',NULL),(25,42,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,32432.4,0,'[{\"amount\":36036,\"description\":\"ALQUILER Buenos Aires 1659 00 03 Mayo/2023\",\"id\":21486221684156460000,\"ContractId\":22,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:14:20.081Z\",\"updatedAt\":\"2023-05-15T13:14:20.081Z\"},{\"amount\":-3603.6,\"description\":\"HONORARIOS Buenos Aires 1659 00 03 Mayo/2023\",\"id\":6914221684156460000,\"ContractId\":22,\"createdAt\":\"2023-05-15T13:14:20.081Z\",\"updatedAt\":\"2023-05-15T13:14:20.081Z\"}]','[]','2023-05-15','2023-05-15 13:14:42',NULL),(26,2,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,22230,0,'[{\"amount\":-2470,\"description\":\"HONORARIOS Caferatta 2033 03 03 Mayo/2023\",\"id\":5286491684156519000,\"ContractId\":49,\"createdAt\":\"2023-05-15T13:15:19.848Z\",\"updatedAt\":\"2023-05-15T13:15:19.848Z\"},{\"amount\":24700,\"description\":\"ALQUILER Caferatta 2033 03 03 Mayo/2023\",\"id\":46498491684156520000,\"ContractId\":49,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:15:19.848Z\",\"updatedAt\":\"2023-05-15T13:15:19.848Z\"}]','[]','2023-05-15','2023-05-15 13:15:38',NULL),(27,8,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,33203,0,'[{\"amount\":34300,\"description\":\"ALQUILER Gaboto 1821 01 02 Mayo/2023\",\"id\":34605171684156543000,\"ContractId\":17,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:15:43.569Z\",\"updatedAt\":\"2023-05-15T13:15:43.569Z\"},{\"amount\":-3430,\"description\":\"HONORARIOS Gaboto 1821 01 02 Mayo/2023\",\"id\":4096171684156543500,\"ContractId\":17,\"createdAt\":\"2023-05-15T13:15:43.569Z\",\"updatedAt\":\"2023-05-15T13:15:43.569Z\"},{\"id\":2,\"description\":\"Tgi Mayo/2023\",\"amount\":1312,\"date\":\"2023-04-24\",\"ContractId\":17,\"createdAt\":\"2023-04-24T16:09:24.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"},{\"id\":1,\"description\":\"Aguas Mayo/2023\",\"amount\":1021,\"date\":\"2023-04-24\",\"ContractId\":17,\"createdAt\":\"2023-04-24T16:08:03.000Z\",\"updatedAt\":\"2023-05-02T00:55:00.000Z\"}]','[]','2023-05-15','2023-05-15 13:16:13',NULL),(28,41,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,22977,0,'[{\"amount\":25530,\"description\":\"ALQUILER Sarmiento 1247 08 03 Mayo/2023\",\"id\":91068191684157850000,\"ContractId\":19,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:37:22.389Z\",\"updatedAt\":\"2023-05-15T13:37:22.389Z\"},{\"amount\":-2553,\"description\":\"HONORARIOS Sarmiento 1247 08 03 Mayo/2023\",\"id\":9549191684157841000,\"ContractId\":19,\"createdAt\":\"2023-05-15T13:37:22.389Z\",\"updatedAt\":\"2023-05-15T13:37:22.389Z\"}]','[]','2023-05-15','2023-05-15 13:38:08',NULL),(29,13,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,20430,0,'[{\"amount\":22700,\"description\":\"ALQUILER Sarmiento 1247 02 05 Mayo/2023\",\"id\":95905211684157920000,\"ContractId\":21,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:38:28.072Z\",\"updatedAt\":\"2023-05-15T13:38:28.072Z\"},{\"amount\":-2270,\"description\":\"HONORARIOS Sarmiento 1247 02 05 Mayo/2023\",\"id\":5225211684157908000,\"ContractId\":21,\"createdAt\":\"2023-05-15T13:38:28.072Z\",\"updatedAt\":\"2023-05-15T13:38:28.072Z\"}]','[]','2023-05-15','2023-05-15 13:39:18',NULL),(30,38,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,87120,0,'[{\"amount\":26800,\"description\":\"ALQUILER Pj. Costarelli 5368 01  Mayo/2023\",\"id\":62578481684158040000,\"ContractId\":48,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:40:36.740Z\",\"updatedAt\":\"2023-05-15T13:40:36.740Z\"},{\"amount\":-2680,\"description\":\"HONORARIOS Pj. Costarelli 5368 01  Mayo/2023\",\"id\":325481684158036740,\"ContractId\":48,\"createdAt\":\"2023-05-15T13:40:36.740Z\",\"updatedAt\":\"2023-05-15T13:40:36.740Z\"},{\"amount\":70000,\"description\":\"ALQUILER Regimiento 11  178   Mayo/2023\",\"id\":13561451684158036000,\"ContractId\":45,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:40:36.771Z\",\"updatedAt\":\"2023-05-15T13:40:36.771Z\"},{\"amount\":-7000,\"description\":\"HONORARIOS Regimiento 11  178   Mayo/2023\",\"id\":1465451684158036700,\"ContractId\":45,\"createdAt\":\"2023-05-15T13:40:36.771Z\",\"updatedAt\":\"2023-05-15T13:40:36.771Z\"}]','[]','2023-05-15','2023-05-15 13:41:25',NULL),(31,1,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,22050,0,'[{\"amount\":24500,\"description\":\"ALQUILER Ituzaingo 744 00 06 Mayo/2023\",\"id\":97176161684158090000,\"ContractId\":16,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:41:34.411Z\",\"updatedAt\":\"2023-05-15T13:41:34.411Z\"},{\"amount\":-2450,\"description\":\"HONORARIOS Ituzaingo 744 00 06 Mayo/2023\",\"id\":3691161684158094300,\"ContractId\":16,\"createdAt\":\"2023-05-15T13:41:34.411Z\",\"updatedAt\":\"2023-05-15T13:41:34.411Z\"}]','[]','2023-05-15','2023-05-15 13:42:05',NULL),(32,19,4,'Se realiza pago x transferencia dia 08/05/2023','Mayo',2023,51520,0,'[{\"amount\":-4480,\"description\":\"HONORARIOS Zeballos 867 08 03 Mayo/2023\",\"id\":8989411684158179000,\"ContractId\":41,\"createdAt\":\"2023-05-15T13:42:59.311Z\",\"updatedAt\":\"2023-05-15T13:42:59.311Z\"},{\"amount\":56000,\"description\":\"ALQUILER Zeballos 867 08 03 Mayo/2023\",\"id\":67226411684158180000,\"ContractId\":41,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:42:59.311Z\",\"updatedAt\":\"2023-05-15T13:42:59.311Z\"}]','[]','2023-05-15','2023-05-15 13:43:27',NULL),(33,44,4,'Se realiza pago x transferencia dia 15/05/2023','Mayo',2023,134766,0,'[{\"amount\":59600,\"description\":\"ALQUILER Urquiza  1949 13 04 Mayo/2023\",\"id\":96785281684158270000,\"ContractId\":28,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:44:29.187Z\",\"updatedAt\":\"2023-05-15T13:44:29.187Z\"},{\"amount\":-5960,\"description\":\"HONORARIOS Urquiza  1949 13 04 Mayo/2023\",\"id\":174281684158269200,\"ContractId\":28,\"createdAt\":\"2023-05-15T13:44:29.187Z\",\"updatedAt\":\"2023-05-15T13:44:29.187Z\"},{\"amount\":38090,\"description\":\"ALQUILER Sarmiento 1247 06 08 Mayo/2023\",\"id\":48069291684158270000,\"ContractId\":29,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:44:29.245Z\",\"updatedAt\":\"2023-05-15T13:44:29.245Z\"},{\"amount\":-3809,\"description\":\"HONORARIOS Sarmiento 1247 06 08 Mayo/2023\",\"id\":5115291684158269000,\"ContractId\":29,\"createdAt\":\"2023-05-15T13:44:29.245Z\",\"updatedAt\":\"2023-05-15T13:44:29.245Z\"},{\"amount\":52050,\"description\":\"ALQUILER Urquiza 1949 07 06 Mayo/2023\",\"id\":21374301684158267000,\"ContractId\":30,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T13:44:29.245Z\",\"updatedAt\":\"2023-05-15T13:44:29.245Z\"},{\"amount\":-5205,\"description\":\"HONORARIOS Urquiza 1949 07 06 Mayo/2023\",\"id\":8127301684158269000,\"ContractId\":30,\"createdAt\":\"2023-05-15T13:44:29.245Z\",\"updatedAt\":\"2023-05-15T13:44:29.245Z\"}]','[]','2023-05-15','2023-05-15 13:46:19',NULL),(34,28,1,'','Mayo',2023,81498,0,'[{\"amount\":36800,\"description\":\"ALQUILER Sarmiento  1247 01 02 Mayo/2023\",\"id\":515261684162752600,\"ContractId\":26,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T14:59:12.577Z\",\"updatedAt\":\"2023-05-15T14:59:12.577Z\"},{\"amount\":-3680,\"description\":\"HONORARIOS Sarmiento  1247 01 02 Mayo/2023\",\"id\":392261684162752600,\"ContractId\":26,\"createdAt\":\"2023-05-15T14:59:12.577Z\",\"updatedAt\":\"2023-05-15T14:59:12.577Z\"},{\"id\":8,\"description\":\"Api Mayo/2023\",\"amount\":453,\"date\":\"2023-04-24\",\"ContractId\":26,\"createdAt\":\"2023-04-24T16:13:46.000Z\",\"updatedAt\":\"2023-05-02T00:55:01.000Z\"},{\"id\":6,\"description\":\"Tgi Mayo/2023\",\"amount\":2054,\"date\":\"2023-04-24\",\"ContractId\":26,\"createdAt\":\"2023-04-24T16:13:10.000Z\",\"updatedAt\":\"2023-05-02T00:55:01.000Z\"},{\"id\":7,\"description\":\"Aguas Mayo/2023\",\"amount\":2190,\"date\":\"2023-04-24\",\"ContractId\":26,\"createdAt\":\"2023-04-24T16:13:32.000Z\",\"updatedAt\":\"2023-05-02T00:55:01.000Z\"},{\"amount\":44010,\"description\":\"ALQUILER Riobamba 40 bi 01 02 Mayo/2023\",\"id\":80516271684162750000,\"ContractId\":27,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T14:59:12.593Z\",\"updatedAt\":\"2023-05-15T14:59:12.593Z\"},{\"amount\":-4401,\"description\":\"HONORARIOS Riobamba 40 bi 01 02 Mayo/2023\",\"id\":2685271684162752500,\"ContractId\":27,\"createdAt\":\"2023-05-15T14:59:12.593Z\",\"updatedAt\":\"2023-05-15T14:59:12.593Z\"},{\"id\":5,\"description\":\"Api Mayo/2023\",\"amount\":305,\"date\":\"2023-04-24\",\"ContractId\":27,\"createdAt\":\"2023-04-24T16:12:34.000Z\",\"updatedAt\":\"2023-05-02T00:55:01.000Z\"},{\"id\":3,\"description\":\"Tgi Mayo/2023\",\"amount\":1914,\"date\":\"2023-04-24\",\"ContractId\":27,\"createdAt\":\"2023-04-24T16:12:02.000Z\",\"updatedAt\":\"2023-05-02T00:55:01.000Z\"},{\"id\":4,\"description\":\"Aguas Mayo/2023\",\"amount\":1853,\"date\":\"2023-04-24\",\"ContractId\":27,\"createdAt\":\"2023-04-24T16:12:19.000Z\",\"updatedAt\":\"2023-05-02T00:55:01.000Z\"}]','[]','2023-05-15','2023-05-15 14:59:42',NULL),(36,47,4,'Pago x Trasnferencia 15/05/2023','Mayo',2023,17339.4,0,'[{\"amount\":19266,\"description\":\"ALQUILER 3 de Febrero  1366 01 04 Mayo/2023\",\"id\":2026041684166146300,\"ContractId\":4,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T15:55:46.277Z\",\"updatedAt\":\"2023-05-15T15:55:46.277Z\"},{\"amount\":-1926.6,\"description\":\"HONORARIOS 3 de Febrero  1366 01 04 Mayo/2023\",\"id\":756841684166146300,\"ContractId\":4,\"createdAt\":\"2023-05-15T15:55:46.277Z\",\"updatedAt\":\"2023-05-15T15:55:46.277Z\"}]','[]','2023-05-15','2023-05-15 15:56:31',NULL),(37,3,4,'Pago x transferencia 15/05/2023 ','Mayo',2023,84807,0,'[{\"amount\":25800,\"description\":\"ALQUILER Gaboto 1821 04 02 Mayo/2023\",\"id\":9910181684166269000,\"ContractId\":8,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T15:57:49.622Z\",\"updatedAt\":\"2023-05-15T15:57:49.622Z\"},{\"amount\":-2580,\"description\":\"HONORARIOS Gaboto 1821 04 02 Mayo/2023\",\"id\":948781684166269600,\"ContractId\":8,\"createdAt\":\"2023-05-15T15:57:49.622Z\",\"updatedAt\":\"2023-05-15T15:57:49.622Z\"},{\"amount\":27830,\"description\":\"ALQUILER Cerrito 553 02 03 Mayo/2023\",\"id\":47824101684166270000,\"ContractId\":10,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T15:57:49.654Z\",\"updatedAt\":\"2023-05-15T15:57:49.654Z\"},{\"amount\":-2783,\"description\":\"HONORARIOS Cerrito 553 02 03 Mayo/2023\",\"id\":145101684166269660,\"ContractId\":10,\"createdAt\":\"2023-05-15T15:57:49.654Z\",\"updatedAt\":\"2023-05-15T15:57:49.654Z\"},{\"amount\":40600,\"description\":\"ALQUILER Gaboto 1875 06 04 Mayo/2023\",\"id\":6628491684166270000,\"ContractId\":9,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T15:57:49.654Z\",\"updatedAt\":\"2023-05-15T15:57:49.654Z\"},{\"amount\":-4060,\"description\":\"HONORARIOS Gaboto 1875 06 04 Mayo/2023\",\"id\":179191684166269660,\"ContractId\":9,\"createdAt\":\"2023-05-15T15:57:49.654Z\",\"updatedAt\":\"2023-05-15T15:57:49.654Z\"}]','[]','2023-05-15','2023-05-15 15:58:31',NULL),(38,40,1,'','Mayo',2023,60120,0,'[{\"amount\":66800,\"description\":\"ALQUILER Corrientes 1591 00 06 Mayo/2023\",\"id\":16886461684168206000,\"ContractId\":46,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-15T16:30:06.210Z\",\"updatedAt\":\"2023-05-15T16:30:06.210Z\"},{\"amount\":-6680,\"description\":\"HONORARIOS Corrientes 1591 00 06 Mayo/2023\",\"id\":1315461684168206300,\"ContractId\":46,\"createdAt\":\"2023-05-15T16:30:06.210Z\",\"updatedAt\":\"2023-05-15T16:30:06.210Z\"}]','[]','2023-05-15','2023-05-15 16:30:47',NULL),(39,9,4,'Pago por trasferencia dia 15/05/2023','Mayo',2023,19780,0,'[{\"amount\":23500,\"description\":\"ALQUILER sarmiento 1247 07 02 Mayo/2023\",\"id\":9604441684247600000,\"ContractId\":44,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-16T14:33:20.004Z\",\"updatedAt\":\"2023-05-16T14:33:20.004Z\"},{\"amount\":-2350,\"description\":\"HONORARIOS sarmiento 1247 07 02 Mayo/2023\",\"id\":6939441684247600000,\"ContractId\":44,\"createdAt\":\"2023-05-16T14:33:20.004Z\",\"updatedAt\":\"2023-05-16T14:33:20.004Z\"}]','[{\"id\":10,\"PropertyId\":15,\"paymentId\":null,\"clientAmount\":-1370,\"ownerAmount\":-1370,\"clientPaid\":true,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Expensas extraordinarias Abril/23 | sarmiento 1247 07-02 Mayo/2023\",\"expiredDate\":\"2023-05-04\",\"createdAt\":\"2023-05-04T15:19:25.000Z\",\"updatedAt\":\"2023-05-04T15:27:57.000Z\",\"ContractId\":44}]','2023-05-16','2023-05-16 14:34:28',NULL),(40,10,4,'Pago por trasferencia dia 15/05/2023','Mayo',2023,37875,0,'[{\"amount\":44050,\"description\":\"ALQUILER San Martin 1421 01 04 Mayo/2023\",\"id\":8366231684247687000,\"ContractId\":3,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-16T14:34:47.493Z\",\"updatedAt\":\"2023-05-16T14:34:47.493Z\"},{\"amount\":-4405,\"description\":\"HONORARIOS San Martin 1421 01 04 Mayo/2023\",\"id\":104531684247687490,\"ContractId\":3,\"createdAt\":\"2023-05-16T14:34:47.493Z\",\"updatedAt\":\"2023-05-16T14:34:47.493Z\"}]','[{\"id\":23,\"PropertyId\":16,\"paymentId\":null,\"clientAmount\":-1770,\"ownerAmount\":-1770,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Exp. extraordinarias Abril/23 | San Martin 1421 01-04 Mayo/2023\",\"expiredDate\":\"2023-05-11\",\"createdAt\":\"2023-05-11T15:24:19.000Z\",\"updatedAt\":\"2023-05-15T12:33:38.000Z\",\"ContractId\":3}]','2023-05-16','2023-05-16 14:35:15',NULL),(41,14,4,'Pago por trasferencia dia 15/05/2023','Mayo',2023,25374.2,0,'[{\"amount\":32038,\"description\":\"ALQUILER Mitre 757 08 06 Mayo/2023\",\"id\":16960311684247726000,\"ContractId\":31,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-16T14:35:26.523Z\",\"updatedAt\":\"2023-05-16T14:35:26.523Z\"},{\"amount\":-3203.8,\"description\":\"HONORARIOS Mitre 757 08 06 Mayo/2023\",\"id\":9834311684247726000,\"ContractId\":31,\"createdAt\":\"2023-05-16T14:35:26.523Z\",\"updatedAt\":\"2023-05-16T14:35:26.523Z\"}]','[{\"id\":24,\"PropertyId\":19,\"paymentId\":null,\"clientAmount\":0,\"ownerAmount\":-3460,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Ultima cuota compra termotanque cuota 12/12 $ 3460 | Mitre 757 08-06 Mayo/2023\",\"expiredDate\":\"2023-05-16\",\"createdAt\":\"2023-05-15T12:49:44.000Z\",\"updatedAt\":\"2023-05-15T12:49:44.000Z\",\"ContractId\":31}]','2023-05-16','2023-05-16 14:35:54',NULL),(42,30,4,'Pago por trasferencia dia 16/05/2023','Mayo',2023,20115,0,'[{\"amount\":22350,\"description\":\"ALQUILER COLON 1256 04 05 Mayo/2023\",\"id\":78265251684248030000,\"ContractId\":25,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-16T14:40:28.231Z\",\"updatedAt\":\"2023-05-16T14:40:28.231Z\"},{\"amount\":-2235,\"description\":\"HONORARIOS COLON 1256 04 05 Mayo/2023\",\"id\":1993251684248028200,\"ContractId\":25,\"createdAt\":\"2023-05-16T14:40:28.231Z\",\"updatedAt\":\"2023-05-16T14:40:28.231Z\"}]','[]','2023-05-16','2023-05-16 14:41:08',NULL),(43,26,4,'TAMBIEN SE ABONA ALQ. OFICINA MES DE MAYO/23 $ 19.181.-\nPAGOS transferencia dia 15/05/2023 $ 33.766 Y dia 16/05/2023 $ 17.685','Mayo',2023,32269.5,0,'[{\"amount\":39785,\"description\":\"ALQUILER Buenos Aires 880 01 04 Mayo/2023\",\"id\":7305861684252174000,\"ContractId\":6,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-16T15:49:34.608Z\",\"updatedAt\":\"2023-05-16T15:49:34.608Z\"},{\"amount\":-3978.5,\"description\":\"HONORARIOS Buenos Aires 880 01 04 Mayo/2023\",\"id\":1461684252174608,\"ContractId\":6,\"createdAt\":\"2023-05-16T15:49:34.608Z\",\"updatedAt\":\"2023-05-16T15:49:34.608Z\"}]','[{\"id\":27,\"PropertyId\":6,\"paymentId\":null,\"clientAmount\":0,\"ownerAmount\":-3537,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Ajuste desde nov/22 a Abril/23 x pagar $ 39344 en lugar de $ 35807, CUOTA 1/5 | Buenos Aires 880 01-04 Mayo/2023\",\"expiredDate\":\"2023-05-17\",\"createdAt\":\"2023-05-16T15:47:06.000Z\",\"updatedAt\":\"2023-05-16T15:47:06.000Z\",\"ContractId\":6}]','2023-05-16','2023-05-16 15:55:16',NULL),(44,31,1,'','Mayo',2023,29700,0,'[{\"amount\":42000,\"description\":\"ALQUILER Pellegrini 1068 01 03 Mayo/2023\",\"id\":23650131684419707000,\"ContractId\":13,\"paidCurrentMonth\":true,\"rent\":true,\"createdAt\":\"2023-05-18T14:21:47.462Z\",\"updatedAt\":\"2023-05-18T14:21:47.462Z\"},{\"amount\":-4200,\"description\":\"HONORARIOS Pellegrini 1068 01 03 Mayo/2023\",\"id\":3193131684419707400,\"ContractId\":13,\"createdAt\":\"2023-05-18T14:21:47.462Z\",\"updatedAt\":\"2023-05-18T14:21:47.462Z\"}]','[{\"id\":37,\"PropertyId\":39,\"paymentId\":null,\"clientAmount\":23305,\"ownerAmount\":18900,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Proporcional 15 dias alq. Abril/2023 | Pellegrini 1068 01-03 Mayo/2023\",\"expiredDate\":\"2023-05-19\",\"createdAt\":\"2023-05-18T14:19:42.000Z\",\"updatedAt\":\"2023-05-18T14:19:42.000Z\",\"ContractId\":13},{\"id\":36,\"PropertyId\":39,\"paymentId\":null,\"clientAmount\":0,\"ownerAmount\":-12000,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Barreto: perdida termotanque y arreglo canilla patio y cocina | Pellegrini 1068 01-03 Mayo/2023\",\"expiredDate\":\"2023-05-19\",\"createdAt\":\"2023-05-18T14:09:23.000Z\",\"updatedAt\":\"2023-05-18T14:09:23.000Z\",\"ContractId\":13},{\"id\":5,\"PropertyId\":39,\"paymentId\":null,\"clientAmount\":0,\"ownerAmount\":-15000,\"clientPaid\":false,\"isReverted\":false,\"ownerPaid\":false,\"description\":\"Pintura alacenas y bajo mesada materiales y m.o. y limpieza gral. | Pellegrini 1068 01-03 Mayo/2023\",\"expiredDate\":\"2023-04-26\",\"createdAt\":\"2023-04-26T14:11:28.000Z\",\"updatedAt\":\"2023-05-02T00:55:01.000Z\",\"ContractId\":13}]','2023-05-18','2023-05-18 14:22:39',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricehistorials`
--

LOCK TABLES `pricehistorials` WRITE;
/*!40000 ALTER TABLE `pricehistorials` DISABLE KEYS */;
INSERT INTO `pricehistorials` VALUES (1,1,21700,2,0,'2023-04-21 14:17:13','2023-05-05 15:46:44'),(2,2,36200,2,0,'2023-04-21 14:24:41','2023-05-05 15:45:42'),(3,3,44050,3,0,'2023-04-21 14:28:16','2023-05-05 15:44:05'),(4,4,19266,2,0,'2023-04-21 14:36:49','2023-05-05 15:42:27'),(5,5,30040,3,0,'2023-04-21 14:38:36','2023-05-05 15:41:26'),(6,6,39785,3,0,'2023-04-21 14:40:47','2023-05-15 15:41:37'),(7,7,29100,2,0,'2023-04-21 14:42:30','2023-05-15 17:00:51'),(8,8,25800,1,0,'2023-04-21 14:52:25','2023-05-02 00:55:00'),(9,9,40600,2,0,'2023-04-21 14:53:42','2023-05-05 15:34:39'),(10,10,27830,1,0,'2023-04-21 14:55:10','2023-05-02 00:55:00'),(11,11,38800,1,0,'2023-04-21 15:13:12','2023-05-02 00:55:00'),(12,12,30193,2,0,'2023-04-21 15:16:58','2023-05-05 15:33:56'),(13,15,49200,1,0,'2023-04-21 15:34:41','2023-05-02 00:55:00'),(14,16,24500,3,0,'2023-04-21 15:52:08','2023-05-05 15:30:17'),(15,17,34300,2,0,'2023-04-21 15:54:20','2023-05-05 14:36:28'),(16,18,35841,1,0,'2023-04-21 15:55:49','2023-05-02 00:55:00'),(17,19,25530,2,0,'2023-04-21 16:29:02','2023-05-15 13:35:56'),(18,20,42100,2,0,'2023-04-21 16:30:50','2023-05-05 15:27:29'),(19,21,22700,2,0,'2023-04-21 16:33:28','2023-05-05 15:26:30'),(20,22,36036,1,0,'2023-04-21 16:36:33','2023-05-02 00:55:00'),(21,23,65100,1,0,'2023-04-21 16:38:19','2023-05-02 00:55:00'),(22,24,44623,1,0,'2023-04-21 16:47:43','2023-05-02 00:55:00'),(23,25,22350,3,0,'2023-04-21 16:50:54','2023-05-16 14:38:25'),(24,26,36800,1,0,'2023-04-21 16:56:29','2023-05-02 00:55:00'),(25,27,44010,1,0,'2023-04-21 16:58:07','2023-05-02 00:55:00'),(26,28,59600,1,0,'2023-04-21 17:00:14','2023-05-02 00:55:00'),(27,29,38090,2,0,'2023-04-21 17:04:30','2023-05-05 15:21:10'),(28,30,52050,1,0,'2023-04-21 17:06:41','2023-05-02 00:55:00'),(29,31,32038,2,0,'2023-04-21 17:08:37','2023-05-05 15:19:40'),(30,32,22700,1,0,'2023-04-21 17:11:36','2023-05-02 00:55:00'),(33,35,14500,3,0,'2023-04-21 17:28:00','2023-05-05 15:17:53'),(34,39,18500,1,0,'2023-04-21 17:34:01','2023-05-02 00:55:00'),(35,40,30960,2,0,'2023-04-21 17:35:55','2023-05-05 15:15:38'),(36,41,56000,1,0,'2023-04-21 17:37:57','2023-05-02 00:55:00'),(37,42,50000,1,0,'2023-04-21 17:40:12','2023-05-02 00:55:00'),(38,43,13800,1,0,'2023-04-21 17:41:54','2023-05-02 00:55:00'),(39,44,23500,1,0,'2023-04-21 17:43:22','2023-05-04 15:25:28'),(40,45,70000,1,0,'2023-04-21 17:44:40','2023-05-02 00:55:00'),(41,46,66800,1,0,'2023-04-21 17:53:10','2023-05-02 00:55:00'),(42,47,17710,1,0,'2023-04-21 17:54:48','2023-05-02 00:55:00'),(43,48,26800,1,0,'2023-04-21 17:56:03','2023-05-02 00:55:00'),(44,49,24700,1,0,'2023-04-21 17:58:58','2023-05-02 00:55:00'),(45,50,26300,1,0,'2023-04-21 18:00:43','2023-05-02 00:55:00'),(46,13,42000,1,0,'2023-04-21 18:00:43','2023-05-05 15:32:57'),(47,54,14500,3,0,'2023-04-26 01:40:41','2023-05-05 14:46:05'),(49,47,35242.9,2,99,'2023-05-04 14:10:12','2023-05-04 14:10:12'),(53,55,47800,1,0,'2023-05-22 13:19:03','2023-05-22 13:19:03'),(54,56,57800,1,0,'2023-05-23 13:34:36','2023-05-23 13:34:36');
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
INSERT INTO `properties` VALUES (1,3,2,1,'Ituzaingo','744','00','06','Alquiler','109-016-7256-006-5','22033705 C. de gestion 10510204','16-03-02-224915/0010-4','','Ocupado','Adm. no tiene','150','2023-04-20 17:15:53','2023-05-02 00:54:58',NULL),(2,2,2,2,'Caferatta','2033','03','03','Alquiler','','','','','Ocupado','Administración Neiman // Tel.: 3415632420 // \nMail: maira_neiman@hotmail.com','184','2023-04-20 17:17:35','2023-05-02 00:54:58',NULL),(3,3,2,15,'Gaboto','3573','00','04','Alquiler','','1107197-04 c. DE GESTION 34185710','16-03-11-309378/0016-1','','Ocupado','','207','2023-04-20 17:19:13','2023-05-02 00:54:58',NULL),(4,3,2,15,'Gaboto','3573','00','03','Alquiler','','1107204-11 C. de gestion 34186402','16-03-11-309378/0015-2','','Ocupado','','208','2023-04-20 17:19:57','2023-05-02 00:54:58',NULL),(5,3,3,15,'Gaboto','3573','00','05','Alquiler','','1107203-02 C. de gestion 34186304','16-03-11-309378/0017-0','','Ocupado','','209','2023-04-20 17:20:36','2023-05-02 00:54:58',NULL),(6,5,3,26,'Buenos Aires','880','01','04','Alquiler','109-0023226-009-1','0111930-03','16-03-01-217000/0009-0','','Ocupado','Adm. Sergio Gasparroni Tel 4402573 Mail: adm.gasparroni@gmail.com','114','2023-04-20 17:21:19','2023-05-02 00:54:58',NULL),(7,3,3,3,'Gaboto','1821','04','02','Alquiler','109-0114791-038-2','31186311','16-03-237250/0388-1','','Ocupado','Adm. Grappiolo Tel: 4494529 / 155520337 / ','117','2023-04-20 17:24:32','2023-05-02 00:54:58',NULL),(8,3,2,3,'Cerrito','553','02','03','Alquiler','109-0147175-009-9','','16-03-02-226541/0011-8','','Ocupado','Adm. ESTUDIO FENIX / Tel: 3415 85-7622 / Mail: estudio-fenix@hotmail.com \n\n','123','2023-04-20 17:25:33','2023-05-02 00:54:58',NULL),(9,3,3,3,'Gaboto','1875','06','04','Alquiler','109-0108064-028-5','','16-03-03-237250/0228-6','','Ocupado','Adm. Ana Maria Eraso / Tel: 3415 66-6959','118','2023-04-20 17:27:09','2023-05-02 00:54:58',NULL),(10,5,7,4,'Maipu ','1431','02','01','Alquiler','','Cuenta 0012127002 Cod. gestion 0002083808','16-03-01-221119/0004-9','','Ocupado','No tiene adm.','108','2023-04-20 17:27:59','2023-05-02 00:54:58',NULL),(11,3,1,5,'Mitre','2458','02','03','Alquiler','','','','','Ocupado','','186','2023-04-20 17:29:12','2023-05-02 00:54:58',NULL),(12,5,3,6,'San Lorenzo','863','03','02','Alquiler','109-0014756-009-8','0176626-11 C. de Gestion 7372607','16-03-01-216127/0008-0','','Ocupado','Adm. ','131','2023-04-20 17:30:47','2023-05-02 00:54:58',NULL),(13,5,3,21,'san lorenzo','863','04','02','Alquiler','','0176628-07  C. de Gestion 7372803','','','Ocupado','','153','2023-04-20 17:31:52','2023-05-02 00:54:58',NULL),(14,3,3,8,'Gaboto','1821','01','02','Alquiler','','','','','Ocupado','','104','2023-04-20 17:34:41','2023-05-02 00:54:58',NULL),(15,5,2,9,'sarmiento','1247','07','02','Alquiler','','','','','Ocupado','','182','2023-04-20 17:35:34','2023-05-02 00:54:58',NULL),(16,5,3,10,'San Martin','1421','01','04','Alquiler','','','','','Ocupado','','106','2023-04-20 17:36:23','2023-05-02 00:54:58',NULL),(17,5,2,12,'Mendoza','989','05','03','Alquiler','109-0013842-019-5   0000359084','0140997-02','16-03-01-219393/0015-2','','Ocupado','Adm. Centro','116','2023-04-20 17:37:57','2023-05-02 00:54:58',NULL),(18,5,1,13,'Sarmiento','1247','02','05','Alquiler','','172461-04 C. de gestion 6990505','16-03-01-219389/0017-7','','Ocupado','Adm. Centro','176','2023-04-20 17:40:03','2023-05-02 00:54:58',NULL),(19,5,1,14,'Mitre','757','08','06','Alquiler','','109166-02 C. de gestion 896103','16-03-01-216479/0020-4','','Ocupado','Adm. Bone - Tel: 4110033 / 156984300 / 152036094 / Mail: contacto@bone.com.ar','202','2023-04-20 17:41:01','2023-05-02 00:54:58',NULL),(20,5,2,15,'Corrientes','1273','07','02','Alquiler','','','','','Ocupado','','127','2023-04-20 17:42:20','2023-05-02 00:54:58',NULL),(21,3,6,15,'Vera Mujica','2106','','','Alquiler','109-0107762-000-1','1003725-10 C. de Gestion 13329405','16-03-10-302763/002-8','','Ocupado','','143','2023-04-20 17:42:56','2023-05-02 00:54:58',NULL),(22,3,3,16,'1º de Mayo','2551','05','02','Alquiler','','','','','Ocupado','','203','2023-04-20 17:43:55','2023-05-02 00:54:58',NULL),(23,5,3,45,'Cda. Ricardone','1376','04','02','Alquiler','00367660','141943-09  Código gestión 4116505','16-03-01-217387/0007-0','','Ocupado','Adm. gordito boludo Nicolás García / Tel: 3416 89-8359 / Mail: nicolasrgarcia@hotmail.com','183','2023-04-20 17:50:37','2023-05-02 00:54:58',NULL),(24,5,2,18,'3 de Febrero ','2289','01','04','Alquiler','109-0032850-008- 7 unidad fac. 412598','TGI 91531001   //  12211008','16030928729600133  // 729734','','Ocupado','Adm. Centro','171','2023-04-20 17:51:49','2023-05-02 00:54:58',NULL),(25,5,2,18,'Necochea','1334','05','02','Alquiler','1090009026209','TGI  18602106 // 8206611','16030122055300202','','Ocupado','Adm. Centro','191','2023-04-20 17:53:05','2023-05-02 00:54:58',NULL),(26,5,2,18,'Zeballos','74','01','04','Alquiler','','14275211 //  4190110','','','Ocupado','Adm. Joaquín García 341 3075960  // Mail: joaquin.luc.garcia@hotmail.es ','155','2023-04-20 17:54:29','2023-05-23 13:34:36',NULL),(31,5,1,18,'Necochea','1334','01','03','Alquiler','00822041','18601011 / 8205603','160301-220553/0009-9 cod. 1819838','cliente 21790304 persona 1224213','Ocupado','C 192','192','2023-04-20 17:57:03','2023-05-02 00:54:58',NULL),(32,5,2,19,'Zeballos','867','08','03','Alquiler','nº 109-0013500-027-1 Uni. Fac. 0000356282','17952110  Código gestión 76420005','Partida 160301-221855/0028-2 Codigo 0924314','','Ocupado','Adm. Centro','152','2023-04-20 17:57:52','2023-05-02 00:54:58',NULL),(33,5,1,20,'España','437','01','04','Alquiler','109-0011125-017-1 unidad fac. 335946','Cuenta 13259910 Cod. personal 3198604','16-03-01-215066/0039-5','Cliente 0004390207 Persona 2238139','Ocupado','Adm. Veronica Valdez / Sarmiento 424 / Tel. 3412 669222 / 7923403 / Mail:  info.v.valdez@gmail.com','198','2023-04-20 17:58:29','2023-05-22 13:19:03',NULL),(34,5,1,22,'Sarmiento','1247','06','07','Alquiler','','','','','Ocupado','','175','2023-04-20 17:59:33','2023-05-02 00:54:58',NULL),(36,5,2,28,'Sarmiento ','1247','01','02','Alquiler','','','','','Ocupado','','177','2023-04-20 18:01:34','2023-05-02 00:54:58',NULL),(37,3,2,28,'Riobamba','40 bi','01','02','Alquiler','','','','','Ocupado','','196','2023-04-20 18:02:13','2023-05-02 00:54:58',NULL),(38,5,2,29,'La Paz','1138','00','03','Alquiler','','','','','Ocupado','','161','2023-04-20 18:03:47','2023-05-02 00:54:58',NULL),(39,5,1,31,'Pellegrini','1068','01','03','Alquiler','109-0014428-005-4 punto suministro: 00363346','Cuenta: 17260506 Cod.: 7004905','16-03-01-222550/0004-9 Cod.: 0285334','','Ocupado','Adm. Cuenca // Mail: flocuenca@hotmail.com // Paraguay 1227 PB B Teléfono 6799965\nCunata Banco: PAGO POR TRANSFERENCIA Y/O DEPOSITO BANCARIO:\nBANCO NACIÓN - CAJA DE AHORROS EN PESOS No 4442648095 SUCURSAL 3020\nCBU 0110444230044426480951 ALIAS HUEVO.DIOS.PEON TITULARES FLORENCIA CUENCA CUIT 27250077063/IGNACIO AGUILAR 20239788026','136','2023-04-20 18:04:42','2023-05-02 00:54:58',NULL),(40,5,1,37,'Sarmiento','1247','00','03','Alquiler','109-0008869-003-7 /  320995','17244611   /  6989003',' 16030121938900025','','Ocupado','Adm. Centro','132','2023-04-20 18:05:32','2023-05-02 00:54:58',NULL),(41,3,6,38,'Pj. Costarelli','5368','01','','Alquiler','109-0098896-002-7 / Unidad de fac 497190','Cuenta 51864407 Cod gestion 32845409','160305-247241/0006-5  Cod partida 0896114','Cliente 0015314904 Nº persona 889010','Ocupado','','195','2023-04-20 18:06:33','2023-05-17 15:32:38',NULL),(42,3,8,38,'Regimiento 11 ','178','','','Alquiler','109-0083750-000-8 Unidad fac 480140','0050151406 Cod. gestión: 31213408','160305-24680400007 / Cod partida 0817634','','Ocupado','','195 bis','2023-04-20 18:07:15','2023-05-17 15:57:48',NULL),(43,5,2,39,'3 de Febrero 2289','2289','02','04','Alquiler','109-0032850-008-7 unidad de fac. 412598','915313-06   Código de gestión 12211302','16-03-09-287296/0007-2   781554',' Gas Contrato Nº 4572903 Persona 1268262','Libre','Adm. Centro','188','2023-04-20 18:08:46','2023-05-02 00:54:58',NULL),(44,5,5,40,'Corrientes','1591','00','06','Alquiler','109-0016591-006-8 unidad 381185 cuenta 0016591','Cuenta 12234209 Cod. personal 2189709','160301-221732/0001-1 partida 0246734','','Ocupado','','165','2023-04-20 18:09:42','2023-05-02 00:54:58',NULL),(45,5,2,41,'Sarmiento','1247','08','03','Alquiler','','','','','Ocupado','','185','2023-04-20 18:11:00','2023-05-02 00:54:58',NULL),(46,5,2,42,'Buenos Aires','1659','00','03','Alquiler','','0012397008 gestion personal 0002348206','16030122268700107','','Ocupado','Adm. Centro','112','2023-04-20 18:12:10','2023-05-02 00:54:58',NULL),(47,5,1,43,'Sarmiento','1247','07','04','Alquiler','109-0008869-057-3   0000321049','','16-03-01-219389/0056-6','','Ocupado','Administracion Centro','110','2023-04-20 18:13:47','2023-05-02 00:54:58',NULL),(50,5,3,44,'Urquiza ','1949','13','04','Alquiler','','','','','Ocupado','Adm. German Sordoni Tel: 4476411 // 3416 68-9428 // Mail: c-a-abdala@hotmail.com','197','2023-04-20 18:15:49','2023-05-02 00:54:58',NULL),(51,5,2,44,'Urquiza','1949','07','06','Alquiler','punto de suministro 00335557','161923-03 C. de gestion 5962310','16-03-01-215356/0271-9','cliente 0009410701 persona 94107','Ocupado','Adm. German Sordoni Tel: 4476411 // 3416 68-9428 // Mail: c-a-abdala@hotmail.com','200','2023-04-20 18:18:01','2023-05-02 00:54:58',NULL),(52,5,3,44,'Sarmiento','1247','06','08','Alquiler','','172395-02 C. de gestion 6983903','16-03-01-219389/0052-0','','Ocupado','','199','2023-04-20 18:18:38','2023-05-02 00:54:58',NULL),(53,5,1,46,'Sarmiento','1247','03','07','Alquiler','','','','','Ocupado','','168','2023-04-20 18:19:49','2023-05-02 00:54:58',NULL),(54,5,1,47,'3 de Febrero ','1366','01','04','Alquiler','','','','','Ocupado','','109','2023-04-21 14:35:36','2023-05-02 00:54:58',NULL),(55,5,2,30,'COLON','1256','04','05','Alquiler','','17240405','16-03-01-219389/0061-8','','Ocupado','“Administración O.D.A.I.” // Rioja 2935 PB // Te.: (0341) 4-391016/4-215840 //341-5470040 // Mail: cdoino@hotmail.com // Mail: c.grupoambito@gmail.com\n[13:29, 24/11/2022] +54 9 3415 47-0040: Lo cambio???','151','2023-04-21 16:49:30','2023-05-23 14:17:37',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (4,1,'2023-05-10 13:01:00','hija abel mari','0000','','[]','2023-05-08 14:01:40','2023-05-08 14:01:40'),(6,33,'2023-05-09 12:30:00','tomas','11 6107-2596','','[{\"phone\":\"3413587548\",\"fullName\":\"mariana\",\"id\":\"4537d9cf-2d42-470d-aabb-b5bc6149db4b\"},{\"phone\":\"3416924218\",\"fullName\":\"martu\",\"id\":\"c3e244e4-39a0-4ac9-8762-79036e2edabd\"},{\"phone\":\"2944629013\",\"fullName\":\"no se\",\"id\":\"70578f4b-0046-47db-9672-9d66ad18321d\"},{\"phone\":\"3413 80-3801\",\"fullName\":\"xxx\",\"id\":\"90a1709d-b558-40c8-ad8a-f8ec6edc1f41\"},{\"phone\":\"3416 87-1709\",\"fullName\":\"yamil\",\"id\":\"c30f33be-06d8-4bf5-85c2-a82eb82e4cb9\"},{\"phone\":\"3413038472\",\"fullName\":\"sandra\",\"id\":\"be6d1b09-8675-4df4-9e6f-35c3f74ccbef\"},{\"phone\":\"3415 95-1635\",\"fullName\":\"veronica\",\"id\":\"60f90e24-6590-41a8-95a7-04e297ee6dd0\"},{\"phone\":\"11 6750-0730\",\"fullName\":\"Eugenia\",\"id\":\"3e3b1f8e-fe41-45a6-a619-c0c83813b0ee\"}]','2023-05-08 14:43:06','2023-05-08 17:06:23'),(7,43,'2023-05-23 12:30:00','xx','3413134503','','[{\"phone\":\"3764159182\",\"fullName\":\"3764159182\",\"id\":\"af507852-99d9-45eb-8e0e-69a3c335aff2\"},{\"phone\":\"3416494151\",\"fullName\":\"MELINA\",\"id\":\"eb7a99d3-6273-4397-8c11-73096be52497\"},{\"phone\":\"11 6107-2596\",\"fullName\":\"tomas\",\"id\":\"d1c9c35e-4d58-4e63-a042-e836ab905816\"},{\"phone\":\"3415 49-4979\",\"fullName\":\"eloy\",\"id\":\"a3087f90-cc7c-422d-a7d5-1b7fc57738d8\"},{\"phone\":\"2644 43-1291\",\"fullName\":\"mari\",\"id\":\"70a8fc62-22eb-424d-97af-cd9d7ee335e5\"},{\"phone\":\"3413518612\",\"fullName\":\"vanesa\",\"id\":\"3f28e25a-3e3d-410b-8e7d-741019492633\"},{\"phone\":\"3413 09-1545\",\"fullName\":\"flor\",\"id\":\"325bce31-fb88-4cd7-8859-d29a2ad24f97\"}]','2023-05-15 16:21:50','2023-05-16 17:06:25');
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

-- Dump completed on 2023-05-23 21:59:21
