import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { RollManager, RollStorageObject } from "../../classes/rollManager/RollManager";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { ConfirmDialogButton } from "../confirmdialogbutton/ConfirmDialogButton";
import Checkbox from "@mui/material/Checkbox";

type RMCProps = {
	rollManager: RollManager,
	changeTab: (tab: number) => void
}

export const RollManagerComponent = ({rollManager, changeTab}: RMCProps) => {
	const rollsAvailable: boolean = rollManager.rolls.length > 0;
	const [uploadMessage, setUploadMessage] = useState('');
	const [displayData, setDisplayData] = useState(rollManager.rolls);
	const [selectedRolls, setSelectedRolls] = useState<GridRowId[]>([]);
	const [uploadedRolls, setUploadedRolls] = useState<RollStorageObject[]>([]);
	const [append, setAppend] = useState(false);

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
		},
		{
			field: 'actions',
			headerName: 'Actions',
			renderCell: (params) => <>
				<IconButton
					data-testid={"rollmanager-loadRow" + params.rowNode.id}
					onClick={() => {
						rollManager.setSelected(Number.parseInt(params.rowNode.id.toString()));
						changeTab(0);
					}}
				>
					<EditIcon />
				</IconButton>
			</>
		}
	];

	const rows = displayData.map((roll: RollStorageObject, index: number) => {
		return {
			id: index,
			min: roll.roll.getMinimum(),
			mean: roll.roll.getAverage(),
			max: roll.roll.getMaximum(),
			...roll
		};
	});

	function load(event: any): void {
		if(event.target.files[0]) {
			const file: File = event.target.files[0];
			const reader = new FileReader();

			setUploadMessage("");

			reader.addEventListener('load', (event) => {
				const result = event.target?.result;
				if(typeof(result) == "string") {
					try {
						const newRolls: RollStorageObject[] = JSON.parse(result);
						setUploadedRolls(newRolls);
						
					} catch(e: any) {
						setUploadMessage("Error parsing input: " + (e as Error).message);
					}
					
				}
			});
			
			reader.readAsText(file);
		}
	}

	function updateNewRolls(): void {
		rollManager.parseNewRolls(uploadedRolls, append);
		setDisplayData(rollManager.rolls);
		setUploadMessage("Loaded Droll file");
		setUploadedRolls([]);
	}

	function deleteSelected() {
		let newRolls: RollStorageObject[] = [];
		rollManager.rolls.forEach((value, index) => {
			if(!selectedRolls.includes(index)) {
				newRolls.push(value);
			}
		});
		rollManager.rolls = newRolls;
		setDisplayData(newRolls);
		setSelectedRolls([]);
	}

	return <>
		{
			rollsAvailable && <DataGrid
				checkboxSelection
				disableVirtualization
				rowSelectionModel={selectedRolls}
				onRowSelectionModelChange={(selected) => {
					setSelectedRolls(selected);
				}}
				data-testid="rollmanager-datagrid"
				columns={columns}
				rows={rows}
			/>
		}
		<Typography variant="body1">Import:</Typography>
		<ConfirmDialogButton
			disabled={uploadedRolls.length === 0}
			onSubmit={() => updateNewRolls()}
		>
			<TextField
				type="file"
				inputProps={{
					accept: '.json',
					'data-testid': 'rollmanager-uploadinput'
				}}
				onChange={(event) => load(event)}
			/>
			<p>Append data instead of overwriting?</p>
			<Checkbox
				inputProps={{'aria-label': 'Toggle append checkbox'}}
				checked={append}
				onChange={(event) => {setAppend(event.target.checked)}}
			/>
		</ConfirmDialogButton>
		
		{uploadMessage !== "" && <p data-testid="rollmanager-uploadmessage">{uploadMessage}</p>}
		<Button
			data-testid="rollmanager-downloadbutton"
			download="Droll.json"
			href={"data:text/json," + encodeURIComponent(JSON.stringify(rollManager.rolls))}
			disabled={!rollsAvailable}
		>
				Export
		</Button>
		<Button
			data-testid="rollmanager-deletebutton"
			onClick={() => deleteSelected()}
			disabled={selectedRolls.length < 1}
			>
				Delete
		</Button>
	</>;
}