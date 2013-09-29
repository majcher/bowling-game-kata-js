function Frame() {
	this.firstScore;
	this.secondScore;
	this.bonusScore = 0;
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

Frame.prototype.addBonus = function(nextFrame) {
	if (this.isSpare())
		this.bonusScore = nextFrame.firstScore;
	else if (this.isStrike()) {
		this.bonusScore = nextFrame.firstScore + nextFrame.secondScore;
	}
}

Frame.prototype.isSpare = function() {
	return (this.firstScore + this.secondScore) == 10;
}

Frame.prototype.isStrike = function() {
	return this.firstScore == 10;
}

Frame.prototype.getTotalScore = function() {
	if (this.firstScore == undefined)
		return 0;
	if (this.secondScore == undefined)
		return this.firstScore;
	return this.firstScore + this.secondScore + this.bonusScore;
}