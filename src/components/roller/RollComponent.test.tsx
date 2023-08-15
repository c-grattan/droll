import { fireEvent, render, screen } from "@testing-library/react";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { Die } from "../../classes/rollClass/Die";
import { Roll } from "../../classes/rollClass/Roll";
import { RollComponent } from "./RollComponent";

describe('Tests w/ initial sets', () => {
	test('Number of children to equal number of dice sets', () => {
		const d = new Die(6, 1);
		const set: DiceSet = new DiceSet(2, d);
		const testRoll = new Roll();
		testRoll.addSet(set);
		testRoll.addSet(set);
		const testComponent = <RollComponent roll={testRoll} />;
	
		expect(testRoll.getSets()).toHaveLength(2);
		render(testComponent);
		expect(screen.queryAllByTestId('diceSetComponent-count')).toHaveLength(2);
	});
	
	test('Can remove set', () => {
		const d = new Die(6, 1);
		const set1: DiceSet = new DiceSet(2, d);
		const set2: DiceSet = new DiceSet(4, d);
		const testRoll = new Roll();
		testRoll.addSet(set1);
		testRoll.addSet(set2);
		const testComponent = <RollComponent roll={testRoll} />;

		render(testComponent);
		const removeButtons = screen.queryAllByTestId('rollComponent-removeSet');
		expect(removeButtons).toHaveLength(2);
		expect(testRoll.getSets()).toHaveLength(2);
		expect(testRoll.getSets()[0]).toEqual(set1);
		fireEvent.click(removeButtons[0]);
		expect(screen.queryAllByTestId('diceSetComponent-count')).toHaveLength(1);
		expect(testRoll.getSets()).toHaveLength(1);
		expect(testRoll.getSets()[0]).toEqual(set2);
	});
});

test('Can add new set', () => {
	const testRoll = new Roll();
	const testComponent = <RollComponent roll={testRoll} />;

	render(testComponent);
	expect(screen.queryAllByTestId('diceSetComponent-count')).toHaveLength(0);
	const addButton = screen.getByTestId('rollComponent-addSet');
	fireEvent.click(addButton);
	expect(screen.queryAllByTestId('diceSetComponent-count')).toHaveLength(1);
});