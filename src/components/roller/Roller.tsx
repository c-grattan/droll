import { useState } from "react";
import { Roll } from "../../classes/rollClass/Roll";
import { RollManager } from "../../classes/rollManager/RollManager";
import { ConfirmDialogButton } from "../confirmdialogbutton/ConfirmDialogButton";
import { RollComponent } from "./RollComponent";
import { RollSummary } from "../rollsummary/RollSummary";
import { Button, Divider, Grid, Input, Typography } from "@mui/material";

type RProps = {
	rollManager: RollManager
}

export const Roller = ({rollManager}: RProps) => {
	const [saveName, setSaveName] = useState('');
	const [saveCategory, setSaveCategory] = useState('');

	const [roll, setRoll] = useState(new Roll());

	const [rollResult, setRollResult] = useState(0);

	return (<>
		<Grid container spacing={1}>
			<Grid item xs={9}>
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
					onSubmit={() => rollManager.addRoll(roll, {
						rollName: saveName,
						category: saveCategory
					})}
				>
					<span>Name:</span>
					<Input inputProps={{'data-testid':"roller-saveName"}} value={saveName} onChange={(event) => {setSaveName(event.target.value)}} />
					<br/><span>Category:</span>
					<Input inputProps={{'data-testid':"roller-saveCategory"}} value={saveCategory} onChange={(event) => {setSaveCategory(event.target.value)}} />
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