const express = require('express');
const router = express.Router();
const albumsData = require('../data/albums');
const bandsData = require('../data/bands');
const { ObjectId } = require('mongodb');

async function main()

{
router.get('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)){
      res.status(400).json({ error:'Id is invalid'});
      return;
    }
    const get = await albumsData.getAll(req.params.id);
    res.json(get);
    res.status(200).send();
  } catch (e) {
    res.status(404).json({ message: 'Band or album id Not found' });
  }
});



router.post("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)){
      res.status(400).json({ error:'Id is invalid'});
      return;
    }
      await bandsData.get(req.params.id);
  } catch (e) {
    res.status(404).json({error: 'Id not found'});
    return;
  }

  try {
    
    const  bandInfo= req.body;
    if (typeof bandInfo !== 'object') {
      res.status(400).json({ error: 'You must provide an object to create an album'});
      return;
    }
    if (Object.keys(bandInfo).length != 4) {
      res.status(400).json({ error: 'You must not provide extra field'});
      return;
    }
    if (!bandInfo) {
      res.status(400).json({ error: 'You must provide data to create an album' });
      return;
    }
    if (!bandInfo.title) {
      res.status(400).json({ error: 'You must provide data to create an album' });
      return;
    }
    if (!bandInfo.releaseDate) {
      res.status(400).json({ error: 'You must provide data to create an album' });
      return;
    }
    if (!bandInfo.tracks) {
      res.status(400).json({ error: 'You must provide data to create an album' });
      return;
    }
    if (!bandInfo.rating) {
      res.status(400).json({ error: 'You must provide data to create an album' });
      return;
    }

    const {title, releaseDate, tracks, rating} = bandInfo;
      await bandsData.get(req.params.id);
      const post = await albumsData.create(req.params.id, title, releaseDate, tracks, rating);
      const get = await bandsData.get(req.params.id);
      res.json(get);
      res.status(200).send();
  } catch (e) {
    res.status(404).json({e});
  }
});

router.get('/album/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)){
      res.status(400).json({ error:'Id is invalid'});
      return;
    }
    const postList = await albumsData.get(req.params.id);
    res.json(postList);
    res.status(200).send();
  } catch (e) {
    res.status(404).json({error: 'Id not found'});
  }
});


router.delete('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)){
      res.status(400).json({ error:'Id is invalid'});
      return;
    }
      const bands = await albumsData.remove(req.params.id);
      res.json(bands);
      res.status(200).send();
  } catch (e) {
    res.status(404).json({error: 'Id not found'});
  }
});
}
main();
module.exports = router;
