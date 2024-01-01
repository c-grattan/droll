import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Roller } from './components/roller/Roller';
import { RollManager } from './classes/rollManager/RollManager';
import { Container } from '@mui/material';
import { Navigation } from './components/navbar/Navigation';
import { RollManagerComponent } from './components/rollmanagercomponent/RollManagerComponent';
import { useState } from 'react';

function App() {
	const [rollManager] = useState(new RollManager());
	const [currentTab, setCurrentTab] = useState(0);

	return (<>
		<Container maxWidth='lg'>
			<Navigation
				currentTab={currentTab}
				setCurrentTab={(tab) => {
					setCurrentTab(tab);
					console.log(rollManager.rolls);
				}}
				navData={[
				{
					title: "Roller",
					content: <Roller rollManager={rollManager} />
				},
				{
					title: "Roll Manager",
					content: <RollManagerComponent rollManager={rollManager} changeTab={(tab) => setCurrentTab(tab)} />
				}
			]} />
		</Container>
	</>);
}

export default App;
