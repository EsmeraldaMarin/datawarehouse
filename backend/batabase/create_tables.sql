CREATE TABLE `datawarehouse`.`users` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`regions` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`countries` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `region_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`cities` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `country_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`companies` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `city_id` INT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `datawarehouse`.`contacts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `company_id`INT NOT NULL,
    `city_id`INT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `img_url` VARCHAR(255) NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `datawarehouse`.`channels` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `channel_name` VARCHAR(255) NOT NULL,
    `channel_username` VARCHAR(255) NOT NULL,
    `user_id`INT NOT NULL,
    `preferences` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);