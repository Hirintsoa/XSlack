// Postgresql connection package
const pg = require('pg');

// Environment variable loader setup
require('dotenv').config();

module.exports = new pg.Client(process.env.DB_URL);