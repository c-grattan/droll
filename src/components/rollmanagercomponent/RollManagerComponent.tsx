import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { RollManager, RollStorageObject } from "../../classes/rollManager/RollManager";
import { Button } from "@mui/material";

type RMCProps = {
	rollManager: RollManager
}

export const RollManagerComponent = ({rollManager}: RMCProps) => {
	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name'
		},
		{
			field: 'category',
			headerName: 'Category'
		},
		{
			field: 'min',
			headerName: 'Minimum'
		},
		{
			field: 'mean',
			headerName: 'Mean'
		},
		{
			field: 'max',
			headerName: 'Maximum'
		}
	];

	const rows = rollManager.rolls.map((roll: RollStorageObject, index: number) => {
		return {
			id: index,
			min: roll.roll.getMinimum(),
			mean: roll.roll.getAverage(),
			max: roll.roll.getMaximum(),
			...roll
		};
	});

	return <>
		<DataGrid
			data-testid="rollmanager-datagrid"
			columns={columns}
			rows={rows}
			pagination={true}
		/>
		<Button download="Droll.json" href={"data:text/json," + encodeURIComponent(JSON.stringify(rollManager.rolls))} disabled={rollManager.rolls.length == 0}>Export</Button>
	</>;
}