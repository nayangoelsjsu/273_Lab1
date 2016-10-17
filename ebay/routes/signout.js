var mysql= require('./mysql1');
var winston= require('winston');

exports.signout= function (req,res) {

	var deletequery= "DELETE FROM cart WHERE buyer='"+req.session.email+"';";
					console.log(deletequery);
					mysql.push(function (err,result) {
						if(err){
							console.log("error");
							throw err;
						}

						else{
							console.log("updated");
						}
					},deletequery);

	for(var i=0; i<req.session.carteles.length; i++){
		var query= "INSERT INTO cart (itemid,name,price,quantity,description,type,auction,available,seller,buyer) VALUES ('"+req.session.carteles[i].itemid+"','"+req.session.carteles[i].name+"','"+req.session.carteles[i].price+"','"+req.session.carteles[i].quantity+"','"+req.session.carteles[i].description+"','"+req.session.carteles[i].type+"','"+req.session.carteles[i].auction+"','"+req.session.carteles[i].available+"','"+req.session.carteles[i].uid+"','"+req.session.email+"');";
		console.log(query);
		mysql.push(function(errs,results){
			if(errs){
				console.log(errs);
				throw errs;
			}
			else{
				console.log("added");
			}  
		},query);
	}
	var infostr=req.session.email+" logged out @ ";
	winston.log('info',infostr,new Date(), 'by pressing Sign out button');
	res.redirect('/login');
};