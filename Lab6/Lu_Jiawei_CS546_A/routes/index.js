const postRoutes = require('./bands');
const userRoutes = require('./albums');

const constructorMethod = (app) => {
  app.use('/bands', postRoutes);
  app.use('/albums', userRoutes);

 // app.use('/albums', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
