/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
var testId;
var testId2;
var testId3;

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('create 2 new threads', function(done) {
        chai.request(server)
        .post('/api/threads/fcc')
        .send({text:'This is a test', delete_password:'password'})
        .end(function(err, res){
          assert.equal(res.status, 200);
        });
        chai.request(server)
        .post('/api/threads/fcc')
        .send({text:'This is a test', delete_password:'password'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
        });
      });
    });
    
    suite('GET', function() {
      
      test('most recent 10 threads with most recent 3 replies each', function(done) {
        chai.request(server)
          .get('/api/threads/fcc')
          .end(function(err,res){
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.equal(res.body.length, 10);
            assert.isBelow(res.body[0].replies.length, 4);
            testId = res.body[0]._id;
            testId2 = res.body[1]._id;
        done()
        });
      });
      
    });
    
    suite('DELETE', function() {
      test('delete thread with correct password', function(done) {
        chai.request(server)
         .delete('/api/threads/fcc')
         .send({thread_id: testId, delete_password: 'password'})
         .end(function (err, res){
          //console.log(res)
           assert.equal(res.status, 200);
           assert.equal(res.text, 'success')
          done();
        });
        test('delete thread with incorrect password', function(done) {
        chai.request(server)
         .delete('/api/threads/fcc')
         .send({thread_id: testId2, delete_password: 'wrong'})
         .end(function (err, res){
           assert.equal(res.status, 200);
           assert.equal(res.text, 'incorrect password');
          done()
        });
        
      });
      });
      
    });
    
    suite('PUT', function() {
      test('report thread', function(done){
       chai.request(server)
        .put('/api/threads/fcc')
        .send({report_id: testId2})
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'reported');
         done();
         })
      })
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('create a new reply', function(done) {
        chai.request(server)
        .post('/api/replies/fcc')
        .send({thread_Id: testId2, text: 'reply text', delete_password:'password'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          console.log(res.body)
          done();
        });
      });
    });
    
    
    suite('GET', function() {
     test('get all replies for a thread', function(done) {
        chai.request(server)
          .get('/api/replies/fcc')
          .query({thread_id: testId2})
          .end(function(err,res){
            assert.equal(res.status, 200);
            assert.isArray(res.body.replies)
            //assert.equal(res.body.replies[res.body.replies.length-1].text, 'reply text');
            //console.log(res.body)
        done()
        });
      });
    });
    
    suite('PUT', function() {
      test('report reply', function(done) {
        chai.request(server)
        .put('/api/threads/fcc')
        .send({thread_id:testId2, reply_id:testId2})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'reported');
          done();
        });
      });      
    });
    
    suite('DELETE', function() {
      test('successfully delete reply', function(done) {
        chai.request(server)
        .delete('/api/threads/fcc')
        .send({thread_id:testId2, reply_id:testId3, delete_password: 'password'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        });
      });  
      
     test('unsuccessfully delete reply', function(done) {
        chai.request(server)
        .delete('/api/threads/fcc')
        .send({thread_id:testId2, reply_id:testId3, delete_password: 'wrong'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'incorrect password');
          done();
        });
      }); 
    });
    
  });

});
