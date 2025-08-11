import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledButton from "./StyledButton.tsx";
import {CircularProgress} from "@mui/material";
import Box from '@mui/material/Box';
import {COLORS, FONT_SIZES} from "../constants/ui.ts";
import {formatLabel} from "../utils/helperFunctions.ts";
import Typography from "@mui/material/Typography";
import {useAuth} from "../context/AuthContext.tsx";
import {useState, useEffect} from "react";
import InputTextField from "./InputTextField.tsx";
import {resetEmail, resetPassword} from "../services/auth/auth.ts";
import {toast, ToastContainer} from "react-toastify";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import {handleLogout} from "../services/auth/authHandler.ts";

interface UserProfileDialogProps {
    open: boolean;
    onClose: () => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onClose }) => {
    const { user,logout: contextLogout } = useAuth();
    const navigate = useNavigate();
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [email, setEmail] = useState(user?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChangeDialog = (type: 'email' | 'password' | 'profile' ) => {
        if (type === 'email') {
            setEditEmail(true);
            setEditPassword(false);
        } else if (type === 'password') {
            setEditPassword(true);
            setEditEmail(false);
        }
        else {
            setEditEmail(false);
            setEditPassword(false);
        }
    }

    const handleClose = () => {
        setEditEmail(false);
        setEditPassword(false);
        onClose();
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

    const handleSave = async (type: 'email' | 'password') =>{
        setLoading(true);
        if (type === 'email') {
            if (!email) {
                setError('Email cannot be empty');
                return;
            }
            try {
                const data = {
                    email: email,
                }
                await resetEmail(data);
                toast.success("Email changed!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                handleLogout({navigate, contextLogout});

            } catch (error) {
                setLoading(false);
                console.error('Error updating email:', error);
                setError('Failed to update email');
            }
        }
        else{
            if (!currentPassword || !newPassword) {
                setError('Both fields are required');
                return;
            }
            try {
                const data ={
                    current_password: currentPassword,
                    password: newPassword,
                    password_confirmation: confirmNewPassword,
                }
                await resetPassword(data);
                toast.success("Password changed!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                handleLogout({navigate, contextLogout});
            } catch (error) {
                setLoading(false);
                const msg = error.response.data.message;
                const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
                setError(cutmsg);
            }
        }
    }

    return (
        (!editEmail && !editPassword) ? (
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{color:COLORS.primary, textAlign:'center', fontWeight: 'bold'}}>User Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <ToastContainer />
                        <>
                            <Typography variant="h6" sx={{color: COLORS.black}}>Name: <strong style={{color:COLORS.primary, fontWeight:'bold'}}>{user?.name}</strong></Typography>
                            <Typography variant="h6" sx={{color: COLORS.black}}>Email: <strong style={{color:COLORS.primary,fontWeight:'bold'}}>{user?.email}</strong></Typography>
                            <Typography variant="h6" sx={{color: COLORS.black}}>Role: <strong style={{color:COLORS.primary, fontWeight:'bold'}}>{formatLabel(user?.role)}</strong></Typography>
                        </>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginBottom: '20px'}}>
                    <Box>
                        <StyledButton onClick={handleClose} color="delete" size={'medium'} label={'Close'} />
                    </Box>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <StyledButton onClick={() => handleChangeDialog('email')} color="secondary" size={'medium'} label={'Edit Email'} />
                        <StyledButton onClick={() => handleChangeDialog('password')} color="primary" size={'medium'} label={'Edit Password'} />
                    </Box>
                </DialogActions>
            </Dialog>
        ) : (editEmail && !editPassword) ? (
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{color:COLORS.primary, textAlign:'center', fontWeight: 'bold'}}>Edit Email:</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{padding:'10px'}}>
                        {
                            loading ? (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <InputTextField label="Email" fullWidth required fontSize={FONT_SIZES.medium} value={email} onChange={(e) => setEmail(e.target.value)} />
                            )
                        }
                        <ToastContainer />
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginBottom: '20px'}}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <StyledButton onClick={handleClose} color="delete" size={'medium'} label={'Close'} />
                        <StyledButton onClick={() => handleChangeDialog('password')} color="secondary" size={'medium'} label={'Edit Password'} />
                    </Box>
                    <StyledButton label={'Save'} color={'primary'} size={'medium'} onClick={() => handleSave('email')} icon={<SaveIcon/>} disabled={loading}/>
                </DialogActions>
            </Dialog>
        ): (
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{color:COLORS.primary, textAlign:'center', fontWeight: 'bold'}}>Edit Password:</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{padding:'10px'}}>
                        <ToastContainer />
                        {loading ? (
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <InputTextField label="Current Password" password fullWidth required fontSize={FONT_SIZES.medium} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                                <InputTextField label="New Password" password fullWidth required fontSize={FONT_SIZES.medium} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                                <InputTextField label="Confirm New Password" password fullWidth required fontSize={FONT_SIZES.medium} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                            </>
                            )
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginBottom: '20px'}}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <StyledButton onClick={handleClose} color="delete" size={'medium'} label={'Close'} />
                        <StyledButton onClick={() => handleChangeDialog('email')} color="secondary" size={'medium'} label={'Edit Email'} />
                    </Box>
                    <StyledButton label={'Save'} color={'primary'} size={'medium'} onClick={() => handleSave('password')} icon={<SaveIcon/>} disabled={loading}/>
                </DialogActions>
            </Dialog>
        )
    );
};

export default UserProfileDialog;