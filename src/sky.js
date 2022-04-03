class Sky{
	constructor(x, y, w, h, color, src){
		this.tag = document.querySelector("#sky")
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.src = src
		this.imgs = []
		this.speed = 0.5
		this.color = color
		this.xs = [0, this.w * -1]
	}
	init(){
		styleGeral(this.tag, this.w, this.h, this.x, this.y)
		for (var i = 0; i < 2; i++) {
			let img = document.createElement('img')
			styleGeral(img, this.w, this.h, this.x-(i*this.w), this.y)
			img.src = this.src
			this.imgs.push(img)
			this.tag.appendChild(img)
		}
		this.tag.style.background = this.color
		this.draw()
	}
	draw(){
		for (var i = 0; i < 2; i++) {
			this.xs[i] += this.speed
			this.imgs[i].style.left = this.xs[i] + 'px'
			if(this.imgs[i].style.left >= this.w){
				this.imgs[i].style.left = (this.w * -1) + 'px'
			}
		}
	}
}