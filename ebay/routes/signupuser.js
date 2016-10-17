var mysql= require('./mysql1');
var winston= require('winston');

exports.signupuser=function (req,res) {
	email=req.param("email");
	console.log(email);
	fname=req.param("fname");
	lname=req.param("lname");
	password=req.param("password");
	var key="guessme";
	var extra="AES_ENCRYPT('"+password+"','"+key+"')";
	// var str={ email: email, fname: fname, lname: lname, password: AES_ENCRYPT(password,key)};
	var query= "INSERT INTO user (email,fname,lname,pass) VALUES ('"+email+"','"+fname+"','"+lname+"',"+extra+");";
	console.log(query);
	mysql.push(function(err,results){
					if(err){
						console.log(err);
						throw err;
					}
					else{
					}  
				},query);
console.log("done");
console.log("added");
req.session.email= email;
req.session.cart=0;
req.session.carteles=[];
console.log(req.session.email);
var infostr=req.session.email+" registered @ ";
winston.log('info',infostr,new Date(), 'by pressing Register button');
res.redirect('/home');

};