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


     app.get('/register',function(req,res){
        res.render('register',{

        });
     });

     app.post('/register_check',function(req,res){
       var db = mysql.createConnection(db_config);
       var id = req.body.id;
       var pw = req.body.pw;
       var repw = req.body.repw;
       var sql = 'SELECT count(*) AS idCount FROM `user` WHERE `user_id`= ?';
        db.query(sql, [id], function(err,rows){
          if(err){
            console.error('mysql connection error');
            console.error(err);
            throw err;
          }
          var count = rows[0].idCount;
          if(count!==0){
            db.end();
            res.send('<script type="text/javascript">alert("아이디가 존재합니다.");location.href="/register"</script>');
          } else {
            var reg_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            var sql_2 = 'INSERT INTO `user`(`user_id`, `user_pw`, `reg_date`) VALUES (?, ?, ?)';
            db.query(sql_2, [id, pw, reg_date], function(err){
              if(err){
                console.error('mysql connection error');
                console.error(err);
                throw err;
              }
            });
            db.end();
            res.send('<script type="text/javascript">alert("회원가입 완료!");location.href="/"</script>');
          }
       });

     });
};
