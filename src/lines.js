class Lines{
	constructor(tag, x, y, w, h, colors){
		this.tag = tag
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.colors = colors
		this.lines = ['lines-road-r', 'lines-road-l']
	}
	init(){
		let lines = []
		let line
		styleGeral(this.tag, 'none', 'none', this.x, this.y)
		for(let i = 0; i <= this.lines.length-1; i++){
			line = document.createElement("div")
			line.id=this.lines[i]
			lines.push(line)
			this.tag.appendChild(line)
		}
		this.lines = lines
		this.drawLinesBorder()
	}
	drawLinesBorder(){
		for(let i = 0; i <= this.lines.length-1; i++){
			styleGeral(this.lines[i], this.w, this.h, this.x, 0-(this.h*i))
			this.lines[i].style.background = this.colors
		}
	}
	drawLinesRoads(){
	}

}