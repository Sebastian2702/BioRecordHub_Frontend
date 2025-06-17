import {Box} from "@mui/material";
import Typography from '@mui/material/Typography';
import {BORDER, COLORS, FONT_SIZES} from '../constants/ui';
import BackButton from "../components/BackButton.tsx";
import {GetBibliographyById} from "../services/bibliography/bibliography.ts";
import {useEffect, useState} from "react";
import {getLastPathSegment} from "../utils/helperFunctions.ts"
import CircularProgress from "@mui/material/CircularProgress";


function Bibliography() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const fetchData = async (id: number) => {
        try {
            setLoading(true);
            const response = await GetBibliographyById(id);
            setData(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(Number(getLastPathSegment()));
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

        }}
        >
            {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress/>
                    </Box>
                ) :
                <Box sx={{padding: "0px 10px"}}>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center', marginBottom: '20px', gap:'31vw'}}>
                        <BackButton width={"55px"}/>
                        <Typography sx={{fontWeight: "bold", fontSize: FONT_SIZES.xlarge, textShadow: "0px 4px 12px rgba(0,0,0,0.15)"}}>{data.key}</Typography>

                    </Box>


                </Box>

            }


        </Box>
    );
}

export default Bibliography;