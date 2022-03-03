var c =document.getElementById('c')
var ctx = c.getContext('2d')
const cw = 400;
const ch = 400;
c.width = cw
c.height = ch

const birdNum = 200
const birdSpeed = 1
const fov = 0.8 //in radians
const viewDist = 30 //in pixels
const cohortDist = 20
const showLines = false;

var birdArray = [];
var closeBirds = {x:[],y:[],r:[],}

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
	return(x <0||x>cw||y<0||y>ch)
	//return(Math.sqrt( ( ( x-200 )**2 ) + ( (y-200 )**2 )) >200)
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

function init(){
	for(var i = 0; i<birdNum;i++){
		birdArray.push(new Bird(rand(0,cw),rand(0,ch),rand(0,2*Math.PI)))
	}
	//starts loop
	loop()
}

function update(){
	//seperation with walls
	for (i of birdArray) {
		//left sightPath
		if(isOffscreen(i.x+(viewDist*Math.cos(i.r-fov)),i.y+(viewDist*Math.sin(i.r-fov))) ){
			i.r+=0.1+(Math.random()*0.1)
		}else if(isOffscreen(i.x+(viewDist*Math.cos(i.r+fov)),i.y+(viewDist*Math.sin(i.r+fov)))){
			i.r-=0.1+(Math.random()*0.1)
		}

		//define close bird array
		closeBirds = {x:[],y:[],r:[],dists:[],avgDist:0,}
		for(i0 of birdArray){
			if(dist(i.x,i.y,i0.x,i0.y) <= cohortDist ){
				closeBirds.x.push(i0.x)
				closeBirds.y.push(i0.y)
				closeBirds.r.push(i0.r)
			}
		}
		//apply allignment
		i.r=(i.r+ (closeBirds.r.reduce((partialSum, a) => partialSum + a, 0)/closeBirds.r.length) )/2

		//apply seperation
		for(i0 in closeBirds.x){
			closeBirds.dists.push(dist(i.x,i.y,closeBirds.x[i0],closeBirds.y[i0]))
		}
		closeBirds.avgDist = mean(closeBirds.dists)
		for(i0 in closeBirds){
			
		}
	}

	//update xy position based on R val
	for( i in birdArray){
		birdArray[i].x +=Math.cos(birdArray[i].r)
		birdArray[i].y +=Math.sin(birdArray[i].r)
	}
}

function draw(){
	//clear canvas
	ctx.clearRect(0,0,cw,ch)
	
	ctx.strokeStyle = 'blue'
	ctx.lineWidth = 2
	for( i of birdArray){
		ctx.beginPath();
		ctx.ellipse(i.x, i.y, 5, 3, i.r, 0, 2*Math.PI);
		ctx.fill()
		if(showLines){
			line(i.x,i.y,i.x+(viewDist*Math.cos(i.r)),i.y+(viewDist*Math.sin(i.r)))
			line(i.x,i.y,i.x+(viewDist*Math.cos(i.r+fov)),i.y+(viewDist*Math.sin(i.r+fov)))
			line(i.x,i.y,i.x+(viewDist*Math.cos(i.r-fov)),i.y+(viewDist*Math.sin(i.r-fov)))
		}
	}
	
}

window.onload =()=>{
	init()
}

function loop(){
	update()
	draw()

	window.setTimeout(loop,20)
}

class Bird{
	constructor(x,y,r){
		this.x = x
		this.y = y
		this.r = r
	}
}

