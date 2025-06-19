import Box from '@mui/material/Box';
import {COLORS, FONT_SIZES} from '../constants/ui';
import Typography from '@mui/material/Typography';
import InputTextField from "./InputTextField.tsx";
import DateInput from "./DateInput.tsx";
import {SelectChangeEvent} from "@mui/material/Select";
import DropDownInput from "./DropdownInput.tsx";

interface FormFieldProps {
    label: string;
    value: any;
    required: boolean;
    helperText: string;
    multiline?: boolean;
    date?: boolean;
    dropdown?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options?: { display: string; value: string }[];
    onChangeDropdown?: (event: SelectChangeEvent<string>) => void;
    onChangeDate?: (date: Date | null) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, required, helperText,multiline, date, onChange, dropdown, options, onChangeDropdown, onChangeDate }) => {
    return (
        <Box sx={{ margin: '0 10px' }}>
            <Typography
                align={"left"}
                sx={{
                    color: COLORS.primary,
                    fontSize: { xs: FONT_SIZES.xsmall, sm: FONT_SIZES.small, lg: FONT_SIZES.medium },
                    fontWeight: 'bold',
                    marginBottom: '8px',
                }}
            >
                {label}:
            </Typography>
            {
                date && !dropdown &&(
                    <DateInput type={['year']} label={helperText} value={value} onChange={onChangeDate}/>
                )
            }
            { dropdown && !date&& (
                <DropDownInput options={options || []} value={value} onChange={onChangeDropdown} label={helperText} required={true}/>
            )}
            { !date && !dropdown &&(
                <InputTextField
                    label={helperText}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    required={required}
                    fontSize={FONT_SIZES.medium}
                    multiline={multiline}
                />
            )}
        </Box>
    );
};

export default FormField;