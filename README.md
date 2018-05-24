# Maintenance-Tracker

[![Build Status](https://travis-ci.org/Fattylee/Maintenance-Tracker.svg?branch=develop)](https://travis-ci.org/Fattylee/Maintenance-Tracker) [![Maintainability](https://api.codeclimate.com/v1/badges/dbbcf1501ba4a86ade01/maintainability)](https://codeclimate.com/github/Fattylee/Maintenance-Tracker/maintainability) [![Coverage Status](https://coveralls.io/repos/github/Fattylee/Maintenance-Tracker/badge.svg?branch=develop)](https://coveralls.io/github/Fattylee/Maintenance-Tracker?branch=develop) 

## Application Description
Maintenance Tracker App is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.
 <br/><b>UI:</b> https://Fattylee.github.io/Maintenance-Tracker/UI/index.html
 <br/><b> API documentation: </b> https://maintenance-tracker--app.herokuapp.com/api/v1

## Table of Content

 [Features](#features)
 [Technology](#technology)
 [Installation](#installation)
 [Testing](#testing)
 [API End Points](#api-end-points)

## Features
Below are the features of my Maintenance Tracker app
###  Users

Users can Signup on Maintenance Tracker<br/>
Users can Post requests<br/>
Users can Get all requests<br/>
Users can Get a request<br/>
Users can Update a request<br/>

## Technology

Modern JavaScript technologies were adopted in this project

ES2015: Also known as ES6 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more infromation.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development.
Visit [here](https://nodejs.org/en/) for more information.

ExressJS: This is the web application framework for Node.js
Visit [here](https://expressjs.com) for more information

Dummy Database: User data was stored in array objects.

Codes are written in accordance with Airbnb JavaScript style guide, see [here](https://github.com/airbnb/javascript) for details.

## Installation
1. Clone this repository into your local machine:
```
https://github.com/Fattylee/Maintenance-Tracker
```
2. Navigate into the cloned repository in your machine:
```
cd Maintenance-Tracker
```
3. Install dependencies by running.
```
npm install
```
4. Start the application by running
```
npm start
```
5. Install postman to test all endpoints

## Testing
- run test using `npm test`    

## API Routes

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>api/v1/users/auth/signup</td>  <td>Register a user</td></tr>

<tr><td>POST</td> <td>api/v1/users/requests</td>  <td>Post a request</td></tr>

<tr><td>GET</td> <td>api/v1/users/requests/:requestId</td>  <td>Get a request</td></tr>

<tr><td>GET</td> <td>api/v1/users/:requests</td>  <td>GET all requests</td></tr>

<tr><td>PUT</td> <td>api/v1/users/requests/:requestId</td> <td>Update a request</td></tr>
    </table>
