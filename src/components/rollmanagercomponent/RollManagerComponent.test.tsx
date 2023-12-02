import { render, screen } from "@testing-library/react";
import { RollManagerComponent } from "./RollManagerComponent";
import { RollManager } from "../../classes/rollManager/RollManager";

test('Has a data grid', () => {
	render(<RollManagerComponent rollManager={new RollManager()}/>);
	expect(screen.getByTestId('rollmanager-datagrid')).toBeVisible();
});