// Connect to DB
const { Client } = require("pg");
const DB_NAME = "boilerplate-dev";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
const tagArrayToObject = require("./tagArrayToObject");
const linkArrayToObject = require("./linkArrayToObject");
// database methods
async function createLink({ link, comment }) {
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
    SELECT c.id "tagId" , c.name "tagName", a.id ,a.link, a."clickCount",a.comment,a."dateShared"
    FROM links a LEFT JOIN link_tags b on a."id"=b."linkId" LEFT JOIN tags c on c.id=b."tagId"`);
    return linkArrayToObject(links);
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
async function deleteLinkTags(linkId) {
  try {
    const {
      rows: [linkTags],
    } = await client.query(
      `
      DELETE FROM link_tags
      where "linkId"=$1;
    `,
      [linkId]
    );
  } catch (error) {
    console.error("deleteLinkTags", error);
    throw error;
  }
}

async function deleteLink(linkId) {
  try {
    await deleteLinkTags(linkId);

    const {
      rows: [link],
    } = await client.query(
      `
      DELETE FROM links
      where id=$1;
    `,
      [linkId]
    );

    return await getAllLinks();
  } catch (error) {
    console.error("deleteLink", error);
    throw error;
  }
}

async function updateLink(linkId) {
  try {
    await client.query(
      `
      UPDATE links
      SET "clickCount" = links."clickCount" + 1
      WHERE id=$1;
    `,
      [linkId]
    );

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

    return tag;
  } catch (error) {
    console.error("createTag", error);
    throw error;
  }
}

async function findOrCreateTag(name) {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
      SELECT * FROM tags
      WHERE name=$1;
    `,
      [name]
    );

    if (tag) {
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
      SELECT a.id , a.name "tagName", c.id "linkId",c.link, c."clickCount",c.comment,c."dateShared"
      FROM tags a LEFT JOIN link_tags b on a."id"=b."tagId" LEFT JOIN links c on c.id=b."linkId" `);
    console.log(tags);
    return tagArrayToObject(tags);
  } catch (error) {
    console.error("getAllTags", error);
    throw error;
  }
}

async function getLinksByTagName({ tagname: name }) {
  try {
    const { rows: tags } = await client.query(
      `
      SELECT a.id , a.name "tagName",  c.id "linkId",c.link, c."clickCount",c.comment,c."dateShared"
      FROM tags a LEFT JOIN link_tags b on a."id"=b."tagId" LEFT JOIN links c on c.id=b."linkId" 
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
async function createLinktags(linkId, tagId) {
  try {
    console.log(linkId, tagId);
    const {
      rows: [tagLink],
    } = await client.query(
      `INSERT INTO link_tags("linkId","tagId")
        VALUES ($1,$2)
        RETURNING * ;`,
      [linkId, tagId]
    );
    return tagLink;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  createTag,
  createLinktags,
  deleteLink,
  findOrCreateTag,
  getAllLinks,
  getAllTags,
  getLinksByTagName,
  getLink,
  updateLink,
};
