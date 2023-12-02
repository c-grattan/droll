import { fireEvent, render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";

it('Changes visible component', () => {
	const nav = <Navigation navData={[
		{
			title: 'Tab 1',
			content: <p data-testid="comp1">Component 1</p>
		},
		{
			title: 'Tab 2',
			content: <p data-testid="comp2">Component 2</p>
		}
	]}/>
	render(nav);
	expect(screen.getByTestId("comp1")).toBeVisible();
	expect(screen.queryByTestId("comp2")).toBeNull();
	fireEvent.click(screen.getByTestId("navigation-tab1"));
	expect(screen.queryByTestId("comp1")).toBeNull();
	expect(screen.getByTestId("comp2")).toBeVisible();
});