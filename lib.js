function rand(min,max){
	return min+(Math.random()*(max-min))
}

function line(x1,y1,x2,y2){
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2); 
	ctx.stroke();  
}

function isOffscreen(x,y){
	//return(x <0||x>cw||y<0||y>ch)
	return(Math.sqrt( ( ( x-200 )**2 ) + ( (y-200 )**2 )) >200)
}

function dist(x1,y1,x2,y2){
	return Math.sqrt(((x1-x2)**2) + ( (y1-y2)**2) )
}

function sum(arr){
 return arr.reduce((partialSum, a) => partialSum + a, 0);
}

function mean(arr){
	return sum(arr)/arr.length
}