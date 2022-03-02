var c =document.getElementById('c')
var ctx = c.getContext('2d')
const cw = 400;
const ch = 400;
c.width = cw
c.height = ch

const birdNum = 200
const birdSpeed = 1
const fov = 0.8 //in radians
const viewDist = 20 //in pixels
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

		//add a bit of randomness
		i.r+=(0.5-Math.random())/25

		//left sightPath
		if(isOffscreen(i.x+(viewDist*Math.cos(i.r-fov)),i.y+(viewDist*Math.sin(i.r-fov))) ){
			i.r+=0.1+(Math.random()*0.1)
		}else if(isOffscreen(i.x+(viewDist*Math.cos(i.r+fov)),i.y+(viewDist*Math.sin(i.r+fov)))){
			i.r-=0.1+(Math.random()*0.1)
		}

		closeBirds = {x:[],y:[],r:[],}
		for(i0 of birdArray){
			if(Math.sqrt( ( (i.x-i0.x)**2) + ( (i.y-i0.y)**2) ) <= 40 ){
				closeBirds.x.push(i0.x)
				closeBirds.x.push(i0.x)
				closeBirds.x.push(i0.x)
			}
		}
		i.r=(i.r+ (closebirds.x.reduce((partialSum, a) => partialSum + a, 0);) )/2

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

