import {Box} from "@mui/material";
import {BORDER, COLORS, FONT_SIZES} from '../../constants/ui.ts';
import BackButton from "../../components/BackButton.tsx";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify";
import {SearchNomenclature} from "../../services/nomenclature/nomenclature.ts";
import DataTable from "../../components/DataTable.tsx";
import Typography from "@mui/material/Typography";
import NewEntryButton from "../../components/NewEntryButton.tsx";
import {formatLabel} from "../../utils/helperFunctions.ts";


function NomenclatureSearch() {
    const {field, value} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState<any[]>([]);
    const searchForm = {
        kingdom: '',
        phylum: '',
        subphylum: '',
        class: '',
        order: '',
        suborder: '',
        infraorder: '',
        superfamily: '',
        family: '',
        subfamily: '',
        tribe: '',
        genus: '',
        subgenus: '',
        species: '',
        subspecies: '',
        author: '',
    }

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

    const handleSearch = async () => {
        const updatedForm = { ...searchForm, [field as string]: value };
        const response = await SearchNomenclature(updatedForm, setError, setLoading)
        setData(response);
    }

    useEffect(() => {
        handleSearch();
    }, []);


    return (
        <Box sx={{
            width: '97%',
            height: 'calc(100vh - 150px)',
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            borderRadius: BORDER.radius,
            margin: 'auto',
            paddingTop: "20px",
            overflow: 'auto',
        }}>
            {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress/>
                    </Box>
                ):
                <Box>
                    <Box sx={{padding: "0px 10px", overflow:"auto", height: 'calc(100vh - 150px)'}}>
                        <Box
                            position="relative"
                            padding="0px 20px"
                            display="flex"
                            alignItems="center"
                            marginBottom="20px"
                        >
                            <Box sx={{ position: 'absolute', left: 0 }}>
                                <BackButton width="55px" />
                            </Box>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                color={COLORS.primary}
                                sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    margin: 0,
                                }}
                            >
                                Species where the {formatLabel(field)} is {value}
                            </Typography>
                            <Box sx={{ marginLeft: 'auto', minWidth: '150px' }}>
                                <NewEntryButton
                                    manualEntryLink="/nomenclature/new"
                                    fileUploadLink="/nomenclature/new_file_upload"
                                />
                            </Box>
                        </Box>
                        <DataTable
                            data={data}
                            columns={[
                                { id: 'species', label: 'Species' },
                                { id: 'author', label: 'Author' },
                                { id: 'genus', label: 'Genus' },
                                { id: 'family', label: 'Family' },
                                { id: 'order', label: 'Order' }
                            ]}
                            editButton={false}
                            viewButton={true}
                            viewLink={"/nomenclature/"}
                            deleteButton={false}
                            trashCanButton={true}
                            dataType={"nomenclature"}
                            setError={setError}
                        />
                    </Box>

                </Box>
            }
        </Box>
    )
}

export default NomenclatureSearch;