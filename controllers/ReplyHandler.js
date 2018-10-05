var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = process.env.DB;

const ReplyHandler = {

  getReplies: function(req, res){
     var board = req.params.board ? req.params.board : '';
     mongo.connect(url, function(err, db) {
          var collection = db.collection(board);
         collection.find({_id: new ObjectId(req.query.thread_id)}).toArray(function(err, docs){
           //console.log(docs[0])
           res.json(docs[0])
      });
        
   })
     },
  
   addReply: function(req, res){
     //console.log(req)
     var board = req.params.board ? req.params.board : '';
     var thread_id = req.body.thread_id;
     console.log(thread_id)
      var reply = {
        _id: new ObjectId(),
         text: req.body.text,
         created_on: new Date(),
         reported: false,
         delete_password: req.body.delete_password
        }
    mongo.connect(url, function(err, db) {
      var collection = db.collection(board);
      collection.findAndModify(
        {_id: new ObjectId(thread_id)},
        [],
        {
          $set: {bumped_on: new Date()},
          $push: {replies: reply},
        },
        function(err, doc) {
          console.log(doc)
        });
       res.redirect('/b/'+board+'/'+req.body.thread_id);
    });   
    }

 }
module.exports = ReplyHandler;