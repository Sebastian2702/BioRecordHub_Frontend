import { COLORS } from '../constants/ui';
import InputTextField from "./InputTextField.tsx";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";

interface SearchFilterProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string;
}


const SearchFilter:React.FC<SearchFilterProps> = ({ value, onChange, label}) => {
    return (
        <Box sx={{ paddingTop: "8px", width: "100%"}}>
            <InputTextField label={label} value={value} onChange={onChange} password={false} width={ "100%" } startAdornment={<SearchIcon sx={{color: COLORS.primary}}/>}/>
        </Box>


    );
}

export default SearchFilter;
