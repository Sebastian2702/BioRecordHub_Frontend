import {BORDER, COLORS} from '../constants/ui';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from "@mui/material/Box";


interface DropdownFilterProps {
    options: { display: string; value: string }[];
    value?: string;
    onChange?: (event: SelectChangeEvent<string>) => void;
    label?: string
    required?: boolean
    filter?: boolean
}

const DropdownInput: React.FC<DropdownFilterProps> = ({options, value, onChange, label, required, filter}) => {
    return (
        <Box sx={{paddingTop: "8px"}}>
            <FormControl variant="outlined" sx={{width: '100%'}}>
                <InputLabel id="dropdown-filter" sx={{color: COLORS.primary, fontSize: '16px', marginBottom: '8px'}}>
                    {label || ''}
                </InputLabel>
                <Select
                    value={value || ''}
                    id="dropdown-filter"
                    onChange={onChange}
                    displayEmpty
                    inputProps={{'aria-label': label || 'Dropdown Filter'}}
                    required={required || false}
                    sx={{
                        height: '55px',
                        backgroundColor: COLORS.white,
                        borderRadius: BORDER.radius,
                        '& fieldset': {
                            borderStyle: 'solid',
                            borderColor: COLORS.primary,
                            borderWidth: BORDER.weight,
                        },
                        '& .MuiSelect-select': {
                            padding: '10px 14px',
                            fontSize: '16px',
                            color: filter ? COLORS.primary : COLORS.black,
                        },
                        '& .MuiInputBase-root': {
                            textAlign: filter ? 'left' : 'center',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.primary,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.primary,
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.display}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>

    );
};

export default DropdownInput;