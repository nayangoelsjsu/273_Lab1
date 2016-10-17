var mysql= require('./mysql1');
var winston= require('winston');

exports.profile= function (req,res) {
	var email= req.session.email;
	var query= "SELECT * FROM user WHERE email='"+email+"';";
	var fname=null;
	var lname=null;
	var phonenum= null;
	var birthday=null;
	var address= null;
	var city=null;
	var state= null;
	var zip=null;
	console.log(query);
	mysql.fetchData(function (err,result) {
		if(err){
			throw err;
		}	
		else{
			console.log(result[0].fname);
			fname= result[0].fname;
			lname= result[0].lname;
			phonenum= result[0].phnumber;
			birthday= result[0].bday;
			address= result[0].address;
			city= result[0].city;
			state= result[0].state;
			zip= result[0].zip;
			var infostr=req.session.email+" visited his profile @ ";
			winston.log('info',infostr,new Date(), '');
			res.render('profile',{fname: fname, lname: lname, email: email, phonenum: phonenum, birthday: birthday, address: address, city: city, state: state, zip: zip });
		}
	},query);
	// res.render('profile',{})
};