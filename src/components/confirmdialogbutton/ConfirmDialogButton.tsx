import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";

type CDBProps = {
	buttonText?: string,
	onSubmit?: () => void,
	children?: JSX.Element[] | JSX.Element,
	submitDisabled?: boolean,
	openDisabled?: boolean
}

export const ConfirmDialogButton = ({buttonText, onSubmit, children, submitDisabled, openDisabled}: CDBProps) => {
	const [open, setOpen] = useState(false);

	function handleClose(submit: boolean) {
		if(submit && onSubmit) {
			onSubmit();
		}
		setOpen(false);
	}

	return (<>
		<Dialog open={open} onClose={() => handleClose(false)}>
			<DialogContent data-testid="cdb-content">
				{children}
			</DialogContent>
			<DialogActions>
				<Button data-testid="cdb-close" onClick={() => handleClose(false)}>Close</Button>
				<Button data-testid="cdb-submit" onClick={() => handleClose(true)} disabled={submitDisabled}>Submit</Button>
			</DialogActions>
		</Dialog>
		<Button data-testid="cdb-open" onClick={() => setOpen(true)} disabled={openDisabled}>{buttonText ? buttonText : 'Open'}</Button>
	</>);
};