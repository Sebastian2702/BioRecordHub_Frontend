import TextField from '@mui/material/TextField';
import {COLORS, BORDER} from "../constants/ui.ts";


interface InputTextProps {
    label: string;
    password?: boolean;
    multiline?: boolean;
    value?: string;
    fullWidth?: boolean;
    required?: boolean;
    fontSize?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTextArea: React.FC<InputTextProps> = ({ label, password, multiline,value, fullWidth, required, fontSize, onChange }) => {
    return (
        <TextField
            variant="outlined"
            label={label}
            value={value}
            onChange={onChange}
            fullWidth={fullWidth}
            type={password ? 'password' : 'text'}
            multiline={multiline}
            required={required}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: BORDER.radius,
                    backgroundColor: COLORS.white,
                    fontSize: fontSize,
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                    '& fieldset': {
                        borderStyle: 'solid',
                        borderColor: COLORS.primary,
                        borderWidth: BORDER.weight,
                    },
                    '&:hover fieldset': {
                        borderColor: COLORS.primary,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: COLORS.primary,
                    },
                },
                '& label': {
                    color: COLORS.primary,
                }
            }}
        />
    );
};

export default InputTextArea;