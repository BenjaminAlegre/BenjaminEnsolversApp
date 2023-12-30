CREATE DATABASE  IF NOT EXISTS `notes_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `notes_db`;
-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: notes_db
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etiqueta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
/*!40000 ALTER TABLE `etiqueta` DISABLE KEYS */;
INSERT INTO `etiqueta` VALUES (1,'Horario'),(2,'Noticias'),(3,'Policiales'),(4,'Chistes'),(5,'Recordatorios'),(6,'Numeros'),(7,'Calculos'),(8,'Clases'),(9,'Poemas'),(10,'Explicaciones');
/*!40000 ALTER TABLE `etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota`
--

DROP TABLE IF EXISTS `nota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nota` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `archivada` bit(1) NOT NULL,
  `contenido` text DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota`
--

LOCK TABLES `nota` WRITE;
/*!40000 ALTER TABLE `nota` DISABLE KEYS */;
INSERT INTO `nota` VALUES (1,'\0','Este avance tecnológico no solo ha revolucionado la eficiencia de las tareas cotidianas, sino que también plantea preguntas fundamentales sobre ética y equidad. A medida que exploramos las posibilidades infinitas de la IA, es imperativo abordar sus implicaciones, garantizando que este progreso beneficie a la sociedad en su conjunto.','Datos Interesantes'),(2,'\0','En un rincón infinito del universo, nuestro planeta es solo una pequeña chispa en la vastedad del espacio. Desde los misteriosos confines de los agujeros negros hasta la danza hipnotizante de las galaxias, el espacio exterior continúa cautivándonos con sus secretos y maravillas.','Maravillas del Espacio'),(3,'','En un mundo donde la conciencia ambiental se convierte en una prioridad, el arte de la sostenibilidad emerge como un faro de esperanza y cambio. Desde innovadoras prácticas empresariales hasta proyectos comunitarios, la sostenibilidad se teje en el tejido de nuestra sociedad, ofreciendo soluciones creativas para preservar nuestro planeta.','Arte de la Sostenibilidad'),(4,'','En el ajetreo diario, la práctica de la atención plena, o mindfulness, se erige como un faro de calma. Descubre cómo este arte milenario de la meditación no solo cultiva la paz interior, sino que también mejora la concentración y reduce el estrés. ¡Explora el poder transformador de vivir el momento presente!','Mindfulness'),(5,'','Sumérgete en las profundidades del océano y descubre un reino de asombroso esplendor. Desde coloridos arrecifes de coral hasta criaturas bioluminiscentes, explora las maravillas que yacen bajo la superficie. ¡Viaja a las profundidades para desvelar los secretos fascinantes del mundo submarino!','Maravillas Ocultas del Océano'),(6,'\0','A través de la lente, capturamos momentos que perduran para siempre. Explora la magia de la fotografía y su capacidad para contar historias, evocar emociones y capturar la belleza en su forma más pura. ¡Descubre cómo cada imagen cuenta una narrativa única en el vasto álbum de la vida!','Magia de la Fotografía'),(7,'\0','En un mundo lleno de distracciones, exploramos la belleza en lo simple. Descubre cómo abrazar la simplicidad puede conducir a una vida más plena y significativa. ¡Viaja hacia la esencia de lo sencillo y experimenta la alegría que se encuentra en los pequeños detalles de la vida!','El Encanto de la Simplicidad'),(8,'','Atrévete a explorar los senderos literarios que llevan a mundos desconocidos. Desde clásicos atemporales hasta nuevas voces, adéntrate en los caminos serpenteantes de la literatura que despiertan la imaginación y transmiten la riqueza de la experiencia humana. ¡Embárcate en una travesía a través de las páginas de la creatividad literaria!','Caminos Serpenteantes de la Literatura'),(9,'\0','Cada estación trae consigo su propia sinfonía de colores y emociones. Desde la frescura de la primavera hasta la melancolía del invierno, sumérgete en el baile cíclico de las estaciones y descubre la belleza única de cada cambio en la naturaleza. ¡Observa cómo la tierra se transforma en un escenario vibrante que celebra la danza eterna de la vida!','El Baile de las Estaciones');
/*!40000 ALTER TABLE `nota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota_etiqueta`
--

DROP TABLE IF EXISTS `nota_etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nota_etiqueta` (
  `nota_id` bigint(20) NOT NULL,
  `etiqueta_id` bigint(20) NOT NULL,
  PRIMARY KEY (`nota_id`,`etiqueta_id`),
  KEY `FKjldpj8o7lw0af1k53xme1xdxo` (`etiqueta_id`),
  CONSTRAINT `FKjgfcnfve6hndacofok4bl85cq` FOREIGN KEY (`nota_id`) REFERENCES `nota` (`id`),
  CONSTRAINT `FKjldpj8o7lw0af1k53xme1xdxo` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiqueta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota_etiqueta`
--

LOCK TABLES `nota_etiqueta` WRITE;
/*!40000 ALTER TABLE `nota_etiqueta` DISABLE KEYS */;
INSERT INTO `nota_etiqueta` VALUES (1,4),(1,5),(1,6),(2,3),(2,5),(2,7),(3,4),(3,5),(3,8),(4,1),(5,1),(5,2),(5,4),(5,5),(5,7),(5,8),(5,9),(5,10),(6,2),(6,4),(6,5),(6,7),(6,8),(7,5),(9,3),(9,4),(9,5),(9,6),(9,9),(9,10);
/*!40000 ALTER TABLE `nota_etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'notes_db'
--

--
-- Dumping routines for database 'notes_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-30 18:27:39
