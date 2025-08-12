import {GetBibliography} from '../../services/bibliography/bibliography.ts';
import { Box } from "@mui/material";
import { COLORS,BORDER } from '../../constants/ui.ts';
import SearchFilter from "../../components/SearchFilter.tsx";
import {useEffect, useState} from "react";
import DateInput from "../../components/DateInput.tsx";
import ClearFiltersButton from "../../components/ClearFiltersButton.tsx";
import NewEntryButton from "../../components/NewEntryButton.tsx";
import DataTable from "../../components/DataTable.tsx";
import CircularProgress from '@mui/material/CircularProgress';
import { Dayjs } from 'dayjs';
import {toast, ToastContainer} from "react-toastify";


function Bibliographies(){
    const [searchValue, setSearchValue] = useState('');
    const [dateInput, setDateInput] = useState<Dayjs | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleClearFilters = () => {
        setSearchValue('');
        setDateInput(null);
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
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError("");
        }
    }, [error]);

    const filteredData = data.filter(item => {
        const searchLower = searchValue.toLowerCase();
        const matchesSearch =
            item.title?.toLowerCase().includes(searchLower) ||
            item.author?.toLowerCase().includes(searchLower) ||
            item.publication_title?.toLowerCase().includes(searchLower);

        const matchesDate = dateInput
            ? item.publication_year === dateInput.year()
            : true;

        return matchesSearch && matchesDate;
    });

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
            <ToastContainer />
            <Box display="flex" padding={"0px 10px"} gap={2} flexWrap="wrap">
                <Box sx={{ flex: 2, minWidth: '200px' }}>
                    <SearchFilter value={searchValue} onChange={handleSearchChange} label={"Search for title, author and publication"}/>
                </Box>
                <Box sx={{ flex: 1, minWidth: '160px'}}>
                    <DateInput label={"Year"} type={["year"]} value={dateInput} onChange={(e)=>setDateInput(e)} />
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <ClearFiltersButton onClick={handleClearFilters} />
                </Box>
                <Box sx={{ flexShrink: 0, minWidth: '150px' }}>
                    <NewEntryButton manualEntryLink={"/bibliography/new"} fileUploadLink={"/bibliography/new_file_upload"} />
                </Box>
            </Box>
            <Box sx={{padding: '0px 10px', overflowY: 'hidden',}}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress />
                    </Box>
                ):
                    <DataTable
                        data={filteredData}
                        columns={[
                            { id: 'author', label: 'Author' },
                            { id: 'publication_year', label: 'Publication Year' },
                            { id: 'title', label: 'Title' },
                            { id: 'publication_title', label: 'Publication' },
                        ]}
                        editButton={false}
                        viewButton={true}
                        viewLink={"/bibliography/"}
                        deleteButton={false}
                        trashCanButton={true}
                        dataType={"bibliography"}
                        setError={setError}
                    />
                }
            </Box>

        </Box>
    );
}
export default Bibliographies;