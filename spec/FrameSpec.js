describe("Frame", function () {
	var frame;

	beforeEach(function () {
		frame = new Frame();
	});

	it("should not be closed when initialized", function () {
		expect(frame.isClosed()).toBeFalsy();
	});

	it("should not be closed after first roll", function () {
		frame.add(1);
		expect(frame.isClosed()).toBeFalsy();
	});

	it("should be closed after second roll", function () {
		frame.add(1);
		frame.add(1);
		expect(frame.isClosed()).toBeTruthy();
	});

	it("should not be a spare when total score is less than 10", function () {
		frame.add(1);
		frame.add(3);
		expect(frame.isSpare()).toBeFalsy();
	});

	it("should be a spare when total score is equal to 10 in two rolls", function () {
		frame.add(1);
		frame.add(9);
		expect(frame.isSpare()).toBeTruthy();
	});

	it("should not be a spare when total score is equal to 10 in first roll", function () {
		frame.add(10);
		expect(frame.isSpare()).toBeFalsy();
	});

	it("should be a strike when total score is equal to 10 in first roll", function () {
		frame.add(10);
		expect(frame.isStrike()).toBeTruthy();
	});

	it("should be closed after a strike", function () {
		frame.add(10);
		expect(frame.isClosed()).toBeTruthy();
	});

	it("should throw 'Frame closed' error on adding 3rd result", function () {
		frame.add(1);
		frame.add(1);
		expect(function() { frame.add(1) }).toThrow(new Error("Frame closed"));
	});

	it("should throw 'Frame closed' error on adding result after strike", function () {
		frame.add(10);
		expect(function() { frame.add(1) }).toThrow(new Error("Frame closed"));
	});

	it("should have total score computed with spare bonus", function () {
		frame.add(1);
		frame.add(9);

		var nextFrame = new Frame();
		nextFrame.add(3);
		nextFrame.add(0);

		frame.addBonus([nextFrame]);

		expect(frame.getTotalScore()).toEqual(13);
	});

	it("should have total score computed with strike bonus", function () {
		frame.add(10);

		var nextFrame = new Frame();
		nextFrame.add(3);
		nextFrame.add(4);

		frame.addBonus([nextFrame]);

		expect(frame.getTotalScore()).toEqual(17);
	});

	it("should have total score computed with multiple strike bonus", function () {
		frame.add(10);

		var nextFrame = new Frame();
		nextFrame.add(10);

		var nextFrameAfter = new Frame();
		nextFrameAfter.add(4);

		frame.addBonus([nextFrame, nextFrameAfter]);

		expect(frame.getTotalScore()).toEqual(24);
	});

});