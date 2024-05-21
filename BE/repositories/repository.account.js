const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_ACCOUNT,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// const getAccounts = async (npm, password) => {
//     const { rows } = await pool.query('SELECT * FROM account WHERE npm = $1 AND password = $2', [npm, password]);
//     return rows;
// };

// const createAccount = async (npm, password, display_name) => {
//     await pool.query('INSERT INTO account (npm, password, display_name) VALUES ($1, $2, $3)', [npm, password, display_name]);
// };

// // const getAccountById = async ()

// module.exports = {
//     getAccount,
//     createAccount
// };
