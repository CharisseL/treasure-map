/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'template-test',
    oid       = '000000000000000000000001',
    o         = {name:'gold', loc:{name:'Unknown', lat:'0', lng:'0'}, difficulty:'hard', photo:'url'};

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();beforeEach;
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var t = new Treasure(o);
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('gold');
      expect(t.loc.name).to.equal('Unknown');
      expect(t.loc.lat).to.equal('0');
      expect(t.loc.lng).to.equal('0');
      expect(t.difficulty).to.equal('hard');
      expect(t.photo).to.equal('url');
    });
  });

  describe('.all', function(){
    it('should get all treasures', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create a new treasure', function(done){
      var t = new Treasure(o);
      Treasure.create(o, function(err, treasure){
        expect(treasure._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

describe('.findById', function(){
    it('should find a treasure object by its ID', function(done){
      Treasure.findById(oid, function(err, t){
        expect(t._id.toString()).to.equal(oid);
        done();
      });
    });
  });
});

