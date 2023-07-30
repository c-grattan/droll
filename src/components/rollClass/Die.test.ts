import { Die } from "./Die";

describe('Die rolls correct value', () => {
	function checkRandomSpread(die: Die, expected: number[]) {
		expected.forEach((value, index) => {
			jest.spyOn(global.Math, 'random').mockReturnValue(index / (expected.length - 1));
			expect(die.roll()).toEqual(value);
		})
	};
	
	test('Without modifier', () => {
		const d = new Die(6);
		checkRandomSpread(d, [1, 3, 6]);
	});

	test('With modifier', () => {
		const d = new Die(6, 1);
		checkRandomSpread(d, [2, 4, 7]);
	});
});

describe('Getters', () => {
	test('Sides', () => {
		const sides = 6;
		const d = new Die(sides);
		expect(d.getSides()).toEqual(sides);
	});

	test('Modifier', () => {
		const modifier = 1;
		const d = new Die(6, modifier);
		expect(d.getModifier()).toEqual(modifier);
	});
});

describe('setters', () => {
	test('Sides', () => {
		const sides = 6;
		const d = new Die(sides + 10);
		expect(d.getSides()).not.toEqual(sides);
		d.setSides(sides);
		expect(d.getSides()).toEqual(sides);
	});

	test('Modifier', () => {
		const modifier = 1;
		const d = new Die(modifier + 10);
		expect(d.getModifier()).not.toEqual(modifier);
		d.setModifier(modifier);
		expect(d.getModifier()).toEqual(modifier);
	});
});

describe('Die calculates correct', () => {
	test('Minimum roll', () => {
		const d = new Die(6, 1);
		expect(d.getMinimum()).toEqual(2);
	});

	test('Average roll', () => {
		const d = new Die(6);
		expect(d.getAverage()).toEqual(3.5);
	});

	test('Maximum roll', () => {
		const d = new Die(6, 1);
		expect(d.getMaximum()).toEqual(7);
	});
})