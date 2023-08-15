import { useState } from "react";
import { DiceSet } from "../../classes/rollClass/DiceSet";
import { DieComponent } from "./DieComponent";

type DSCProps = {
	diceSet: DiceSet
}

export const DiceSetComponent = ({diceSet}: DSCProps) => {
	const [count, setCount] = useState(diceSet.getCount());

	function updateCount(newCount: number): void {
		setCount(newCount);
		diceSet.setCount(newCount);
	}

	return (<>
		<input type="number" data-testid="diceSetComponent-count" value={count} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateCount(+event.target.value)}} />
		<DieComponent die={diceSet.getDieType()} />
		<br/>
	</>);
};