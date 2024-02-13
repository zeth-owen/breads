const express = require('express');
const router = express.Router();
const Bread = require('../models/bread');
const render = require('../render');
const mongoose = require('mongoose');




// List Route
router.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.send(render('Index', {
                breads: foundBreads,
                title: 'Index Page'
            }))
        })
})


// New Route
router.get('/new', (req, res) => {
    // res.render('New');
    res.send(render('New'));
});

// Detail Route
router.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
      .then(foundBread => {
        res.send(render('show', {
          bread: foundBread
        }))
      })
      .catch(err => {
        res.send('404')
      })
  })


// Delete Route
router.delete('/:id', async (req, res) => {
    try {
        const deletedBread = await Bread.findOneAndDelete({ _id: req.params.id });
        if (!deletedBread) {
            return res.status(404).send("Bread not found");
        }
        res.status(303).redirect('/breads');
    } catch (error) {
        console.error("Error deleting bread:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Create Route
router.post('/', (req, res) => {
    if(!req.body.image) {
        req.body.image = undefined 
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
  })
  


module.exports = router;
