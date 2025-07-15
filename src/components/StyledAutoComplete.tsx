import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {BORDER, COLORS} from "../constants/ui.ts";
import Box from "@mui/material/Box";

interface StyledAutoCompleteProps {
    options: string[];
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<object>, value: string | null) => void;
}

const StyledAutoComplete: React.FC<StyledAutoCompleteProps> = ({ options, label, value, onChange }) => {
    return(
        <Box sx={{ width: '100%' }}>
            <Autocomplete
                options={options}
                value={value}
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
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
    )
}

export default StyledAutoComplete;