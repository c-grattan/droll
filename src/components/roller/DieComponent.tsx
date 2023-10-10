import { useState } from "react";
import { Die } from "../../classes/rollClass/Die"

type DCProps = {
	die: Die,
	updateDie?: (die: Die) => void
}

export const DieComponent = ({die, updateDie}: DCProps) => {
	const [localDie, setLocalDie] = useState(new Die(die.getSides(), die.getModifier()));

	function refreshDie() {
		setLocalDie(new Die(die.getSides(), die.getModifier()));
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

	return (<>
		d<input type="number" data-testid="dieComponent-sides" value={localDie.getSides()} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateSides(+event.target.value)}}/>
		+<input type="number" data-testid="dieComponent-modifier" value={localDie.getModifier()} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateModifier(+event.target.value)}}/>
	</>);
}