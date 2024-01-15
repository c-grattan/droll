import { useState } from "react";
import { Roll } from "../../classes/rollClass/Roll";
import { RollManager } from "../../classes/rollManager/RollManager";
import { ConfirmDialogButton } from "../confirmdialogbutton/ConfirmDialogButton";
import { RollComponent } from "./RollComponent";
import { RollSummary } from "../rollsummary/RollSummary";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";

type RProps = {
	rollManager: RollManager
}

export const Roller = ({rollManager}: RProps) => {
	const noSelection: boolean = rollManager.getSelected() < 0;
	const [saveName, setSaveName] = useState(noSelection ? '' : rollManager.rolls[rollManager.getSelected()].name);
	const [saveCategory, setSaveCategory] = useState(noSelection ? '' : rollManager.rolls[rollManager.getSelected()].category);

	const [roll, setRoll] = useState(noSelection ? new Roll() : rollManager.rolls[rollManager.getSelected()].roll);

	const [rollResult, setRollResult] = useState(0);

	function saveRoll() {
		let index: number = -1;
		for(let i = 0; i < rollManager.getNames().length; i++) {
			const name = rollManager.getNames()[i];
			if(saveName === name) {
				index = i;
				break;
			}
		}

		if(index < 0) {
			rollManager.addRoll(roll, {
				rollName: saveName,
				category: saveCategory
			});
		} else {
			rollManager.rolls[index] = {
				roll: roll,
				name: saveName,
				category: saveCategory
			};
		}
	}

	return (<>
		<Grid container spacing={1} data-testid="roller">
			<Grid item xs={9}>
				{!noSelection && <>
					<Typography variant="body1">Currently editing: {rollManager.rolls[rollManager.getSelected()].name}</Typography>
					<Button
						onClick={() => {
							rollManager.setSelected(-1);
							setRoll(new Roll());
						}}
						data-testid="roller-reset"
					>
						Reset to new roll
					</Button>
				</>}
				<RollComponent roll={roll} setRoll={(roll) => setRoll(roll)} />
			</Grid>
			<Grid item xs={1}>
				<Divider orientation="vertical" />
			</Grid>
			<Grid item xs={2}>
				<RollSummary roll={roll} />
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={7} />
			<Grid item xs={2}>
				<ConfirmDialogButton
					buttonText="Save"
					data-testid="roller-openSave"
					onSubmit={() => saveRoll()}
					submitDisabled={saveName === undefined || saveName.length === 0}
				>
					<TextField
						inputProps={{'data-testid':"roller-saveName"}}
						disabled={!noSelection}
						value={saveName}
						onChange={(event) => {setSaveName(event.target.value)}}
						label="Name (Required)"
						fullWidth
					/>
					<TextField
						inputProps={{'data-testid':"roller-saveCategory"}}
						value={saveCategory}
						onChange={(event) => {setSaveCategory(event.target.value)}}
						label="Category"
						fullWidth
					/>
					<>{saveName !== undefined && rollManager.getNames().includes(saveName) && <Typography variant="body1">Warning! A roll already exists with that name, saving will overwrite it</Typography>}</>
				</ConfirmDialogButton>

				<Button data-testid="roller-testRoll" onClick={() => setRollResult(roll.roll())}>Roll</Button>
			</Grid>
			<Grid item xs={3} textAlign="center">
				<Typography variant="h1" data-testid="roller-rollResults">{rollResult}</Typography>
				<Typography variant="caption">Roll Result</Typography>
			</Grid>
		</Grid>
	</>);
};