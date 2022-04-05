const SCREEN = { w: 780, h: 480 , r: window.innerWidth/window.innerHeight }
const banco_cores = {
	place : [
		["#eedccd", "#e6d4c5"],
		["#078b0c", "#14a912"],
		["#674839", "#be9b85"],
		["#eec277", "#ffdfa4"],
		["#a1a08c", "#b5b4a0"],
		["#208f6e", "#41af71"],
		["#6eb9e0", "#3e8ec1"],
		["#dd4a5f", "#b3313b"],
		["#f9d63b", "#d7ae25"],
		["#f9f3de", "#eae3cb"]
	],
}
const settings = {
	scenery : {
		x: 0,
		y: SCREEN.h * 0.6,
		w: SCREEN.w ,
		h: SCREEN.h * 0.4,
		sizes : [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50
		],
		colorReverse: true
	},
	sky: {
		x: 0,
		y: 0,
		w: SCREEN.w,
		h: SCREEN.h * 0.6,
		color: 'blue',
		src: 'assets/sky/sky01.png',
	},
	lines : {
		color: '#FFF',
	},
	road : {
		color: [ '#959298', '#9c9a9d']
	},
	place : {
		color: ["#eedccd", "#e6d4c5"],
	},
	car : {
		w : SCREEN.w * 0.2,
		h :  SCREEN.h * 0.2,
		getX : function(){
			return (SCREEN.w - this.w)/2
		},
		getY : function(){
			return SCREEN.h - this.h - 20
		},
		src : 'assets/hero.png'
	}
}
const scenePlay = {
	init : function(fps = 20, timeMax = 3){
		scenePlay.sky = new Sky(settings.sky.x, settings.sky.y, settings.sky.w, settings.sky.h,  settings.sky.color, settings.sky.src);
		scenePlay.road = new Scenery('#road', settings.scenery.x, settings.scenery.y, settings.scenery.w, settings.scenery.h, settings.road.color, settings.scenery.sizes)
		scenePlay.place = new Scenery('#place', settings.scenery.x, settings.scenery.y, settings.scenery.w, settings.scenery.h, settings.place.color, settings.scenery.sizes)
		scenePlay.line = new Lines(settings.scenery.x, settings.scenery.y, settings.scenery.w, settings.scenery.h, settings.lines.color)
		scenePlay.car = new Car(settings.car.getX(), settings.car.getY(), settings.car.w, settings.car.h, settings.car.src)
		scenePlay.road.init()
		scenePlay.place.init()
		scenePlay.sky.init()
		scenePlay.line.init()
		scenePlay.car.init()

		scenePlay.counterDiv = document.getElementById('counter')
		scenePlay.counterP = document.getElementById('counter-p')
		styleGeral(scenePlay.counterDiv, SCREEN.w, SCREEN.h, 0, 0)
		scenePlay.audio = document.getElementById('audio')
		scenePlay.audio.style.top = SCREEN.h * 0.05 + 'px'
		scenePlay.audio.style.left = SCREEN.w * 0.9 + 'px'


		scenePlay.audio.addEventListener("click", ()=>{
			if(document.getElementById("audio-main").muted){
				document.getElementById("audio-img").src = 'assets/audio-play.svg'
				document.getElementById("audio-main").muted = false
				document.getElementById("audio-main").play()
			}
			else{
				document.getElementById("audio-main").muted = true
				document.getElementById("audio-img").src = 'assets/audio-muted.svg'
				document.getElementById("audio-main").pause()
			}
		})
		
		scenePlay.counterDiv.style.zIndex = '20'
		scenePlay.count = 1
		scenePlay.time=0
		scenePlay.timeMax=timeMax*1000
		scenePlay.fps = 1000/fps
		setTimeout(()=>{
		scenePlay.controlUpdate = setInterval(this.update, scenePlay.fps)
		scenePlay.controlCounter = setInterval(this.counter, 100)

		setInterval(()=>scenePlay.sky.draw(), scenePlay.fps)
		}, 2000)
	},
	update : function(){
		move(settings.scenery.sizes)
		scenePlay.car.draw()
		//scenePlay.sky.draw()
		scenePlay.road.draw(settings.scenery.sizes, settings.scenery.colorReverse)
		scenePlay.place.draw(settings.scenery.sizes, settings.scenery.colorReverse)
		scenePlay.time+=scenePlay.fps
		if(scenePlay.time >= scenePlay.timeMax){
			scenePlay.finish()
		}
	},
	counter : function(){
		scenePlay.count += 0.01
		scenePlay.counterP.innerHTML = scenePlay.count.toFixed(2) + 'x'	
	},
	finish : function(){
		clearInterval(scenePlay.controlUpdate)
		stopCounter()
		scenePlay.counterP.style.color = "rgb(255,0,0)"
		document.getElementById("audio-main").src = 'assets/sounds/explosion1.mp3'
		document.getElementById("audio-main").loop = false
		scenePlay.car.finish()
	}
}
function move(sizes = []){
	let lastID = sizes.length - 1
	for(let i = 0; i < sizes.length - 1; i++){
		sizes[i] = sizes[i] > 10 ? Math.trunc(sizes[i] += 2) :  parseFloat((sizes[i] += 0.2).toFixed(1))
	}

	sizes[lastID] = Math.trunc(sizes[lastID] -+ 10)
	settings.scenery.colorReverse = false
	if(sizes[lastID] <= 0){
		sizes.pop()
		sizes.unshift(1)
		settings.scenery.colorReverse = true
	}
}
function styleGeral(tag, w, h, x, y) {
	tag.style.position = 'absolute'
	tag.style.top = y + 'px'
	tag.style.left = x + 'px'
	tag.style.display = 'flex'
	tag.style.flexDirection = 'column'
	tag.style.width = w + 'px'
	tag.style.height = h + 'px'
	tag.style.overflow = "hidden"
}
function Rect(x=0, y=0, w=50, h=50, color='none'){
	let rect = document.createElement('div')
	rect.style.display = 'block'
	rect.style.width = w + 'px'
	rect.style.height = h + 'px'
	rect.style.background = color
	return rect
}
function stopCounter(){
	clearInterval(scenePlay.controlCounter)
}
max = 30
min = 0
time = Math.random() * (max - min) + min


max = 1
min = 10
cenary = Math.trunc(Math.random() * (max - min) + min)
settings.sky.src = 'assets/sky/sky'+cenary+'.png'
settings.place.color = banco_cores.place[cenary-1]

scenePlay.init(20, time)



