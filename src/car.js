class Car{
	constructor(x, y, w, h, src){
		this.tag = document.querySelector('#car')
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.src = src
		this.anim = 0
		this.explosion
	}
	init(){
		styleGeral(this.tag, this.w, this.h, this.x, this.y)
		let img = document.createElement('img');
		img.src = this.src
		img.style.width = this.w + 'px'
		img.style.height = this.h + 'px'
		this.tag.appendChild(img);
		this.src = img
		this.draw()
	}
	draw(){
		if( this.anim == 15 ){
			this.tag.style.top = (this.y + 1) + 'px'
			this.anim = 0
		}else{
			this.tag.style.top = (this.y - 1) + 'px'
			this.anim += 1
		}
	}
	finish(){
		let img = document.createElement('img');
		this.tag.removeChild(this.src)
		img.style.position = 'absolute'
		img.style.zIndex = '10'
		let aux = this.tag.style.top 
		img.style.top = (this.h * -1/2) + 'px'
		img.style.left = (this.w * -1/2) + 'px'
		img.style.width = this.w*2 + 'px'
		img.style.height = this.h*2 + 'px'
		this.explosion = img.explosion
		this.tag.appendChild(img);
		let i = 0
		let anim = setInterval(()=>{
			i += 1
			img.src = 'assets/PixelSimulations/Explosion4/00'+(('00'+i).slice(-2))+'.png'
			if(i > 24){
				clearInterval(anim)
			}
		}, 1000/15)
		img.src = 'assets/PixelSimulations/Explosion4/0001.png'

	}
}	