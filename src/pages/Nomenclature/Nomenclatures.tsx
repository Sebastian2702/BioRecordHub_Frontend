import {BORDER, COLORS} from "../../constants/ui.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewEntryButton from "../../components/NewEntryButton.tsx";
import {useState} from "react";
import InputTextField from "../../components/InputTextField.tsx";
import StyledButton from "../../components/StyledButton.tsx";
import SearchIcon from '@mui/icons-material/Search';


function Nomenclature() {
    const [species, setSpecies] = useState("");
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
            <Box
                position="relative"
                padding="0px 10px"
                height="60px"
                display="flex"
                alignItems="center"
                marginBottom="20px"
            >
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={COLORS.primary}
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        margin: 0,
                    }}
                >
                    Search for Nomenclature
                </Typography>
                <Box sx={{ marginLeft: 'auto', minWidth: '150px' }}>
                    <NewEntryButton
                        manualEntryLink="/nomenclature/new"
                        fileUploadLink="/nomenclature/new_file_upload"
                    />
                </Box>
            </Box>

            <Box sx={{padding:"0px 10px"}}>
                <Typography  align={"left"} variant={'h5'} fontWeight={'bold'} marginBottom={'10px'}>Species:</Typography>
                <Box sx={{display: 'flex', gap: 2, height:'55px', marginBottom: '20px'}}>
                    <InputTextField label={"Search for a species"} value={species} onChange={(e) => setSpecies(e.target.value)}/>
                    <StyledButton label={'Search'} color={'primary'} size={'large'} onClick={() => (console.log(species))} icon={<SearchIcon fontWeight={'bold'}/>}/>
                </Box>

            </Box>
        </Box>
    )
}

export default Nomenclature;