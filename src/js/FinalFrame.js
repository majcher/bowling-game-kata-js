function FinalFrame(frameNumber) {
	Frame.call(this, frameNumber);
}

FinalFrame.prototype = Object.create(Frame.prototype);

FinalFrame.prototype.isClosed = function() {
	var firstTwoRollsDone = this.score.length >= 2;
	var allRollsDone = this.score.length == 3;
	var bonusGiven = this.isSpare() || this.isStrike();

	return bonusGiven ? allRollsDone : firstTwoRollsDone;
}

