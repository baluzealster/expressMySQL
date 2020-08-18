CREATE TABLE IF NOT EXISTS `users` (
	`userId` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',
	`password` VARCHAR(200) NOT NULL COLLATE 'utf8_unicode_ci',
	`email` VARCHAR(100) NOT NULL COLLATE 'utf8_unicode_ci',
	`city` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',
  `followers` int(10) NOT NULL DEFAULT 0,
  `following` int(10) NOT NULL DEFAULT 0,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`userId`),
	UNIQUE INDEX `email` (`email`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `follow` (
	`followId` INT(11) NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(100) NOT NULL COLLATE  'utf8_unicode_ci',
  `followEmail` VARCHAR(100) NOT NULL COLLATE  'utf8_unicode_ci',
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`followId`),
	FOREIGN KEY (`email`) REFERENCES `users`(`email`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB;

INSERT INTO `users` (`userId`, `name`, `password`, `email`,`city`) VALUES
(9182822331, 'balu', "sdnfgabfkjdbfkgbo4uowtqwotwuetrgpqwtrt",`balu@gmail.com`,`+919533546445`,`Guntur`);