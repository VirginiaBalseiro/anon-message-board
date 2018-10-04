/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongo = require('mongodb').MongoCliente;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.DB;
var ThreadHandler = require('../controllers/ThreadHandler.js');

module.exports = function (app) {
  //I can POST a thread to a specific message board by passing form data text and delete_password to /api/threads/{board}.
  //(Recomend res.redirect to board page /b/{board}) Saved will be _id, text, created_on(date&time), bumped_on(date&time, 
  //starts same as created_on), reported(boolean), delete_password, & replies(array).
 

  app.route('/api/threads/:board')
    .get(ThreadHandler.getThreads)
    .post(ThreadHandler.makeThread)

    
    
    
    
    
  app.route('/api/replies/:board');
  

};
