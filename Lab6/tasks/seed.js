const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
//const users = data.users;
const bands = data.bands;
const albums = data.albums;

const main = async () => {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();

  const firstPost = await bands.create("The Beatles", ["Rock", "pop", "beat","psychedelia"], "http://www.thebeatles.com", "parlophone", ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
  const second = await bands.create("Linkin Park", ["Alternative Rock", "Alternative metal", "Electronic rock"], "http://www.linkinpark.com", "Warner", ["Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn" ], 1996);
const third = await albums.create(firstPost._id.toString(), "Abbey Road", "09/26/1969", ["Come Together", 	"Something", "Maxwell's Silver Hammer", 	"Oh! Darling", 	"Octopus's Garden", 	"I Want You (She's So Heavy)"], 4);
const forth = await albums.create(second._id.toString(), "Hybrid Theory", "10/04/2000", ["Papercut", 	"One Step Closer", "With You", 	"Points of Authority", 	"Crawling", 	"Runaway", 	"By Myself", "In the End", "A Place for My Head", 	"Forgotten", "Cure for the Itch", 	"Pushing Me Away"], 2);

const fifth = await albums.create(second._id.toString(), "Meteora", "03/25/2003", ["Foreword", 	"Don't Stay", "Somewhere I Belong", 	"Lying from You", 	"Hit the Floor", 	"Easier to Run", 	"Faint", "Figure.09", "Breaking the Habit", 	"From the Inside", "Nobody's Listening", 	"Session", "Numb"], 4);

  console.log('Done seeding database');
  await dbConnection.closeConnection();
};

main().catch(console.log);
