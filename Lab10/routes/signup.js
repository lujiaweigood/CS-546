const express = require('express');
const router = express.Router();
const userData = require('../data/users');
  
router.get("/", (req, res) => {
      res.render('signup');
  });

  router.post('/', async (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
    
      var error_message = 'This username already exis or Empty username/password or username be at least 4 characters or password  should be at least 6 characters';
      var authenticated = false;
      try {
        authenticated = await userData.createUser(username, password);
        
      } catch (e) {
        error_message = 'This username already exis or Empty username/password or username be at least 4 characters or password  should be at least 6 characters';
      }
      if (typeof authenticated == 'object' && authenticated.userInserted == true ) {
          res.redirect('/private');
        } else {
          var data = {
            title: 'Sign up page',
            error: error_message
          };
          res.render('signup', data);
        }
  });

  module.exports = router;