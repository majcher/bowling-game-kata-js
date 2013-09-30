function Frame(frameNo) {
	this.frameNo = frameNo;
	this.score = [];
	this.bonusScore;
}

Frame.prototype.isClosed = function() {
	var allRollsDone = this.score[0] != undefined && this.score[1] != undefined;
	return allRollsDone || this.isStrike();
}

Frame.prototype.add = function(pins) {
	if (this.isClosed())
		throw new Error("Frame closed");

	this.score.push(pins);
}

Frame.prototype.setBonusScore = function(bonusScore) {
	this.bonusScore = bonusScore;
}

Frame.prototype.isSpare = function() {
	return (this.score[0] + this.score[1]) == 10;
}

Frame.prototype.isStrike = function() {
	return this.score[0] == 10;
}

Frame.prototype.getTotalScore = function() {
	var totalScoreComponents = _.compact(_.flatten([this.score, this.bonusScore]));
	return _.reduce(totalScoreComponents, function(sum, num) { return sum + num}, 0);
}