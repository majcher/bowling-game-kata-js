function Score() {
	this.openFrame = new Frame();
	this.previousFrame;
	this.frames = [this.openFrame];
}

Score.prototype.add = function(pins) {
	this.openFrame.add(pins);

	if (this.openFrame.isClosed()) {
		if (this.previousFrame != undefined) {
			this.previousFrame.addBonus(this.openFrame);
		}

		var nextFrame = new Frame();
		this.frames.push(nextFrame);
		this.previousFrame = this.openFrame;
		this.openFrame = nextFrame;
	}
}

Score.prototype.getCurrentValue = function() {
	var frameScores = _.map(this.frames, function(frame) { return frame.getTotalScore()} );
	return _.reduce(frameScores, function(score, totalScore) { return score + totalScore }, 0);
}
