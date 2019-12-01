var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./auth');
require('../config/passport');
require('../models/User');

const Users = mongoose.model('Users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//POST new user route (optional, everyone has access)
router.post('/addUser', auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  Users.findOne({ email: user.email}, function(err, userData) {
    if(err){
        console.log(err);
        return;
    }
    if(userData == null){
      const finalUser = new Users(user);
      finalUser.setPassword(user.password);
      return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
    }else {
      return res.status(422).json({
        errors: {
          password: 'User already registered',
        },
      });
    }
});
  
});

//user login
router.post('/login',auth.optional, function(req, res, next) {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }
    if(passportUser) {

      const user = passportUser;
      console.log("Data",{"user":user})
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }
    return status(400).info;
  })(req, res, next);
});

module.exports = router;
