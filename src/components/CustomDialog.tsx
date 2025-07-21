import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledButton from "./StyledButton.tsx";
import {CircularProgress} from "@mui/material";
import Box from '@mui/material/Box';
import DropdownInput from "./DropdownInput.tsx";
import {dropdownEditUserRoleOptions, dropDownOccurrenceFieldTypeOptions, dropdownOccurrenceFieldGroupOptions} from "../constants/uiConstants.ts";
import {SelectChangeEvent} from "@mui/material/Select";
import InputTextField from "./InputTextField.tsx";
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import {COLORS} from "../constants/ui.ts";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    action?: () => void;
    title: string;
    dialogLoading?: boolean;
    editField?: string;
    setEditField?: (field:string) => void;
    occurrenceFields?: {
        name: string;
        label: string;
        type: string;
        group: string;
        is_required: boolean;
        is_active: boolean;
    };
    setOccurrenceFields?: (fields: {
        name: string;
        label: string;
        type: string;
        group: string;
        is_required: boolean;
        is_active: boolean;
    }) => void;
    content: "delete" | "information" | "editUserRole" | "editField" | "newField";
    contentText: React.ReactNode
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, action,title, content, contentText, dialogLoading, setEditField, editField, occurrenceFields, setOccurrenceFields}) => {
    const dialogTitle = (
        <DialogTitle sx={{ color: "red", alignSelf: "center" }}>
            {title}
        </DialogTitle>
    );
    if (content === "delete") {
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
    else if ((content === "editField" || content === 'newField') && occurrenceFields) {
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
                        <CircularProgress/>
                    </Box>
                ) : (
                    <Box>
                        <InputTextField label={'Field Name'} value={occurrenceFields.name}
                                        onChange={(e) => setOccurrenceFields?.({
                                            ...occurrenceFields,
                                            name: e.target.value,
                                        })}/>
                        <InputTextField label={'Description of the field'} value={occurrenceFields.label}
                                        onChange={(e) => setOccurrenceFields?.({
                                            ...occurrenceFields,
                                            label: e.target.value,
                                        })}/>
                        <DropdownInput
                            options={dropDownOccurrenceFieldTypeOptions}
                            label={"Type of the field"}
                            value={occurrenceFields.type}
                            onChange={(e: SelectChangeEvent) => setOccurrenceFields?.({
                                ...occurrenceFields,
                                type: e.target.value,
                            })}
                            filter={false}
                        />
                        <DropdownInput
                            options={dropdownOccurrenceFieldGroupOptions}
                            label={'Group of the field'}
                            value={occurrenceFields.group}
                            onChange={(e: SelectChangeEvent) => setOccurrenceFields?.({
                                ...occurrenceFields,
                                group: e.target.value,
                            })}
                        />
                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={occurrenceFields.is_active}
                                            onChange={(e) => setOccurrenceFields?.({
                                                ...occurrenceFields,
                                                is_active: e.target.checked,
                                            })}
                                            color="primary"
                                        />
                                    }
                                    label="Active"
                                    color={COLORS.primary}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={occurrenceFields.is_required}
                                            onChange={(e) => setOccurrenceFields?.({
                                                ...occurrenceFields,
                                                is_required: e.target.checked,
                                            })}
                                            color={"primary"}
                                        />
                                    }
                                    label="Required"
                                    color={COLORS.primary}
                                />
                            </FormGroup>
                        </FormControl>

                    </Box>

                )}
            </DialogContent>
        );
        const dialogActions = (
            <DialogActions>
                <StyledButton onClick={onClose} color="secondary" size="medium" label="Cancel" />
                {!dialogLoading && (
                    <StyledButton onClick={action} color={
                        content === 'editField' ? 'edit' : 'primary'
                    } size="medium" label='Save' />
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