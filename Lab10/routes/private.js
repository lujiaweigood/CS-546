const express = require("express");
const router = express.Router();
const userData = require("../data/users");

router.get("/private", async (req, res) => {
    data = {
      title: "User Info",
    };
    res.render("private", data);
  }
);

module.exports = router;
