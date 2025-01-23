# Node user payments api

A simple Node.js API to retrieve users and their payments from CSV files

## Instalation

1. Clone the repository:

   ```bash
   git clone https://github.com/Deividas-Kozlovas/node-csv-api.git
   ```

2. Instal dependancies

   ```bash
   npm install
   ```

3. Run the project
   ```bash
   npm start
   ```

## Usage

Once the project is set up and running, use the following URLs to retrieve users or user payments:

Returns a list of all users in JSON format
GET http://localhost:8888/users

Returns the user with the specified id in JSON format
GET http://localhost:8888/user?id=1

Returns all payments made by the user with the specified id
GET http://localhost:8888/user/payments?id=1

Returns the payment with the specified id along with the user details who made the payment
GET http://localhost:8888/payment?id=1
