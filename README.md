# expressMySQL

Simple node Express SQL project to understand how to insert data to the mySQL db from the simple express Application.

# Database setUp

i) Go to the mysql terminal

ii) mysql> CREATE DATABASE <database name>;

iii) mysql> source <path of the .sql file in the project root folder>;

iV) mysql>USE <database name>;

v) mysql>DESC <table name>;
check the schema of the table

# Run project locally

i) Clone the repo from git hub

ii) cd expressMySQL

iii) expressMySQL> npm i

iv) fill the details in the config/config.js file

v) expressMySQL> npm start

# Curl for the api requests

i) Register curl

curl --location --request POST 'http://localhost:3000/api/users/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"name":"bala",
"profilePic":"hello.jpg",
"email": "bala@getproperly.com",
"password": "balu@1996",
"city":"guntur"
}'

ii) LogIn curl

curl --location --request GET 'http://localhost:3000/api/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"email":"bala@getproperly.com",
"password":"balu@1996"
}'

iii) Follow user curl

curl --location --request POST 'http://localhost:3000/api/users/follow' \
--header 'Content-Type: application/json' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTU5Nzc2OTk3NCwiZXhwIjoxNTk3ODU2Mzc0fQ.zieTq12mquNVZg2LcZcxA_dYetapCdnjjb6wEcFX9E4' \
--data-raw '{
"email":"bala@getproperly.com",
"followEmail":"baba@gmail.com",
"follow":"true"
}'

vi) Update user curl

curl --location --request PUT 'http://localhost:3000/api/users/update' \
--header 'Content-Type: application/json' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTU5Nzc2OTk3NCwiZXhwIjoxNTk3ODU2Mzc0fQ.zieTq12mquNVZg2LcZcxA_dYetapCdnjjb6wEcFX9E4' \
--data-raw '{
"name":"raju",
"city":"hyd",
"email":"bala@getproperly.com"
}'
