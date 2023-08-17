import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";

type CDBProps = {
	onSubmit?: () => void,
	children?: JSX.Element
}

export const ConfirmDialogButton = ({onSubmit, children}: CDBProps) => {
	const [open, setOpen] = useState(false);

	function handleClose(submit: boolean) {
		if(submit && onSubmit) {
			onSubmit();
		}
		setOpen(false);
	}

	return (<>
		<Dialog open={open}>
			<DialogContent data-testid="cdb-content">
				{children}
			</DialogContent>
			<DialogActions>
				<button data-testid="cdb-close" onClick={() => handleClose(false)}>Close</button>
				<button data-testid="cdb-submit" onClick={() => handleClose(true)}>Submit</button>
			</DialogActions>
		</Dialog>
		<button data-testid="cdb-open" onClick={() => setOpen(true)}>Open</button>
	</>);
};