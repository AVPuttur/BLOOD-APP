'use strict';
require("dotenv").config();
const assert = require('assert');


const sqlEncrypt = process.env.DBENCRYPT === "true";

assert(process.env.SERVER_PORT, 'PORT is required.');
assert(process.env.SERVER_HOST, 'HOST is required.');

module.exports = {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    url: process.env.SERVER_URL,
    sql: {
        server: process.env.DBSERVER,
        databse: process.env.DBNAME,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        port: process.env.DBPORT,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    }
}
