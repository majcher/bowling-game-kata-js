function Score() {
	this.value = 0;
	this.frames = [];
}

Score.prototype.add = function(pins) {
	this.value += pins;
}
