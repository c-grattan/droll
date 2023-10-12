import { fireEvent, render, screen } from "@testing-library/react";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { Die } from "../../classes/rollClass/Die";
import { DiceSetComponent, reducerType } from "./DiceSetComponent";
import { KeepXHighest } from "../../classes/rollClass/setReducer/KeepXHighest";
import { DiscardXHighest } from "../../classes/rollClass/setReducer/DiscardXHighest";

describe('Dice count', () => {
	const expected = 4;
	const testDie = new Die(6);
	const testDiceSet = new DiceSet(expected, testDie);
	const testComponent = <DiceSetComponent diceSet={testDiceSet} />;

	it('Should display', () => {
		render(testComponent);
		const actualDiceSet = screen.getByTestId('diceSetComponent-count');
		expect(actualDiceSet).not.toBeNull();
		expect(actualDiceSet).toBeInTheDocument();
		expect(actualDiceSet).toHaveValue(expected);
	})

	it('Should be changeable', () => {
		const expected = 10;
		expect(testDiceSet.getCount()).not.toEqual(expected);

		render(testComponent);
		const actualDiceSet = screen.getByTestId('diceSetComponent-count');
		expect(actualDiceSet).toHaveValue(testDiceSet.getCount());
		fireEvent.change(actualDiceSet, {target: {value: expected}});
		expect(actualDiceSet).toHaveValue(expected);
		expect(testDiceSet.getCount()).toEqual(expected);
	})

	it('Should display a die component', () => {
		render(testComponent);
		expect(screen.getByTestId('dieComponent-sides')).toBeInTheDocument();
		expect(screen.getByTestId('dieComponent-modifier')).toBeInTheDocument();
	});
})

describe('Reducer', () => {
	it('Can be added', () => {
		const testDie = new Die(6);
		const testDiceSet = new DiceSet(4, testDie);
		const testComponent = <DiceSetComponent diceSet={testDiceSet} />;
		render(testComponent);
		expect(screen.queryByTestId('diceSetComponent-reducerType')).toBeNull();
		fireEvent.click(screen.getByTestId('diceSetComponent-addReducer'));
		expect(screen.queryByTestId('diceSetComponent-reducerType')).toBeVisible();
	});

	it('Can be removed', () => {
		const testDie = new Die(6);
		const testDiceSet = new DiceSet(4, testDie);
		const testComponent = <DiceSetComponent diceSet={testDiceSet} />;
		render(testComponent);
		fireEvent.click(screen.getByTestId('diceSetComponent-addReducer'));
		expect(screen.queryByTestId('diceSetComponent-reducerType')).toBeVisible();
		fireEvent.click(screen.getByTestId('diceSetComponent-removeReducer'));
		expect(screen.queryByTestId('diceSetComponent-reducerType')).toBeNull();
	});

	test('Type can be changed', () => {
		const testDie = new Die(6);
		const testDiceSet = new DiceSet(4, testDie);
		const testComponent = <DiceSetComponent diceSet={testDiceSet} />;
		render(testComponent);

		fireEvent.click(screen.getByTestId('diceSetComponent-addReducer'));
		const typeInput = screen.getByTestId('diceSetComponent-reducerType');
		expect(typeInput).toHaveValue(reducerType.KEEP.toString());
		expect(testDiceSet.getReducer()).toBeInstanceOf(KeepXHighest);
		const expected = reducerType.DISCARD;
		fireEvent.change(typeInput, {target: {value: expected}});
		expect(typeInput).toHaveValue(expected.toString());
		expect(testDiceSet.getReducer()).toBeInstanceOf(DiscardXHighest);
	});

	test('Variable can be changed', () => {
		const testDie = new Die(6);
		const testDiceSet = new DiceSet(4, testDie);
		const testComponent = <DiceSetComponent diceSet={testDiceSet} />;
		render(testComponent);

		fireEvent.click(screen.getByTestId('diceSetComponent-addReducer'));
		const variableInput = screen.getByTestId('diceSetComponent-reducerVar');
		const expected = 10;
		expect(variableInput).not.toHaveValue(expected);
		fireEvent.change(variableInput, {target: {value: expected}});
		expect(variableInput).toHaveValue(expected);
		expect(variableInput).toHaveValue(testDiceSet.getReducer()?.getVariable());
	});
});

test('Update function called', () => {
	const updateFunction = jest.fn();
	const testComponent = <DiceSetComponent diceSet={new DiceSet(4, new Die(6))} updateSet={updateFunction} />;
	render(testComponent);
	fireEvent.change(screen.getByTestId('dieComponent-sides'), {target: {value: 0}});
	fireEvent.change(screen.getByTestId('dieComponent-modifier'), {target: {value: 1}});
	expect(updateFunction).toBeCalledTimes(2);
});