var mysql = require('mysql');
var db_config = require('../db');

module.exports = function(app, passport)
{
     app.get('/',function(req,res){
       if(typeof req.user == 'undefined'){
         console.log('Unauthorized access-main');
         res.redirect('/login');
       } else {
         res.render('index',{
             title: "insta_project",
             username: req.user.user_id
         });
       }
     });

     app.get('/logout', function(req, res){
       req.logout();
       res.redirect('/login');
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


     app.get('/login',function(req,res){
        res.render('login',{

        });
     });

     app.post('/login',
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/logIn_fail',
        failureFlash: false
      })
    );

    app.get('/logIn_fail', function(req, res){
       res.send('<script type="text/javascript">alert("로그인 실패");location.href="/login"</script>');
    });
};
