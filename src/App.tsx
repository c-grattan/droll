import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Roll } from "./classes/rollClass/Roll";
import { RollComponent } from "./components/roller/RollComponent";
import { ConfirmDialogButton } from './components/confirmdialogbutton/ConfirmDialogButton';
import { RollSummary } from './components/rollsummary/RollSummary';

function App() {
	const roll = new Roll();
	return (<>
		<RollComponent roll={roll} />
		<ConfirmDialogButton />
		<RollSummary roll={roll} />
	</>);
}

export default App;
