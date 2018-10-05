var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = process.env.DB;

const ThreadHandler = {

  getThreads: function(req, res){
     var board = req.params.board ? req.params.board : '';
     mongo.connect(url, function(err, db) {
          var collection = db.collection(board);
         collection.find({}).toArray(function(err, docs){
           res.json(docs)
      });
        
   })
     },
  
   makeThread: function(req, res){
     var board = req.params.board ? req.params.board : '';
      var thread = {
         text: req.body.text,
         created_on: new Date(),
         bumped_on: new Date(),
         reported: false,
         delete_password: req.body.delete_password,
         replies: []
        }
    mongo.connect(url, function(err, db) {
      var collection = db.collection(board);
      collection.insert(thread, function(){
        res.redirect('/b/'+board+'/');
      });
    })
     },
  
  deleteThread: function(req, res) {
    var board = req.params.board;
    mongo.connect(url, function(err, db) {
     var collection = db.collection(board);
      collection.findAndModify(
        {
          _id: new ObjectId(req.body.thread_id),
          delete_password: req.body.delete_password
        },
        [],
        {},
        {remove: true, new: false},
        function(err,doc){
         doc.value ? res.send('success') : res.send('incorrect password')
         }
        )}
        
    );
  }
}

module.exports = ThreadHandler;