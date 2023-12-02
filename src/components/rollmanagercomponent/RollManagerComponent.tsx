import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { RollManager } from "../../classes/rollManager/RollManager";

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
		}
	];

	return <>
		<DataGrid
			data-testid="rollmanager-datagrid"
			columns={columns}
			rows={rollManager.rolls}
		/>
	</>;
}