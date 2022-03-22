const express = require('express');
const router = express.Router();
const bandsData = require('../data/bands');
const { ObjectId } = require('mongodb');

//const {ObjectId} = require('mongodb');


router.get('/', async (req, res) => {
  try {
    const postList = await bandsData.getAll();
    res.json(postList);
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  const bandInfo = req.body;
  try {
    if (typeof bandInfo !== 'object') {
      res.status(400).json({ error: 'You must provide an object to create an bands'});
      return;
    }
    if (Object.keys(bandInfo).length != 6) {
      res.status(400).json({ error: 'You must not provide extra field'});
      return;
    }
    if (!bandInfo) {
      res.status(400).json({ error: 'You must provide data to create an bands'});
      return;
    }
    if (!bandInfo.name || typeof bandInfo.name == 'undefined') {
      res.status(400).json({ error: 'You must provide a name to create an bands' });
      return;
    }
    if (!bandInfo.genre) {
      res.status(400).json({ error: 'You must provide a gnere to create an bands' });
      return;
    }
    if (!bandInfo.website) {
      res.status(400).json({ error: 'You must provide a website to create an bands'});
      return;
    }
    if (!bandInfo.recordLabel) {
      res.status(400).json({ error: 'You must provide a record label to create an bands' });
      return;
    }
    if (!bandInfo.bandMembers) {
      res.status(400).json({ error: 'You must provide band members to create an bands' });
      return;
    }
    if (!bandInfo.yearFormed) {
      res.status(400).json({ error: 'You must provide year formed to create an bands' });
      return;
    }
      const {name, genre, website, recordLabel, bandMembers, yearFormed} = bandInfo;
      const post = await bandsData.create(name, genre, website, recordLabel, bandMembers, yearFormed);
      res.json(post);
      res.status(200).send();
  } catch (e) {
      res.status(400).json({error: e});
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)){
      res.status(400).json({ error:'Id is invalid'});
      return;
    }
    const get = await bandsData.get(req.params.id);
    res.json(get);
    res.status(200).send();
  } catch (e) {
    res.status(404).json({error: e});
  }
});

router.put("/:id", async (req, res) => {
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
    const bandInfo = req.body;
    if (typeof bandInfo !== 'object') {
      res.status(400).json({ error: 'You must provide an object to create an bands'});
      return;
    }
    if (Object.keys(bandInfo).length != 6) {
      res.status(400).json({ error: 'You must not provide extra field'});
      return;
    }

    if (!bandInfo) {
      res.status(400).json({ error: 'You must provide data to create an bands'});
      return;
    }
    if (!bandInfo.name || typeof bandInfo.name == 'undefined') {
      res.status(400).json({ error: 'You must provide a name to create an bands' });
      return;
    }
    if (!bandInfo.genre) {
      res.status(400).json({ error: 'You must provide a gnere to create an bands' });
      return;
    }
    if (!bandInfo.website) {
      res.status(400).json({ error: 'You must provide a website to create an bands'});
      return;
    }
    if (!bandInfo.recordLabel) {
      res.status(400).json({ error: 'You must provide a record label to create an bands' });
      return;
    }
    if (!bandInfo.bandMembers) {
      res.status(400).json({ error: 'You must provide band members to create an bands' });
      return;
    }
    if (!bandInfo.yearFormed) {
      res.status(400).json({ error: 'You must provide year formed to create an bands' });
      return;
    }
      const {name, genre, website, recordLabel, bandMembers, yearFormed} = bandInfo;
      const bands= await bandsData.update(req.params.id, name, genre, website, recordLabel, bandMembers, yearFormed);
      res.json(bands);
  } catch (e) {
    res.status(400).json({error: e});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)){
      res.status(400).json({ error:'Id is invalid'});
      return;
    }
      const bands = await bandsData.remove(req.params.id);
      res.json(bands);
  } catch (e) {
    res.status(404).json({error: e});
    return;
  }
});

module.exports = router;