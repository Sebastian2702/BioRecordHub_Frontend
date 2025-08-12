import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {BORDER, COLORS, FONT_SIZES} from "../../constants/ui";
import { useEffect, useState } from "react";
import SearchFilter from "../../components/SearchFilter.tsx";
import DropdownInput from "../../components/DropdownInput.tsx";
import {dropdownFilterAdminUserOptions, dropdownFilterAdminMandatoryFieldsOptions, dropdownFilterAdminFiledStatusOptions} from "../../constants/uiConstants.ts";
import {SelectChangeEvent} from "@mui/material/Select";
import InfoIcon from '@mui/icons-material/Info';
import CustomDialog from "../../components/CustomDialog.tsx";
import DataTable from "../../components/DataTable.tsx";
import {GetUsers, GetOccurrenceFields, NewOccurrenceField} from "../../services/admin/admin.ts";
import {toast, ToastContainer} from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import StyledButton from "../../components/StyledButton.tsx";
import AddIcon from '@mui/icons-material/Add';
import {unformatLabel} from "../../utils/helperFunctions.ts";
import ClearFiltersButton from "../../components/ClearFiltersButton.tsx";

function AdminControlPanel() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userSearch, setUserSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [fildSearch, setFieldSearch] = useState('');
    const [mandatoryFilter, setMandatoryFilter] = useState<boolean>(null);
    const [activeFilter, setActiveFilter] = useState<boolean>(null);
    const [infoUsersDialogOpen, setInfoUsersDialogOpen] = useState(false);
    const [newOccurrenceFieldOpen, setNewOccurrenceFieldOpen] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>([]);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [occurrenceFields, setOccurrenceFields] = useState({
        name: '',
        label: '',
        type: '',
        group: '',
        is_required: false,
        is_active: false,
    });
    const handleEditOccurrenceFieldDialogClose = () => {
        setNewOccurrenceFieldOpen(false);
        setOccurrenceFields({
            name: '',
            label: '',
            type: '',
            group: '',
            is_required: false,
            is_active: false,
        });
    }

    const getUsers = async () => {
        try{
            setLoading(true);
            const response = await GetUsers();
            setUsers(response);
        }
        catch(error){
            console.error("Error fetching users:", error);
            setError("Failed to fetch users. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    }

    const getFields = async () => {
        try{
            setLoading(true);
            const response = await GetOccurrenceFields();
            setFields(response);
        }
        catch(error){
            console.error("Error fetching fields:", error);
            setError("Failed to fetch fields. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    }

    const handleUsersInfoDialogClose = () => {
        setInfoUsersDialogOpen(false);
    }

    const handleUsersInfoDialogOpen = () => {
        setInfoUsersDialogOpen(true);
    }

    const handleNewField = async () => {
        setDialogLoading(true);
        const formatedData = {
            ...occurrenceFields,
            name: unformatLabel(occurrenceFields.name),
        };
        try{
            await NewOccurrenceField(formatedData);
            window.location.reload();
        }
        catch (error) {
            console.error("Error creating new field:", error);
            setError("Failed to create new field. Please try again later.");
        }
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

    const infoUsersDialogContent = (
        <Box>
            <Typography variant="body1" gutterBottom>
                <strong style={{ color: COLORS.primary }}>User:</strong> Can create and view nomenclatures, bibliographies, occurrences, and projects.
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
                <strong style={{ color: COLORS.primary }}>Manager:</strong> Inherits all User permissions, and additionally can edit and delete data in all sections of the system.
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
                <strong style={{ color: COLORS.primary }}>Administrator:</strong> Inherits all Manager permissions, and can also manage user roles and customize the occurrence form fields.
            </Typography>

            <Typography variant="body2" sx={{ mt: 3, color: 'red', fontWeight: 'bold' }}>
                ⚠️ Once a user is assigned the Administrator role, this action cannot be undone. Use caution when changing a user's role to Admin.
            </Typography>
        </Box>
    );


    useEffect(() => {
        getUsers();
        getFields();
    }, []);

    useEffect(() => {
        if (error) {
            console.error(error);
            setError("");
        }
    }, [error]);

    const handleClearFiltersUsers = () => {
        setUserSearch('');
        setRoleFilter('');
    }

    const handleClearFiltersFields = () => {
        setFieldSearch('');
        setMandatoryFilter(null);
        setActiveFilter(null);
    }

    const filteredUsersData = users.filter(item => {
        const searchLower = userSearch.toLowerCase();
        const matchesSearch =
            item.name?.toLowerCase().includes(searchLower);

        const matchesType = roleFilter
            ? item.role === roleFilter
            : true;

        return matchesSearch && matchesType;
    });

    const filteredFields = fields.filter(item => {
        const searchLower = fildSearch.toLowerCase();
        const matchesSearch =
            item.name?.toLowerCase().includes(searchLower) ||
            item.label?.toLowerCase().includes(searchLower);

        const matchesMandatory = mandatoryFilter !== null
            ? item.is_required === mandatoryFilter
            : true;

        const matchesActive = activeFilter !== null
            ? item.is_active === activeFilter
            : true;

        return matchesSearch && matchesMandatory && matchesActive;
    });

    return(
        <Box sx={{
            height: 'calc(100vh - 150px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto',
            justifyContent: 'flex-start',
            gap: '1rem',
        }}>
            <ToastContainer />
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
                {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                            <CircularProgress/>
                        </Box>
                    ) :
                    <Box>
                        <Box
                            padding = '0px 20px'
                            display="flex"
                            justifyContent="space-between"
                        >
                            <CustomDialog open={infoUsersDialogOpen} onClose={handleUsersInfoDialogClose} title={"Roles"} content={"information"} contentText={infoUsersDialogContent}/>
                            <Typography
                                fontWeight="bold"
                                color={COLORS.primary}
                                align={'left'}
                                sx={{
                                    fontSize: {
                                        xs: FONT_SIZES.xsmall,
                                        sm: FONT_SIZES.xsmall,
                                        md: FONT_SIZES.small,
                                        lg: FONT_SIZES.medium,
                                    },
                                }}
                            >
                                BioRecord Users:
                            </Typography>
                            <Box display="flex" padding="0px 10px" gap={2} flexWrap="wrap">
                                <Box
                                    sx={{
                                        flex: 3,
                                        minWidth: {
                                            xs: '100%',
                                            sm: '300px',
                                            md: '400px',
                                        },
                                    }}
                                >
                                    <SearchFilter
                                        value={userSearch}
                                        onChange={(e) => setUserSearch(e.target.value)}
                                        label="Search for a user name"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        flex: 1,
                                        minWidth: {
                                            xs: '100%',
                                            sm: '200px',
                                            md: '250px',
                                        },
                                    }}
                                >
                                    <DropdownInput
                                        value={roleFilter}
                                        options={dropdownFilterAdminUserOptions}
                                        onChange={(e: SelectChangeEvent) => setRoleFilter(e.target.value)}
                                        label="Role"
                                        filter={true}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                        minWidth: {
                                            xs: '100%',
                                            sm: '50px',
                                            md: '50px',
                                        },
                                    }}
                                >
                                    <ClearFiltersButton onClick={handleClearFiltersUsers}/>
                                </Box>

                                <InfoIcon
                                    sx={{
                                        color: COLORS.primary,
                                        cursor: 'pointer',
                                        fontSize: '35px',
                                        marginTop: '15px',
                                    }}
                                    onClick={() => handleUsersInfoDialogOpen()}
                                />
                            </Box>


                        </Box>
                        <Box sx={{overflowY: 'auto', padding: '20px'}}>
                            <DataTable
                                data={filteredUsersData}
                                columns=
                                    {[
                                        { id: 'name', label: 'Name' },
                                        { id: 'email', label: 'Email' },
                                        { id: 'role', label: 'Role' },
                                    ]}
                                editButton={true}
                                viewButton={false}
                                deleteButton={true}
                                trashCanButton={false}
                                dataType={"users"}
                                setError={setError}
                                exportData={false}
                            />
                        </Box>

                    </Box>
                }
            </Box>
            <Box
                sx={{
                    width: '97%',
                    height: '100%',
                    backgroundColor: COLORS.white,
                    color: COLORS.primary,
                    borderRadius: BORDER.radius,
                    margin: 'auto',
                    padding: '20px 0px'

                }}
            >
                {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                            <CircularProgress/>
                        </Box>
                    ) :
                    <Box>
                        <Box
                            padding = '0px 20px'
                            display="flex"
                            justifyContent="space-between"
                        >
                            <CustomDialog
                                open={newOccurrenceFieldOpen}
                                onClose={handleEditOccurrenceFieldDialogClose}
                                title={"Edit Occurrence Field"}
                                content={'newField'}
                                contentText={<Typography variant="body1" marginBottom={'20px'}>The occurrence field:</Typography>}
                                occurrenceFields={occurrenceFields}
                                setOccurrenceFields={setOccurrenceFields}
                                dialogLoading={dialogLoading}
                                action={() => {
                                    handleNewField();
                                }}
                            />
                            <Typography
                                fontWeight="bold"
                                color={COLORS.primary}
                                align={'left'}
                                sx={{
                                    fontSize: {
                                        xs: FONT_SIZES.xsmall,
                                        sm: FONT_SIZES.xsmall,
                                        md: FONT_SIZES.small,
                                        lg: FONT_SIZES.medium,
                                    },
                                }}
                            >
                               Occurrence Form Fields:
                            </Typography>
                            <Box
                                display="flex"
                                padding="0px 10px"
                                gap={2}
                                flexWrap="wrap"
                                overflow="hidden"
                            >
                                <Box
                                    sx={{
                                        flex: 3,
                                        minWidth: {
                                            xs: '100%',
                                            sm: '200px',
                                            md: '300px',
                                        },
                                    }}
                                >
                                    <SearchFilter
                                        value={fildSearch}
                                        onChange={(e) => setFieldSearch(e.target.value)}
                                        label="Search for a field"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        flex: 1,
                                        minWidth: {
                                            xs: '100%',
                                            sm: '100px',
                                            md: '150px',
                                        },
                                    }}
                                >
                                    <DropdownInput
                                        value={mandatoryFilter}
                                        options={dropdownFilterAdminMandatoryFieldsOptions}
                                        onChange={(e: SelectChangeEvent) => setMandatoryFilter(e.target.value)}
                                        label="Rule"
                                        filter={true}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        flex: 1,
                                        minWidth: {
                                            xs: '100%',
                                            sm: '100px',
                                            md: '150px',
                                        },
                                    }}
                                >
                                    <DropdownInput
                                        value={activeFilter}
                                        options={dropdownFilterAdminFiledStatusOptions}
                                        onChange={(e: SelectChangeEvent) => setActiveFilter(e.target.value)}
                                        label="Status"
                                        filter={true}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                        minWidth: {
                                            xs: '100%',
                                            sm: '50px',
                                            md: '50px',
                                        },
                                    }}
                                >
                                    <ClearFiltersButton onClick={handleClearFiltersFields}/>
                                </Box>

                                <Box
                                    sx={{
                                        maxHeight: '55px',
                                        minWidth: {
                                            xs: '100%',
                                            sm: '100px',
                                        },
                                       marginTop:'10px',
                                    }}
                                >
                                    <StyledButton
                                        label="New Field"
                                        color="primary"
                                        size="medium"
                                        icon={<AddIcon />}
                                        onClick={() => setNewOccurrenceFieldOpen(true)}
                                    />
                                </Box>
                            </Box>

                        </Box>
                        <Box sx={{overflowY: 'auto', padding: '20px',}}>
                            <DataTable
                                data={filteredFields}
                                columns=
                                    {[
                                        { id: 'name', label: 'Name' },
                                        { id: 'label', label: 'Label' },
                                        { id: 'type', label: 'Type' },
                                        { id: 'group', label: 'Group' },
                                        { id: 'is_required', label: 'Required' },
                                        { id: 'is_active', label: 'Active' },
                                    ]}
                                editButton={true}
                                viewButton={false}
                                deleteButton={true}
                                trashCanButton={false}
                                dataType={"occurrenceFields"}
                                setError={setError}
                                exportData={false}
                            />
                        </Box>



                    </Box>
                }

            </Box>
        </Box>
    )
}


export default AdminControlPanel;