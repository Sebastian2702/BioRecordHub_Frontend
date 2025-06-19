import { COLORS } from '../constants/ui';
import InputTextField from "./InputTextField.tsx";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";

interface SearchFilterProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
}


const SearchFilter:React.FC<SearchFilterProps> = ({ value, onChange, width}) => {
    return (
        <Box sx={{ paddingTop: "8px", width: width || "100%"}}>
            <InputTextField label={"Search for key, title and author"} value={value} onChange={onChange} password={false} width={ width || "100%" } startAdornment={<SearchIcon sx={{color: COLORS.primary}}/>}/>
        </Box>


    );
}

export default SearchFilter;
