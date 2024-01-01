import { AppBar, Button, Toolbar } from "@mui/material"

type TabData = {
	title: string,
	content: JSX.Element | JSX.Element[]
}

type NavProps = {
	navData: TabData[],
	currentTab: number,
	setCurrentTab: (tab: number) => void
}

export const Navigation = ({navData, currentTab, setCurrentTab}: NavProps) => {
	return <>
		<AppBar>
			<Toolbar>
				{
					navData.map((value: TabData, index: number) => {
						return <Button
									data-testid={"navigation-tab" + index}
									key={index}
									variant="contained"
									onClick={() => setCurrentTab(index)}
								>
							{value.title}
						</Button>
					})
				}
			</Toolbar>	
		</AppBar>
		<Toolbar />	
		{navData[currentTab].content}
	</>;
}