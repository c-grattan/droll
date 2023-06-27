import { KeepXHighest } from "./KeepXHighest"

describe('Correctly omits', () => {
	const keepXHighest = new KeepXHighest(2);

	test('Normal rolls', () => {
		const sampleRolls = [11, 89, 23, 7, 98];
		expect(keepXHighest.reduce(sampleRolls)).toEqual(187);
	})

	test('Empty rolls', () => {
		expect(keepXHighest.reduce([])).toEqual(0);
	})
});