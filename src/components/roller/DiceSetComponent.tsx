import { DiceSet } from "../../classes/rollClass/DiceSet";
import { DieComponent } from "./DieComponent";
import { DiceSetReducer } from "../../classes/rollClass/setReducer/DiceSetReducer";
import { KeepXHighest } from "../../classes/rollClass/setReducer/KeepXHighest";
import { DiscardXHighest } from "../../classes/rollClass/setReducer/DiscardXHighest";
import { Die } from "../../classes/rollClass/Die";
import { useState } from "react";

type DSCProps = {
	diceSet: DiceSet,
	updateSet?: (set: DiceSet) => void
}

export enum reducerType {
	KEEP,
	DISCARD
}

export const DiceSetComponent = ({diceSet, updateSet}: DSCProps) => {
	const [localSet, setLocalSet] = useState(diceSet);

	if(updateSet && localSet !== diceSet) {
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
				updateReducer(new KeepXHighest(1));
				break;
			case reducerType.DISCARD:
				updateReducer(new DiscardXHighest(1));
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


	return (<>
		<input type="number" data-testid="diceSetComponent-count" value={localSet.getCount()} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateCount(+event.target.value)}} />
		<DieComponent die={localSet.getDieType()} updateDie={(die) => updateDie(die)} />
		{
			localSet.getReducer()
				? <>
					<select data-testid="diceSetComponent-reducerType" onChange={(event) => changeReducerType(+event.target.value)}>
						<option value={reducerType.KEEP}>Keep</option>
						<option value={reducerType.DISCARD}>Discard</option>
					</select>
					<input data-testid="diceSetComponent-reducerVar" type="number" value={localSet.getReducer()?.getVariable()} onChange={(event) => {updateReducerVariable(+event.target.value)}} />
					Highest
					<button data-testid="diceSetComponent-removeReducer" onClick={() => {updateReducer(undefined)}}>Remove reducer</button>
				</>
				: <button data-testid="diceSetComponent-addReducer" onClick={() => {changeReducerType(reducerType.KEEP)}}>Add reducer</button>
		}
		<br/>
	</>);
};