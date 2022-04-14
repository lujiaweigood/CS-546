const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const usersDatabase = data.users;

const main = async () => {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();

  const firstPost = await usersDatabase.createUser("aaaaaaaa", "1234234234");
  const second = await usersDatabase.createUser("21312", "123213");

  console.log('Done seeding database');
  await dbConnection.closeConnection();
};

main().catch(console.log);
