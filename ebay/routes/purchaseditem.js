var mysql= require('./mysql1');
var winston= require('winston');

exports.purchaseditem= function (req,res) {
	var query= "SELECT * FROM purchased WHERE buyer ='"+req.session.email+"';";
	mysql.fetchData(function (err,result) {
		if(err){
			throw err;
		}
		else{
			console.log(result);
			var infostr=req.session.email+" viewd his purchased items @ ";
			winston.log('info',infostr,new Date(), 'by pressing purchased item button');
			res.render('purchaseditem',{items: result});
		}
	},query); 
};