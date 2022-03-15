var c =document.getElementById('c')
var ctx = c.getContext('2d')
const cw = 400;
const ch = 400;
c.width = cw
c.height = ch

const birdNum = 100
const birdSpeed = 1
const fov = 0.8 //in radians
const viewDist = 30 //in pixels
const cohortDist = 20
const showLines = false;

var birdArray = [];
var closeBirds = []

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

function init(){
	for(var i = 0; i<birdNum;i++){
		birdArray.push( new Bird(rand(0,cw),rand(0,ch) ) )
	}
	//starts loop
	loop()
}

function update(){
	//seperation with walls
	for(i in birdArray){
		closeBirds = []
		for(j in birdArray){
			if(dist(birdArray[i].x,birdArray[i].y,birdArray[j].x,birdArray[j].y) < 50){
				closeBirds.push(birdArray[j])
			}
		}

		for(j of closeBirds){
			//i.vx -= (i.x-j.x)
		}

		if(birdArray[i].x <= 10 ){
			birdArray[i].xv=10
		}else if(birdArray[i].x >=cw-10){
			birdArray[i].xv=-10
		}else if(birdArray[i].y <=10){
			birdArray[i].yv=10
		}else if(birdArray[i].y >=ch-10){
			birdArray[i].yv=-10
		}
	}
	//update xy position based on r val
	for( i in birdArray){
		birdArray[i].x +=birdArray[i].vx
		birdArray[i].y +=birdArray[i].vy
	}
}

function draw(){
	//clear canvas
	ctx.clearRect(0,0,cw,ch)
	
	ctx.strokeStyle = 'blue'
	ctx.lineWidth = 2
	for( i of birdArray){
		ctx.beginPath();
		ctx.ellipse(i.x, i.y, 5, 3, 0, 0, 2*Math.PI);
		ctx.fill()
		line(i.x,i.y,i.x+i.xv,i.y+i.yv)
	}
	
}

window.onload =()=>{
	init()
}

function loop(){
	update()
	draw()

	window.setTimeout(loop,22)
}

class Bird{
	constructor(x,y){
		this.x = x
		this.y = y
		this.vx = (Math.random()*2)-1
		this.vy = (Math.random()*2)-1
	}
}

