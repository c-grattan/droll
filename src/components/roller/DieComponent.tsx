import { useState } from "react";
import { Die } from "../../classes/rollClass/Die"
import { Grid, TextField } from "@mui/material";

type DCProps = {
	die: Die,
	updateDie?: (die: Die) => void
}

export const DieComponent = ({die, updateDie}: DCProps) => {
	const [localDie, setLocalDie] = useState(new Die(die.getSides(), die.getModifier()));

	if(updateDie && localDie !== die) {
		setLocalDie(die);
	}

	function refreshDie() {
		setLocalDie(die);
		if(updateDie) {
			updateDie(die);
		}
	}

	function updateSides(val: number) {
		die.setSides(val);
		refreshDie();
	}

	function updateModifier(val: number) {
		die.setModifier(val);
		refreshDie();
	}

	return (<Grid container>
		<Grid item xs={12} md={6}>
			<TextField
				inputProps={{
					"data-testid": "dieComponent-sides"
				}}
				type="number"
				value={localDie.getSides()}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateSides(+event.target.value)}}
				label="Die Sides"
			/>
		</Grid>
		<Grid item xs={12} md={6}>
			<TextField
				inputProps={{
					"data-testid": "dieComponent-modifier"
				}}
				type="number"
				value={localDie.getModifier()}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateModifier(+event.target.value)}}
				label="Modifier"
			/>
		</Grid>
		
		
	</Grid>);
}