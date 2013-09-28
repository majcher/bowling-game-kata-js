function Score() {
	this.value = 0;
}

Score.prototype.add = function(pins) {
	this.value += pins;
}
