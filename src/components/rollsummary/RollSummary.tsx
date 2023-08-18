import { Roll } from "../../classes/rollClass/Roll";

type RSProps = {
	roll: Roll
}

export const RollSummary = ({roll}: RSProps) => {
	return (<>
		<p data-testid="rs-min">{roll.getMinimum()}</p>
		<p data-testid="rs-avg">{roll.getAverage()}</p>
		<p data-testid="rs-max">{roll.getMaximum()}</p>
	</>);
};