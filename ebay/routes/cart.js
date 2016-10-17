var mysql= require('./mysql1');
var winston= require('winston');

exports.addtocart= function (req,res) {
	console.log("before"+req.session.cart);
	req.session.cart++;
	console.log("after"+req.session.cart);
	var id= req.param('id');
	var item;
	console.log(id);
	query= "SELECT * FROM regitem WHERE itemid="+id;
		console.log(query);
		mysql.fetchData(function (err,result) {
			if(err){
				throw err;
			}
			else{
				result[0].available;
				result[0].available= result[0].quantity;
				result[0].quantity= '1';
				req.session.carteles.push(result[0]);
				console.dir(result[0]);
				var infostr=req.session.email+" added item "+id+" to the cart @ ";
				winston.log('info',infostr,new Date(), 'by pressing add to cart button');
				res.redirect('/viewcart');
			}
		},query);
	
};

exports.viewcart= function (req,res) {
	console.log("main yahan");
	console.dir(req.session.carteles);
	var items= req.session.carteles;
	var infostr=req.session.email+" viewd his cart items @ ";
	winston.log('info',infostr,new Date(), 'by pressing Cart button');
	res.render('cart',{ items: items });
	// res.render('cart',{});
	
};

exports.delete= function (req,res) {
	console.log("ready to delete");
	var id=req.param('id');
	for(var i=0;i<req.session.carteles.length;i++){
		if(req.session.carteles[i].itemid==id){
			console.log("found at"+i);
			req.session.carteles.splice(i,1);
			console.log(req.session.carteles);
			req.session.cart--;
			var infostr=req.session.email+" deleted item "+id+" from cart @ ";
			winston.log('info',infostr,new Date(), 'by pressing delete button in cart');
			res.redirect('/viewcart');
		}
	}	
};

exports.cardvalidate= function (req,res) {
	var infostr=req.session.email+" checked out of cart @ ";
	winston.log('info',infostr,new Date(), 'by pressing Checkout button');
	res.render('cardvalidate');
};

exports.checkvalid= function(req,res){
	var cardnum= req.param('cardnum');
	var date= req.param('valid');
	var cvv= req.param('cvv');
	var flag=0;
	var mm= date.substring(0,2);
	var yy= date.substring(3);
	console.log(mm+'/'+yy);
	if(cardnum.toString().length==15 || cardnum.toString().length ==16){
	}
	else{
		var infostr=req.session.email+" entered invalid card number @ ";
		winston.log('info',infostr,new Date(), '');
		res.render('checkvalid', { valids: 'card number not valid' });
	}
	var today = new Date();
	var m = today.getMonth()+1;
	var y = today.getFullYear();
	var datePatt= /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/;
	if(datePatt.test(date)!=true){
		res.render('checkvalid', { valids: 'invalid date format' });
	}

	if(m<10) {
	    m='0'+m
	} 

	if(yy<y){
		console.log(yy+'/'+y);
		console.log("less");
		res.render('checkvalid', { valids: 'card expired' });
	}
	else if(yy==y){
		if(mm<m){
			console.log("less");
		var infostr=req.session.email+" used an expired card @ ";
		winston.log('info',infostr,new Date(), '');
		res.render('checkvalid', { valids: 'card expired' });
		}
	}
	if(cvv.toString().length==3){
		for(var i=0;i<req.session.carteles.length;i++){
			var query= "INSERT INTO purchased (itemid,name,price,quantity,description,type,uid,auction,buyer) VALUES ('"+req.session.carteles[i].itemid+"','"+req.session.carteles[i].name+"','"+req.session.carteles[i].price+"','"+req.session.carteles[i].quantity+"','"+req.session.carteles[i].description+"','"+req.session.carteles[i].type+"','"+req.session.carteles[i].uid+"','"+req.session.carteles[i].auction+"','"+req.session.email+"');";
			console.log(query);
			mysql.push(function (err,result) {
				if(err){
					throw err;
				}
				else{
					console.log("inserted in purchased");
				}

			},query);
			
			var updatequant= parseInt(req.session.carteles[i].available)- parseInt(req.session.carteles[i].quantity); 
			var dataquery= "UPDATE regitem SET quantity='"+updatequant+"' WHERE itemid='"+req.session.carteles[i].itemid+"';";
			console.log(dataquery);
			mysql.push(function (err,result) {
				if(err){
					console.log("error");
					throw err;
				}
				else{
					console.log("updated");
				}
			},dataquery);

		}

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

					
					console.log("first"+req.session.cart);
					req.session.cart= 0;
					console.log("second"+req.session.cart);
					req.session.carteles=[];
					res.redirect('/validitypage');
					console.log("ok");	

	}
	else{
		var infostr=req.session.email+" entered wrong cvv @ ";
		winston.log('info',infostr,new Date(), '');
		res.render('checkvalid', { valids: 'the cvv is invalid'});
	}
};

exports.validitypage= function (req,res) {
	console.log("here");
	var infostr=req.session.email+" card got accepted @ ";
	winston.log('info',infostr,new Date(), '');
	res.render('checkvalid',{valids: 'the card has been accepted'});

	
};

exports.addtosession= function (req,res) {
	console.log("addtosession");
	var quantity= req.param('quant');
	var id= req.param('id');
	console.log("quant"+quantity);
	console.log("id"+id);
	for(var i=0;i<req.session.carteles.length;i++){
		if(req.session.carteles[i].itemid==id){
			console.log("found at"+i);
			req.session.carteles[i].quantity= quantity;
			console.log("done");
			console.dir(req.session.carteles);
			var infostr=req.session.email+" changed quantity to "+quantity+" and refreshed @ ";
			winston.log('info',infostr,new Date(), 'by pressing refresh button in cart');
			res.send(200);
		}
	}

};
