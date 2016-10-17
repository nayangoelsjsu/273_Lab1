exports.cals= function(req,res){
	console.log("here");
	var a="";
	var a= req.param("arr");
	console.log(a);
	var str="";
	a.toString();
	var ch="";
	var arr=[];
	for(var i=0;i<a.length;i++){
		arr[i]=a.charAt(i);
	}
	for(var i=0;i<arr.length;i++){
		if(arr[i]==' '){
			arr[i]= '+';
		}
	}
	for(var i=0;i<arr.length;i++){
		str= str+arr[i];
	}
	str= str.substring(1,(str.length-2));
	var farr= str.split(',');
	console.log(farr);
	var num=[];
	var op=[];
	var thisOp='';
	var curOp;
	var x,y;
	var ans;
	for(var i=0;i<farr.length;i++){
		console.log(farr[i]);
		console.log(typeof farr[i]);

		if( !(farr[i]== "+" || farr[i]== "-" || farr[i]== "*" || farr[i]== "/") ){
			num.push(parseFloat(farr[i]));
			console.log("pushed number "+ farr[i]);
		}
		else{
			thisOp=farr[i];
			while(op.length!=0 && precedencecheck(thisOp,op[0]) ){
				curOp=op.pop();
				x=num.pop();
				y=num.pop();
				ans= operatorcheck(curOp,y,x);
				num.push(ans);
			}
			console.log("new op "+thisOp);
			op.push(thisOp);
		}
	}

	while(op.length!=0){
		curOp= op.pop();
		x= num.pop();
		y= num.pop();
		ans= operatorcheck(curOp,y,x);
		num.push(ans);
	}
	var finalans= num.pop();
	console.log("ans="+ finalans);
	res.send(finalans.toString());
	};


var precedencecheck= function (op1,op2){
	if((op1=='*' || op1=='/') && (op2=='+' || op2=='-')){
		return false;
	}
	else{
		return true;
	}
}

var operatorcheck= function(op,x,y){
	var ans;
	if(op=='+'){
					ans=sum(x,y);
				}
	if(op=='-'){
					ans=dif(x,y);
				}
	if(op=='*'){
					ans=mul(x,y);
				}
	if(op=='/'){
					ans=div(x,y);
				}
	return ans;
}

var sum= function(a,b){
	return a+b;
};

var dif= function(a,b){
	return a-b;
};
var mul= function(a,b){
	return a*b;
};
var div= function(a,b){
	return a/b;
};

