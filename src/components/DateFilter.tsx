import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {BORDER, COLORS} from "../constants/ui.ts";

interface DateFilterProps {
    width?: string;
    type: ['day', 'month', 'year'] | ['month', 'year'] | ['year'] | ['day', 'month'] | ['day'];
    label: string;
}

const DateFilter:React.FC<DateFilterProps> = ({ type, label, width}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{width: width || "100%",}}>
                <DatePicker label= {label}  views={type} sx={{
                    height: '55px',
                    backgroundColor: COLORS.white,
                    width: width || "100%",
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

export default DateFilter;