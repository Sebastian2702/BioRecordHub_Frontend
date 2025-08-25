import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledButton from "./StyledButton.tsx";
import {CircularProgress} from "@mui/material";
import Box from '@mui/material/Box';
import {COLORS, FONT_SIZES} from "../constants/ui.ts";
import {useEffect, useState,} from "react";
import InputTextField from "./InputTextField.tsx";
import {forgotPassword} from "../services/auth/auth.ts";
import {toast, ToastContainer} from "react-toastify";
import {formatLabel} from "../utils/helperFunctions.ts";
import SaveIcon from '@mui/icons-material/Save';

interface ForgotPasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [resetToken, setResetToken] = useState('');


    const handleSave = async () => {
        setLoading(true);
        setError('');
        try {
            const data = {
                email: email,
                reset_password_token: resetToken,
                password: newPassword,
                password_confirmation: confirmNewPassword,
            }
            const response = await forgotPassword(data);

            setEmail('');
            onClose();
            toast.success("Password reset link sent to your email!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err: any) {
            console.log(err)
            setError(formatLabel(err.response.data.error || 'Failed to send reset link'));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError("");
        }
    }, [error]);

    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{color:COLORS.primary, textAlign:'center', fontWeight: 'bold'}}>Forgot Password:</DialogTitle>
            <DialogContent>
                <ToastContainer />
                <DialogContentText sx={{padding:'10px'}}>
                    {
                        loading ? (
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <InputTextField label="Your email" fullWidth required fontSize={FONT_SIZES.medium} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <InputTextField label="Your reset password token" fullWidth required fontSize={FONT_SIZES.medium} value={resetToken} onChange={(e) => setResetToken(e.target.value)} />
                                <InputTextField label="New Password" password fullWidth required fontSize={FONT_SIZES.medium} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                                <InputTextField label="Confirm New Password" password fullWidth required fontSize={FONT_SIZES.medium} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                            </>

                        )
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <StyledButton label={'Save'} color={'primary'} size={'medium'} onClick={handleSave} disabled={loading} icon={<SaveIcon/>}/>
            </DialogActions>
        </Dialog>
    )
}

export default ForgotPasswordDialog;