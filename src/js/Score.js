function Score() {
	this.frames = [new Frame()];
}

Score.prototype.add = function(pins) {
	var openFrame = _.last(this.frames);

	openFrame.add(pins);

	this.calculateFramesBonus();

	if (!openFrame.isClosed()) {
		return;
	}

	this.frames.push(new Frame());
}

Score.prototype.calculateFramesBonus = function() {
	var calculateBonus = function(frame, frameIdx, allFrames) {
		if (!frame.isBonusClosed() && frameIdx < allFrames.length-1)
			frame.addBonus(_.rest(allFrames, frameIdx+1));
	}
	_.each(this.frames, calculateBonus)
}

Score.prototype.getCurrentValue = function() {
	var frameScores = _.map(this.frames, function(frame) { return frame.getTotalScore()} );
	return _.reduce(frameScores, function(score, totalScore) { return score + totalScore }, 0);
}
