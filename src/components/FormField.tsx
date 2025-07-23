import Box from '@mui/material/Box';
import { COLORS, FONT_SIZES } from '../constants/ui';
import Typography from '@mui/material/Typography';
import InputTextField from './InputTextField.tsx';
import DateInput from './DateInput.tsx';
import { SelectChangeEvent } from '@mui/material/Select';
import DropDownInput from './DropdownInput.tsx';
import DateTimeInput from './DateTimeInput.tsx';
import Switch from '@mui/material/Switch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FormFieldProps {
    label: string;
    value: any;
    required: boolean;
    helperText: string;
    multiline?: boolean;
    date?: boolean;
    dateType?: ['day', 'month', 'year'] | ['month', 'year'] | ['year'] | ['day', 'month'] | ['day'];
    dropdown?: boolean;
    dateTime?: boolean;
    switchInput?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options?: { display: string; value: string }[];
    onChangeDropdown?: (event: SelectChangeEvent<string>) => void;
    onChangeDate?: (date: Date | null) => void;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 label,
                                                 value,
                                                 required,
                                                 helperText,
                                                 multiline,
                                                 date,
                                                 dateType,
                                                 dateTime,
                                                 switchInput,
                                                 onChange,
                                                 dropdown,
                                                 options,
                                                 onChangeDropdown,
                                                 onChangeDate,
                                             }) => {
    const showDate = date && !dropdown && !dateTime && !switchInput;
    const showDropdown = dropdown && !date && !dateTime && !switchInput;
    const showDateTime = dateTime && !dropdown && !date && !switchInput;
    const showText = !date && !dropdown && !dateTime && !switchInput;
    const showSwitch = !date && !dropdown && !dateTime && switchInput;

    return (
        <Box sx={{ margin: '0 10px' }}>
            <Typography
                align="left"
                sx={{
                    color: COLORS.primary,
                    fontSize: { xs: FONT_SIZES.xsmall, sm: FONT_SIZES.small, lg: FONT_SIZES.medium },
                    fontWeight: 'bold',
                    marginBottom: '8px',
                }}
            >
                {label}:
            </Typography>

            {showDate && (
                <DateInput type={dateType || ['year']} label={helperText} value={value} onChange={onChangeDate} />
            )}

            {showDropdown && (
                <DropDownInput
                    options={options || []}
                    value={value}
                    onChange={onChangeDropdown}
                    label={helperText}
                    required={required}
                    filter={false}
                />
            )}

            {showDateTime && (
                <DateTimeInput
                    label={helperText}
                    value={value}
                    onChange={onChangeDate}
                    type={dateType || ['day', 'month', 'year']}
                />
            )}

            {showText && (
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

            {showSwitch && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        width: 'fit-content',
                    }}
                >
                    <Switch
                        checked={value}
                        onChange={onChange}
                        color="success"
                        sx={{
                            transform: 'scale(1.3)',
                        }}
                    />
                    {value && <CheckCircleIcon color="success" />}
                </Box>
            )}
        </Box>
    );
};

export default FormField;
