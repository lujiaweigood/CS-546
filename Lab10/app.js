const express = require('express');
const app = express();
const exphbs =  require('express-handlebars');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const session = require('express-session');


app.use(session({
	name: 'AuthCookie',
	secret: 'some secret string!',
	resave: false,
	saveUninitialized: true
  }))

app.use(function(req,res, next) {
    console.log("[%s]: %s %s (%s)",
       new Date().toUTCString(),
       req.method,
       req.originalUrl,
	   
    `${req.session.username ?     "Authenticated User" : "Non-Authenticated User"}`
       );
	//    if(req.session.username){
	// 	console.log("Authenticated User")
	// }else{
	// 	console.log("Non-Authenticated User")
	// }
    next();
});

app.use('/private',  (req, res, next) => {
	if (req.session.username) {
		next();
	}
	else {
		res.status(403).json({ error: 'Not found' });
	}
});



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

configRoutes(app);

app.listen(3000, () => {
	console.log("Server launched...");
	console.log("Routes running on http://localhost:3000");

	if (process && process.send) process.send({done: true});
});