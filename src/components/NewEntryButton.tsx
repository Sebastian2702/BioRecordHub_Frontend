import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from "@mui/material/Box";
import { COLORS, BORDER } from '../constants/ui';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

interface NewEntryButtonProps {
    manualEntryLink: string;
    fileUploadLink: string;
}

const NewEntryButton: React.FC<NewEntryButtonProps> = ({ manualEntryLink, fileUploadLink }) => {
    return (
        <Box sx={{ paddingTop: "8px" }}>
            <FormControl variant="outlined" sx={{width: '100%'}}>
                <InputLabel id="dropdown-filter" sx={{ color: COLORS.white, fontSize: '16px', marginBottom: '8px', fontWeight: 'bold', alignItems: 'center' }}>
                    {'New Entry'}
                </InputLabel>
                <Select
                    value={''}
                    id="dropdown-filter"
                    displayEmpty
                    inputProps={{ 'aria-label': 'New Entry' }}
                    IconComponent={(props) => <AddIcon {...props} sx={{ color: COLORS.white }} />}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                width: '150px',
                                backgroundColor: COLORS.white,
                                borderRadius: `0 0 ${BORDER.radius} ${BORDER.radius}`,
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                border: `2px solid ${COLORS.primary}`,
                                borderTop: 'none',
                                mt: 0,
                            },
                        },
                    }}
                    sx={{
                        height: '55px',
                        backgroundColor: COLORS.primary,
                        borderRadius: BORDER.radius,
                        '&.Mui-focused': {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                        },
                        '&.Mui-expanded': {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                        },
                        '& fieldset': {
                            borderStyle: 'solid',
                            borderColor: COLORS.white,
                            borderWidth: BORDER.weight,
                        },
                        '& .MuiSelect-select': {
                            padding: '10px 14px',
                            fontSize: '16px',
                            color: COLORS.white,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.white,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.white,
                        },
                        '& .MuiSvgIcon-root': {
                            color: COLORS.white,
                        },
                    }}
                >
                    <MenuItem sx={{ justifyContent: 'center', borderBottom: `2px solid ${COLORS.primary}` }}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <SaveIcon sx={{color: COLORS.primary}} />
                            <a
                                href={manualEntryLink}
                                style={{
                                    textDecoration: 'none',
                                    color: COLORS.primary,
                                    fontWeight: 'bold',
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                            >
                                Manual Entry
                            </a>
                        </Box>
                    </MenuItem>
                    <MenuItem sx={{ justifyContent: 'center' }}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <FileUploadIcon sx={{color: COLORS.primary}}/>
                            <a
                                href={fileUploadLink}
                                style={{
                                    textDecoration: 'none',
                                    color: COLORS.primary,
                                    fontWeight: 'bold',
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                            >
                                File Upload
                            </a>
                        </Box>
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default NewEntryButton;