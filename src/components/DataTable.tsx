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
import {truncateString} from "../utils/helperFunctions.ts";
import { handleDeleteData } from '../services/deleteData.ts';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


interface DataTableProps {
    data: any[];
    columns: { id: string; label: string }[];
    editButton: boolean;
    viewButton: boolean;
    deleteButton: boolean;
    trashCanButton: boolean;
    viewLink?: string;
    dataType: string;
    handleRefresh?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, editButton, viewButton, viewLink, deleteButton, trashCanButton, dataType, handleRefresh }) => {
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const { isAdmin } = useAuth();

    const handleEdit = (id:number, type:string) => {
        console.log("Edit function called for ID: " +  id  + " Type: " + type);
    }

    const handleDelete = async  (id:number, type:string) => {
        setLoadingId(id);
        try {
            await handleDeleteData(id, type);
            handleRefresh?.();
        } finally {
            setLoadingId(null);
        }
    }



    return (
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)' }}>
            <Table stickyHeader>
                <TableHead sx={{width:'100%'}}>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id} sx={{ fontWeight: 'bold', color: COLORS.primary, borderBottom: `2px solid ${COLORS.primary}`  }} align={'center'}>
                                {column.label}
                            </TableCell>
                        ))}
                        {editButton &&
                            <TableCell sx={{ fontWeight: 'bold', color: COLORS.primary, borderBottom: `2px solid ${COLORS.primary}` }} align={'center'}>
                            </TableCell>
                        }
                        {viewButton &&
                            <TableCell sx={{ fontWeight: 'bold', color: COLORS.primary, borderBottom: `2px solid ${COLORS.primary}` }} align={'center'}>
                            </TableCell>
                        }
                        { deleteButton || trashCanButton && isAdmin &&
                            <TableCell sx={{ fontWeight: 'bold', color: COLORS.primary, borderBottom: `2px solid ${COLORS.primary}` }} align={'center'}>
                            </TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={'center'} sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}>
                                    {truncateString(row[column.id], 30)}
                                </TableCell>
                            ))}
                            {editButton &&
                                <TableCell align={'center'} sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}>
                                    <StyledButton
                                        label={"Edit"}
                                        color={"edit"}
                                        size={"small"}
                                        onClick= {() => handleEdit(row.id, dataType)}
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
                                        onClick={() => window.location.href = viewLink + `/${row.id}}`}
                                    />
                                </TableCell>
                            }
                            {trashCanButton && isAdmin &&
                                <TableCell align={'center'} sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}>
                                    {loadingId === row.id ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <DeleteIcon
                                            sx={{ color: COLORS.delete, cursor: "pointer" }}
                                            onClick={() => handleDelete(row.id, dataType)}
                                            fontSize={"medium"}
                                        />
                                    )}
                                </TableCell>
                            }
                            {deleteButton && isAdmin &&
                                <TableCell align={'center'} sx={{ fontWeight: 'bold', borderBottom: `2px solid ${COLORS.primary}` }}>
                                    <StyledButton
                                        label={"Delete"}
                                        color={"delete"}
                                        size={"small"}
                                        onClick={() => handleDelete(row.id, dataType)}
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
    );
};

export default DataTable;