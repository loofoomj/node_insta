var mysql = require('mysql');
var db_config = require('../db');

module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index',{
            title: "insta_project"
        });
     });

     app.get('/test',function(req,res){
       var db = mysql.createConnection(db_config);
       var sql = 'SELECT * FROM `post` WHERE 1';
        db.query(sql, function(err,rows){
          if(err){
            console.error('mysql connection error');
            console.error(err);
            throw err;
          }
          var posts = rows;
          var isWrite = 0;
          res.render('test',{
            posts:posts
          });
          db.end();
       });
     });

};
