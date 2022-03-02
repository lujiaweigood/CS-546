const bands = require('./data/bands');
const connection = require('./config/mongoConnection');

const main = async () => {
    const db = await connection.connectToDb();
    await db.dropDatabase();

    let linkinPark = undefined;
    let theBeatle = undefined;
    let Westlife = undefined;

  
    try {
      theBeatle = await bands.create("The Beatles", ["Rock", "pop", "beat","psychedelia"], "http://www.thebeatles.com", "parlophone", ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
      console.log(theBeatle);
    } catch (e) {
      console.log(e);
    }

    try {
      linkinPark = await bands.create("Linkin Park", ["Alternative Rock", "Alternative metal", "Electronic rock"], "http://www.linkinpark.com", "Warner", ["Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn" ], 1996);
     } catch (e) {
       console.log(e);
     }

    try {
      bandList = await bands.getAll();
      console.log(bandList);
    } catch (e) {
      console.log(e);
    }

    try {
       Westlife= await bands.create("Westlife", ["Pop"], "http://www.westlife.com", "Warner", ["Shane Filan", "Markus Feehily", "Kian Egan", "Nicky Byrne"], 1999);
       console.log(Westlife);
     } catch (e) {
       console.log(e);
     }

     try {
      rename = await bands.rename(theBeatle._id.toString(), "The new beats");
    } catch (e) {
      console.log(e);
    }

    try {
      band = await bands.get(theBeatle._id.toString());
      console.log(band);
    } catch (e) {
      console.log(e);
    }

    try {
      deleted = await bands.remove(linkinPark._id.toString());
    } catch (e) {
      console.log(e);
    }
    
    try {
      bandList = await bands.getAll();
      console.log(bandList);
    } catch (e) {
      console.log(e);
    }
    try {
      Invalid= await bands.create(123, ["Pop"], "http://www.westlife.com", "Warner", ["Shane Filan", "Markus Feehily", "Kian Egan", "Nicky Byrne"], 1999);
      console.log(Invalid);
    } catch (e) {
      console.log(e);
    }

  try {
    deleted = await bands.remove(linkinPark._id.toString());
    console.log(deleted);
  } catch (e) {
    console.log(e);
  }

  try {
    deleted = await bands.rename(linkinPark._id.toString(),"The new band");
    console.log(deleted);
  } catch (e) {
    console.log(e);
  }

  try {
    deleted = await bands.rename(theBeatle._id.toString(), undefined);
    console.log(deleted);
  } catch (e) {
    console.log(e);
  }
  try {
    band = await bands.get("62130d49b767b28d397582a8");
    console.log(band);
  } catch (e) {
    console.log(e);
  }
    await connection.closeConnection();
}

  main();