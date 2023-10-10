import { MouseEventHandler, useState } from "react";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { Die } from "../../classes/rollClass/Die";
import { Roll } from "../../classes/rollClass/Roll";
import { DiceSetComponent } from "./DiceSetComponent";

type RRProps = {
	set: DiceSet,
	removeSet: MouseEventHandler<HTMLButtonElement>,
	updateSet: (newSet: DiceSet) => void
}

const RollRow = ({set, removeSet, updateSet}: RRProps) => {
	return (<>
		<button data-testid="rollComponent-removeSet" onClick={removeSet}>X</button>
		<DiceSetComponent diceSet={set} updateSet={(newSet) => updateSet(newSet)} />
	</>);
};

type RCProps = {
	roll: Roll,
	setRoll?: (roll: Roll) => void
}

export const RollComponent = ({roll, setRoll}: RCProps) => {
	const [localRoll, setLocalRoll] = useState(roll);

	function refreshRoll() {
		setLocalRoll(new Roll(roll.getSets()));
		if(setRoll) {
			setRoll(new Roll(roll.getSets()));
		}
	}

	function addNewSet() {
		const set = new DiceSet(1, new Die(6, 0));
		roll.addSet(set);
		refreshRoll();
	}

	function removeSet(index: number) {
		roll.removeSet(index);
		refreshRoll();
	}

	function updateSet(index: number, set: DiceSet) {
		roll.setSet(index, set);
		refreshRoll();
	}

	return (<>
		{
			localRoll.getSets().map((set: DiceSet, index: number) => {
				return <RollRow key={index} set={set} removeSet={() => removeSet(index)} updateSet={(set) => updateSet(index, set)} />;
			})
		}
		<button data-testid="rollComponent-addSet" onClick={addNewSet}>Add set</button>
	</>);
}