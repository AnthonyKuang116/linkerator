// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
    `);

    // build tables in correct order
    await client.query(
      `
        CREATE TABLE links(
          id serial PRIMARY KEY,
          link VARCHAR(255) NOT NULL UNIQUE,
          "clickCount" INTEGER ,
          comment VARCHAR(255),
          "dateShared" DATE,
          "tagId" INTEGER REFERENCES tags(id) ON DELETE CASCADE
        );
          
        CREATE TABLE tags (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL UNIQUE
        );
      `
    );
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
