import { fireEvent, screen, render } from "@testing-library/react";
import { RollManager, RollStorageObject } from "../../classes/rollManager/RollManager";
import { Roller } from "./Roller";
import { Roll } from "../../classes/rollClass/Roll";

test('Can save roll to roll manager', () => {
	const rollManager = new RollManager();
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
	test('Roll change', () => {

	});
	test('Dice set change', () => {

	});
	test('Die change', () => {

	});
	test('Reducer change', () => {

	});
});

test('Can test roll', () => {
	const rollManager = new RollManager();
	const roller = <Roller rollManager={rollManager} />
	render(roller);

	fireEvent.click(screen.getByTestId('rollComponent-addSet'));

	expect(screen.getByTestId('roller-rollResults')).toHaveTextContent('0');
	jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
	fireEvent.click(screen.getByTestId('roller-testRoll'));
	expect(screen.getByTestId('roller-rollResults')).toHaveTextContent('3');
});