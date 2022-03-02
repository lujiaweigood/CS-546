const postRoutes = require("./userApi");

const constructorMethod = (app) => {
    try {
        app.use("/", postRoutes);

        app.use("*", (req, res) => {
            res.status(404).json({ error: 'Not found' });
        });
        
    } catch {
        throw "Unable to use routes"
    }
  
};

module.exports = constructorMethod;