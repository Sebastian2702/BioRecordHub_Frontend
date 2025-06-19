import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {BORDER, COLORS} from "../constants/ui.ts";
import dayjs from 'dayjs';

interface DateFilterProps {
    type: ['day', 'month', 'year'] | ['month', 'year'] | ['year'] | ['day', 'month'] | ['day'];
    label: string;
    value: dayjs.Dayjs | null;
    onChange?: (date: any) => void;
}

const DateInput:React.FC<DateFilterProps> = ({ type, label, value, onChange}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{width: "100%",height: "100%"}}>
                <DatePicker label= {label}  views={type} value={value} onChange={onChange} sx={{
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
                }} />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default DateInput;