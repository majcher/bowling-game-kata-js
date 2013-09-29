function Frame() {
	this.firstScore;
	this.secondScore;
	this.bonusScore = 0;
	this.bonusClosed = false;
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

Frame.prototype.addBonus = function(nextFrames) {
	var nextFrame = nextFrames[0];

	if (this.isSpare()) {
		this.bonusScore = nextFrame.firstScore;
		this.bonusClosed = true;
		return;
	}

	if (this.isStrike()) {
		if (!nextFrame.isClosed())
			return;

		if (!nextFrame.isStrike()) {
			this.bonusScore = nextFrame.firstScore + nextFrame.secondScore;
		} else {
			var nextFrameAfter = nextFrames[1];
			if (nextFrameAfter == undefined) {
				return;
			}
			this.bonusScore = nextFrame.firstScore + nextFrameAfter.firstScore;
		}

		this.bonusClosed = true;
	}
}

Frame.prototype.isBonusClosed = function() {
	return this.bonusClosed;
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
		return this.firstScore + this.bonusScore;
	return this.firstScore + this.secondScore + this.bonusScore;
}