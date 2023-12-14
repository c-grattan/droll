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
			const expected = rso[actualIndex].name + '' + rso[actualIndex].category + rso[actualIndex].roll.getMinimum();
			expect(row).toHaveTextContent(expected);
		}
	});
}

describe('Data grid', () => {
	test('Is present', () => {
		render(<RollManagerComponent rollManager={new RollManager([{roll: new Roll()}])}/>);
		expect(screen.getByTestId('rollmanager-datagrid')).toBeVisible();
	});

	const rso: RollStorageObject[] = [{
		roll: new Roll([new DiceSet(1, new Die(6))]),
		name: '1d6',
		category: 'Placeholder'
	},
	{
		roll: new Roll([new DiceSet(2, new Die(6))]),
		name: '2d6',
		category: '2nd Placeholder'
	}];
	const manager = new RollManager(rso);

	test('Displays correct data', () => {
		render(<RollManagerComponent rollManager={manager} />);
		dataGridContentsCheck(new RollManager(rso));
	});

	test('Exports data correctly', () => {
		render(<RollManagerComponent rollManager={manager} />);
		const downloadButton = screen.getByTestId("rollmanager-downloadbutton");
		expect(downloadButton).toHaveAttribute("download");
		expect(downloadButton).toHaveAttribute("href", "data:text/json," + encodeURIComponent(JSON.stringify(manager.rolls)))
	});

	describe('Loads data correctly', () => {
		async function uploadFile(file: File) {
			expect(screen.queryByTestId("rollmanager-uploadmessage")).toBeNull();

			const input = screen.getByTestId("rollmanager-uploadinput");
			act(() => {
				userEvent.upload(input, [file]);
			});
			await waitFor(() => {
				expect(screen.queryByTestId("rollmanager-uploadmessage")).not.toBeNull();
			});
		}

		test('Validates input', async () => {
			render(<RollManagerComponent rollManager={manager} />);
			await uploadFile(new File(["Badly formatted droll file"], "Droll.json", {type: "text/json"}));
			expect(screen.queryByTestId("rollmanager-uploadmessage")).toHaveTextContent("Error parsing input: ");
		});

		test('Updates data grid', async () => {
			render(<RollManagerComponent rollManager={manager} />);
			await uploadFile(new File([JSON.stringify(manager.rolls)], "Droll.json", {type: "text/json"}));
			dataGridContentsCheck(manager);
		});
	});
});