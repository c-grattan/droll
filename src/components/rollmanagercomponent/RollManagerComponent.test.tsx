import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RollManagerComponent } from "./RollManagerComponent";
import { RollManager, RollStorageObject } from "../../classes/rollManager/RollManager";
import { Roll } from "../../classes/rollClass/Roll";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { Die } from "../../classes/rollClass/Die";
import userEvent from "@testing-library/user-event";



function dataGridContentsCheck(rollManager: RollManager): void {
	const rso: RollStorageObject[] = rollManager.rolls;
	const rows = screen.queryAllByRole("row");
	rows.forEach((row, index) => {
		if(index > 0) {
			const actualIndex = index - 1;
			const expected = rso[actualIndex].name + '' + rso[actualIndex].category;
			expect(row).toHaveTextContent(expected);
		}
	});
}

describe('Data grid', () => {
	let manager: RollManager;
	beforeEach(() => {
		manager = new RollManager([{
			roll: new Roll([new DiceSet(1, new Die(6))]),
			name: '1d6',
			category: 'Placeholder'
		},
		{
			roll: new Roll([new DiceSet(2, new Die(6))]),
			name: '2d6',
			category: '2nd Placeholder'
		}]);
	});

	test('Is present', () => {
		render(<RollManagerComponent rollManager={new RollManager([{roll: new Roll()}])} changeTab={() => {}}/>);
		expect(screen.getByTestId('rollmanager-datagrid')).toBeVisible();
	});

	test('Displays correct data', () => {
		render(<RollManagerComponent rollManager={manager} changeTab={() => {}} />);
		dataGridContentsCheck(manager);
	});

	test('Exports data correctly', () => {
		render(<RollManagerComponent rollManager={manager} changeTab={() => {}} />);
		const downloadButton = screen.getByTestId("rollmanager-downloadbutton");
		expect(downloadButton).toHaveAttribute("download");
		expect(downloadButton).toHaveAttribute("href", "data:text/json," + encodeURIComponent(JSON.stringify(manager.rolls)))
	});

	describe('Loads data correctly', () => {
		async function uploadFile(file: File, submit: boolean = true, append: boolean = false) {
			expect(screen.queryByTestId("rollmanager-uploadmessage")).toBeNull();

			fireEvent.click(screen.getAllByTestId("cdb-open")[0]);
			const input = screen.getByTestId("rollmanager-uploadinput");
			act(() => {
				userEvent.upload(input, [file]);
			});

			if(append) {
				const toggle = screen.getByLabelText("Toggle append checkbox");
				fireEvent.click(toggle);
				expect(toggle).toBeChecked();
			}
			
			if(submit) {
				const submitButton = screen.getByTestId("cdb-submit");
				await waitFor(() => {
					expect(submitButton).not.toBeDisabled();
				});
				fireEvent.click(submitButton);
			}
		}

		test('Validates input', async () => {
			render(<RollManagerComponent rollManager={manager} changeTab={() => {}} />);
			uploadFile(new File(["Badly formatted droll file"], "Droll.json", {type: "text/json"}), false);
			await waitFor(() => {
				expect(screen.getByTestId("rollmanager-uploadmessage")).not.toBeEmptyDOMElement();
			});
		});

		test('Updates data grid', async () => {
			render(<RollManagerComponent rollManager={new RollManager()} changeTab={() => {}} />);
			await uploadFile(new File([JSON.stringify(manager.rolls)], "Droll.json", {type: "text/json"}));
			dataGridContentsCheck(manager);
		});

		test('Can append data instead of overwriting', async () => {
			const appendedManager: RollManager = new RollManager([{
				roll: new Roll([new DiceSet(1, new Die(6))]),
				name: 'Append #1',
				category: 'Appended Placeholder #1'
			},
			{
				roll: new Roll([new DiceSet(2, new Die(6))]),
				name: 'Append #2',
				category: '2nd Appended Placeholder'
			}]);

			const startingLength: number = appendedManager.rolls.length;

			render(<RollManagerComponent rollManager={appendedManager} changeTab={() => {}} />);
			await uploadFile(new File([JSON.stringify(manager.rolls)], "Droll.json", {type: "text/json"}), true, true);

			expect(appendedManager.rolls.length).toEqual(startingLength + manager.rolls.length);
		});
	});

	test('Can delete specific rolls', () => {
		render(<RollManagerComponent rollManager={manager} changeTab={() => {}} />);
		const checkboxes = screen.queryAllByRole("checkbox");
		const index0Name = manager.rolls[0].name;
		fireEvent.click(checkboxes[1]);
		fireEvent.click(screen.getAllByTestId("cdb-open")[1]);
		fireEvent.click(screen.getByTestId("cdb-submit"));
		expect(index0Name).not.toEqual(manager.rolls[0].name);
		dataGridContentsCheck(manager);
	});

	describe("Edit Button", () => {
		let changeTab = jest.fn();
		let icons: any[];
		beforeEach(() => {
			render(<RollManagerComponent rollManager={manager} changeTab={changeTab} />);
			icons = screen.queryAllByTestId("EditIcon");
		});

		test("Renders", async () => {
			icons.forEach((icon) => {
				expect(icon).toBeVisible();
			});
		});

		test("Switches tab", () => {
			expect(changeTab).not.toBeCalled();
			fireEvent.click(icons[0]);
			expect(changeTab).toBeCalled();
		});

		test("Changes selected roll", () => {
			expect(manager.getSelected()).toBeLessThan(0);
			fireEvent.click(icons[1]);
			expect(manager.getSelected()).toEqual(1);
		});
	});
});