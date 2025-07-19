import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StyledButton from "./StyledButton.tsx";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useAuth } from "../context/AuthContext.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import { COLORS } from '../constants/ui.ts';
import {formatLabel, truncateString} from "../utils/helperFunctions.ts";
import { handleDeleteData, handleEditData } from '../services/deleteData.ts';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CustomDialog from "./CustomDialog.tsx";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


interface DataTableProps {
    data: any[];
    columns: { id: string; label: string }[];
    editButton: boolean;
    viewButton: boolean;
    deleteButton: boolean;
    trashCanButton: boolean;
    viewLink?: string;
    dataType: string;
    referenceId?: number;
    setError: (msg: string) => void
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, editButton, viewButton, viewLink, deleteButton, trashCanButton, dataType, referenceId, setError }) => {
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const { isAdmin, isManager } = useAuth();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
    const [deleteTitle, setDeleteTitle] = useState("");
    const [editName, setEditName] = useState("");
    const [deleteId, setDeleteId] = useState<number>(0);
    const [editId, setEditId] = useState<number>(0);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [editRoleField, setEditRoleField] = useState("");
    const [occurrenceFields, setOccurrenceFields] = useState({
        name: '',
        label: '',
        type: '',
        group: '',
        is_required: false,
        is_active: false,
    });

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleRoleEditDialogClose = () => {
        setEditRoleDialogOpen(false);
    }

    const handleDeleteDialogOpen = (id:number, title:string) => {
        setDeleteId(id);
        setDeleteTitle(title);
        setDeleteDialogOpen(true);
    };

    const handleRoleEditDialogOpen = (id:number, title:string) => {
        setEditId(id);
        setEditName(title);
        setEditRoleDialogOpen(true);
    };

    const handleEdit = async (id:number, type:string) => {
       if (dataType === "users") {
            try{
                setDialogLoading(true);
                const data = {
                    role: editRoleField,
                }
                console.log(data);
                await handleEditData(id, type, data);
                window.location.reload();
            }
            catch(err){
                const msg = err.response.data.message;
                const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
                setDialogLoading(false);
                setEditRoleDialogOpen(false);
                setError(cutmsg);
                handleRoleEditDialogClose();
                return;
            }
        }
    }


    const getDialogContent = (row:any) => {
        if (dataType === "bibliography" || dataType === "nomenclatureBibliography") {
            return row.title
        }
        if (dataType === "bibliographyNomenclature" || dataType === "nomenclature") {
            return row.species
        }
        if (dataType === "users") {
            return row.name;
        }
        else {
            return "this entry";
        }
    }

    const handleDelete = async  (id:number, type:string) => {
        setLoadingId(id);
        try {
            if(referenceId != null){
                try{
                    setDialogLoading(true);
                    setDeleteDialogOpen(true);
                    await handleDeleteData(id, type, referenceId);
                    window.location.reload();
                }
                catch (error) {
                    const msg = error.response.data.message;
                    const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
                    setDialogLoading(false);
                    setDeleteDialogOpen(false);
                    setError(cutmsg)
                    handleDeleteDialogClose();
                    return;
                }

            }
            else {
                try{
                    setDialogLoading(true);
                    setDeleteDialogOpen(true);
                    await handleDeleteData(id, type);
                    if (type === "nomenclature"){
                        window.location.href = "/nomenclature";
                    }
                    else {
                        window.location.reload();
                    }
                }
                catch (error) {
                    const msg = error.response.data.message;
                    const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
                    setDialogLoading(false);
                    setDeleteDialogOpen(false);
                    setError(cutmsg)
                    handleDeleteDialogClose();
                    return;
                }

            }


        } finally {
            setLoadingId(null);
        }
    }

    const deleteDialogContent = (
        <Box>
            <Typography variant="body1">
                Are you sure you want to delete <strong>"{deleteTitle}"</strong>?
            </Typography>
        </Box>
    )

    return (
        <Box>
            <CustomDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                title="Confirm Deletion"
                contentText={deleteDialogContent}
                content={"delete"}
                dialogLoading={dialogLoading}
                action={() => {
                    handleDelete(deleteId, dataType);
                }}
            />
            <CustomDialog
                open={editRoleDialogOpen}
                onClose={handleRoleEditDialogClose}
                title= {`Change the ${editName} role`}
                contentText={<Typography variant="body1">The roles available:</Typography>}
                editField={editRoleField}
                setEditField={setEditRoleField}
                content={"editUserRole"}
                dialogLoading={dialogLoading}
                action={() => {
                    handleEdit(editId, dataType);
                }}
            />

            <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 250px)' }}>
                <Table stickyHeader>
                    <TableHead sx={{width:'100%'}}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} sx={{ fontWeight: 'bold', color: COLORS.primary, borderBottom: `2px solid ${COLORS.primary}`  }} align={'center'}>
                                    {column.label}
                                </TableCell>
                            ))}
                            {editButton && (
                                <TableCell sx={{ borderBottom: `2px solid ${COLORS.primary}` }} />
                            )}
                            {viewButton && (
                                <TableCell sx={{ borderBottom: `2px solid ${COLORS.primary}` }} />
                            )}
                            {(deleteButton || (trashCanButton && (isAdmin || isManager))) && (
                                <TableCell sx={{ borderBottom: `2px solid ${COLORS.primary}` }} />
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) =>  (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}
                                    >
                                        {typeof row[column.id] === 'boolean' ? (
                                            row[column.id] ? <CheckIcon sx={{ color: 'green', fontWeight:'bold' }} /> : <ClearIcon sx={{ color: 'red', fontWeight:'bold' }} />
                                        ) : (
                                            formatLabel(truncateString(row[column.id], 30))
                                        )}
                                    </TableCell>
                                ))}
                                {editButton &&
                                    <TableCell align={'center'} sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}>
                                        <StyledButton
                                            label={"Edit"}
                                            color={"edit"}
                                            size={"small"}
                                            onClick= {() => handleRoleEditDialogOpen(row.id, row.name)}
                                            icon={<ModeEditIcon/>}
                                        />
                                    </TableCell>
                                }
                                {viewButton &&
                                    <TableCell align={'center'} sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}>
                                        <StyledButton
                                            label={"View"}
                                            color={"primary"}
                                            size={"small"}
                                            onClick={() => window.location.href = viewLink + row.id}
                                        />
                                    </TableCell>
                                }
                                {trashCanButton && (isAdmin || isManager) &&
                                    <TableCell align={'center'} sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}>
                                        {loadingId === row.id ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            <DeleteIcon
                                                sx={{ color: COLORS.delete, cursor: "pointer" }}
                                                onClick={() => handleDeleteDialogOpen(row.id, getDialogContent(row))}
                                                fontSize={"medium"}
                                            />
                                        )}
                                    </TableCell>
                                }
                                {deleteButton && (isAdmin || isManager) &&
                                    <TableCell align={'center'} sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}>
                                        <StyledButton
                                            label={"Delete"}
                                            color={"delete"}
                                            size={"small"}
                                            onClick={() => handleDeleteDialogOpen(row.id, getDialogContent(row))}
                                            icon={loadingId === row.id ? <CircularProgress size={16} /> : <DeleteIcon />}
                                            disabled={loadingId === row.id}
                                        />
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
};

export default DataTable;