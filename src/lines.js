class Lines{
	constructor(x, y, w, h, colors){
		//this.tag = document.querySelector(tag)
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.colors = colors
		this.lines = ['lines-road-r', 'lines-road-l']
	}
	init(){
		this.drawLinesBorder()
	}
	drawLinesBorder(){
		for(let i = 0; i <= this.lines.length-1; i++){
			let line = document.createElement('div')
			document.body.insertBefore(line, document.getElementById('#car'));
			styleGeral(line, this.w, this.h, this.x, this.y)
			line.id = this.lines[i]
			line.style.background = this.colors
		}
	}
	drawLinesRoads(){
	}

}