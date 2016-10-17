var mysql= require('./mysql1');
var winston= require('winston');
exports.solditem=function (req,res) {
	var query= "SELECT * FROM purchased where uid='"+req.session.email+"';";
	mysql.fetchData(function (err,result) {
		if(err){
			throw err;
		}
		else{
			console.dir(result);
			var infostr=req.session.email+" viewd his sold items @ ";
			winston.log('info',infostr,new Date(), 'by pressing sold item button');
			res.render('solditem',{items: result});
		}
	},query);
};