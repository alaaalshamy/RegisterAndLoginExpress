var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const auth = require('./auth');
require('../models/Plant');
const Plants = mongoose.model('Plant');

//POST new user route (optional, everyone has access)
router.post('/newPlant', auth.required, (req, res, next) => {
    const { body: { plant } } = req;
    plant.status = 1; //1  for active user 
    console.log(plant)
    if (!plant) {
        return res.status(422).json({
            errors: {
                plantData: 'is required',
            },
        });
    }
    Plants.findOne({ plantName: plant.plantName }, function (err, plantData) {
        if (err) {
            console.log("errrrrrrrrrrrr", err);
            return;
        }
        console.log(plantData)
        if (plantData == null) {
            const finalplant = new Plants(plant);
            return finalplant.save()
                .then(() => res.json({ plant: finalplant }));
        } else {
            return res.status(400).json({
                errors: {
                    Plant: 'Plant already existed',
                },
            });
        }
    });
});
router.get("/getAllPlants",(req,res)=>{
    Plants.find().then((result)=>{
        console.log(result);
        res.send(result).json();
    },(err)=>{
        console.log(err)
        res.send({error,err});
    }); 
})
module.exports = router;