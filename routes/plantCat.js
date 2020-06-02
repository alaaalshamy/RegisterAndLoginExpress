var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const auth = require('./auth');
require('../models/User');
require('../models/PlantCat');
const Categories = mongoose.model('Category');

//POST new user route (optional, everyone has access)
router.post('/newCat', (req, res, next) => {
    const { body: { Category } } = req;
    console.log(Category)
    Category.catStatus = 1; //1  for active user 
    if (!Category) {
        return res.status(422).json({
            errors: {
                CategoryData: 'is required',
            },
        });
    }
    Categories.findOne({ catName: Category.catName }, function (err, catData) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(catData)
        if (catData == null) {
            const finalCat = new Categories(Category);
            return finalCat.save()
                .then(() => res.json({ Category: finalCat }));
        } else {
            return res.status(422).json({
                errors: {
                    category: 'Category already existed',
                },
            });
        }
    });
});
module.exports = router;