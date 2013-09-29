function Frame() {
	this.firstRollPins;
	this.secondRollPins;
}

Frame.prototype.isClosed = function() {
	var allRollsDone = this.firstRollPins != undefined && this.secondRollPins != undefined;
	return allRollsDone || this.isStrike();
}

Frame.prototype.add = function(pins) {
	if (this.isClosed())
		throw "Frame closed";

	if (this.firstRollPins === undefined) {
		this.firstRollPins = pins;
		return;
	}

	this.secondRollPins = pins;
}

Frame.prototype.isSpare = function() {
	return (this.firstRollPins + this.secondRollPins) == 10;
}

Frame.prototype.isStrike = function() {
	return this.firstRollPins == 10;
}