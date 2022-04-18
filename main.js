const SCREEN = { w: 720, h: 480 , r: window.innerWidth/window.innerHeight }
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
		y: 0,
		w: SCREEN.w,
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
			return (SCREEN.h - this.h - 20)*-2
		},
		src : 'assets/hero.png'
	}
}
const scenePlay = {
	init : function(){
		const game = document.getElementById("game")
			styleGeral(game, SCREEN.w, SCREEN.h)

		const sky = document.createElement("div")
		sky.id = "sky"
		scenePlay.sky = new Sky(sky, settings.sky.x, settings.sky.y, settings.sky.w, settings.sky.h, settings.sky.src);
		scenePlay.sky.init()
		
		const road = document.createElement("div")
		road.id = "road"
		scenePlay.road = new Scenery(road, settings.scenery.x, settings.scenery.y, settings.scenery.w, settings.scenery.h, settings.road.color, settings.scenery.sizes)
		scenePlay.road.init()

		const place = document.createElement("div")
		place.id = "place"
		scenePlay.place = new Scenery(place, settings.scenery.x, settings.scenery.y-settings.scenery.h, settings.scenery.w, settings.scenery.h, settings.place.color, settings.scenery.sizes)
		scenePlay.place.init()

		const line = document.createElement("div")
		line.id = "line"
		scenePlay.line = new Lines(line, settings.scenery.x, settings.scenery.y-settings.scenery.h*2, settings.scenery.w, settings.scenery.h, settings.lines.color)
		scenePlay.line.init()

		const car = document.createElement("div")
		car.id = "car"
		scenePlay.car = new Car(car, settings.car.getX(), settings.car.getY(), settings.car.w, settings.car.h, settings.car.src)
		scenePlay.car.init()

		const playDiv = document.createElement("div")
		playDiv.id = "play"
		playDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-caret-right" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 15l-6 -6l-6 6h12" fill="#fff" transform="rotate(90 12 12)" />
      	</svg>`
      	playDiv.addEventListener("click", play)
		styleGeral(playDiv, SCREEN.w, SCREEN.h, 0, SCREEN.h*-3.4)

		scenePlay.counterDiv = document.createElement("div")
		scenePlay.counterP = document.createElement("p")
		scenePlay.counterDiv.id = "counter"
		scenePlay.counterP.id = "counter-p"

		game.appendChild(sky)		
		game.appendChild(road)		
		game.appendChild(place)	
		game.appendChild(line)	
		game.appendChild(car)
		game.appendChild(scenePlay.counterDiv)
		game.appendChild(playDiv)
		scenePlay.counterDiv.appendChild(scenePlay.counterP)

		styleGeral(scenePlay.counterDiv, SCREEN.w, SCREEN.h, 0, SCREEN.h*-2.4)
		scenePlay.counterDiv.style.zIndex = '20'

		
	},
	play: function(fps = 20, timeMax = 3){
		scenePlay.count = 1
		scenePlay.time=0
		scenePlay.timeMax=timeMax*1000
		scenePlay.fps = 1000/fps
		setTimeout(()=>{
		scenePlay.controlUpdate = setInterval(this.update, scenePlay.fps)
		scenePlay.controlCounter = setInterval(this.counter, 100)
		console.log('oi')

		setInterval(()=>scenePlay.sky.draw(), scenePlay.fps)
		}, 2000)
	},
	update : function(){
		move(settings.scenery.sizes)
		scenePlay.car.draw()
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
		document.getElementById("audio-main").play()
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
function styleGeral(tag, w, h, x='none', y='none') {
	y == 'none' ? 'continue' : tag.style.top = y + 'px' 
	x == 'none' ? 'continue' : tag.style.left = x + 'px'
	w == 'none' ? 'continue' : tag.style.width = w + 'px'
	h == 'none' ? 'continue' : tag.style.height = h + 'px'
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

function play(){
	document.getElementById('play').style.display = 'none'
	document.getElementById("audio-main").muted = false
	document.getElementById("audio-main").play()
	scenePlay.play(20, time)
}

max = 30
min = 0
time = Math.random() * (max - min) + min

max = 1
min = 10
cenary = Math.trunc(Math.random() * (max - min) + min)

settings.sky.src = 'assets/sky/sky'+cenary+'.png'
settings.place.color = banco_cores.place[cenary-1]

scenePlay.init()
