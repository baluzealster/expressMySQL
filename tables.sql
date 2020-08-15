CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `username` varchar(15) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(200) NOT NULL,
  `profilePic` varchar(200) NOT NULL DEFAULT 'profile.jpg',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


INSERT INTO `users` (`id`, `name`, `username`, `email`,`phone`,`profilePic`) VALUES
(12345678900, 'balu', "baluzealster",`balu@gmail.com`,`+919533546445`,`profile.jpg`);