function Score() {
	this.NUMBER_OF_FRAMES = 10;

	var frameNumber = 1;
	this.bowlingFrames = [new Frame(frameNumber)];
}

Score.prototype.isClosed = function() {
	var hasAllFrames = this.bowlingFrames.length == this.NUMBER_OF_FRAMES;
	var allFramesClosed = _.reduce(this.bowlingFrames, function(memo, frame) { return memo && frame.isClosed()}, true);
	return hasAllFrames && allFramesClosed;
}

Score.prototype.add = function(pins) {
	var openFrame = _.last(this.bowlingFrames);

	openFrame.add(pins);

	this.calculateFramesBonus();

	if (!openFrame.isClosed())
		return;

	var hasAllFrames = this.bowlingFrames.length >= this.NUMBER_OF_FRAMES;

	if (hasAllFrames)
		return;

	var onlyLastFrameMissing = this.bowlingFrames.length == this.NUMBER_OF_FRAMES - 1;
	var hasBonus = openFrame.isSpare() || openFrame.isStrike();

	if (onlyLastFrameMissing && hasBonus) {
		this.bowlingFrames.push(new FinalFrame(openFrame.frameNumber + 1));
	} else {
		this.bowlingFrames.push(new Frame(openFrame.frameNumber + 1));
	}
}

Score.prototype.calculateFramesBonus = function() {
	var nextBallScore = function(frame) {
		var frameIdx = frame.frameNumber-1;
		var nextFrame = this.bowlingFrames[frameIdx + 1];
		if (nextFrame == undefined)
			return undefined;

		return nextFrame.score[0];
	}

	var nextTwoBallsScore = function(frame) {
		var frameIdx = frame.frameNumber-1;
		var nextFrame = this.bowlingFrames[frameIdx + 1];
		var nextFrameAfter = this.bowlingFrames[frameIdx + 2];
		if (nextFrame == undefined)
			return undefined;

		if (nextFrame.score.length >= 2)
			return nextFrame.score[0] + nextFrame.score[1];

		if (_.isUndefined(nextFrameAfter) || nextFrameAfter.score.length == 0)
			return undefined;

		return nextFrame.score[0] + nextFrameAfter.score[0];
	}

	var calculateBonus = function(frame) {
		if (frame.isSpare()) {
			var bonus = nextBallScore.call(this, frame);
			frame.bonusScore = bonus;
			return;
		}

		if (frame.isStrike()) {
			var bonus = nextTwoBallsScore.call(this, frame);
			frame.bonusScore = bonus;
			return;
		}
	}

	var withoutBonus = function(frame) {
		return _.isUndefined(frame.bonusScore);
	}

	_.each(_.filter(this.bowlingFrames, withoutBonus, this), calculateBonus, this);
}

Score.prototype.getCurrentValue = function() {
	var frameScores = _.map(this.bowlingFrames, function(frame) { return frame.getTotalScore()} );
	return _.reduce(frameScores, function(score, totalScore) { return score + totalScore }, 0);
}
