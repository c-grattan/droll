import { DiceSet, generatePermutationsFor, hardCalculateAverage } from "./DiceSet";
import { Die } from "./Die";
import { DiceSetReducer } from "./setReducer/DiceSetReducer";


describe('Hard average calculation', () => {
	it('Correctly calculates the hard average', () => {
		const d20 = new Die(20);
		const withAdvantage = new DiceSetReducer(1, true);
		expect(hardCalculateAverage(2, d20, withAdvantage)).toEqual(13.825);
	});

	it('Handles negative die side value', () => {
		const testDie = new Die(-1);
		const withAdvantage = new DiceSetReducer(1, true);
		expect(hardCalculateAverage(2, testDie, withAdvantage)).toEqual(0);
	});

	test('Permutation generation handles value less than 1', () => {
		expect(generatePermutationsFor(-1, 1)).toHaveLength(0);
	});
})

describe('Gets correct', () => {
	const d = new Die(6, 1);
	const set: DiceSet = new DiceSet(2, d);

	test('Rolls', () => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
		expect(set.roll()).toEqual(8);
	});

	test('Minimum roll', () => {
		expect(set.getMinimum()).toEqual(4);
	});

	test('Average roll', () => {
		expect(set.getAverage()).toEqual(9);
	});

	test('Maximum roll', () => {
		expect(set.getMaximum()).toEqual(14);
	});
});

describe('Reducer', () => {
	const testReducer = new DiceSetReducer(2, true);

	test('Can be added', () => {
		const d = new Die(6, 1);
		const set: DiceSet = new DiceSet(2, d);

		expect(set.getReducer()).toBeUndefined();

		set.connectReducer(testReducer);

		expect(set.getReducer()).toEqual(testReducer);
	});

	test('Is used correctly', () => {
		const reducerMock = jest.spyOn(testReducer, 'reduce');

		expect(reducerMock).not.toBeCalled();

		const d = new Die(6, 1);
		const set: DiceSet = new DiceSet(2, d);
		set.connectReducer(testReducer);
		const expected = set.roll();

		expect(reducerMock).toBeCalledTimes(1);
		const actual = reducerMock.mock.results[0].value;
		expect(actual).toEqual(expected);
	});

	test('Can be disconnected', () => {
		const d = new Die(6, 1);
		const set: DiceSet = new DiceSet(2, d);

		set.connectReducer(testReducer);
		expect(set.getReducer()).not.toBeUndefined();

		set.disconnectReducer();
		expect(set.getReducer()).toBeUndefined();
	});
});

describe('Getters', () => {
	test('Count', () => {
		const expected = 4;
		const d = new Die(6, 1);
		const set: DiceSet = new DiceSet(expected, d);
		expect(set.getCount()).toEqual(expected);
	});

	test('Die Type', () => {
		const expected = new Die(6, 1);
		const set: DiceSet = new DiceSet(4, expected);
		expect(set.getDieType()).toEqual(expected);
	});
});

describe('Setters', () => {
	test('Count', () => {
		const expected = 4;
		const d = new Die(6, 1);
		const set: DiceSet = new DiceSet(expected + 10, d);
		expect(set.getCount()).not.toEqual(expected);
		set.setCount(expected);
		expect(set.getCount()).toEqual(expected);
	});

	test('Count', () => {
		const expected = new Die(6, 1);
		const set: DiceSet = new DiceSet(4, new Die(0, 0));
		expect(set.getDieType()).not.toEqual(expected);
		set.setDieType(expected);
		expect(set.getDieType()).toEqual(expected);
	});
});