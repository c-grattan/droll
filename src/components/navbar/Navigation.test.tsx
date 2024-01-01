import { fireEvent, render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { useState } from "react";

it('Changes visible component', () => {
	const Nav = () => {
		const [currentTab, setCurrentTab] = useState(0);
		return <Navigation
			currentTab={currentTab}
			setCurrentTab={(tab) => setCurrentTab(tab)}
			navData={[
			{
				title: 'Tab 1',
				content: <p data-testid="comp1">Component 1</p>
			},
			{
				title: 'Tab 2',
				content: <p data-testid="comp2">Component 2</p>
			}
		]}/>
	}
	render(<Nav />);
	expect(screen.getByTestId("comp1")).toBeVisible();
	expect(screen.queryByTestId("comp2")).toBeNull();
	fireEvent.click(screen.getByTestId("navigation-tab1"));
	expect(screen.queryByTestId("comp1")).toBeNull();
	expect(screen.getByTestId("comp2")).toBeVisible();
});