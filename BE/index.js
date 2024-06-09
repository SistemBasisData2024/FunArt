const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const cors = require('cors');

// const accountRepository = require('./repositories/repository.account');
// const contentRepository = require('./repositories/repository.content');
// const commentRepository = require('./repositories/repository.comment');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;

// PostgreSQL database connection configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Multer middleware for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create folder if not exists
    const folderPath = path.join(__dirname, 'contents', req.body.acc_id);
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    // Use the content_id as the filename
    cb(null, `${req.body.content_id}.png`);
  }
});

const upload = multer({ storage });

// Route for account login
app.post('/account/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database to find the account with the given username
    const userQuery = {
      text: 'SELECT acc_id, points, contents_id FROM account WHERE username = $1',
      values: [username],
    };

    const userResult = await pool.query(userQuery);

    if (userResult.rows.length === 0) {
      // No account with the given username
      return res.status(404).json({ message: 'Account with that Username does not exist' });
    }

    // Query the database to find the account with the given username and password
    const query = {
      text: 'SELECT acc_id, points, contents_id FROM account WHERE username = $1 AND password = $2',
      values: [username, password],
    };

    const result = await pool.query(query);

    if (result.rows.length === 1) {
      // Account found, return account details
      const account = result.rows[0];
      res.json(account);
    } else {
      // Wrong password
      res.status(401).json({ message: 'The password is not correct'});
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for account registration
app.post('/account/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const userQuery = {
      text: 'SELECT COUNT(*) FROM account WHERE username = $1',
      values: [username],
    };

    const userResult = await pool.query(userQuery);

    if (userResult.rows[0].count > 0) {
      // Username already exists
      return res.status(400).json({ message: 'Username already exists' });
    }

    let acc_id;
    let accExists = true;

    // Keep generating random acc_id until it doesn't exist in the database
    while (accExists) {
      acc_id = generateRandomAlphanumeric(10);

      const checkQuery = {
        text: 'SELECT COUNT(*) FROM account WHERE acc_id = $1',
        values: [acc_id],
      };

      const checkResult = await pool.query(checkQuery);

      accExists = checkResult.rows[0].count > 0;
    }

    // Insert the new account into the database
    const insertQuery = {
      text: 'INSERT INTO account (acc_id, acc_type, username, password, points, contents_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING acc_id',
      values: [acc_id, 'registered', username, password, 0, ['']],
    };

    const insertResult = await pool.query(insertQuery);

    res.status(201).json({ message: 'Account created successfully', acc_id });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get account information by id
app.get('/account/:id', async (req, res) => {
  const acc_id = req.params.id;

  try {
    // Query the database to get account information by id
    const query = {
      text: 'SELECT * FROM account WHERE acc_id = $1',
      values: [acc_id],
    };

    const result = await pool.query(query);

    if (result.rows.length === 1) {
      // Account found, return account details
      const account = result.rows[0];
      res.json(account);
    } else {
      // Account with the specified id does not exist
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/content/post', async (req, res) => {
  const { acc_id, content_type, content_desc, tag, content_title } = req.body;

  try {
    let content_id;
    let contentExists = true;

    // Keep generating random content_id until it doesn't exist in the database
    while (contentExists) {
      content_id = generateRandomAlphanumeric(10);

      const checkQuery = {
        text: 'SELECT COUNT(*) FROM content WHERE content_id = $1',
        values: [content_id],
      };

      const checkResult = await pool.query(checkQuery);

      contentExists = checkResult.rows[0].count > 0;
    }

    // Get the current date and time in UTC+7
    const currentDate = moment.tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');

    // Insert the new content into the database
    const insertQuery = {
      text: 'INSERT INTO content (content_id, acc_id, content_type, content_desc, tag, likes, comments_id, content_title, uploaded_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING content_id',
      values: [content_id, acc_id, content_type, content_desc, tag, 0, null, content_title, currentDate],
    };

    const insertResult = await pool.query(insertQuery);

    // Add the content_id to the contents_id array in the account table
    const updateQuery = {
      text: 'UPDATE account SET contents_id = array_append(contents_id, $1) WHERE acc_id = $2',
      values: [content_id, acc_id],
    };

    await pool.query(updateQuery);
    res.status(201).json({ message: 'Content posted successfully', content_id });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to upload image
app.post('/content/upload', upload.single('image'), async (req, res) => {
  // File upload middleware will handle the file saving
  res.status(200).json({ message: 'Image uploaded successfully' });
});

// Route to get content by id
app.get('/content/:id', async (req, res) => {
  const content_id = req.params.id;

  try {
    // Query the database to get content information by id
    const query = {
      text: 'SELECT * FROM content WHERE content_id = $1',
      values: [content_id],
    };

    const result = await pool.query(query);

    if (result.rows.length === 1) {
      // Content found, return content details
      const content = result.rows[0];
      
      // Get the path to the image file
      const imagePath = path.join(__dirname, 'contents', content.acc_id, `${content_id}.png`);

      // Check if the image file exists
      if (fs.existsSync(imagePath)) {
        // If image exists, send the image file as a response
        res.sendFile(imagePath);
      } else {
        // If image does not exist, send a placeholder image or error message
        res.status(404).send('Image not found');
      }
    } else {
      // Content with the specified id does not exist
      res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/content/getAllSortByDate', async (req, res) => {
  try {
    // Query the database to get all content sorted by updated_at timestamp
    const query = {
      text: 'SELECT * FROM content ORDER BY updated_at DESC',
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      // Contents found, return the contents
      res.json(result.rows);
    } else {
      // No content found
      res.status(404).json({ message: 'No content found' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/comment/post', async (req, res) => {
  const { acc_id, content_id, comment } = req.body;

  try {
    let comment_id;
    let commentExists = true;

    // Keep generating random comment_id until it doesn't exist in the database
    while (commentExists) {
      comment_id = generateRandomAlphanumeric(6);

      const checkQuery = {
        text: 'SELECT COUNT(*) FROM content_comment WHERE comment_id = $1',
        values: [comment_id],
      };

      const checkResult = await pool.query(checkQuery);

      commentExists = checkResult.rows[0].count > 0;
    }

    // Insert the new comment into the database
    const insertQuery = {
      text: 'INSERT INTO comment (comment_id, acc_id, comment, replies_id, content_id) VALUES ($1, $2, $3, $4, $5) RETURNING comment_id',
      values: [comment_id, acc_id, comment, 0, content_id],
    };

    const insertResult = await pool.query(insertQuery);

    // Add the comment_id to the comments_id array in the content table
    const updateQuery = {
      text: 'UPDATE content SET comments_id = array_append(comments_id, $1) WHERE content_id = $2',
      values: [comment_id, content_id],
    };

    await pool.query(updateQuery);
    res.status(201).json({ message: 'Comment posted successfully', content_id });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/comment/:id', async (req, res) => {
  const comment_id = req.params.id;

  try {
    // Query the database to get comment information by id
    const query = {
      text: 'SELECT * FROM comment WHERE comment_id = $1',
      values: [comment_id],
    };

    const result = await pool.query(query);

    if (result.rows.length === 1) {
      // Comment found, return comment details
      const comment = result.rows[0];
      res.json(comment);
    } else {
      // Comment with the specified id does not exist
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// Function to generate random alphanumeric string
function generateRandomAlphanumeric(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}