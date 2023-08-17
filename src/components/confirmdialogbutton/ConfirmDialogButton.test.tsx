import { fireEvent, render, screen } from "@testing-library/react";
import { ConfirmDialogButton } from "./ConfirmDialogButton";

describe('Dialog', () => {
	const testComponent = <ConfirmDialogButton />

	test('Opens', () => {
		render(testComponent);
		expect(screen.queryByTestId('cdb-content')).toBeNull();
		fireEvent.click(screen.getByTestId('cdb-open'));
		expect(screen.queryByTestId('cdb-content')).not.toBeNull();
	});

	test('Closes', () => {
		render(testComponent);
		fireEvent.click(screen.getByTestId('cdb-open'));
		expect(screen.queryByTestId('cdb-content')).not.toBeNull();
		fireEvent.click(screen.getByTestId('cdb-close'));
		expect(screen.queryByTestId('cdb-content')).not.toBeVisible();
	});


});

test('Fires submit function', () => {
	const testFunction = jest.fn();
	const testComponent = <ConfirmDialogButton onSubmit={testFunction} />
	render(testComponent);
	fireEvent.click(screen.getByTestId('cdb-open'));
	expect(testFunction).not.toHaveBeenCalled();
	fireEvent.click(screen.getByTestId('cdb-submit'));
	expect(testFunction).toBeCalledTimes(1);
});

test('Shows correct content', () => {
	const testString = 'Test content';
	const testComponent = <ConfirmDialogButton><p>{testString}</p></ConfirmDialogButton>;
	render(testComponent);
	expect(screen.queryByTestId('cdb-content')).toBeNull();
	fireEvent.click(screen.getByTestId('cdb-open'));
	expect(screen.queryByTestId('cdb-content')).toHaveTextContent(testString);
});