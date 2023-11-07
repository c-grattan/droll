import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Roller } from './components/roller/Roller';
import { RollManager } from './classes/rollManager/RollManager';
import { Container } from '@mui/material';

function App() {
	const rollManager = new RollManager();

	return (<>
		<Container maxWidth='lg'>
			<Roller rollManager={rollManager} />
		</Container>
	</>);
}

export default App;
