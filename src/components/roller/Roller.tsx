import { useState } from "react";
import { Roll } from "../../classes/rollClass/Roll";
import { RollManager } from "../../classes/rollManager/RollManager";
import { ConfirmDialogButton } from "../confirmdialogbutton/ConfirmDialogButton";
import { RollComponent } from "./RollComponent";

type RProps = {
	rollManager: RollManager
}

export const Roller = ({rollManager}: RProps) => {
	const [saveName, setSaveName] = useState('');
	const [saveCategory, setSaveCategory] = useState('');

	const roll = new Roll();

	const [rollResult, setRollResult] = useState(0);

	return (<>
		<RollComponent roll={roll} />
		<button data-testid="roller-testRoll" onClick={() => setRollResult(roll.roll())} />
		<p data-testid="roller-rollResults">{rollResult}</p>
		<ConfirmDialogButton data-testid="roller-openSave" onSubmit={() => rollManager.addRoll(roll, {
			rollName: saveName,
			category: saveCategory
		})}>
			<input data-testid="roller-saveName" value={saveName} onChange={(event) => {setSaveName(event.target.value)}} />
			<input data-testid="roller-saveCategory" value={saveCategory} onChange={(event) => {setSaveCategory(event.target.value)}} />
		</ConfirmDialogButton>
	</>);
};