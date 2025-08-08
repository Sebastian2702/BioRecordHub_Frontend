import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BORDER, COLORS } from "../constants/ui.ts";
import Box from "@mui/material/Box";

export interface Option {
    id: number | string;
    label: string;
}

interface OccurrencesFormAutoCompleteProps {
    options: Option[];
    label: string;
    value: number | null;
    onChange: (value: number | null) => void;
}

const OccurrencesFormAutoComplete: React.FC<OccurrencesFormAutoCompleteProps> = ({
                                                                               options,
                                                                               label,
                                                                               value,
                                                                               onChange
                                                                           }) => {

    const getValue = (id: number | null): Option | null => {
        if (id === null) return null;
        const option = options.find(option => option.id === id);
        return option || null;
    }

    return (
        <Box sx={{ width: '100%', marginBottom: '20px' }}>
            <Autocomplete
                options={options}
                value={getValue(value)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, val) => option.id === val?.id}
                onChange={(_, selectedValue) => onChange(selectedValue?.id ?? null)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label= {label}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: BORDER.radius,
                                backgroundColor: COLORS.white,
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
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
};

export default OccurrencesFormAutoComplete;
