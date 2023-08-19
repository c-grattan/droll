import { DiscardXHighest } from "./DiscardXHighest";

describe('Correctly omits', () => {
	const discardXHighest = new DiscardXHighest(2);

	test('Normal rolls', () => {
		const sampleRolls = [11, 89, 23, 7, 98];
		expect(discardXHighest.reduce(sampleRolls)).toEqual(41);
	})

	test('Empty rolls', () => {
		expect(discardXHighest.reduce([])).toEqual(0);
	})

	test('Updates variable correctly', () => {
		const expected = 10;
		expect(discardXHighest.getVariable()).not.toEqual(expected);
		discardXHighest.setVariable(expected);
		expect(discardXHighest.getVariable()).toEqual(expected);
	});
});