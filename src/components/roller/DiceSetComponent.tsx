import { DiceSet } from "../../classes/rollClass/DiceSet";
import { DieComponent } from "./DieComponent";
import { DiceSetReducer } from "../../classes/rollClass/setReducer/DiceSetReducer";
import { Die } from "../../classes/rollClass/Die";
import { useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";

type DSCProps = {
	diceSet: DiceSet,
	updateSet: (set: DiceSet) => void
}

export enum reducerType {
	KEEP,
	DISCARD
}

export const DiceSetComponent = ({diceSet, updateSet}: DSCProps) => {
	const [localSet, setLocalSet] = useState(diceSet);

	if(localSet !== diceSet) {
		setLocalSet(diceSet);
	}

	function copyDiceSet(): DiceSet {
		const newSet = new DiceSet(diceSet.getCount(), diceSet.getDieType());
		const actualReducer = diceSet.getReducer()
		if(actualReducer) {
			newSet.connectReducer(actualReducer);
		}
		return newSet;
	}

	function refreshSet(){
		setLocalSet(copyDiceSet());
		if(updateSet) {
			updateSet(diceSet);
		}
	}

	function updateCount(newCount: number): void {
		diceSet.setCount(newCount);
		refreshSet();
	}

	function updateReducer(newReducer: DiceSetReducer | undefined) {
		if(newReducer){
			diceSet.connectReducer(newReducer);
		} else {
			diceSet.disconnectReducer();
		}
		refreshSet();
	}

	function changeReducerType(type: reducerType) {
		switch(type) {
			case reducerType.KEEP:
				updateReducer(new DiceSetReducer(1, true));
				break;
			case reducerType.DISCARD:
				updateReducer(new DiceSetReducer(1, false));
				break;
		}
	}

	function updateReducerVariable(newVar: number) {
		diceSet.getReducer()?.setVariable(newVar);
		refreshSet();
	}

	function updateDie(die: Die) {
		diceSet.setDieType(die);
		refreshSet();
	}


	return (<Grid container>
		<Grid item xs={12} md={3}>
			<TextField
				inputProps={{
					"data-testid": "diceSetComponent-count"
				}}
				type="number"
				value={localSet.getCount()}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateCount(+event.target.value)}}
				label="Dice Count"
			/>
		</Grid>
		<Grid item xs={12} md={6}>
			<DieComponent die={localSet.getDieType()} updateDie={(die) => updateDie(die)} />
		</Grid>
		<Grid item xs={12} md={3}>
			{
				localSet.getReducer()
					? <>
						<TextField
							inputProps={{
								"data-testid": "diceSetComponent-reducerTypeInput"
							}}
							data-testid="diceSetComponent-reducerType"
							select
							fullWidth
							onChange={(event) => changeReducerType(+event.target.value)}
							defaultValue={reducerType.KEEP}
						>
							<MenuItem data-testid="diceSetComponent-reducerTypeKeep" value={reducerType.KEEP}>Keep</MenuItem>
							<MenuItem value={reducerType.DISCARD}>Discard</MenuItem>
						</TextField>
						<TextField
							inputProps={{
								"data-testid": "diceSetComponent-reducerVar"
							}}
							type="number"
							value={localSet.getReducer()?.getVariable()}
							onChange={(event) => {updateReducerVariable(+event.target.value)}}
						/>
						Highest Rolls
						<Button data-testid="diceSetComponent-removeReducer" onClick={() => {updateReducer(undefined)}}>Remove reducer</Button>
					</>
					: <Button data-testid="diceSetComponent-addReducer" onClick={() => {changeReducerType(reducerType.KEEP)}}>Add reducer</Button>
			}
		</Grid>
		<br/>
	</Grid>);
};