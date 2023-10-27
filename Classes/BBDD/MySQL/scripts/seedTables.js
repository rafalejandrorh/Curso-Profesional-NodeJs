const connection = require('../../../lib/connect');

const createUsersTable = 'CREATE TABLE `twittr`.`users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `username` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `bio` TEXT NOT NULL , `location` VARCHAR(255) NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;';
const createTweetsTable = 'CREATE TABLE `twittr`.`tweets` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `userId` INT NOT NULL , `content` VARCHAR(280) NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;';
const printError = (msg) => (error) => {
    error && console.log(msg, error);
};

connection.connect(error => {
    error && console.log('Error connecting to database', error);

    connection.query(createUsersTable, printError('Error creating users table'));
    connection.query(createTweetsTable, printError('Error creating tweets table'));

    console.log('Creaton tables done!');
    connection.end();
});