import { fireEvent, screen, render, cleanup } from "@testing-library/react";
import { RollManager, RollStorageObject } from "../../classes/rollManager/RollManager";
import { Roller } from "./Roller";
import { Roll } from "../../classes/rollClass/Roll";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { Die } from "../../classes/rollClass/Die";

let rollManager: RollManager;

beforeEach(() => {
	rollManager = new RollManager();
});

test('Can save roll to roll manager', () => {
	const roller = <Roller rollManager={rollManager} />
	render(roller);

	const expected: RollStorageObject = {
		roll: new Roll(),
		name: 'Roll name',
		category: 'Roll category'
	};

	expect(rollManager.rolls).toHaveLength(0);

	fireEvent.click(screen.getByTestId('cdb-open'));
	fireEvent.change(screen.getByTestId('roller-saveName'), {target: {value: expected.name}});
	fireEvent.change(screen.getByTestId('roller-saveCategory'), {target: {value: expected.category}});
	fireEvent.click(screen.getByTestId('cdb-submit'));

	const rolls = rollManager.rolls;
	expect(rolls).toHaveLength(1);
	expect(rolls[0]).toEqual(expected);
});

describe('Roll summary updates', () => {
	function checkRoll(roll: Roll) {
		expect(screen.getByTestId('rs-min')).toHaveTextContent(roll.getMinimum().toString());
		expect(screen.getByTestId('rs-avg')).toHaveTextContent(roll.getAverage().toString());
		expect(screen.getByTestId('rs-max')).toHaveTextContent(roll.getMaximum().toString());
	}
	
	test('Roll change', () => {
		const roller = <Roller rollManager={rollManager} />
		render(roller);

		const expectedRoll = new Roll();
		checkRoll(expectedRoll);

		fireEvent.click(screen.getByTestId('rollComponent-addSet'));
		expectedRoll.addSet(new DiceSet(1, new Die(6, 0)));
		checkRoll(expectedRoll);
	});
});

test('Can test roll', () => {
	const roller = <Roller rollManager={rollManager} />
	render(roller);

	fireEvent.click(screen.getByTestId('rollComponent-addSet'));

	expect(screen.getByTestId('roller-rollResults')).toHaveTextContent('0');
	jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
	fireEvent.click(screen.getByTestId('roller-testRoll'));
	expect(screen.getByTestId('roller-rollResults')).toHaveTextContent('3');
});

describe("Editing", () => {
	test("Loads selected roll", () => {
		const roll = new Roll([
			new DiceSet(1, new Die(6))
		]);
		rollManager.addRoll(roll);

		render(<Roller rollManager={rollManager} />);
		expect(screen.queryAllByTestId('diceSetComponent-count')).toHaveLength(0);
		cleanup();

		rollManager.setSelected(0);
		render(<Roller rollManager={rollManager} />);
		expect(screen.queryAllByTestId('diceSetComponent-count')).toHaveLength(1);
	});

	test("Can overwrite existing roll", () => {
		const roll = new Roll([
			new DiceSet(1, new Die(6, 1))
		]);
		const startingName = "Test roll";
		const startingCategory = "Roll category";
		rollManager.addRoll(roll, {
			rollName: startingName,
			category: startingCategory
		});
		rollManager.setSelected(0);
		render(<Roller rollManager={rollManager} />);

		const expectedRoll = new Roll([
			new DiceSet(2, new Die(20, 2))
		]);
		const expectedCategory = "New category";

		fireEvent.change(screen.getByTestId("diceSetComponent-count"), {target: {value: expectedRoll.getSets()[0].getCount()}});
		fireEvent.change(screen.getByTestId("dieComponent-sides"), {target: {value: expectedRoll.getSets()[0].getDieType().getSides()}});
		fireEvent.change(screen.getByTestId("dieComponent-modifier"), {target: {value: expectedRoll.getSets()[0].getDieType().getModifier()}});

		fireEvent.click(screen.getByTestId("cdb-open"));
		expect(screen.getByTestId("roller-saveName")).toHaveValue(startingName);
		expect(screen.getByTestId("roller-saveCategory")).toHaveValue(startingCategory);
		fireEvent.change(screen.getByTestId('roller-saveCategory'), {target: {value: expectedCategory}});

		fireEvent.click(screen.getByTestId("cdb-submit"));

		const actualRoll = rollManager.rolls[0];
		expect(actualRoll.roll).toEqual(expectedRoll);
		expect(actualRoll.category).toEqual(expectedCategory);
	});
});