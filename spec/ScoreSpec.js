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

	it("should be equal to 256 after 9 strikes followed by 2 and 5 pins", function() {
		for (var i=0; i<9; i++)
			score.add(10);

		score.add(2);
		score.add(5);

		expect(score.getCurrentValue()).toEqual(7*30 + 22 + 17 + 7);
	});

	it("should be closed after 2 balls on last frame without bonus", function() {
		for (var i=0; i<10; i++) {
			score.add(1);
			score.add(2);
		}

		expect(score.isClosed()).toBeTruthy();
	});

	it("should not be closed after 2 balls on last frame with strike bonus", function() {
		for (var i=0; i<10; i++)
			score.add(10);

		expect(score.isClosed()).toBeFalsy();
	});

	it("should not be closed after 2 balls on last frame with spare bonus", function() {
		for (var i=0; i<9; i++)
			score.add(10);

		score.add(1);
		score.add(9);

		expect(score.isClosed()).toBeFalsy();
	});

	it("should be equal to 300 after 12 strikes", function() {
		for (var i=0; i<12; i++)
			score.add(10);

		expect(score.getCurrentValue()).toEqual(300);
	});

	it("should be closed after after 12 strikes", function() {
		for (var i=0; i<12; i++)
			score.add(10);

		expect(score.isClosed()).toBeTruthy();
	});

	it("should be closed after after 10 frames without bonus", function() {
		for (var i=0; i<10; i++) {
			score.add(1);
			score.add(2);
		}

		expect(score.isClosed()).toBeTruthy();
	});

});