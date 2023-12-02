import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Roller } from './components/roller/Roller';
import { RollManager } from './classes/rollManager/RollManager';
import { Container } from '@mui/material';
import { Navigation } from './components/navbar/Navigation';
import { RollManagerComponent } from './components/rollmanagercomponent/RollManagerComponent';

function App() {
	const rollManager = new RollManager();

	return (<>
		<Container maxWidth='lg'>
			<Navigation navData={[
				{
					title: "Roller",
					content: <Roller rollManager={rollManager} />
				},
				{
					title: "Roll Manager",
					content: <RollManagerComponent rollManager={rollManager} />
				}
			]} />
		</Container>
	</>);
}

export default App;
