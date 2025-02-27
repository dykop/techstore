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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `product_models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE product_models (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  category VARCHAR(50),
  description TEXT,
  image_url VARCHAR(255),
  PRIMARY KEY (id)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `product_models` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO product_models (id, name, brand, category, description, image_url) VALUES 
(1, 'Redmi Pad SE 8.7', 'Xiaomi', 'smartphones', 'Xiaomi Redmi Pad SE 8.7', '/imagenes/xiaomi/1.png'),
(2, 'Redmi A3', 'Xiaomi', 'smartphones', 'Xiaomi Redmi A3', '/imagenes/xiaomi/2.png'),
(3, 'Redmi 14C', 'Xiaomi', 'smartphones', 'Xiaomi Redmi 14C', '/imagenes/xiaomi/3.png'),
(4, 'Redmi 14C', 'Xiaomi', 'smartphones', 'Xiaomi Redmi 14C', '/imagenes/xiaomi/4.png'),
(5, 'Note 14 Pro', 'Xiaomi', 'smartphones', 'Xiaomi Note 14 Pro', '/imagenes/xiaomi/6.png'),
(6, 'Poco C65', 'Xiaomi', 'smartphones', 'Xiaomi Poco C65', '/imagenes/xiaomi/3.png'),
(7, 'Poco C65', 'Xiaomi', 'smartphones', 'Xiaomi Poco C65', '/imagenes/xiaomi/3.png'),
(8, 'Poco C75', 'Xiaomi', 'smartphones', 'Xiaomi Poco C75', '/imagenes/xiaomi/4.png'),
(9, 'Poco M6 Pro', 'Xiaomi', 'smartphones', 'Xiaomi Poco M6 Pro', '/imagenes/xiaomi/5.png'),
(10, 'Poco M6 Pro', 'Xiaomi', 'smartphones', 'Xiaomi Poco M6 Pro', '/imagenes/xiaomi/5.png'),
(11, 'Poco X6 Pro', 'Xiaomi', 'smartphones', 'Xiaomi Poco X6 Pro', '/imagenes/xiaomi/7.png'),
(12, 'Poco X7 Pro', 'Xiaomi', 'smartphones', 'Xiaomi Poco X7 Pro', '/imagenes/xiaomi/8.png'),
(13, 'Xiaomi 14T', 'Xiaomi', 'smartphones', 'Xiaomi 14T', '/imagenes/xiaomi/9.png'),
(14, 'Motorola E14', 'Motorola', 'smartphones', 'Motorola E14', '/imagenes/motorola/1.png'),
(15, 'Motorola G24', 'Motorola', 'smartphones', 'Motorola G24', '/imagenes/motorola/2.png'),
(16, 'Motorola G24', 'Motorola', 'smartphones', 'Motorola G24', '/imagenes/motorola/2.png'),
(17, 'Motorola G54', 'Motorola', 'smartphones', 'Motorola G54', '/imagenes/motorola/3.png'),
(18, 'Motorola G85', 'Motorola', 'smartphones', 'Motorola G85', '/imagenes/motorola/4.png'),
(19, 'Samsung A05', 'Samsung', 'smartphones', 'Samsung A05', '/imagenes/samsung/1.png'),
(20, 'Samsung A06', 'Samsung', 'smartphones', 'Samsung A06', '/imagenes/samsung/2.png'),
(21, 'Samsung A06', 'Samsung', 'smartphones', 'Samsung A06', '/imagenes/samsung/2.png'),
(22, 'Samsung S24 FE', 'Samsung', 'smartphones', 'Samsung S24 FE', '/imagenes/samsung/3.png'),
(23, 'Samsung S24', 'Samsung', 'smartphones', 'Samsung S24', '/imagenes/samsung/4.png'),
(24, 'Samsung S24 Plus', 'Samsung', 'smartphones', 'Samsung S24 Plus', '/imagenes/samsung/5.png'),
(25, 'Samsung S24 Plus', 'Samsung', 'smartphones', 'Samsung S24 Plus', '/imagenes/samsung/5.png'),
(26, 'PlayStation 5', 'Sony', 'consola', 'Sony PlayStation 5 con SSD ultra rápido', '/imagenes/consolas/1.png'),
(27, 'Xbox Series X', 'Microsoft', 'consola', 'Microsoft Xbox Series X con 1TB SSD', '/imagenes/consolas/2.png'),
(28, 'Nintendo Switch OLED', 'Nintendo', 'consola', 'Nintendo Switch OLED Edición Blanca', '/imagenes/consolas/3.png'),
(29, 'Steam Deck', 'Valve', 'consola', 'Steam Deck 512GB con pantalla anti-reflejo', '/imagenes/consolas/4.png'),
(31, 'PlayStation 5 Fisica', 'Sony', 'consola', 'Sony PlayStation 5 con Lectora', '/imagenes/consolas/5.png'),
(32, 'Xbox Series S', 'Microsoft', 'consola', 'Microsoft Xbox Series S con 1TB SSD', '/imagenes/consolas/6.png'),
(33, 'Parlante Mi Portable Bluetooth', 'Xiaomi', 'parlante', 'Parlante Xiaomi Mi Portable Bluetooth Grey', '/imagenes/parlantes/1.png'),
(34, 'Parlante Portatil Realme', 'Realme', 'parlante', 'Parlante Portatil Realme Pocket', '/imagenes/parlantes/2.png');

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
