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