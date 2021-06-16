// Connect to DB
const { Client } = require("pg");
const DB_NAME = "boilerplate-dev";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
const tagArrayToObject = require("./tagArrayToObject");

// database methods
async function createLink({ link, comment}) {
  try {
    const {
      rows: [links],
    } = await client.query(
      `
      INSERT INTO links (link, comment)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [link, comment]
    );

    return links;
  } catch (error) {
    console.error("createLink", error);
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
    console.error("getAllLinks", error);
    throw error;
  }
}

async function getLink(linkId) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    SELECT * FROM links
    WHERE id=$1;
    `,
      [linkId]
    );
    return link;
  } catch (error) {
    console.error("getLink", error);
    throw error;
  }
}

async function deleteLink(linkId) {
  try {
    const { rows: [link] } = await client.query(`
      DELETE FROM links
      where id=$1;
    `, [linkId])

    return getAllLinks();
  } catch (error) {
    console.error("deleteLink", error);
    throw error;
  }
}

async function updateLink(linkId) {
  try {
    await client.query(`
      UPDATE links
      SET "clickCount" = links."clickCount" + 1
      WHERE id=$1;
    `, [linkId])

    return await getAllLinks();
  } catch (error) {
    console.error("updateLink", error);
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

    console.log(tag);
    return tag;
  } catch (error) {
    console.error("createTag", error);
    throw error;
  }
}

async function findOrCreateTag(name) {
  try {
    const { rows: [tag] } = await client.query(`
      SELECT * FROM tags
      WHERE name=$1;
    `, [name])

    if(tag){
      return tag;
    }

    return createTag(name);

  } catch (error) {
    console.error("findOrCreateTag", error);
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows: tags } = await client.query(`
      SELECT a.id , a.name "tagName", b.id "linkId",b.link, b."clickCount",b.comment,b."dateShared"
      FROM tags a LEFT JOIN links b on a."id"=b."tagId"`);
    return tagArrayToObject(tags);
  } catch (error) {
    console.error("getAllTags", error);
    throw error;
  }
}

async function getLinksByTagName({ tagname: name }) {
  try {
    console.log(name, "-----------");
    const { rows: tags } = await client.query(
      `

    SELECT a.id, a.name, b.id "linkId", b.link,b."clickCount",b.comment,b."dateShared"
    FROM tags a JOIN links b ON a.id=b."tagId"
    WHERE a.name=$1
    `,
      [name]
    );

    const tagsObject = tagArrayToObject(tags);
    return tagsObject;
  } catch (error) {
    console.error("getLinksByTagName", error);
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  createTag,
  deleteLink,
  findOrCreateTag,
  getAllLinks,
  getAllTags,
  getLinksByTagName,
  getLink,
  updateLink
};
