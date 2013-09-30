function Frame(frameNumber) {
	this.frameNumber = frameNumber;
	this.score = [];
	this.bonusScore;
}

Frame.prototype.isClosed = function() {
	var allRollsDone = this.score.length == 2;
	return allRollsDone || this.isStrike();
}

Frame.prototype.add = function(pins) {
	if (this.isClosed())
		throw new Error("Frame closed");

	this.score.push(pins);
}

Frame.prototype.isSpare = function() {
	return (this.score[0] + this.score[1]) == 10;
}

Frame.prototype.isStrike = function() {
	return this.score[0] == 10;
}

Frame.prototype.getTotalScore = function() {
	var nonZeroScoreComponents = _.compact(_.flatten([this.score, this.bonusScore]));
	var sum = function(sum, num) { return sum + num };
	return _.reduce(nonZeroScoreComponents, sum, 0);
}