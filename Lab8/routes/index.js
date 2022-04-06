
const pagesRoutes = require('./pages');

const constructorMethod = (app) => {
    app.use('/', pagesRoutes);
    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Not found' });
    });
  };
  
  module.exports = constructorMethod;