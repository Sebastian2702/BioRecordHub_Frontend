import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledButton from "./StyledButton.tsx";


interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    action?: () => void;
    title: string;
    content: "delete" | "information";
    contentText: React.ReactNode
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, action,title, content, contentText }) => {
    if (content === "delete") {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{color:"red", alignSelf:"center"}}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <StyledButton onClick={onClose} color={"primary"} size={"medium"} label={"Cancel"}/>
                    <StyledButton onClick={action} color={"delete"} size={"medium"} label={"Delete"}/>
                </DialogActions>
            </Dialog>
        )
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