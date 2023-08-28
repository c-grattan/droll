import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Roll } from "./classes/rollClass/Roll";
import { Roller } from './components/roller/Roller';

function App() {
	const roll = new Roll();
	return (<>
		<Roller />
	</>);
}

export default App;
