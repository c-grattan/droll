import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Comparator } from "./Comparator";
import { RollManager } from "../../classes/rollManager/RollManager";
import { Roll } from "../../classes/rollClass/Roll";

beforeAll(() => {
	global.ResizeObserver = require('resize-observer-polyfill')
});

describe("Presentation", () => {
	test("Should display prompt only when no rolls have been saved", () => {
		const manager: RollManager = new RollManager();
		render(<Comparator rollManager={manager} />);
		expect(screen.getByTestId("comparator-prompt")).toHaveTextContent("No rolls available! Save a roll in the 'roller' page to have it available here.");

		cleanup();
		manager.addRoll(new Roll());
		render(<Comparator rollManager={manager} />);
		expect(screen.queryByTestId("comparator-prompt")).toBeNull();
	});
});

describe("Selection", () => {
	let manager: RollManager;
	beforeEach(() => {
		manager = new RollManager();
		manager.addRoll(new Roll(), {
			rollName: "Roll #1"
		});
		manager.addRoll(new Roll(), {
			rollName: "Roll #2"
		});
	});

	test("Correct number of rolls are available", () => {
		render(<Comparator rollManager={manager} />);
		const selectionButtons = screen.queryAllByTestId("comparator-select");
		expect(selectionButtons).toHaveLength(manager.rolls.length);
	});

	test("Rolls can be selected", () => {
		render(<Comparator rollManager={manager} />);
		const selectionButtons = screen.queryAllByLabelText("Select roll");
		selectionButtons.forEach((button) => {
			fireEvent.click(button);
		});
	});
});