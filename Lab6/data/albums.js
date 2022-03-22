const mongoCollections = require('../config/mongoCollections');
const dbConnection = require('../config/mongoConnection');
const albums = mongoCollections.bands;
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');
const uuid = require('uuid');


get = async function(albumId) {
  const db = await dbConnection.dbConnection();
  if (!albumId) throw 'You must provide an id to search for';
  if (typeof albumId !== 'string') throw 'Id must be a string';
  if (albumId.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
    albumId = albumId.trim();
  if (!ObjectId.isValid(albumId)) throw 'invalid object ID';
  const albumCollection = await albums();
  const albumgo = await albumCollection.findOne({ _id: ObjectId(albumId) });
  if (albumgo == null) throw 'No album with that id';
  return albumgo;
}

  create = async function(bandId, title, releaseDate, tracks, rating){
    const db = await dbConnection.dbConnection();
    if (!bandId || !title ||  !releaseDate || !tracks || !rating ) throw 'You must provide an id to search for';
    if (typeof bandId !== 'string' ||typeof  title !== 'string' ||typeof  releaseDate !== 'string') throw 'Id must be a string';
    if (bandId.trim().length === 0 || title.trim().length=== 0 || releaseDate.trim().length=== 0)
      throw 'Id cannot be an empty string or just spaces';
      bandId = bandId.trim();
    if (!ObjectId.isValid(bandId)) throw 'invalid object ID';


    if (!Array.isArray(tracks))
    throw 'You must provide an array of track';
    if (tracks.length < 3) throw 'You must supply at least three track';
    for (i in tracks) {
      if (typeof tracks[i] !== 'string' || tracks[i].trim().length === 0) {
        throw "Empty string or not valid string"
      }
      tracks[i] = tracks[i].trim();
    }
    if (releaseDate.split('/').length != 3){
      throw 'You must provide a valid date';
    }
    if (Date.parse(releaseDate) === null){
      throw 'You must provide a valid date';
    } 
    dateArray = releaseDate.split('/')
    for (i of dateArray){
      if (isNaN(Date.parse(i)))
      throw "Not a valid date";
      if (!Number.isInteger(parseInt(i)))
      throw "Not a valid date";
    }
    if (parseInt(dateArray[0]) > 12 || parseInt(dateArray[0]) < 1 || parseInt(dateArray[1])>31 ||  parseInt(dateArray[1]) <1 ||  parseInt(dateArray[2]) <1900|| parseInt(dateArray[2]) >2022  ){
    throw "Not a valid date";
    }
    if (typeof rating !== 'number') {
      throw 'Not a valid number';
    }
    if (rating % 1 === 0 && (rating <1 || rating > 5)){
      throw 'Not a valid number';
    }
    if (rating % 1 !== 0 && (rating < 1.5 || rating > 4.8)){
      throw 'Not a valid number';
    }
    
    bandId = bandId.trim();
    title = title.trim();
    releaseDate = releaseDate.trim();
    
    const bandAlbums = await albums();
  

    let newBandAlbums  = {
    bandId: bandId,
    title: title,
    releaseDate: releaseDate,
    tracks:  tracks,
    rating: rating
    };

    const insertInfo = await bandAlbums.insertOne(newBandAlbums);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add band';
    
    const bandCollection = await bands();
    const updateTitle = await bandCollection.updateOne({_id: ObjectId(bandId) },{$push : {albums : newBandAlbums}});
    const findRating= await bandCollection.findOne({ _id: ObjectId(bandId)});
    if (findRating.albums.length != 0){
      sum = 0;
    for (const i of findRating.albums){
      sum += i.rating;
    }
    average = sum / findRating.albums.length;
  }else if  (findRating.albums.length == 0){
    average = 0;
  }

    const updateAverage = await bandCollection.updateOne({_id: ObjectId(bandId) },{$set : {overallRating : average }});
    const newId = insertInfo.insertedId.toString();
    const album = await get(newId);
    
    return album;
    }

    

getAll = async function(bandId){
  const db = await dbConnection.dbConnection();
  if (!bandId) throw 'You must provide an id to search for';
if (typeof bandId !== 'string') throw 'Id must be a string';
if (bandId.trim().length === 0)
throw 'id cannot be an empty string or just spaces';
bandId = bandId.trim();
if (!ObjectId.isValid(bandId)) throw 'invalid object ID';

const bandCollection = await albums();
const findInfo = await bandCollection.find({ bandId: bandId }).toArray();

if (findInfo.length == 0) {
throw 'The band id does not exist.';
}
return findInfo;
}


remove = async function(albumId){
  const db = await dbConnection.dbConnection();
  if (!albumId) throw 'You must provide an id to search for';
  if (typeof albumId !== 'string') throw 'Id must be a string';
  if (albumId.trim().length === 0)
  throw 'id cannot be an empty string or just spaces';
  albumId = albumId.trim();
  if (!ObjectId.isValid(albumId)) throw 'invalid object ID';


  const bandCollection = await bands();
  const findBandId = await bandCollection.findOne({albums : {$elemMatch:{_id: ObjectId(albumId)}}});
  if (findBandId == undefined) {
    throw 'The album id  does not exist.';
    }

  bandId = findBandId._id.toString();

  const updateTitle = await bandCollection.updateOne({}, {$pull : {albums : {_id : ObjectId(albumId)}}});
  const findRating= await bandCollection.findOne({ _id: ObjectId(bandId)});
  
  if (findRating.albums.length != 0){
    sum = 0;
  for (const i of findRating.albums){
    sum += i.rating;
  }
  average = sum / findRating.albums.length;
}else {
  average = 0;
}

  const updateAverage = await bandCollection.updateOne({_id: ObjectId(bandId) },{$set : {overallRating : average }});


  return { "albumId": albumId, deleted: true };
  
  }


  exportedMethods = {
    create,
    get,
    getAll,
    remove
  };

module.exports = exportedMethods;
