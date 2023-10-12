import { DiceSet } from "./DiceSet";
import { Die } from "./Die";
import { Roll } from "./Roll";

it('Can add a set of dice', () => {
	const r: Roll = new Roll();

	const die = new Die(6, 1);
	const set = new DiceSet(2, die);

	r.addSet(set);
	
	const sets = r.getSets();
	expect(sets).toHaveLength(1);
	expect(sets[0]).toEqual(set);
});

it('Rolls multiple dice sets correctly', () => {
	const r: Roll = new Roll();

	const die = new Die(6, 1);
	const set = new DiceSet(2, die);

	r.addSet(set);

	const die2 = new Die(20);
	const set2 = new DiceSet(4, die2);

	r.addSet(set2);

	jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
	expect(r.roll()).toEqual(48);
});

describe('Gets correct', () => {
	const r: Roll = new Roll();

	const die = new Die(6, 1);
	const set = new DiceSet(2, die);

	r.addSet(set);

	const die2 = new Die(20);
	const set2 = new DiceSet(4, die2);

	r.addSet(set2);

	test('Minimum', () => {
		expect(r.getMinimum()).toEqual(8);
	});

	test('Average', () => {
		expect(r.getAverage()).toEqual(51);
	});

	test('Maximum', () => {
		expect(r.getMaximum()).toEqual(94);
	})
});

describe('Sets correct', () => {
	test('Sets', () => {
		const die = new Die(6, 1);
		const die2 = new Die(20);
		const set1 = new DiceSet(2, die);
		const set2 = new DiceSet(4, die2);
		const sets = [set1, set2];
		const r: Roll = new Roll(sets);
		expect(r.getSets()[0]).not.toEqual(set2);

		r.setSet(0, set2);
		expect(r.getSets()[0]).toEqual(set2);
	});
});