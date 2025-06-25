import React, {useState} from "react";
import {Box} from "@mui/material";
import StyledButton from "./StyledButton.tsx";
import {formatLabel} from "../utils/helperFunctions.ts";
import FormField from "./FormField";
import {getHelperText} from "../utils/formFieldHelpers.ts";
import {dropdownFilterOptions} from "../constants/uiConstants.ts";
import SaveIcon from '@mui/icons-material/Save';
import {CreateBibliographyWithFile} from "../services/bibliography/bibliography.ts";
import {useNavigate} from "react-router-dom";
import {COLORS} from "../constants/ui.ts";


interface ImportedDataEditorProps {
    importedEntries: Record<string, string>[];
    SetError: (error: string) => void,
    setLoading: (loading: boolean) => void,
    dataType: 'bibliography' | 'nomenclature' | 'occurence' | 'project';
}

const ImportedDataEditor: React.FC<ImportedDataEditorProps> = ({importedEntries,SetError, setLoading,dataType}) => {
    const [entries, setEntries] = useState(importedEntries);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const currentEntry = entries[currentIndex];


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
            console.log(entries)
            CreateBibliographyWithFile(entries, SetError, navigate, setLoading);
        }
    }

    return (
        <Box>
        <Box sx={{maxWidth: '70%', margin: "auto", mt: 4}}>
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2}}>
                {Object.keys(currentEntry).map((key) => (
                    <FormField
                        key={key}
                        label={formatLabel(key)}
                        helperText={key === 'item_type' ? ' ' : getHelperText(key) || ''}
                        value={currentEntry[key] ?? ""}
                        onChangeDropdown={key === 'item_type' ? (e) => handleFieldChange(key, e.target.value) : undefined}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        multiline={key === 'notes' || key === 'extra'}
                        dropdown={key === 'item_type'}
                        required={false}
                        options={dropdownFilterOptions}
                    />
                ))}

            </Box>

            <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                <StyledButton onClick={prev} disabled={currentIndex === 0} label={'Previous'} color={'secondary'}
                              size={'medium'}/>
                <StyledButton onClick={removeEntry} color="delete" label={'Remove This Entry'} size={'medium'}/>
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
