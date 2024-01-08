import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Comparator } from "./Comparator";
import { RollManager } from "../../classes/rollManager/RollManager";
import { Roll } from "../../classes/rollClass/Roll";

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
	test("Can add saved rolls to comparator selection", () => {
		const manager: RollManager = new RollManager();
		manager.addRoll(new Roll(), {
			rollName: "Roll #1"
		});
		manager.addRoll(new Roll(), {
			rollName: "Roll #2"
		});
		render(<Comparator rollManager={manager} />);
		const selectionButtons = screen.queryAllByLabelText("Toggle selected");
		expect(selectionButtons).toHaveLength(manager.rolls.length);
		selectionButtons.forEach((button) => {
			fireEvent.click(button);
		});
	});
});