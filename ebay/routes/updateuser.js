var mysql= require("./mysql1");

exports.updateuser= function (req,res) {
	console.log("here");
	console.log(req.param("zip"));
	var phone= req.param("phone");
	var bday= req.param("bday");
	var address= req.param("address");
	var city= req.param("city");
	var state= req.param("state");
	var zip= req.param("zip");
	var email= req.session.email;
	var query="UPDATE user SET phnumber='"+phone+"', bday='"+bday+"', address='"+address+"', city='"+city+"', state='"+state+"', zip='"+zip+"' WHERE email='"+email+"';";
	console.log(query);
	mysql.push(function (err,result) {
		if(err){
			console.log("error");
			throw err;
		}
		else{
			console.log("updated");
		}
	},query);
	res.redirect('/profile');
};