var mysql= require('./mysql1');
var winston= require('winston');
exports.home= function (req,res) {
	console.log(req.session.email);
	var email= req.session.email;
	var query= "SELECT * FROM regitem WHERE quantity!='0';";
	var items;
	console.log(query);
	mysql.fetchData(function(err,result){
		if(err){
			throw err;
		}
		else{
			console.log("result= "+result);
			items=result;
			console.dir(items[0].description);
			var infostr=req.session.email+" was on homepage @ ";
					  winston.log('info',infostr,new Date(), '');
	res.render('home',{items: items});
		}
	},query);
	
};