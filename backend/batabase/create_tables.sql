CREATE TABLE `datawarehouse`.`users` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(260) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`region` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`country` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `region_id` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`city` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `country_id` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`companies` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `city_id` VARCHAR(45) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`contacs` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `company_id` VARCHAR(45) NOT NULL,
    `city_id` VARCHAR(255) NOT NULL,
    `address` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);