var express = require('express');
const Article = require('../Models/Article');
var router = express.Router();

router.get('/articles', async(req, res) => {

    const articles = await Article.find()
    res.send(articles)
    
});

router.get('/articles/:id', async(req,res) => {
    try{
    const article = await Article.findOne({_id: req.params.id})
    res.send(article)
    }
    catch {
        res.status(404)
        res.send({ error: "Post does not exist."})
    }
})

router.delete('/articles/:id', async (req, res) => {
    try {
        await Article.deleteOne({_id: req.params.id})
        res.status(204).send()
    }
    catch {
        res.status(404)
        res.send({error : "Post does not exist"})
    }
})

router.post('/articles', async(req, res) => {
    const article = new Article({
        title: req.title,
        author: req.author,
        body: req.body
    })
    await article.save()
    res.send(article)
})
module.exports = router;