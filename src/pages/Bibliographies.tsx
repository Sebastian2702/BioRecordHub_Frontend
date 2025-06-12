import Button from "@mui/material/Button";
import {GetBibliographyById} from "../services/bibliography/bibliography.ts";
import {GetBibliography} from '../services/bibliography/bibliography.ts';
import { Box } from "@mui/material";
import { COLORS,BORDER } from '../constants/ui';
import SearchFilter from "../components/SearchFilter.tsx";
import DropdownFilter from "../components/DropdownFilter";
import { useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';


function Bibliographies(){
    const [searchValue, setSearchValue] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    const handleDropdownChange = (event: SelectChangeEvent) => {
        setDropdownValue(event.target.value);
    };
    const DropdownFilterOptions: { display: string; value: string }[] = [
         { display: "Journal Article", value: "journal_article" },
         { display: "Book", value: "book" },
         { display: "Conference Paper", value: "conference_paper" },
         { display: "Thesis", value: "thesis" },
         { display: "Report", value: "report" },
     ];

    /*const handleGetBibliography = async () => {
        console.log('Get Bibliography');
        try {
            const data = await GetBibliography();
            console.log(data);
        } catch (error) {
            console.error("Error fetching bibliography:", error);
        }
    }

    const handleGetBibliographyById = async (id: number) => {
        console.log('Get Bibliography By Id');
        try {
            const data = await GetBibliographyById(id);
            console.log(data);
        } catch (error) {
            console.error("Error fetching bibliography by ID:", error);
        }
    }*/
    return (
        <Box sx={{
            width: '97%',
            height: 'calc(100vh - 140px)',
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            borderRadius: BORDER.radius,
            margin: 'auto',
            paddingTop: "20px"
        }}>
            <Box display="flex" justifyContent="space-evenly">
                <SearchFilter value={searchValue} onChange={handleSearchChange} width={"500px"}/>
                <DropdownFilter value={dropdownValue} options={DropdownFilterOptions} onChange={handleDropdownChange} label={"Type"} width={"118px"}/>



            </Box>

        </Box>
    );
}
export default Bibliographies;