import React, {useState} from "react";
import {Box} from "@mui/material";
import StyledButton from "./StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import {CreateBibliographyFromExcel} from "../services/bibliography/bibliography.ts";
import {CreateNomenclatureFromExcel} from "../services/nomenclature/nomenclature.ts";
import {useNavigate} from "react-router-dom";
import {COLORS} from "../constants/ui.ts";
import ImportedDataFormField from "./ImportedDataFormField.tsx";
import CustomDialog from "./CustomDialog.tsx";
import Typography from "@mui/material/Typography";
import {formatLabel, normalizeEntryDates} from "../utils/helperFunctions.ts"
import {getHelperText} from "../utils/formFieldHelpers.ts";
import FormField from "./FormField.tsx";
import DropdownSelector from "./DropdownSelector.tsx";


interface ImportedDataEditorProps {
    importedEntries: Record<string, string>[];
    SetError: (error: string) => void,
    setLoading: (loading: boolean) => void,
    dataType: 'bibliography' | 'nomenclature' | 'occurence' | 'project';
    bibliographies?: string[];
}

const ImportedDataEditor: React.FC<ImportedDataEditorProps> = ({importedEntries,SetError, setLoading,dataType, bibliographies}) => {
    const [entries, setEntries] = useState(importedEntries);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const requiredFields = [
        'kingdom',
        'phylum',
        'subphylum',
        'class',
        'order',
        'suborder',
        'infraorder',
        'superfamily',
        'family',
        'author',
    ];

    const getRequiredFields = (field:string) => {
        if(requiredFields.includes(field)) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const currentEntry = entries[currentIndex];

    const handleBiliographyChange = (newIds: number[]) => {
        const updated = [...entries];
        console.log(updated[currentIndex])
        updated[currentIndex] = {
            ...updated[currentIndex],
            bibliography_ids: newIds,
        };
        console.log(updated[currentIndex])
        setEntries(updated);
    }


    const handleFieldChange = (field: keyof typeof currentEntry, value: string) => {
        const updated = [...entries];
        updated[currentIndex] = {
            ...updated[currentIndex],
            [field]: value,
        };
        setEntries(updated);
    };

    const removeEntry = () => {
        const updated = [...entries];
        updated.splice(currentIndex, 1);

        const newIndex = Math.min(currentIndex, updated.length - 1);
        setEntries(updated);
        setCurrentIndex(newIndex);
        handleDeleteDialogClose();
    };

    const next = () => {
        if (currentIndex < entries.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const prev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };


    if (!Array.isArray(entries) || entries.length === 0) {
        return <p>No entries to review.</p>;
    }

    const handleSave = () => {
        if (!entries || entries.length === 0) {
            SetError("No data to save. Please upload a valid file.");
            return;
        }

        if(dataType === "bibliography") {
            const cleanedEntries = normalizeEntryDates(entries);
            CreateBibliographyFromExcel(cleanedEntries, SetError, navigate, setLoading);
        }
        if(dataType === "nomenclature") {
            const invalidEntries = entries.filter(entry => !entry.bibliography_ids || entry.bibliography_ids.length === 0);

            if (invalidEntries.length > 0) {
                SetError("Each nomenclature entry must have at least one associated bibliography.");
                return;
            }

            const nomenclatures = {
                nomenclatures: entries
            };

            console.log(nomenclatures);
            CreateNomenclatureFromExcel(nomenclatures, SetError, setLoading, navigate);
            return;
        }
    }

    const deleteDialogContent = (
        <Box>
            <Typography variant="body1">
                Are you sure you want to delete this entry?
            </Typography>
        </Box>
    )

    return (
        <Box>
            <CustomDialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} title={"Confirm Deletion"} content={"delete"} contentText={deleteDialogContent} action={removeEntry}/>
        <Box sx={{maxWidth: '70%', margin: "auto", mt: 4}}>
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2}}>
                {Object.keys(currentEntry ?? {}).map((key) => {
                    if (dataType === 'bibliography') {
                        return (
                            <ImportedDataFormField
                                key={key}
                                fieldKey={key}
                                value={currentEntry?.[key] ?? ""}
                                dataType={dataType}
                                onChange={(val) => {
                                    handleFieldChange(
                                        key,
                                        typeof val === 'string' ? val : val?.toString() ?? ""
                                    );
                                }}
                            />
                        );
                    }

                    if (dataType === 'nomenclature') {
                        const isDropdown = key === 'bibliography_ids';
                        return (
                            <Box key={key} sx={isDropdown ? { gridColumn: '1 / -1' } : {}}>
                                {isDropdown ? (
                                    <DropdownSelector
                                        data={bibliographies}
                                        selectedIds={currentEntry[key] ?? ""}
                                        onChange={handleBiliographyChange}
                                        dataType="bibliography"
                                    />
                                ) : (
                                    <FormField
                                        label={formatLabel(key)}
                                        helperText={getHelperText(key, "nomenclature") || ''}
                                        value={currentEntry[key as keyof typeof currentEntry] || ''}
                                        onChange={(val) => {
                                            handleFieldChange(
                                                key,
                                                typeof val === 'string' ? val : val?.toString() ?? ""
                                            );
                                        }}
                                        required={getRequiredFields(key)}
                                        multiline={key === 'remarks'}
                                    />
                                )}
                            </Box>
                        );
                    }

                    return null;
                })}


            </Box>

            <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                <StyledButton onClick={prev} disabled={currentIndex === 0} label={'Previous'} color={'secondary'}
                              size={'medium'}/>
                <StyledButton onClick={handleDeleteDialogOpen} color="delete" label={'Remove This Entry'} size={'medium'}/>
                <StyledButton onClick={next} disabled={currentIndex === entries.length - 1} label={'Next'}
                              color={'primary'} size={'medium'}/>
            </Box>

            <Box sx={{textAlign: "center", mt: 2}}>
                <small>
                    Entry {currentIndex + 1} of {entries.length}
                </small>
            </Box>
        </Box>
        <Box marginTop={"20px"} display={"flex"} justifyContent={"flex-end"} height={"60px"} padding={"20px 20px"} paddingTop={'0px'}>
            <StyledButton label={"Save"} color={"primary"} size={"large"} onClick={handleSave} icon={<SaveIcon sx={{color: COLORS.white}} fontSize={"large"} />}/>
        </Box>
        </Box>
    );
};

export default ImportedDataEditor;
