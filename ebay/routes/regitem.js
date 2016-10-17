var mysql= require('./mysql1');
var winston= require('winston');

exports.regitem= function (req,res) {
	var name= req.param("name");
	var description= req.param("description");
	var price= req.param("price");
	var quantity= req.param("quantity");
	var type= req.param("type");
	var auction= req.param("auction");
	var email= req.session.email;
	var currdate= new Date();
	month= currdate.getMonth()+1;
	var datestr= month+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes();
	console.log("date"+datestr);
	var expiredate = new Date();
	var daysToAdd = 4;
	expiredate.setDate(expiredate.getDate() + daysToAdd);
	var dd = expiredate.getDate();
	var mm = expiredate.getMonth() + 1;
	var y = expiredate.getFullYear();
	var expiry;
	if(auction=="Auction"){
	expiry = mm+'/'+dd+'/'+ y+"@"+currdate.getHours()+":"+currdate.getMinutes();
	}
	else{
		expiry= null;
	}
	console.log(expiry);
	var query= "INSERT INTO regitem (name,price,quantity,description,type,uid,auction,adddate,expiredate) VALUES ('"+name+"','"+price+"','"+quantity+"','"+description+"','"+type+"','"+email+"','"+auction+"','"+datestr+"','"+expiry+"');";
	console.log(query);
	mysql.push(function(err,results){
					if(err){
						console.log(err);
						throw err;
					}  
				},query);
	console.log("done");
	var infostr=req.session.email+" submitted an advertisement @ ";
		winston.log('info',infostr,new Date(), 'by pressing the add item button');
	res.redirect('/home');
};