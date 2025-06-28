import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {BORDER, COLORS} from "../constants/ui.ts";
import dayjs from 'dayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

interface DateTimeInputProps {
    label: string;
    value: dayjs.Dayjs | null;
    onChange?: (date: never) => void;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({label, value, onChange}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']} sx={{width: "100%", height: "100%"}}>
                <DateTimePicker
                    label={label}
                    value={value}
                    onChange={onChange}
                    slotProps={{
                        textField: {
                            error: false,
                            helperText: '',
                        }
                    }}
                    sx={{
                        height: '56px',
                        backgroundColor: COLORS.white,
                        width: "100%",
                        '& fieldset': {
                            borderRadius: BORDER.radius,
                            borderStyle: 'solid',
                            borderColor: COLORS.primary,
                            borderWidth: BORDER.weight,
                        },
                        '& .MuiSelect-select': {
                            padding: '10px 14px',
                            fontSize: '16px',
                            color: COLORS.primary,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.primary,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.primary,
                        },
                        '& .MuiSvgIcon-root': {
                            color: COLORS.primary,
                        },
                        '& label': {
                            color: COLORS.primary,
                            margin: 0,
                            '&:hover fieldset': {
                                borderColor: COLORS.white,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: COLORS.white,
                            },
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default DateTimeInput;