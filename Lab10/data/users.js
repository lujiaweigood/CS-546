const { ObjectId, MongoChangeStreamError } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const dbConnection = require('../config/mongoConnection');
const usersDatabase = mongoCollections.usersDatabase;
const bcrypt = require('bcrypt');
const saltRounds = 5;


async function checkUser(username, password) {

	if (!username || typeof username != 'string' || !password || typeof password != 'string')
		throw "username and password must be non-empty strings";
		const db = await dbConnection.dbConnection();
		const usersCollection = await usersDatabase();
		const userData = await usersCollection.findOne({ username: username });
	if (userData == null){
		return {authenticated: false};
	}

	// const hash = await bcrypt.hash(password, saltRounds);
	if (await bcrypt.compare(password, userData.hashedpassword)){
		return {authenticated: true};
	}
	else{
		return {authenticated: false};
	}
}

async function createUser(username, password){
	const db = await dbConnection.dbConnection();
	if (!username || typeof username != 'string' || !password || typeof password != 'string')
	throw "username and password must be non-empty strings";
	if (username.length < 4){
		throw "username should be at least 4 characters long"
	}
	if (password.length<6){
		throw "password should be at least 4 characters long"
	}
	var str = ''
	for (var i = 0; i < username.length; i ++){
		if (username.charAt(i).match(/[a-z]/i) ){
			str = str + username.charAt(i).toLowerCase();
		} else {
			str = str +username.charAt(i);
		}
	}
	username = str;

	let createdUser = 	{
		username: "",
		hashedpassword: ""
	};
	

	const usersCollection = await usersDatabase();
	const userData = await usersCollection.findOne({ username: username });

if (userData == null){

const hash = await bcrypt.hash(password, saltRounds);
password = hash

	createdUser.username = username;
	createdUser.hashedpassword = password;
	const insertInfo = await usersCollection.insertOne(createdUser);
	return {userInserted: true};
} else {
	return {userInserted: false};
};
};

module.exports = {
	checkUser,
	createUser
};