import jwt from 'jsonwebtoken';
import pool from '../controllers/db';

const sql = `CREATE TABLE Persons (
  request_id int primary key not null ,
  name character varying(150) not null,
  email character varying(150) not null,
  requesttype character varying(20) not null,
  description character varying(255) not null,
  owner_id character varying(150) not null default(user),
  status character varying(20) 
)`; 
pool.query(sql)
.then()