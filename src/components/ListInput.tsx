import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StyledButton from "./StyledButton.tsx";
import InputTextField from './InputTextField.tsx'
import { COLORS, FONT_SIZES } from '../constants/ui.ts'
import  { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ListInputValue from './ListInputValue';

interface ListInputProps {
    label: string;
    helperText: string;
    values: string[];
    onChange: (newValues: string[]) => void;
}

const ListInput: React.FC<ListInputProps> = ({ label, helperText, values, onChange }) => {
    const [value, setValue] = useState("");

    const handleAddItem = () => {
        if (value.trim() !== "") {
            onChange([...values, value.trim()]);
            setValue("");
        }
    }

    const handleRemoveItem = (itemToRemove: string) => {
        onChange(values.filter(item => item !== itemToRemove));
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <Box sx={{ margin: '0 10px' }}>
            <Typography
                align="left"
                sx={{
                    color: COLORS.primary,
                    fontSize: FONT_SIZES.medium,
                    fontWeight: 'bold',
                    marginBottom: '8px',
                }}
            >
                {label}:
            </Typography>
            <Box display="flex" gap={"20px"} height={"60px"} marginBottom={"20px"}>
                <InputTextField
                    label={helperText}
                    value={value}
                    onChange={handleOnChange}
                    fullWidth
                    required
                    fontSize={FONT_SIZES.medium}
                />
                <StyledButton
                    label="Add"
                    color="primary"
                    size="medium"
                    icon={<AddIcon sx={{ color: COLORS.white }} fontSize={"large"} />}
                    onClick={handleAddItem}
                />
            </Box>
            <Box>
                {values.length > 0 && (
                    <Box display="flex" gap="10px" sx={{ marginTop: '5px', flexWrap: 'wrap' }}>
                        {values.map((item, index) => (
                            <ListInputValue
                                key={index}
                                value={item}
                                onRemove={() => handleRemoveItem(item)}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ListInput;
