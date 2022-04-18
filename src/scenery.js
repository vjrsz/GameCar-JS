class Scenery{
	constructor(tag, x, y, w, h, colors, sizes = []){
		this.tag = tag
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.colors = colors
		this.sizes = sizes
		this.lines = new Array()
	}
	init(){
		styleGeral(this.tag, this.w, this.h, this.x, this.y)
		for(let i = 0; i < this.sizes.length; i++){
			let colorActual = (i%2==0) ? this.colors[0] : this.colors[1]
			let placeRect = Rect(this.x, this.y, this.w, this.sizes[i]*this.h/100, colorActual);
			this.lines.push( placeRect )
			this.tag.appendChild(placeRect);
		}
		this.draw()
	}
	draw(sizes = [], colorReverse){
		if(colorReverse){
			this.colors.reverse()
		}
		for(let i = 0; i < this.sizes.length; i++){
			let colorActual = (i%2==0) ? this.colors[0] : this.colors[1]
			this.lines[i].style.height = (this.sizes[i]*this.h/100) + 'px';
			this.lines[i].style.background = colorActual
		}
	}
}
