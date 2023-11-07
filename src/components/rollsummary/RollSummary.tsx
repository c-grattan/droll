import { Typography } from "@mui/material";
import { Roll } from "../../classes/rollClass/Roll";

type RSProps = {
	roll: Roll
}

export const RollSummary = ({roll}: RSProps) => {
	return (<>
		<Typography data-testid="rs-min">Minimum: {roll.getMinimum()}</Typography>
		<Typography data-testid="rs-avg">Mean: {roll.getAverage()}</Typography>
		<Typography data-testid="rs-max">Maximum: {roll.getMaximum()}</Typography>
	</>);
};