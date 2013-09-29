function Frame() {
	this.firstScore;
	this.secondScore;
}

Frame.prototype.isClosed = function() {
	var allRollsDone = this.firstScore != undefined && this.secondScore != undefined;
	return allRollsDone || this.isStrike();
}

Frame.prototype.add = function(pins) {
	if (this.isClosed())
		throw new Error("Frame closed");

	if (this.firstScore === undefined) {
		this.firstScore = pins;
		return;
	}

	this.secondScore = pins;
}

Frame.prototype.isSpare = function() {
	return (this.firstScore + this.secondScore) == 10;
}

Frame.prototype.isStrike = function() {
	return this.firstScore == 10;
}