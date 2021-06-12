// code to build and initialize DB goes here
const {
  client,
  createLink,
  getAllLinks,
} = require('./index');

async function buildTables() {
  try {
    console.log("Connecting to client...")
    client.connect();
    console.log("Client connected!")

    // drop tables in correct order
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
    `);
    console.log("Finished dropping tables.");

    // build tables in correct order
    console.log("Starting to craete tables...");
    await client.query(`
        CREATE TABLE links(
          id serial PRIMARY KEY,
          link VARCHAR(255) NOT NULL UNIQUE,
          "clickCount" INTEGER DEFAULT 0,
          comment VARCHAR(255),
          "dateShared" DATE DEFAULT CURRENT_DATE,
          "linkId" INTEGER REFERENCES Links(id) ON DELETE CASCADE
        );
          
        CREATE TABLE tags (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL UNIQUE
        );
      `
    )
    console.log("Finished creating tables.")

  } catch (error) {
    console.log("Error in creating tables!")
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log("Starting to create links");

    const firstLink = await createLink({link: 'https://youtube.com', clickCount: '123', comment: 'Best video site', dateShared: 'June 10, 2021', linkId: '1'})
    const secondLink = await createLink({link: 'https://google.com', clickCount: '987', comment: 'Most used search engine', dateShared: 'June 11, 2021', linkId : '2'})
    const thirdLink = await createLink({link: '//https://github.com', clickCount:'5', comment: 'Share projects here', dateShared: 'June 12, 2021', linkId: '3'})

    console.log(firstLink, secondLink, thirdLink);
    console.log("Finished creating links!");
  } catch (error) {
    console.log("Error creating inital data!");
    throw error;
  }
}

async function testDb(){
  try {
    console.log("Starting to test database...");
    console.log("Calling getAllLinks..");
    const links = await getAllLinks();
    console.log("Result:", links);
  } catch (error) {
    console.log("Error during testDb");
    throw error;
  }

}

buildTables()
  .then(populateInitialData)
  .then(testDb)
  .catch(console.error)
  .finally(() => client.end());