describe("Score", function () {
	var score;

	beforeEach(function () {
		score = new Score();
	});

	it("should be initialized with 0", function () {
		expect(score.value).toEqual(0);
	});

	it("should be equal to 20 after 20 tries with 1 pin hit each time", function () {
		for (var i=0; i<20; i++)
			score.add(1)
		expect(score.value).toEqual(20);
	});
});