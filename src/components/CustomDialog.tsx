import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledButton from "./StyledButton.tsx";
import {CircularProgress} from "@mui/material";
import Box from '@mui/material/Box';
import DropdownInput from "./DropdownInput.tsx";
import {dropdownEditUserRoleOptions} from "../constants/uiConstants.ts";
import {SelectChangeEvent} from "@mui/material/Select";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    action?: () => void;
    title: string;
    dialogLoading?: boolean;
    editField?: string;
    setEditField?: (field:string) => void;
    content: "delete" | "information" | "editUserRole" | "editField";
    contentText: React.ReactNode
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, action,title, content, contentText, dialogLoading, setEditField, editField }) => {
    if (content === "delete") {
        const dialogTitle = (
            <DialogTitle sx={{ color: "red", alignSelf: "center" }}>
                {title}
            </DialogTitle>
        );

        const dialogContent = (
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
                {dialogLoading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </DialogContent>
        );

        const dialogActions = (
            <DialogActions>
                <StyledButton
                    onClick={onClose}
                    color="primary"
                    size="medium"
                    label="Cancel"
                />
                {!dialogLoading && (
                    <StyledButton
                        onClick={action}
                        color="delete"
                        size="medium"
                        label="Delete"
                    />
                )}
            </DialogActions>
        );

        return (
            <Dialog open={open} onClose={onClose}>
                {dialogTitle}
                {dialogContent}
                {dialogActions}
            </Dialog>
        );
    }

    else if (content === "editUserRole") {
        const dialogTitle = (
            <DialogTitle sx={{ alignSelf: "center" }}>
                {title}
            </DialogTitle>
        );

        const dialogContent = (
            <DialogContent>
                <DialogContentText>
                    {contentText}
                </DialogContentText>

                {dialogLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <DropdownInput
                        options={dropdownEditUserRoleOptions}
                        label={title}
                        value={editField}
                        onChange={(e: SelectChangeEvent) => setEditField?.(e.target.value)}
                        filter={false}
                    />
                )}
            </DialogContent>
        );

        const dialogActions = (
            <DialogActions>
                <StyledButton onClick={onClose} color="primary" size="medium" label="Cancel" />
                {!dialogLoading && (
                    <StyledButton onClick={action} color="edit" size="medium" label="Edit" />
                )}
            </DialogActions>
        );

        return (
            <Dialog open={open} onClose={onClose}>
                {dialogTitle}
                {dialogContent}
                {dialogActions}
            </Dialog>
        );
    }
    else{
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{alignSelf:"center"}}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <StyledButton onClick={onClose} color={"primary"} size={"medium"} label={"Close"}/>
                </DialogActions>
            </Dialog>
        )

    }
}

export default CustomDialog;