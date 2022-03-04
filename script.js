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



function init(){
	for(var i = 0; i<birdNum;i++){
		birdArray.push(new Bird(rand(0,cw),rand(0,ch),rand(-1,1),rand(1,-1)))
	}
	//starts loop
	loop()
}

function update(){
	//seperation with walls
	for (i of birdArray) {
		//left sightPath
		if(i.x+(20*i.xv) <0){

		}

		//define close bird array
		closeBirds = []
		for(i0 of birdArray){
			if(dist(i.x,i.y,i0.x,i0.y) <= cohortDist ){
				closeBirds.push(i0)
			}
		}
		

		//apply seperation
		for(i0 in closeBirds.x){
			
		}
		
	}

	//update xy position based on r val
	for( i in birdArray){
		birdArray[i].x +=birdArray[i].xv
		birdArray[i].y +=birdArray[i].yv
	}
}

function draw(){
	//clear canvas
	ctx.clearRect(0,0,cw,ch)
	
	ctx.strokeStyle = 'blue'
	ctx.lineWidth = 2
	for( i of birdArray){
		ctx.beginPath();
		ctx.ellipse(i.x, i.y, 5, 3, Math.atan(i.yv/i.xv), 0, 2*Math.PI);
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
	constructor(x,y,xv,yv){
		this.x = x;
		this.y = y;
		this.xv = xv;
		this.yv = yv;
	}
}

