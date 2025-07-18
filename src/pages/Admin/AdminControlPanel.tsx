import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {BORDER, COLORS, FONT_SIZES} from "../../constants/ui";
import { useEffect, useState } from "react";
import SearchFilter from "../../components/SearchFilter.tsx";
import DropdownInput from "../../components/DropdownInput.tsx";
import {dropdownFilterAdminUserOptions} from "../../constants/uiConstants.ts";
import {SelectChangeEvent} from "@mui/material/Select";
import InfoIcon from '@mui/icons-material/Info';
import CustomDialog from "../../components/CustomDialog.tsx";

function AdminControlPanel() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userSearch, setUserSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [fildSearch, setFieldSearch] = useState('');
    const [mandatoryFilter, setMandatoryFilter] = useState('');
    const [activeFilter, setActiveFilter] = useState('');
    const [infoUsersDialogOpen, setInfoUsersDialogOpen] = useState(false);

    const handleUsersInfoDialogClose = () => {
        setInfoUsersDialogOpen(false);
    }

    const handleUsersInfoDialogOpen = () => {
        setInfoUsersDialogOpen(true);
    }

    const infoUsersDialogContent = (
        <Box>
            <Typography variant="body1" gutterBottom>
              <strong style={{ color: COLORS.primary }}>Biologist:</strong> Can create and edit nomenclatures, bibliographies, and projects.
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
                <strong style={{ color: COLORS.primary }}>Manager:</strong> Has all the permissions of a Biologist, plus the ability to delete data in all sections.
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
                <strong style={{ color: COLORS.primary }}>Administrator:</strong> Has all the permissions of an Manager, plus the ability to manage user roles and manage occurrence form fields.
            </Typography>

        </Box>
    );

    return(
        <Box sx={{
            height: 'calc(100vh - 150px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',

        }}>
            <Box
                sx={{
                    width: '97%',
                    height: '100%',
                    backgroundColor: COLORS.white,
                    color: COLORS.primary,
                    borderRadius: BORDER.radius,
                    margin: 'auto',
                    paddingTop: "20px",
                }}
            >
                <Box
                    padding = '0px 20px'
                    display="flex"
                    justifyContent="space-between"
                >
                    <CustomDialog open={infoUsersDialogOpen} onClose={handleUsersInfoDialogClose} title={"Permissions"} content={"information"} contentText={infoUsersDialogContent}/>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color={COLORS.primary}
                        align={'left'}
                    >
                        BioRecord Users:
                    </Typography>
                    <Box display="flex" padding={"0px 10px"} gap={2} flexWrap="wrap">
                        <Box sx={{ flex: 3, minWidth: '500px' }}>
                            <SearchFilter value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
                        </Box>
                        <Box sx={{ flex:1, minWidth: '150px' }}>
                            <DropdownInput value={roleFilter} options={dropdownFilterAdminUserOptions} onChange={(e:SelectChangeEvent) => setRoleFilter(e.target.value)} label={"Type"} filter={true}/>
                        </Box>
                        <InfoIcon sx={{color: COLORS.primary, cursor: "pointer", fontSize: "35px", marginTop:'15px'}} onClick={() => handleUsersInfoDialogOpen()}/>
                    </Box>

                </Box>

            </Box>
            <Box
                sx={{
                    width: '97%',
                    height: '100%',
                    backgroundColor: COLORS.white,
                    color: COLORS.primary,
                    borderRadius: BORDER.radius,
                    margin: 'auto',
                    paddingTop: "20px",
                }}
            >

            </Box>
        </Box>
    )
}

export default AdminControlPanel;