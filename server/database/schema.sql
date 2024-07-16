CREATE TABLE moderator (
  moderator_id int NOT NULL AUTO_INCREMENT,
  role  varchar(50) DEFAULT 'moderator',
  moderator_mail varchar(50) UNIQUE NOT NULL,
  moderator_password varchar(500) NOT NULL,
  PRIMARY KEY (moderator_id)
);

CREATE TABLE parent (
  parent_id int NOT NULL AUTO_INCREMENT,
  role  varchar(50) DEFAULT 'parent',
  parent_firstname varchar(50) NOT NULL,
  parent_lastname varchar(50) NOT NULL,
  parent_adress varchar(255) NOT NULL,
  parent_phone varchar(50) NOT NULL,
  parent_mail varchar(255) UNIQUE NOT NULL,
  parent_password varchar(500) NOT NULL,
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
  CONSTRAINT child_ibfk_1 FOREIGN KEY (parent_id) REFERENCES parent (parent_id) ON DELETE CASCADE
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
  CONSTRAINT allergy_ibfk_1 FOREIGN KEY (child_id) REFERENCES child (child_id) ON DELETE CASCADE
);


CREATE TABLE nursery (
  nursery_id int NOT NULL AUTO_INCREMENT,
  role  varchar(50) DEFAULT 'nursery',
  nursery_name varchar(50) NOT NULL,
  nursery_street varchar(200) NOT NULL,
  nursery_street_number int NOT NULL,
  latitude DECIMAL(20, 15) NOT NULL,
  longitude DECIMAL(20, 15) NOT NULL,
  city varchar (50) NOT NULL,
  capacity int NOT NULL,
  price int NOT NULL,
  nursery_phone varchar(50) NOT NULL,
  nursery_mail varchar(255) UNIQUE NOT NULL,
  image1 varchar(500) NOT NULL,
  image2 varchar(500) NOT NULL,
  image3 varchar(500) NOT NULL,
  nursery_password varchar(500) NOT NULL,
  activity1 varchar(100) DEFAULT NULL,
  activity2 varchar(100) DEFAULT NULL,
  activity3 varchar(100) DEFAULT NULL,
  certification1 varchar(100) DEFAULT NULL,
  certification2 varchar(100) DEFAULT NULL,
  certification3 varchar(100) DEFAULT NULL,
  about varchar(6000) DEFAULT NULL,
  PRIMARY KEY (nursery_id)
);

CREATE TABLE booking_operation (
  booking_operation_id int NOT NULL AUTO_INCREMENT,
  booking_operation_date datetime NOT NULL,
  slots varchar(25) NOT NULL,
  state varchar(25) NOT NULL,
  nursery_id int DEFAULT NULL,
  parent_id int DEFAULT NULL,
  child_id int DEFAULT NULL,
  moderator_id int DEFAULT NULL,
  PRIMARY KEY (booking_operation_id),
  KEY nursery_id (nursery_id),
  KEY parent_id (parent_id),
  KEY moderator_id (moderator_id),
  CONSTRAINT booking_operation_ibfk_1 FOREIGN KEY (nursery_id) REFERENCES nursery (nursery_id),
  CONSTRAINT booking_operation_ibfk_2 FOREIGN KEY (parent_id) REFERENCES parent (parent_id),
  CONSTRAINT booking_operation_ibfk_3 FOREIGN KEY (moderator_id) REFERENCES moderator (moderator_id)
);


-- INSERT INTO moderator (moderator_mail, moderator_password) VALUES ('moderator1@example.com', 'password123'), ('moderator2@example.com', 'password456'), ('moderator3@example.com', 'password789');
-- INSERT INTO parent (parent_firstname, parent_lastname, parent_adress, parent_phone, parent_mail, parent_password) VALUES ('John', 'Doe', '123 Main St, Cityville', '1234567890', 'john.doe@example.com', 'password123'), ('Jane', 'Smith', '456 Elm St, Townsville', '2345678901', 'jane.smith@example.com', 'password456'), ('Emily', 'Johnson', '789 Oak St, Villagetown', '3456789012', 'emily.johnson@example.com', 'password789'); 
-- INSERT INTO child (child_firstname, child_lastname, child_birth, walk_status, clean_status, parent_id) VALUES ('Alice', 'Doe', '2020-01-01', 1, 1, 1), ('Bob', 'Smith', '2019-05-15', 1, 1, 2), ('Charlie', 'Johnson', '2021-09-30', 0, 0, 3); 
-- INSERT INTO allergy (gluten, fruitsacoque, crustaces, celeri, oeufs, moutarde, poissons, soja, lait, sulfites, sesame, lupin, arachides, mollusques, autres, child_id) VALUES (1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'Autre allergie 1', 1), (0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 'Autre allergie 2', 2), (0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 'Autre allergie 3', 3);
-- INSERT INTO nursery (nursery_name, nursery_street, nursery_street_number, latitude, longitude, capacity, price, activity1, nursery_phone, nursery_mail, image1, image2, image3, nursery_password, activity2, activity3, certification1, certification2, certification3) VALUES ('Happy Kids Nursery', '123 Happy St', 1, 40, -74, 50, 1000, 'Painting', 1234567890, 'contact@happykids.com', 'image1.jpg', 'image2.jpg', 'image3.jpg', 'password123', 'Singing', 'Dancing', 'Certification A', 'Certification B', 'Certification C'), ('Little Stars Nursery', '456 Star Ave', 2, 41, -73, 60, 1200, 'Reading', 2345678901, 'info@littlestars.com', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'password456', 'Drawing', 'Crafting', 'Certification D', 'Certification E', 'Certification F'), ('Bright Minds Nursery', '789 Bright Rd', 3, 42, -72, 70, 1400, 'Sports', 3456789012, 'support@brightminds.com', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'password789', 'Music', 'Math', 'Certification G', 'Certification H', 'Certification I'); 
-- Peuplement de la table account
-- INSERT INTO account (role, nursery_id, moderator_id, parent_id) VALUES ('parent', NULL, NULL, 1), ('parent', NULL, NULL, 2), ('parent', NULL, NULL, 3), ('moderator', NULL, 1, NULL), ('moderator', NULL, 2, NULL), ('moderator', NULL, 3, NULL), ('nursery', 1, NULL, NULL), ('nursery', 2, NULL, NULL), ('nursery', 3, NULL, NULL); 
-- Peuplement de la table operation_management
-- INSERT INTO operation_management (operation_management_date, type, account_id, moderator_id) VALUES ('2023-06-14 08:30:00', 'Login', 1, NULL), ('2023-06-14 09:00:00', 'Logout', 2, NULL), ('2023-06-14 09:30:00', 'Login', 3, NULL), ('2023-06-14 10:00:00', 'Login', 4, 1), ('2023-06-14 10:30:00', 'Logout', 5, 2), ('2023-06-14 11:00:00', 'Login', 6, 3); 
-- Peuplement de la table booking_operation
-- INSERT INTO booking_operation (booking_operation_date, state, nursery_id, account_id, moderator_id) VALUES ('2023-06-14 08:30:00', 'Pending', 1, 7, 1), ('2023-06-14 09:00:00', 'Confirmed', 2, 8, 2), ('2023-06-14 09:30:00', 'Cancelled', 3, 9, 3);







