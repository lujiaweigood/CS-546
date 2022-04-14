const express = require('express');
const router = express.Router();
const userData = require('../data/users');


router.get('/', async (req, res) => {
  res.render('index');
});

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  var error_message = 'Incorrect username/password.';
  var authenticated = false;
  try {
    authenticated = await userData.checkUser(username, password);
  } catch (e) {
    error_message = 'Empty username/password.';
  }
  if (typeof authenticated == 'object' && authenticated.authenticated == true) {
    req.session.username = username;
    res.redirect('/private');
  } else {
    var data = {
      title: 'Home',
      error: error_message
    };
    res.render('index', data);
  }
});

module.exports = router;
