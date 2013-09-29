describe("FinalFrame", function () {
	var finalFrame;

	beforeEach(function () {
		finalFrame = new FinalFrame();
	});

	it("should not be closed when initialized", function () {
		expect(finalFrame.isClosed()).toBeFalsy();
	});

	it("should not be closed after first roll", function () {
		finalFrame.add(1);
		expect(finalFrame.isClosed()).toBeFalsy();
	});

	it("should be closed after second roll when no bonus given", function () {
		finalFrame.add(1);
		finalFrame.add(1);
		expect(finalFrame.isClosed()).toBeTruthy();
	});

	it("should not be closed after second roll when spare bonus given", function () {
		finalFrame.add(1);
		finalFrame.add(9);
		expect(finalFrame.isClosed()).toBeFalsy();
	});

	it("should not be closed after second roll when strike bonus given", function () {
		finalFrame.add(10);
		finalFrame.add(1);
		expect(finalFrame.isClosed()).toBeFalsy();
	});

	it("should be closed after third roll when bonus given", function () {
		finalFrame.add(10);
		finalFrame.add(10);
		finalFrame.add(10);
		expect(finalFrame.isClosed()).toBeTruthy();
	});

});