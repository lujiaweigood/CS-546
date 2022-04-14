const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  var data = {
    title: "Logout"
  };

  res.render("logout", data);
});

module.exports = router;
