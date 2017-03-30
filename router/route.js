
module.exports = function(app, fs, passport, upload)
{
     app.get('/',function(req,res){
        res.render('index',{
            title: "insta_project"
        });
     });

};
