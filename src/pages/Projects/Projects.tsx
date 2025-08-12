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
import DropdownInput from "../../components/DropdownInput.tsx";
import { dropdownProjectOptions } from "../../constants/uiConstants.ts";
import { SelectChangeEvent } from '@mui/material/Select';
import { GetProject } from "../../services/project/project.ts";



function Projects() {
    const [data, setData] = useState<any[]>([]);
    const [dropdownValue, setDropdownValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleClearFilters = () => {
        setSearchValue('');
        setDropdownValue('');
    };

    const handleDropdownChange = (event: SelectChangeEvent) => {
        setDropdownValue(event.target.value);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetProject();
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
            item.advisor?.toLowerCase().includes(searchLower) ||
            item.department?.toLowerCase().includes(searchLower);

        const matchesType = dropdownValue
            ? item.research_type === dropdownValue
            : true;

        return matchesSearch && matchesType;
    });

    return(
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
                    <SearchFilter value={searchValue} onChange={handleSearchChange} label={"Search for title, advisor name or department name"}/>
                </Box>
                <Box sx={{ flex: 1, minWidth: '150px' }}>
                    <DropdownInput value={dropdownValue} options={dropdownProjectOptions} onChange={handleDropdownChange} label={"Research Type"} filter={true}/>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <ClearFiltersButton onClick={handleClearFilters} />
                </Box>
                <Box sx={{ flexShrink: 0, minWidth: '150px'}}>
                    <StyledButton label={'New Entry'} onClick={() => {navigate('/projects/new')}} color={'primary'} size={'medium'} icon={<AddIcon/>}/>
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
                            { id: 'title', label: 'Title' },
                            { id: 'research_type', label: 'Research Type' },
                            { id: 'advisor', label: 'Advisor(s)' },
                            { id: 'course', label: 'Course' },
                        ]}
                        editButton={false}
                        viewButton={true}
                        viewLink={"/projects/"}
                        deleteButton={false}
                        trashCanButton={true}
                        dataType={"projects"}
                        setError={setError}
                    />
                }
            </Box>

        </Box>
    )
}

export default Projects;
