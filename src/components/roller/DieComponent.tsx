import { useState } from "react"
import { Die } from "../../classes/rollClass/Die"

type DCProps = {
	die: Die
}

export const DieComponent = ({die}: DCProps) => {
	const [sides, setSides] = useState(die.getSides());
	const [modifier, setModifier] = useState(die.getModifier());

	function updateSides(val: number) {
		setSides(val);
		die.setSides(val);
	}

	function updateModifier(val: number) {
		setModifier(val);
		die.setModifier(val);
	}

	return (<>
		d<input type="number" data-testid="dieComponent-sides" value={sides} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateSides(+event.target.value)}}/>
		+<input type="number" data-testid="dieComponent-modifier" value={modifier} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateModifier(+event.target.value)}}/>
	</>);
}