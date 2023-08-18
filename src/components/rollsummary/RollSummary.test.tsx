import { render, screen } from "@testing-library/react";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { Die } from "../../classes/rollClass/Die";
import { Roll } from "../../classes/rollClass/Roll";
import { RollSummary } from "./RollSummary";

describe('Displays correct', () => {
	const testSet = new DiceSet(4, new Die(6, 1));
	const testRoll = new Roll();
	testRoll.addSet(testSet);
	const testComponent = <RollSummary roll={testRoll} />

	test('Minimum', () => {
		render(testComponent);
		expect(screen.getByTestId('rs-min')).toHaveTextContent(testSet.getMinimum().toString());
	});
	test('Average', () => {
		render(testComponent);
		expect(screen.getByTestId('rs-avg')).toHaveTextContent(testSet.getAverage().toString());
	});
	test('Maximum', () => {
		render(testComponent);
		expect(screen.getByTestId('rs-max')).toHaveTextContent(testSet.getMaximum().toString());
	});
});