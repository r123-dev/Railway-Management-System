CREATE DATABASE IF NOT EXISTS railway_services;

USE railway_services;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL
);


CREATE TABLE trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL
);


CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  train_id INT NOT NULL,
  seats INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (train_id) REFERENCES trains(id)
);
