const mongoCollections = require('../config/mongoCollections');
const dbConnection = require('../config/mongoConnection');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');
const uuid = require('uuid');
//const albums = require('./albums');


create = async function(name, genre, website, recordLabel, bandMembers, yearFormed){
const db = await dbConnection.dbConnection();
if (!yearFormed) throw 'You must provide a formed year for your band';
if (typeof yearFormed !== 'number') throw 'Formed year must be a number';
if (yearFormed < 1900 || yearFormed >2022)
throw 'So only years 1900-2022 are valid values';


if (!name) throw 'You must provide a name for your band';
if (typeof name !== 'string') throw 'Name must be a string';
if (name.trim().length === 0)
throw 'Name cannot be an empty string or string with just spaces';

if (!website) throw 'You must provide a website for your band';
if (typeof website !== 'string') throw 'Website must be a string';

if (website.trim().length === 0)
  throw 'Website cannot be an empty string or string with just spaces';
if (!website.includes('http://www.') || !website.includes('.com')){
  throw 'Not a website';
}
if (website.trim().substring(0, 11)!== 'http://www.' || website.trim().substring(website.trim().length - 4) !== '.com' || website.trim().length < 20){
  throw 'Not a website';
}

  if (!recordLabel) throw 'You must provide a record Label for your band';
  if (typeof recordLabel !== 'string') throw 'Record Label must be a string';
  if (recordLabel.trim().length === 0)
    throw 'Record label cannot be an empty string or string with just spaces';

if (!genre || !Array.isArray(genre))
throw 'You must provide an array of genre';
if (genre.length === 0) throw 'You must supply at least one genre';
for (i in genre) {
  if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
    throw 'One or more inputs is not a string or is an empty string';
  }
  genre[i] = genre[i].trim();
}

if (!bandMembers || !Array.isArray(bandMembers))
throw 'You must provide an array of  bandMembers,';
if (bandMembers.length === 0) throw 'You must supply at least one bandMembers';
for (i in bandMembers) {
  if (typeof bandMembers[i] !== 'string' || bandMembers[i].trim().length === 0) {
    throw 'One or more inputs is not a string or is an empty string';
  }
  bandMembers[i] = bandMembers[i].trim();
}

name = name.trim();
website = website.trim();
recordLabel = recordLabel.trim();

const bandCollection = await bands();

let newBand = {
name: name,
genre: genre,
website: website,
recordLabel: recordLabel,
bandMembers: bandMembers,
yearFormed: yearFormed
};
newBand.albums = [];
newBand.overallRating = 0;

const insertInfo = await bandCollection.insertOne(newBand);
if (!insertInfo.acknowledged || !insertInfo.insertedId)
throw 'Could not add band';

const newBankId = insertInfo.insertedId.toString();

return await get(newBankId);
}


getAll = async function(){
  const db = await dbConnection.dbConnection();
const bandCollection = await bands();
const bandList = await bandCollection.find( {}).project({_id : 1, name : 1}).toArray();
if (!bandList) throw 'Could not get all bands';
console.log(bandList);
return bandList;
}

get = async function(id){
  const db = await dbConnection.dbConnection();
if (!id) throw 'You must provide an id to search for';
if (typeof id !== 'string') throw 'Id must be a string';
if (id.trim().length === 0)
throw 'id cannot be an empty string or just spaces';
id = id.trim();
if (!ObjectId.isValid(id)) throw 'invalid object ID';

const bandCollection = await bands();

const findInfo = await bandCollection.findOne({ _id: ObjectId(id) });
if (findInfo== null) {
throw 'The id does not exist.';
}
return findInfo;
}


remove = async function(id){
  const db = await dbConnection.dbConnection();
if (!id) throw 'You must provide an id to search for';
if (typeof id !== 'string') throw 'Id must be a string';
if (id.trim().length === 0)
throw 'id cannot be an empty string or just spaces';
id = id.trim();
if (!ObjectId.isValid(id)) throw 'invalid object ID';

const bandCollection = await bands();

const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });
if (deletionInfo.deletedCount === 0) {
throw 'The id does not exist.';
}
return { "bandId": id , deleted: true };
}


update = async function(id, name, genre, website, recordLabel, bandMembers, yearFormed){
  const db = await dbConnection.dbConnection();

if (!id) throw 'You must provide an id to search for';
if (typeof id !== 'string') throw 'Id must be a string';
if (id.trim().length === 0)
throw 'id cannot be an empty string or just spaces';
id = id.trim();
if (!ObjectId.isValid(id)) throw 'invalid object ID';


if (!yearFormed) throw 'You must provide a formed year for your band';
if (typeof yearFormed !== 'number') throw 'Formed year must be a number';
if (yearFormed < 1900 || yearFormed >2022)
throw 'So only years 1900-2022 are valid values';


if (!name) throw 'You must provide a name for your band';
if (typeof name !== 'string') throw 'Name must be a string';
if (name.trim().length === 0)
throw 'Name cannot be an empty string or string with just spaces';

if (!website) throw 'You must provide a website for your band';
if (typeof website !== 'string') throw 'Website must be a string';

if (website.trim().length === 0)
  throw 'Website cannot be an empty string or string with just spaces';
if (!website.includes('http://www.') || !website.includes('.com')){
  throw 'Not a website';
}
if (website.trim().substring(0, 11)!== 'http://www.' || website.trim().substring(website.trim().length - 4) !== '.com' || website.trim().length < 20){
  throw 'Not a website';
}

  if (!recordLabel) throw 'You must provide a record Label for your band';
  if (typeof recordLabel !== 'string') throw 'Record Label must be a string';
  if (recordLabel.trim().length === 0)
    throw 'Record label cannot be an empty string or string with just spaces';

if (!genre || !Array.isArray(genre))
throw 'You must provide an array of genre';
if (genre.length === 0) throw 'You must supply at least one genre';
for (i in genre) {
  if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
    throw 'One or more inputs is not a string or is an empty string';
  }
  genre[i] = genre[i].trim();
}

if (!bandMembers || !Array.isArray(bandMembers))
throw 'You must provide an array of  bandMembers,';
if (bandMembers.length === 0) throw 'You must supply at least one bandMembers';
for (i in bandMembers) {
  if (typeof bandMembers[i] !== 'string' || bandMembers[i].trim().length === 0) {
    throw 'One or more inputs is not a string or is an empty string';
  }
  bandMembers[i] = bandMembers[i].trim();
}

name = name.trim();
website = website.trim();
recordLabel = recordLabel.trim();

const bandCollection = await bands();
    const beforeReplace = await get(id);

    const replace =  await bandCollection.replaceOne({_id: ObjectId(id)},{name: name, genre: genre, website: website, recordLabel: recordLabel, bandMembers: bandMembers, yearFormed: yearFormed});
    const updateInfo = await bandCollection.findOneAndUpdate({_id: ObjectId(id)} , {$set : { albums:beforeReplace.albums, overallRating : beforeReplace.overallRating}});
    return await get(id);
}

exportedMethods = {
  create,
  getAll,
  get,
  remove,
  update
};
module.exports = exportedMethods;