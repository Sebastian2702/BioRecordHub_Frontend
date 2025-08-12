import { Box } from "@mui/material";
import { COLORS,BORDER } from '../../constants/ui.ts';
import SearchFilter from "../../components/SearchFilter.tsx";
import {useEffect, useState} from "react";
import ClearFiltersButton from "../../components/ClearFiltersButton.tsx";
import StyledButton from "../../components/StyledButton.tsx";
import DataTable from "../../components/DataTable.tsx";
import CircularProgress from '@mui/material/CircularProgress';
import {toast, ToastContainer} from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate} from "react-router-dom";
import { GetOccurrences } from "../../services/occurrences/occurrences.ts";
import DateInput from "../../components/DateInput.tsx";
import {Dayjs} from "dayjs";

function Occurrences() {
    const [data, setData] = useState<any[]>([]);
    const [dateInput, setDateInput] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

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
            const response = await GetOccurrences();
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
            item.scientific_name?.toLowerCase().includes(searchLower) ||
            item.locality?.toLowerCase().includes(searchLower);

        const matchesDate = dateInput
            ? item.event_date === dateInput.format('YYYY-MM-DD')
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
                    <SearchFilter value={searchValue} onChange={handleSearchChange} label={"Search for scientific name or locality"}/>
                </Box>
                <Box sx={{ flex: 1, minWidth: '160px'}}>
                    <DateInput label={"Event Date"} type={['day', 'month', 'year']} value={dateInput} onChange={(e)=>setDateInput(e)} />
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <ClearFiltersButton onClick={handleClearFilters} />
                </Box>
                <Box sx={{ flexShrink: 0, minWidth: '150px'}}>
                    <StyledButton label={'New Entry'} onClick={() => {navigate('/occurrences/new')}} color={'primary'} size={'medium'} icon={<AddIcon/>}/>
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
                            { id: 'scientific_name', label: 'Scientific Name' },
                            { id: 'event_date', label: 'Event Date' },
                            { id: 'locality', label: 'Locality' },
                        ]}
                        editButton={false}
                        viewButton={true}
                        viewLink={"/Occurrences/"}
                        deleteButton={false}
                        trashCanButton={true}
                        dataType={"occurrence"}
                        setError={setError}
                    />
                }
            </Box>
        </Box>
    )
}

export default Occurrences;
