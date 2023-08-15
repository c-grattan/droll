import { Roll } from "./classes/rollClass/Roll";
import { RollComponent } from "./components/roller/RollComponent";

function App() {
	return (<>
		<RollComponent roll={new Roll()} />
	</>);
}

export default App;
