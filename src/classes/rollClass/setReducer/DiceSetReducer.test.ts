import { DiceSetReducer } from "./DiceSetReducer";

describe('Keep', () => {
	const keepXHighest = new DiceSetReducer(2, true);

	test('Normal rolls', () => {
		const sampleRolls = [11, 89, 23, 7, 98];
		expect(keepXHighest.reduce(sampleRolls)).toEqual(187);
	})

	test('Empty rolls', () => {
		expect(keepXHighest.reduce([])).toEqual(0);
	})
});

describe('Discard', () => {
	const discardXHighest = new DiceSetReducer(2, false);

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