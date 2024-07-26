CREATE DATABASE  IF NOT EXISTS `medshyne` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `medshyne`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: medshyne
-- ------------------------------------------------------
-- Server version	9.0.0

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
-- Table structure for table `culsulting_details`
--

DROP TABLE IF EXISTS `culsulting_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culsulting_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Doctor_Name` varchar(255) DEFAULT NULL,
  `ID_number` int DEFAULT NULL,
  `Name` varchar(10) DEFAULT NULL,
  `Class` varchar(10) DEFAULT NULL,
  `Division` varchar(10) DEFAULT NULL,
  `Sick_Type` varchar(10) DEFAULT NULL,
  `symtoms_desc` varchar(10) DEFAULT NULL,
  `Rolles` varchar(10) DEFAULT NULL,
  `From_Time` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culsulting_details`
--

LOCK TABLES `culsulting_details` WRITE;
/*!40000 ALTER TABLE `culsulting_details` DISABLE KEYS */;
INSERT INTO `culsulting_details` VALUES (1,'Vel',123456,'Jane Doe','10','A','Flu','Fever','Consultant','09:00:00');
/*!40000 ALTER TABLE `culsulting_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboard`
--

DROP TABLE IF EXISTS `dashboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Status` varchar(255) DEFAULT NULL,
  `ConsultingID` varchar(255) DEFAULT NULL,
  `PatientName` varchar(255) DEFAULT NULL,
  `HCR` varchar(255) DEFAULT NULL,
  `SickType` varchar(255) DEFAULT NULL,
  `Assignee` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `View` varchar(255) DEFAULT NULL,
  `Edit` varchar(255) DEFAULT NULL,
  `Delete` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_ConsultingID` (`ConsultingID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboard`
--

LOCK TABLES `dashboard` WRITE;
/*!40000 ALTER TABLE `dashboard` DISABLE KEYS */;
INSERT INTO `dashboard` VALUES (1,'Completed','#001','John','HCR001','Flu','Dr. Smith','2023-07-18','view','edit','delete');
/*!40000 ALTER TABLE `dashboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `BloodGroup` varchar(10) DEFAULT NULL,
  `Address` text,
  `State` varchar(100) DEFAULT NULL,
  `Pincode` varchar(10) DEFAULT NULL,
  `MobileNo` bigint DEFAULT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selfregister`
--

DROP TABLE IF EXISTS `selfregister`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selfregister` (
  `Organ_Name` varchar(255) NOT NULL,
  `Organ_Type` varchar(255) DEFAULT NULL,
  `Email_ID` varchar(255) DEFAULT NULL,
  `Organ_Mobile_Number` bigint DEFAULT NULL,
  `Address` text,
  `State` varchar(100) DEFAULT NULL,
  `Pincode` varchar(10) DEFAULT NULL,
  `GST_Number` varchar(15) DEFAULT NULL,
  `Count_of_Students` int DEFAULT NULL,
  `Count_of_Staffs` int DEFAULT NULL,
  `Organ_Registration_number` varchar(255) NOT NULL,
  `Upload_Documents` text,
  `Referral_Code` varchar(50) DEFAULT NULL,
  `How_Did_You_Hear_About_Us` text,
  `Contact_Name` varchar(255) DEFAULT NULL,
  `Contact_Designation` varchar(255) DEFAULT NULL,
  `Contact_Email_ID` varchar(255) DEFAULT NULL,
  `Contact_Mobile_Number` bigint DEFAULT NULL,
  `Username` varchar(250) DEFAULT NULL,
  `Password` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Organ_Registration_number`),
  UNIQUE KEY `Organ_Registration_number` (`Organ_Registration_number`),
  UNIQUE KEY `Email_ID` (`Email_ID`),
  CONSTRAINT `selfregister_chk_1` CHECK ((`Organ_Mobile_Number` between 1000000000 and 9999999999))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selfregister`
--

LOCK TABLES `selfregister` WRITE;
/*!40000 ALTER TABLE `selfregister` DISABLE KEYS */;
INSERT INTO `selfregister` VALUES ('Ayyappan','Developer','ayya@gmail.com',9750331181,'abc','b','605009','12345',12,12,'123','upload','asdf','dddd','vel','Backend','backend@gmail.com',987654320,'ayyappan','ayya'),('Ayyappan','Developer','ayyappan@gmail.com',9750331181,'abc','b','605009','12345',12,12,'123456789','upload','asdf','dddd','vel','Backend','backend@gmail.com',987654320,NULL,NULL);
/*!40000 ALTER TABLE `selfregister` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Profile` varchar(250) DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `Designation` varchar(250) DEFAULT NULL,
  `HCR` varchar(250) DEFAULT NULL,
  `staff_contact` bigint DEFAULT NULL,
  `Last_update` date DEFAULT NULL,
  `View` varchar(250) DEFAULT NULL,
  `Edit` varchar(250) DEFAULT NULL,
  `Delete` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (3,'venkat','venkat','reat','123',9750331181,'2024-07-23','View','Edit','Delete'),(4,'venkat','Kumar','Developer','HCR123',9750331181,'2024-07-23','View','NEdito','Delete'),(5,'Ayyappan','Pooja','Developer','HCR123',9750331181,'2024-07-23','View','NEdito','Delete'),(6,'Pooja','Pooja','Developer','HCR123',9750331181,'2024-07-23','View','NEdito','Delete');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staffregister`
--

DROP TABLE IF EXISTS `staffregister`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staffregister` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `id_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `state` varchar(255) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `class` varchar(255) NOT NULL,
  `division` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `department` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `allergies` enum('Yes','No') NOT NULL,
  `allergy_details` text,
  `any_disease` enum('Yes','No') NOT NULL,
  `disease_details` text,
  `current_health_report` longblob,
  `past_health_report` longblob,
  `hcr` enum('Yes','No') NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `profile` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staffregister`
--

LOCK TABLES `staffregister` WRITE;
/*!40000 ALTER TABLE `staffregister` DISABLE KEYS */;
INSERT INTO `staffregister` VALUES (1,'Ayyappan','1','ayya','123 Main St','Male','SomeState','123456','10th','A','2000-01-01','O+','Science','Student','No','','No','','','','No','9876543210',NULL),(2,'Ayyappan','1','ayya','123 Main St','Male','SomeState','123456','10th','A','2000-01-01','O+','Science','Student','No','','No','','','','No','9876543210','Ayyappan');
/*!40000 ALTER TABLE `staffregister` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Profile` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Division` varchar(255) DEFAULT NULL,
  `HCR` varchar(255) DEFAULT NULL,
  `ParentContact` bigint DEFAULT NULL,
  `LastUpdate` date DEFAULT NULL,
  `View` varchar(255) DEFAULT NULL,
  `Edit` varchar(255) DEFAULT NULL,
  `Delete` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Ayyappan','Ayyappan','Developer','HCR049',9750331181,'2024-07-23','View','Edit','Delete');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentparent`
--

DROP TABLE IF EXISTS `studentparent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentparent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parents_Name` varchar(255) DEFAULT NULL,
  `Parent_relation` varchar(255) DEFAULT NULL,
  `Parent_Mobile_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentparent`
--

LOCK TABLES `studentparent` WRITE;
/*!40000 ALTER TABLE `studentparent` DISABLE KEYS */;
INSERT INTO `studentparent` VALUES (1,'Devi','Mother','0123456789');
/*!40000 ALTER TABLE `studentparent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentregister`
--

DROP TABLE IF EXISTS `studentregister`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentregister` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `id_number` varchar(255) DEFAULT NULL,
  `address` text,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `division` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `allergies` enum('Yes','No') DEFAULT NULL,
  `allergy_details` text,
  `any_disease` enum('Yes','No') DEFAULT NULL,
  `disease_details` text,
  `current_health_report` longblob,
  `past_health_report` longblob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_number` (`id_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentregister`
--

LOCK TABLES `studentregister` WRITE;
/*!40000 ALTER TABLE `studentregister` DISABLE KEYS */;
INSERT INTO `studentregister` VALUES (1,'Priya','Priya','12345','123 Elm Street, Springfield','Male','Illinois','627011','10th','A','2005-06-15','O+','Science','Student','No','','No','',_binary 'current_report_data',_binary 'past_report_data');
/*!40000 ALTER TABLE `studentregister` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-26 18:37:01
