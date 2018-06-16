const requestsTable = 'DROP TABLE IF EXISTS requests;' +
	'CREATE TABLE requests (' +
	'request_id SERIAL PRIMARY KEY NOT NULL,' +
	'name CHARACTER VARYING(150) NOT NULL,' +
	'email CHARACTER VARYING(150) NOT NULL,' +
	'requesttype CHARACTER VARYING(20) NOT NULL,' +
	'description CHARACTER VARYING(255) NOT NULL,' +
	'owner_id CHARACTER VARYING(155) NOT NULL,' +
	`status CHARACTER VARYING(20) NOT NULL DEFAULT('pending')` +
')';

const usersTable = 'DROP TABLE IF EXISTS users ;' + 
	'CREATE TABLE users (' +
	'user_id SERIAL PRIMARY KEY NOT NULL,' +
	'name CHARACTER VARYING(150) NOT NULL,' +
	'email CHARACTER VARYING(150) NOT NULL,' +
	'username CHARACTER VARYING(150) NOT NULL,' +
	'password CHARACTER VARYING(150) NOT NULL,' +
	`role CHARACTER VARYING(10) NOT NULL DEFAULT('user')` +
')';

const admin = `insert into users (name, email, username, password, role) values ('Admin', 'admin@gmail.com', 'admin', 'superuser', 'admin')`;

const users = 'select * from users';
const requests = 'select * from requests';
const dateColumn = 'ALTER TABLE requests ADD date TIMESTAMP NOT NULL DEFAULT (NOW())';


const tablesql = {
	requestsTable,
	usersTable,
	admin,
	users,
	requests,
	dateColumn

};

export default tablesql;



