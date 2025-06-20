import {GetBibliography} from '../services/bibliography/bibliography.ts';
import { Box } from "@mui/material";
import { COLORS,BORDER } from '../constants/ui';
import SearchFilter from "../components/SearchFilter.tsx";
import DropdownInput from "../components/DropdownInput.tsx";
import {useEffect, useState} from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import DateInput from "../components/DateInput.tsx";
import RefreshButton from "../components/RefreshButton.tsx";
import NewEntryButton from "../components/NewEntryButton.tsx";
import DataTable from "../components/DataTable";
import CircularProgress from '@mui/material/CircularProgress';
import { Dayjs } from 'dayjs';


function Bibliographies(){
    const [searchValue, setSearchValue] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');
    const [dateInput, setDateInput] = useState<Dayjs | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

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


    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetBibliography();
            setData(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);



    return (
        <Box sx={{
            width: '97%',
            height: 'calc(100vh - 150px)',
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            borderRadius: BORDER.radius,
            margin: 'auto',
            paddingTop: "20px"
        }}>
            <Box display="flex" padding={"0px 10px"} gap={2} flexWrap="wrap">
                <Box sx={{ flex: 2, minWidth: '200px' }}>
                    <SearchFilter value={searchValue} onChange={handleSearchChange} />
                </Box>
                <Box sx={{ flex: 1, minWidth: '150px' }}>
                    <DropdownInput value={dropdownValue} options={DropdownFilterOptions} onChange={handleDropdownChange} label={"Type"} filter={true}/>
                </Box>
                <Box sx={{ flex: 1, minWidth: '160px'}}>
                    <DateInput label={"Year"} type={["year"]} value={dateInput} onChange={(e)=>setDateInput(e.target.value)} />
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <RefreshButton onClick={handleRefresh} />
                </Box>
                <Box sx={{ flexShrink: 0, minWidth: '150px' }}>
                    <NewEntryButton manualEntryLink={"/bibliography/new"} fileUploadLink={"/bibliography/new_file_upload"} />
                </Box>
            </Box>
            <Box sx={{padding: '0px 10px', overflowY: 'auto'}}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress />
                    </Box>
                ):
                    <DataTable
                        data={data}
                        columns={[
                            { id: 'key', label: 'Key' },
                            { id: 'item_type', label: 'Item Type' },
                            { id: 'title', label: 'Title' },
                            { id: 'author', label: 'Author' },
                            { id: 'publication_year', label: 'Publication Year' }
                        ]}
                        editButton={false}
                        viewButton={true}
                        viewLink={"/bibliography/"}
                        deleteButton={false}
                        trashCanButton={true}
                        dataType={"bibliography"}
                        handleRefresh={handleRefresh}
                    />
                }
            </Box>

        </Box>
    );
}
export default Bibliographies;