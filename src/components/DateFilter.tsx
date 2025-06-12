import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DateFilterProps {
    width?: string;
    type: ['day', 'month', 'year'] | ['month', 'year'] | ['year'] | ['day', 'month'] | ['day'];
    label: string;
}

const DateFilter:React.FC<DateFilterProps> = ({ type, label, width}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label= {label}  views={type} sx={{width:width || '100%'}} />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default DateFilter;