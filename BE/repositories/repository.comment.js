// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// async function postComment(acc_id, content_id, comment) {
//   try {
//     const comment_id = generateRandomAlphanumeric(6);

//     const query = {
//       text: 'INSERT INTO comment (comment_id, acc_id, comment, replies_id, content_id) VALUES ($1, $2, $3, $4, $5) RETURNING comment_id',
//       values: [comment_id, acc_id, comment, 0, content_id],
//     };

//     await pool.query(query);
//     return comment_id;
//   } catch (error) {
//     console.error('Error executing query', error);
//     throw error;
//   }
// }

// module.exports = {
//   postComment,
// };