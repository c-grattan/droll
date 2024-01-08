import { Typography, Checkbox, Grid } from "@mui/material";
import { RollManager, RollStorageObject } from "../../classes/rollManager/RollManager";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, ChartData, Legend, LinearScale, Title, Tooltip } from "chart.js";

Chart.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
  );

type CProps = {
	rollManager: RollManager
}

export const Comparator = ({rollManager}: CProps) => {
	const [selectedRolls, setSelectedRolls] = useState(rollManager.rolls.map(() => {return false}));

	function toggleSelected(index: number) {
		const newSR: boolean[] = [];
		selectedRolls.forEach((value, i) => {
			if(index === i) {
				newSR.push(!value);
			} else {
				newSR.push(value);
			}
		});
		setSelectedRolls(newSR);
	}

	const rolls: RollStorageObject[] = [];
	selectedRolls.forEach((selected, index) => {
		if(selected) {
			rolls.push(rollManager.rolls[index]);
		}
	});

	const options = {
		scales: {
			x: {
				stacked: true
			}
		}
	};

	const data: ChartData<"bar", (number | [number, number] | null)[], unknown> = {
		labels: rolls.map((rso) => {return rso.name}),
		datasets: [
			{
				label: "Minimum",
				data: rolls.map((rso) => {return rso.roll.getMinimum()})
			},
			{
				label: "Average",
				data: rolls.map((rso) => {return rso.roll.getAverage()})
			},
			{
				label: "Maximum",
				data: rolls.map((rso) => {return rso.roll.getMaximum()})
			}
		]
	};

	return <>
		{
			rollManager.rolls.length < 1 ? <>
				<Typography variant="body1" data-testid="comparator-prompt">No rolls available! Save a roll in the 'roller' page to have it available here.</Typography>
			</> : <>
				<Grid container>
					<Grid item lg={6} sm={12}>
						{
							rollManager.rolls.map((roll, index) => {
								return <Typography variant="body1">
									<Checkbox
										key={index}
										inputProps={{
											"aria-label": "Toggle selected"
										}}
										onChange={(event) => {
											toggleSelected(index)
										}}
										checked={selectedRolls[index]}
									/>
									{roll.name}
								</Typography>
							})
						}
					</Grid>
					<Grid item lg={6} sm={12}>
						<Bar options={options} data={data} />
					</Grid>
				</Grid>
			</>
		}
	</>;
};