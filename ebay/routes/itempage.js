var mysql= require('./mysql1')
var winston= require('winston');

exports.itempage= function (req,res) {
	var id= req.param("id");
	console.log("id="+id);
	var query= "SELECT * FROM regitem WHERE itemid="+id+";";
	console.log(query);
	mysql.fetchData(function (err,result) {
		if(err){
			throw err;
		}
		else{
			name= result[0].name;
			price= result[0].price;
			quantity= result[0].quantity;
			description= result[0].description;
			type= result[0].type;
			auction= result[0].auction;
			uid= result[0].uid;
			maxbid= result[0].maxbid;
			message= "";
			if(auction=='Auction'){
				if(maxbid==null){
					maxbid=price;
				}
			}
			console.log("maxbid"+maxbid);
			var infostr=req.session.email+" clicked on item with id"+id+" @" ;
			winston.log('info',infostr,new Date(), 'and is now at the item page');
			res.render('item', { id: id, name: name, price: price, quantity: quantity, description: description, type: type, auction: auction, uid: uid, max: maxbid, message: message});
					}
	},query);

};

exports.bidplace= function (req,res) {
	
	var bid=req.param('bid');
	console.log(bid);
	var itemid= req.param('itemid');
	console.log(itemid);

	var infostr=req.session.email+" placed bid on item "+itemid+" of amount "+bid+" @ ";
	winston.log('info',infostr,new Date(), 'by pressing Submit Bid button');

	var query= "UPDATE regitem SET maxbid='"+bid+"', maxuser='"+req.session.email+"' WHERE itemid='"+itemid+"';";
	console.log(query);

	mysql.push(function (err,result) {
		if(err){
			throw err;
		}
		else
		{
			console.log("teri ma ki");
		}
	},query);

	console.log("here man");
			var currdate= new Date();
            month= currdate.getMonth()+1;
            var datestr= month+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes();
			var bidlogquery= "INSERT INTO bid (itemid,timestamp,buyer,bidprice) VALUES ('"+itemid+"','"+datestr+"','"+req.session.email+"','"+bid+"');";
			mysql.push(function (err,result) {
				if(err){
					throw err;
				}
				else{
					console.log("and then here");
					res.send(200);
				}
			},bidlogquery);
			
};