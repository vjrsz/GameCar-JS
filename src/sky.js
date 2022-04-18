class Sky{
	constructor(tag, x, y, w, h, src){
		this.tag = tag
		this.w = w
		this.h = h
		this.x = x-(1*this.w)
		this.y = y
		this.src = src
		this.imgs = []
		this.speed = 0.5
	}
	init(){
		//styleGeral(this.tag, this.w, this.h, this.x, this.y)
		for (var i = 0; i < 2; i++) {
			let img = document.createElement('img')
			styleGeral(img, this.w, this.h, this.x, this.y)
			img.src = this.src
			this.imgs.push(img)
			this.tag.appendChild(img)
		}
	}
	draw(){
		this.x += this.speed
		for (var i = 0; i < 2; i++) {
			if(this.x >= 0){
				this.x = (this.w * -1)
			}
			this.imgs[i].style.left = this.x + 'px'
		}
	}
}