var mysql= require('../../routes/mysql1');
exports.first_job = {
    
    after: {                // Configuring this job to run after this period. 
        seconds: 60
    },
    job: function () {
        // console.log("first_job");
            var currdate= new Date();
            month= currdate.getMonth()+1;
            var datestr= month+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes();
            var query= "SELECT * FROM regitem WHERE auction='Auction' AND quantity!='0';";
        mysql.fetchData(function (err,result) {
            if(err){
                throw err;
            }
            else{   
                    for(i=0;i<result.length;i++){
                        if(result[i].expiredate === datestr){
                    var bidwinnerquery= "INSERT INTO cart (itemid,name,price,quantity,description,type,auction,available,seller,buyer) VALUES ('"+result[i].itemid+"','"+result[i].name+"','"+result[i].maxbid+"','"+result[i].quantity+"','"+result[i].description+"','"+result[i].type+"','"+result[i].auction+"','1','"+result[i].uid+"','"+result[i].maxuser+"');";
                    mysql.push(function (err,result) {
                        if(err){
                            throw err;
                        }
                        else{
                            console.log("bid won by="+result[i].maxuser);
                        }
                    },bidwinnerquery);

                        }
                    }
            }
        },query);
    },
    spawn: true             
}