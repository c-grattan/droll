import { fireEvent, render, screen } from "@testing-library/react";
import { Die } from "../../classes/rollClass/Die";
import { DieComponent } from "./DieComponent";

describe('No. of sides', () => {
	it('Should display', () => {
		const sides = 6;
		const testDie = new Die(sides);
		render(<DieComponent die={testDie} />);
		const actualDie = screen.getByTestId('dieComponent-sides');
		expect(actualDie).not.toBeNull();
		expect(actualDie).toBeInTheDocument();
		expect(actualDie).toHaveValue(sides);
	});

	it('Should change', () => {
		const expected = 10;
		const changeableDie = new Die(6);
		render(<DieComponent die={changeableDie} />);
		const actualDie = screen.getByTestId('dieComponent-sides');
		expect(actualDie).toHaveValue(changeableDie.getSides());
		fireEvent.change(actualDie, {target: {value: expected}});
		expect(actualDie).toHaveValue(expected);
		expect(changeableDie.getSides()).toEqual(expected);
	});
});

describe('Modifier', () => {
	it('Should display', () => {
		const modifier = 1;
		const testDie = new Die(6, modifier);
		render(<DieComponent die={testDie} />);
		const actualDie = screen.getByTestId('dieComponent-modifier');
		expect(actualDie).not.toBeNull();
		expect(actualDie).toBeInTheDocument();
		expect(actualDie).toHaveValue(modifier);
	});

	it('Should change', () => {
		const expected = 10;
		const changeableDie = new Die(6);
		render(<DieComponent die={changeableDie} />);
		const actualDie = screen.getByTestId('dieComponent-modifier');
		expect(actualDie).toHaveValue(changeableDie.getModifier());
		fireEvent.change(actualDie, {target: {value: expected}});
		expect(actualDie).toHaveValue(expected);
		expect(changeableDie.getModifier()).toEqual(expected);
	});
});