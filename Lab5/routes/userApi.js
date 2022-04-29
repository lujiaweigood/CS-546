const express = require('express');
const router = express.Router();
const userData = require('../data/');
const data = userData.users;

  
async function main()
{
    router.get ("/people", async (req, res) =>  {
        try { 
            data.getPeople().then((data) => res.json(data));
        } catch (error)
    {
        res.status(500).send();
    }
    });

    router.get ("/work", async (req, res) => {
        try{ 
            data.getWork().then((data) => res.json(data));
    }
    catch (error)
    {
        res.status(500).send();
    }
});


    router.get ("/people/:id", async (req, res) => {  
        try{
            const number = parseInt(req.params.id);
            const get = await data.getPersonById(number);
            res.json(get);
        }catch (error){
        res.status(404).json({message : "Not found!"});
    }
});
  
router.get ("/work/:id", async (req, res) => {
    try{ 
            const number = parseInt(req.params.id);
            const get = await data.getWorkById(number);
            res.json(get);
        }catch (error){
            res.status(404).json({message : "Not found!"});
    }
});


router.get("/", (req, res) => {
    try{ 
        res.json({message : "Blank page! : go to http://localhost:3000/people or http://localhost:3000/work."});
    }catch (error) {
        res.status(404).json({message : "Not found!"});
}
});

}


main();

module.exports = router;
