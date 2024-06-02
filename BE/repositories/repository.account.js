// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// async function loginAcc(username, password) {
//   try {
//     const query = {
//       text: 'SELECT acc_id, points, contents_id FROM account WHERE username = $1 AND password = $2',
//       values: [username, password],
//     };

//     const result = await pool.query(query);

//     if (result.rows.length === 1) {
//       return result.rows[0];
//     } else {
//       return null; // No account found with the provided username and password
//     }
//   } catch (error) {
//     console.error('Error executing query', error);
//     throw error;
//   }
// }

// async function registerAcc(username, password) {
//   try {
//     const query = {
//       text: 'INSERT INTO account (acc_id, acc_type, username, password, points, contents_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING acc_id',
//       values: [generateRandomAlphanumeric(10), 'registered', username, password, 0, []],
//     };

//     const result = await pool.query(query);
//     return result.rows[0].acc_id;
//   } catch (error) {
//     console.error('Error executing query', error);
//     throw error;
//   }
// }

// module.exports = {
//   loginUser,
//   registerUser,
// };
