import {formatLabel} from "../utils/helperFunctions.ts";
import FormField from "./FormField";
import {getHelperText} from "../utils/formFieldHelpers.ts";
import {dropdownFilterBibliographyOptions} from "../constants/uiConstants.ts";
import dayjs from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Switch from '@mui/material/Switch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {COLORS, FONT_SIZES} from "../constants/ui.ts";
dayjs.extend(customParseFormat);


interface ImportedDataEditorProps {
    value: string | Dayjs | boolean;
    onChange: (value: any) => void;
    fieldKey: string;
    dataType: 'bibliography' | 'nomenclature' | 'occurrence' | 'project';
}

const ImportedDataFormField: React.FC<ImportedDataEditorProps> = ({value, onChange, fieldKey, dataType}) => {
    if (fieldKey === "item_type") {
        return (
            <FormField
                key={fieldKey}
                label={formatLabel(fieldKey)}
                value={value}
                required={false}
                helperText={''}
                onChangeDropdown={(e: SelectChangeEvent<string>) => onChange(e.target.value)}
                dropdown={true}
                options={dropdownFilterBibliographyOptions}
            />
        );
    } else if (fieldKey === "date") {
        return (
            <FormField
                key={fieldKey}
                label={formatLabel(fieldKey)}
                value={value ? dayjs(value?.toString() ?? '', 'YYYY') : null}
                required={false}
                helperText={getHelperText(fieldKey, dataType)}
                onChangeDate={(date) => onChange(date?.toISOString() ?? "")}
                date={true}
                dateType={['year']}
            />
        );
    } else if (fieldKey === "publication_year") {
        return (
            <FormField
                key={fieldKey}
                label={formatLabel(fieldKey)}
                value={value ? dayjs(value?.toString() ?? '', 'YYYY') : null}
                required={false}
                helperText={getHelperText(fieldKey, dataType)}
                onChangeDate={(date) => onChange(date?.toISOString() ?? "")}
                date={true}
                dateType={['year']}
            />
        );
    } else if (fieldKey === "date_added" || fieldKey === "date_modified") {
        return (
            <FormField
                key={fieldKey}
                label={formatLabel(fieldKey)}
                value={value ? dayjs(value, ['DD/MM/YYYY HH:mm', dayjs.ISO_8601], true) : null}
                required={false}
                helperText={getHelperText(fieldKey, dataType)}
                onChangeDate={(date) => onChange(date?.toISOString() ?? "")}
                dateTime={true}
            />
        );
    } else if (fieldKey === "extra" || fieldKey === "notes") {
        return (
            <FormField
                key={fieldKey}
                label={formatLabel(fieldKey)}
                value={value}
                required={false}
                helperText={getHelperText(fieldKey, dataType)}
                onChange={(e) => onChange(e.target.value)}
                multiline={true}
            />
        )
    } else if (fieldKey === "verified") {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    width: 'fit-content',
                }}
            >
                <Typography
                    align="left"
                    sx={{
                        color: COLORS.primary,
                        fontSize: { xs: FONT_SIZES.xsmall, sm: FONT_SIZES.small, lg: FONT_SIZES.medium },
                        fontWeight: 'bold',
                        marginBottom: '8px',
                    }}
                >
                    {formatLabel(fieldKey)}:
                </Typography>
                <Switch
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    color="success"
                    sx={{
                        transform: 'scale(1.3)',
                    }}
                />
                {value && <CheckCircleIcon color="success" />}
            </Box>
        )
    }
    else {
        return (
            <FormField
                key={fieldKey}
                label={formatLabel(fieldKey)}
                value={value}
                required={false}
                helperText={getHelperText(fieldKey, dataType)}
                onChange={(e) => onChange(e.target.value)}
            />
        )
    }

};

export default ImportedDataFormField;