import {formatLabel} from "../utils/helperFunctions.ts";
import FormField from "./FormField";
import {getHelperText} from "../utils/formFieldHelpers.ts";
import {dropdownFilterBibliographyOptions} from "../constants/uiConstants.ts";
import dayjs from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);


interface ImportedDataEditorProps {
    value: string | Dayjs;
    onChange: (value: string) => void;
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
    } else {
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