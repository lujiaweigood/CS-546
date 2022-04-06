const primeRoutes = require('./prime.js');

const constructorMethod = app => {
  app.use("/", primeRoutes);

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;