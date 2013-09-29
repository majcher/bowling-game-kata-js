function Score() {
	this.NUMBER_OF_FRAMES = 10;

	this.frames = [new Frame()];
}

Score.prototype.isClosed = function() {
	var hasAllFrames = this.frames.length == this.NUMBER_OF_FRAMES;
	var allFramesClosed = _.reduce(this.frames, function(memo, frame) { return memo && frame.isClosed()}, true);
	return hasAllFrames && allFramesClosed;
}

Score.prototype.add = function(pins) {
	var openFrame = _.last(this.frames);

	openFrame.add(pins);

	this.calculateFramesBonus();

	if (!openFrame.isClosed()) {
		return;
	}

	if (this.frames.length < this.NUMBER_OF_FRAMES) {
		this.frames.push(new Frame());
	}
}

Score.prototype.calculateFramesBonus = function() {
	var calculateBonus = function(frame, frameIdx, allFrames) {
		if (frameIdx < allFrames.length-1)
			frame.addBonus(_.rest(allFrames, frameIdx+1));
	}
	_.each(this.frames, calculateBonus)
}

Score.prototype.getCurrentValue = function() {
	var frameScores = _.map(this.frames, function(frame) { return frame.getTotalScore()} );
	return _.reduce(frameScores, function(score, totalScore) { return score + totalScore }, 0);
}
