const express = require("express")
const router = express.Router();
const loginRoute = require("./login");
const privateRoute = require("./private");
const logoutRoute = require("./logout");
const signupRoute = require("./signup");


function constructorMethod(app) {

  app.use("/", loginRoute);
  app.use("/signup", signupRoute);
  app.use("/private", privateRoute);
  app.use("/logout", logoutRoute);

  app.get('/', function(req, res) {
    res.render('index', {
        title: 'Index page',
    });
  });

  app.post('/login', function(req, res) {
    res.render('index', {
        title: 'Index page',
    });
  });

  app.get('/private', function(req, res) {
    res.render('private', {
        title: 'Signin page',
    });
  });

  app.get('/signup', function(req, res) {
    res.render('signup', {
        title: 'Signup page',
    });
  });

  app.post('/signup', function(req, res) {
    res.render('signup', {
        title: 'Signup page',
    });
  });

  app.get('/logout', function(req, res) {
    res.render('index', {
        title: 'Index page',
    });
  });


  app.use("*", (req, res) => {
    var data = {
      title: "Error: 404",
      description: "Page not found."
    };
    res.status(404).render("error", data);
  });
}

module.exports = constructorMethod;




