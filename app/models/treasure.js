'use strict';

  var Mongo = require('mongodb'),
      _     = require('lodash'),
      cp    = require('child_process'),
      fs    = require('fs'),
      path  = require('path');

function Treasure(o){
  this.name       = o.name;
  this.loc        = o.loc;
  //this.loc        ={o.loc.name, lat:parseFloat(o.loc.lat), lng:parseFloat(o.loc.lng)};
  //this.loc.lat    = parseFloat(o.loc.lat);
  //this.loc.lng    = parseFloat(o.loc.lng);
  this.difficulty = o.difficulty;
  this.hint       = o.hint;
  this.photo      = o.photo;
  this.isFound    = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});


Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.create = function(o, cb){
  var t = new Treasure(o);
  Treasure.collection.save(t, cb);
};

Treasure.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:id}, cb);
};

module.exports = Treasure;
