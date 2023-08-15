import { MouseEventHandler, useState } from "react";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { Die } from "../../classes/rollClass/Die";
import { Roll } from "../../classes/rollClass/Roll";
import { DiceSetComponent } from "./DiceSetComponent";

type RRProps = {
	set: DiceSet,
	removeSet: MouseEventHandler<HTMLButtonElement>
}

const RollRow = ({set, removeSet}: RRProps) => {
	return (<>
		<button data-testid="rollComponent-removeSet" onClick={removeSet}>X</button>
		<DiceSetComponent diceSet={set} />
	</>);
};

type RCProps = {
	roll: Roll
}

export const RollComponent = ({roll}: RCProps) => {
	const [sets, setSets] = useState(roll.getSets());

	function addNewSet() {
		const set = new DiceSet(1, new Die(6, 0));
		setSets([...sets, ...[set]]);
		roll.addSet(set);
	}

	function removeSet(index: number) {
		setSets(sets.filter((_, i) => {
			return i != index;
		}))
		roll.removeSet(index);
	}

	return (<>
		{
			sets.map((set: DiceSet, index: number) => {
				return <RollRow key={index} set={set} removeSet={() => removeSet(index)} />;
			})
		}
		<button data-testid="rollComponent-addSet" onClick={addNewSet}>Add set</button>
	</>);
}