import { fireEvent, render, screen } from "@testing-library/react";
import { DiceSet } from "../../classes/rollClass/DiceSet"
import { Die } from "../../classes/rollClass/Die";
import { DiceSetComponent } from "./DiceSetComponent"
import { DieComponent } from "./DieComponent";

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

