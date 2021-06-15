// Connect to DB
const { Client } = require("pg");
const DB_NAME = "boilerplate-dev";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
const tagArrayToObject = require('./tagArrayToObject')

// database methods
async function createLink({ link, clickCount, comment, dateShared, tagId }) {
  try {
    const {
      rows: [links],
    } = await client.query(
      `
      INSERT INTO links (link, "clickCount", comment, "dateShared", "tagId")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [link, clickCount, comment, dateShared, tagId]
    );

    return links;
  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
  try {
    const { rows: links } = await client.query(`
      SELECT *
      FROM links`);
    return links;
  } catch (error) {
    throw error;
  }
}

async function getLink(linkId) {
  try {
    const { rows: [link] } = await client.query(`
    SELECT * FROM links
    WHERE id=${linkId};
    `)
    return link;
  } catch (error) {
    throw error;
  }
}

async function createTag(name) {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
      INSERT INTO tags (name)
      VALUES ($1)
      RETURNING *;
    `,
      [name]
    );

    return tag;
  } catch (error) {
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows: tags } = await client.query(`
      SELECT a.id , a.name 'tagName', b.id 'linkId',b.link, b."clickCount",b.comment,b.dateShared
      FROM tags a LEFT JOIN links b on a."id"=b."tagId"`);
    return tagArrayToObject(tags);
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  createTag,
  getAllLinks,
  getLink,
  getAllTags
};
