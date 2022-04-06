const axios = require('axios');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render('posts/index');
});

router.post('/searchshows', async (req, res) => {
    const term = req.body.showSearchTerm;

    if (term.trim().length == 0) {
        res.status(400).render('posts/errors', { class: "error", message: "Keyword must be a not empty string! " });
        return;
    }

    try {
        const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + term);

        if (data.length == 0) {
            res.render('posts/errors', { class: 'show-not-found', message: "Result not found " + term + "." });
            return;
        }

        let results = [];
        if (data.length > 5) {
            for (i = 0; i < 5; i++) {
                results.push(data[i]);
            }
        }
        else {
            for (j = 0; j < data.length; j++) {
                results.push(data[j]);
            }
        }
        res.render('posts/searchTerms', { title: "Shows found", showSearchTerm: term, results })
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/show/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).render({ class: "error", message: "Id is invalid" });
        return;
    }
    if (isNaN(id)) {
        res.status(400).render({ class: "error", message: "Id is invalid" });
        return;
    }
    try {
        const { data } = await axios.get('http://api.tvmaze.com/shows/' + id);
        if (data.image.medium == null){
            data.image.medium =    "No Image";
        }
        if (data.name == null){
            data.name =    "N/A";
        }
        if (data.language == null){
            data.language =    "N/A";
        }
        if (data.genres.length ==0 ){
            data.genres =    ["N/A"];
        }
        if (data.rating.average == null){
            data.rating.average =    "N/A";
        }
        if (data.network == null){
            data.network =  {name : "N/A"}; 
        }
        if (data.summary == null){
            data.summary =    "N/A";
        }

        res.render('posts/showTerm', { title: data.name, showInfo: data, summary: data.summary.replace(/(<([^>]+)>)/ig, '') });
    
    } catch (e) {
        res.status(404).render('posts/errors', { class: "error-not-found", message: "Shows not found by given id." });
    }
});

module.exports = router;