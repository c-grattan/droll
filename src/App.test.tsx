import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe('Navigation', () => {
	beforeEach(() => {
		render(<App />);
	});

	test('Default page', () => {
		expect(screen.getByTestId("roller")).toBeVisible();
	});

	test('Can navigate between pages', () => {
		const visibleIds: string[] = ["roller", "rollmanager-downloadbutton", "comparator-prompt"];
		visibleIds.forEach((id, index) => {
			fireEvent.click(screen.getByTestId("navigation-tab" + index));
			expect(screen.getByTestId(id)).toBeVisible();
		});
	});
});