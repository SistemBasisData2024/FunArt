// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// async function postContent(acc_id, content_type, content_desc, tag, content_title) {
//   try {
//     const content_id = generateRandomAlphanumeric(10);

//     const query = {
//       text: 'INSERT INTO content (content_id, acc_id, content_type, content_desc, tag, likes, comments_id, content_title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING content_id',
//       values: [content_id, acc_id, content_type, content_desc, tag, 0, null, content_title],
//     };

//     await pool.query(query);
//     return content_id;
//   } catch (error) {
//     console.error('Error executing query', error);
//     throw error;
//   }
// }

// module.exports = {
//   postContent,
// };