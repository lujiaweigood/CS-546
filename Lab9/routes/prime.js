const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.render("prime/form");
});

router.post("/", (req, res) => {
  res.render("prime/form");
});

module.exports = router;