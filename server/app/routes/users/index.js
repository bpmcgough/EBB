var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
    User.find({}).exec()
        .then(function(users) {
            res.json(users);
        })
        .catch(next);
});


router.get('/:userId/', function(req, res, next){
  User.findById(req.params.userId)
  .then(function(user){
    console.log('found user: ', user);
    res.json(user);
  });
});

router.get('/:userId/friends', function(req, res, next){
  User.findById(req.params.userId)
  .then(function(user){
    console.log('looking for friends, found user: ', user);
    res.json(user.friends);
  });
});

router.post('/', function(req, res, next) {
    if (req.body.username.length && req.body.password.length) { // in case we want to incorporate Google Signin or something
        User.create(req.body)
            .then(function(user) {
                res.status(201).json(user);
            })
            .catch(next);
    } else {
        res.send(401);
    }
});
