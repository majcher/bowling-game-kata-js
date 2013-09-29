describe("Score", function () {
	var score;

	beforeEach(function () {
		score = new Score();
	});

	it("should be initialized with 0", function () {
		expect(score.getCurrentValue()).toEqual(0);
	});

	it("should be equal to 0 after all misses", function () {
		for (var i=0; i<20; i++)
			score.add(0)
		expect(score.getCurrentValue()).toEqual(0);
	});

	it("should be equal to 20 after one pin knocked down each ball", function () {
		for (var i=0; i<20; i++)
			score.add(1)
		expect(score.getCurrentValue()).toEqual(20);
	});

	it("should be equal to 16 after a spare in the first frame, followed by three pins, followed by all misses", function () {
		score.add(1);
		score.add(9);

		score.add(3);

		for (var i=0; i<17; i++)
			score.add(0);

		expect(score.getCurrentValue()).toEqual(16);
	});

	it("should be equal to 24 after a strike in the first frame, followed by three pins, followed by 4 pins, followed by all misses", function () {
		score.add(10);

		score.add(3);
		score.add(4);

		for (var i=0; i<16; i++)
			score.add(0);

		expect(score.getCurrentValue()).toEqual(17 + 7);
	});

	it("should be equal to 47 after two strikes in the first and second frame, followed by three pins, followed by 4 pins, followed by all misses", function () {
		score.add(10);
		score.add(10);

		score.add(3);
		score.add(4);

		for (var i=0; i<14; i++)
			score.add(0);

		expect(score.getCurrentValue()).toEqual(23 + 17 + 7);
	});

	it("should be equal to 40 after strike, spare 9/, 3 pins, 4 pins, followed by all misses", function () {
		score.add(10);

		score.add(9);
		score.add(1);

		score.add(3);
		score.add(4);

		for (var i=0; i<14; i++)
			score.add(0);

		expect(score.getCurrentValue()).toEqual(20 + 13 + 7);
	});

});