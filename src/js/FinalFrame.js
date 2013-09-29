function FinalFrame() {
	Frame.call(this);
}

FinalFrame.prototype = Object.create(Frame.prototype);

FinalFrame.prototype.isClosed = function() {
	var firstTwoRollsDone = this.score[0] != undefined && this.score[1] != undefined;
	var allRollsDone = firstTwoRollsDone && this.score[2] != undefined;
	var bonusGiven = this.isSpare() || this.isStrike();

	return bonusGiven ? allRollsDone : firstTwoRollsDone;
}

