function Frame() {
	this.firstRollPins;
	this.secondRollPins;
}

Frame.prototype.isClosed = function() {
	return this.firstRollPins != undefined && this.secondRollPins != undefined;
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
	return false;
}