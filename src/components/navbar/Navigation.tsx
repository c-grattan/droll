import { AppBar, Button, Toolbar } from "@mui/material"
import { useState } from "react"

type TabData = {
	title: string,
	content: JSX.Element | JSX.Element[]
}

type NavProps = {
	navData: TabData[]
}

export const Navigation = ({navData}: NavProps) => {
	const [currentTab, setCurrentTab] = useState(0);
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