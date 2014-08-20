'use strict';

var Treasure = require('../models/treasure'),
    moment   = require('moment');

exports.new = function(req,res){
  res.render('treasures/new');
};

exports.create = function(req,res){
  Treasure.create(req.body, function(){
    res.redirect('/treasures');
  });
};

exports.index = function(req,res){
  Treasure.all(function(err, treasures){
    res.render('/treasures/index', {treasures:treasures, moment:moment});
  });
};


