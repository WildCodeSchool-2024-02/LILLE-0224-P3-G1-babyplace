CREATE TABLE moderator (
  moderator_id int NOT NULL AUTO_INCREMENT,
  moderator_mail varchar(50) NOT NULL,
  moderator_password varchar(50) NOT NULL,
  PRIMARY KEY (moderator_id)
);

CREATE TABLE parent (
  parent_id int NOT NULL AUTO_INCREMENT,
  parent_firstname varchar(50) NOT NULL,
  parent_lastname varchar(50) NOT NULL,
  parent_adress varchar(255) NOT NULL,
  parent_phone int NOT NULL,
  parent_mail varchar(255) NOT NULL,
  parent_password varchar(50) NOT NULL,
  PRIMARY KEY (parent_id)
);

CREATE TABLE child (
  child_id int NOT NULL AUTO_INCREMENT,
  child_firstname varchar(50) NOT NULL,
  child_lastname varchar(50) NOT NULL,
  child_birth date NOT NULL,
  walk_status tinyint(1) NOT NULL,
  clean_status tinyint(1) NOT NULL,
  parent_id int DEFAULT NULL,
  PRIMARY KEY (child_id),
  KEY parent_id (parent_id),
  CONSTRAINT child_ibfk_1 FOREIGN KEY (parent_id) REFERENCES parent (parent_id)
);

CREATE TABLE allergy (
  allergy_id int NOT NULL AUTO_INCREMENT,
  gluten tinyint(1) DEFAULT NULL,
  fruitsacoque tinyint(1) DEFAULT NULL,
  crustaces tinyint(1) DEFAULT NULL,
  celeri tinyint(1) DEFAULT NULL,
  oeufs tinyint(1) DEFAULT NULL,
  moutarde tinyint(1) DEFAULT NULL,
  poissons tinyint(1) DEFAULT NULL,
  soja tinyint(1) DEFAULT NULL,
  lait tinyint(1) DEFAULT NULL,
  sulfites tinyint(1) DEFAULT NULL,
  sesame tinyint(1) DEFAULT NULL,
  lupin tinyint(1) DEFAULT NULL,
  arachides tinyint(1) DEFAULT NULL,
  mollusques tinyint(1) DEFAULT NULL,
  autres varchar(255) DEFAULT NULL,
  child_id int DEFAULT NULL,
  PRIMARY KEY (allergy_id),
  KEY fk_child (child_id),
  CONSTRAINT allergy_ibfk_1 FOREIGN KEY (child_id) REFERENCES child (child_id)
);

CREATE TABLE nursery (
  nursery_id int NOT NULL AUTO_INCREMENT,
  nursery_name varchar(50) NOT NULL,
  nursery_street varchar(200) NOT NULL,
  nursery_street_number int NOT NULL,
  latitude int NOT NULL,
  longitude int NOT NULL,
  capacity int NOT NULL,
  price int NOT NULL,
  activity1 varchar(100) DEFAULT NULL,
  nursery_phone int NOT NULL,
  nursery_mail varchar(255) NOT NULL,
  image1 varchar(500) NOT NULL,
  image2 varchar(500) NOT NULL,
  image3 varchar(500) NOT NULL,
  nursery_password varchar(50) NOT NULL,
  activity2 varchar(100) DEFAULT NULL,
  activity3 varchar(100) DEFAULT NULL,
  certification1 varchar(100) DEFAULT NULL,
  certification2 varchar(100) DEFAULT NULL,
  certification3 varchar(100) DEFAULT NULL,
  PRIMARY KEY (nursery_id)
);

CREATE TABLE account (
  account_id int NOT NULL AUTO_INCREMENT,
  role varchar(50) NOT NULL,
  nursery_id int DEFAULT NULL,
  moderator_id int DEFAULT NULL,
  parent_id int DEFAULT NULL,
  PRIMARY KEY (account_id),
  KEY nursery_id (nursery_id),
  KEY moderator_id (moderator_id),
  KEY parent_id (parent_id),
  CONSTRAINT account_ibfk_1 FOREIGN KEY (nursery_id) REFERENCES nursery (nursery_id),
  CONSTRAINT account_ibfk_2 FOREIGN KEY (moderator_id) REFERENCES moderator (moderator_id),
  CONSTRAINT account_ibfk_3 FOREIGN KEY (parent_id) REFERENCES parent (parent_id)
);

CREATE TABLE operation_management (
  operation_management_id int NOT NULL AUTO_INCREMENT,
  operation_management_date datetime NOT NULL,
  type varchar(25) NOT NULL,
  account_id int DEFAULT NULL,
  moderator_id int DEFAULT NULL,
  PRIMARY KEY (operation_management_id),
  KEY account_id (account_id),
  KEY moderator_id (moderator_id),
  CONSTRAINT operation_management_ibfk_1 FOREIGN KEY (account_id) REFERENCES account (account_id),
  CONSTRAINT operation_management_ibfk_2 FOREIGN KEY (moderator_id) REFERENCES moderator (moderator_id)
);


CREATE TABLE booking_operation (
  booking_operation_id int NOT NULL AUTO_INCREMENT,
  booking_operation_date datetime NOT NULL,
  state varchar(25) NOT NULL,
  nursery_id int DEFAULT NULL,
  account_id int DEFAULT NULL,
  moderator_id int DEFAULT NULL,
  PRIMARY KEY (booking_operation_id),
  KEY nursery_id (nursery_id),
  KEY account_id (account_id),
  KEY moderator_id (moderator_id),
  CONSTRAINT booking_operation_ibfk_1 FOREIGN KEY (nursery_id) REFERENCES nursery (nursery_id),
  CONSTRAINT booking_operation_ibfk_2 FOREIGN KEY (account_id) REFERENCES account (account_id),
  CONSTRAINT booking_operation_ibfk_3 FOREIGN KEY (moderator_id) REFERENCES moderator (moderator_id)
);