// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'change-this-name'
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods
async function createLink(
  link,
  clickCount,
  comment,
  dateShared,
  linkId
) {
  try {
    const {rows: [links]} = await client.query(`
      INSERT INTO links (link, "clickCount", comment, "dateShared", "linkId)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [link, clickCount, comment, dateShared, linkId]);

    return links;
  } catch (error) {
    throw error;
  }
}

async function createTag(name) {
  try {
    const {rows: [tag]} = await client.query(`
      INSERT INTO tags (name)
      VALUES ($1)
      RETURNING *;
    `, [name]);

    return tag;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  // db methods
}