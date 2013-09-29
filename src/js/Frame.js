function Frame() {
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

Frame.prototype.addBonus = function(followingFrames) {
	if (this.bonusScore != undefined)
		return;

	var firstFollowingFrame = followingFrames[0];
	var secondFollowingFrame = followingFrames[1];

	if (this.isSpare()) {
		this.bonusScore = firstFollowingFrame.score[0];
		return;
	}

	if (this.isStrike() && firstFollowingFrame.isStrike()) {
		if (secondFollowingFrame != undefined) {
			this.bonusScore = firstFollowingFrame.score[0] + secondFollowingFrame.score[0];
		}
		return;
	}

	if (this.isStrike() && firstFollowingFrame.isClosed()) {
		this.bonusScore = firstFollowingFrame.score[0] + firstFollowingFrame.score[1];
	}
}

Frame.prototype.isSpare = function() {
	return (this.score[0] + this.score[1]) == 10;
}

Frame.prototype.isStrike = function() {
	return this.score[0] == 10;
}

Frame.prototype.getTotalScore = function() {
	var totalScoreComponents = _.compact([this.score[0], this.score[1], this.bonusScore]);
	return _.reduce(totalScoreComponents, function(sum, num) { return sum + num}, 0);
}