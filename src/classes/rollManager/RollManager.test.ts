import { Roll } from "../rollClass/Roll";
import { RollManager } from "./RollManager";

describe('Getters', () => {
	it('Can retreive a set of rolls', () => {
		const rollManager = new RollManager();
		const testRoll = new Roll();
		rollManager.addRoll(testRoll);
		const rolls: Roll[] = rollManager.getRolls();
		expect(rolls).toHaveLength(1);
		expect(rolls[0]).toEqual(testRoll);
	});
});

describe('Roll adding', () => {
	it('Can add a roll (default)', () => {
		const rollManager = new RollManager();
		expect(rollManager.getRolls()).toHaveLength(0);
		const testRoll = new Roll();
		rollManager.addRoll(testRoll);
		const rolls: Roll[] = rollManager.getRolls();
		expect(rolls).toHaveLength(1);
		expect(rolls[0]).toEqual(testRoll);
	});

	it('Can add a roll (with name)', () => {
		const rollManager = new RollManager();
		const testRoll = new Roll();
		const testName = 'Dice roll';
		expect(rollManager.getNames()).toHaveLength(0);
		rollManager.addRoll(testRoll, {
			rollName: testName
		});
		const names: string[] = rollManager.getNames();
		expect(names).toHaveLength(1);
		expect(names[0]).toEqual(testName);
	});

	it('Can add a roll (with category)', () => {
		const rollManager = new RollManager();
		const testRoll = new Roll();
		const testCategory = 'Dice category';
		expect(rollManager.getCategories()).toHaveLength(0);
		rollManager.addRoll(testRoll, {
			category: testCategory
		});
		const categories: string[] = rollManager.getCategories();
		expect(categories).toHaveLength(1);
		expect(categories[0]).toEqual(testCategory);
	});
});

it('Does not return duplicate categories', () => {
	const rollManager = new RollManager();
	expect(rollManager.getCategories()).toHaveLength(0);
	rollManager.addRoll(new Roll(), {
		category: '1'
	});
	expect(rollManager.getCategories()).toHaveLength(1);
	rollManager.addRoll(new Roll(), {
		category: '2'
	});
	expect(rollManager.getCategories()).toHaveLength(2);
	rollManager.addRoll(new Roll(), {
		category: '2'
	});
	expect(rollManager.getCategories()).toHaveLength(2);
});