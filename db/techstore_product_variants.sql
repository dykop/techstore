-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: dbori
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE product_variants (
  id INT NOT NULL AUTO_INCREMENT,
  model_id INT NOT NULL,
  ram VARCHAR(50),
  storage VARCHAR(50),
  price DECIMAL(10,2),
  stock INT DEFAULT 0,
  color varchar(50),
  PRIMARY KEY (id),
  FOREIGN KEY (model_id) REFERENCES product_models(id)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` (id, model_id, ram, storage, color, price) VALUES
(1, 1, '128GB', '4GB', 'Black/White', 207.00),
(2, 2, '64GB', '3GB', 'Black/White', 103.50),
(3, 3, '256GB', '4GB', 'Black/White', 156.40),
(4, 4, '256GB', '8GB', 'Black/White', 174.80),
(5, 5, '256GB', '8GB', 'Black/White', 391.00),
(6, 6, '128GB', '6GB', 'Black/White', 151.80),
(7, 7, '256GB', '8GB', 'Black/White', 169.05),
(8, 8, '256GB', '8GB', 'Black/White', 173.65),
(9, 9, '256GB', '8GB', 'Black/White', 241.50),
(10, 10, '512GB', '12GB', 'Black/White', 299.00),
(11, 11, '512GB', '12GB', 'Black/White', 402.50),
(12, 12, '256GB', '12GB', 'Black/White', 454.25),
(13, 13, '512GB', '12GB', 'Black/White', 580.75),
(14, 14, '64GB', '2GB', 'Black/White', 97.75),
(15, 15, '128GB', '4GB', 'Black/White', 135.70),
(16, 16, '128GB', '8GB', 'Black/White', 143.75),
(17, 17, '256GB', '8GB', 'Black/White', 218.50),
(18, 18, '256GB', '8GB', 'Black/White', 299.00),
(19, 19, '128GB', '4GB', 'Black/White', 138.00),
(20, 20, '64GB', '4GB', 'Black/White', 138.00),
(21, 21, '128GB', '4GB', 'Black/White', 154.10),
(22, 22, '256GB', '8GB', 'Black/White', 759.00),
(23, 23, '256GB', '8GB', 'Black/White', 828.00),
(24, 24, '256GB', '12GB', 'Black/White', 920.00),
(25, 25, '512GB', '12GB', 'Black/White', 1035.00),
(26, 26, '825GB', '16GB', 'Black/White', 499.99),
(27, 27, '1TB', '16GB', 'Black/White', 499.99),
(28, 28, '64GB', '4GB', 'Black/White', 349.99),
(29, 28, '128GB', '4GB', 'Black/White', 379.99),
(32, 31, '1TB', '16GB', 'Black/White', 750.00),
(33, 32, '1TB', '16GB', 'Black/White', 349.99),
(34, 29, '1TB', '16GB', 'Black/White', 349.99),
(35, 33, '1', '1', 'Black/White', 15.00),
(36, 34, '1', '1', 'Black/White', 20.00);

/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-26 15:29:01
