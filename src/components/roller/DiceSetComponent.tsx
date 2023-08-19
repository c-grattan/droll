import { useState } from "react";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { DieComponent } from "./DieComponent";
import { DiceSetReducer } from "../../classes/rollClass/setReducer/DiceSetReducer";
import { KeepXHighest } from "../../classes/rollClass/setReducer/KeepXHighest";
import { DiscardXHighest } from "../../classes/rollClass/setReducer/DiscardXHighest";

type DSCProps = {
	diceSet: DiceSet
}

export enum reducerType {
	KEEP,
	DISCARD
}

export const DiceSetComponent = ({diceSet}: DSCProps) => {
	const [count, setCount] = useState(diceSet.getCount());
	const [reducer, setReducer] = useState(diceSet.getReducer());
	const [reducerVar, setReducerVar] = useState(diceSet.getReducer()?.getVariable() || 0);

	function updateCount(newCount: number): void {
		setCount(newCount);
		diceSet.setCount(newCount);
	}

	function updateReducer(newReducer: DiceSetReducer | undefined) {
		setReducer(newReducer);
		if(newReducer){
			diceSet.connectReducer(newReducer);
		} else {
			diceSet.disconnectReducer();
		}
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
		setReducerVar(newVar);
		reducer?.setVariable(newVar);
	}

	return (<>
		<input type="number" data-testid="diceSetComponent-count" value={count} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateCount(+event.target.value)}} />
		<DieComponent die={diceSet.getDieType()} />
		{
			reducer
				? <>
					<select data-testid="diceSetComponent-reducerType" onChange={(event) => changeReducerType(+event.target.value)}>
						<option value={reducerType.KEEP}>Keep</option>
						<option value={reducerType.DISCARD}>Discard</option>
					</select>
					<input data-testid="diceSetComponent-reducerVar" type="number" value={reducerVar} onChange={(event) => {updateReducerVariable(+event.target.value)}} />
					<button data-testid="diceSetComponent-removeReducer" onClick={() => {updateReducer(undefined)}}>Remove reducer</button>
				</>
				: <button data-testid="diceSetComponent-addReducer" onClick={() => {changeReducerType(reducerType.KEEP)}}>Add reducer</button>
		}
		<br/>
	</>);
};