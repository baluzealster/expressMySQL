CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `city` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `followers` int(10) NOT NULL DEFAULT 0,
  `following` int(10) NOT NULL DEFAULT 0,
  `profilePic` varchar(200) NOT NULL DEFAULT 'profile.jpg',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `users` ADD PRIMARY KEY (`email`,'id');
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


INSERT INTO `users` (`id`, `name`, `username`, `email`,`phone`,`profilePic`) VALUES
(12345678900, 'balu', "baluzealster",`balu@gmail.com`,`+919533546445`,`profile.jpg`);

CREATE TABLE IF NOT EXISTS `followers` (
  `id` varchar(12) NOT NULL,
  `email` varchar(200) NOT NULL,
  `femail` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `followers` ADD PRIMARY KEY(`id`), FOREIGN KEY(`email`) REFERENCES users(`email`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `folowers` CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;



SELECT t1.following, t1.email, t2.followers FROM (SELECT count(email) AS following , email FROM followers WHERE email=?) AS t1,(SELECT count(femail) AS  followers FROM followers WHERE femail=?) AS t2;