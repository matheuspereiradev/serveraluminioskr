require('dotenv/config');

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host:     process.env.HOST,
        user:     process.env.USR,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
});

module.exports = knex;