import React from 'react';
import { Box, } from '@mui/material';
import dayjs from 'dayjs';
import FormField from "./FormField.tsx";
import StyledAccordion from "./StyledAccordion.tsx";
import {formatLabel} from "../utils/helperFunctions.ts";

const MemoFormField = React.memo(FormField);

interface Field {
    id: string;
    type: string;
}

interface FieldsGridProps {
    fields: Field[];
    usedFormFields: { id: string | number; value: string }[];
    setUsedFormFields: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    accordionGroup?: string;
    accordionState?: Record<string, boolean>;
    setAccordionState?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const FieldsGrid: React.FC<FieldsGridProps> = ({
                                                          fields,
                                                          usedFormFields,
                                                          setUsedFormFields,
                                                          accordionGroup,
                                                          accordionState,
                                                          setAccordionState,
                                                      }) => {

    console.log(usedFormFields)
    const handleChange = (fieldId: string, value: string) => {
        setUsedFormFields(prev => {
            const index = prev.findIndex(item => item.id === fieldId);

            if (index !== -1) {
                if (prev[index].value === value) return prev;

                const newFields = [...prev];
                newFields[index] = { ...newFields[index], value };
                return newFields;
            } else {
                return [...prev, { id: fieldId, value }];
            }
        });
    };

    const handleDynamicDateChange = (fieldId: string, date: Date | null) => {
        const formatted = date ? dayjs(date).format('YYYY-MM-DD') : '';
        handleChange(fieldId, formatted);
    };

    const getValueForField = (fieldId: string, fieldType: string) => {
        const value = usedFormFields.find(item => item.id === fieldId)?.value || null;
        if (fieldType === 'date') {
            return value ? (dayjs(value).isValid() ? dayjs(value) : null) : null;
        }
        return value || '';
    };

    const gridContent = (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
            }}
        >
            {fields.map(field => (
                <MemoFormField
                    key={field.id}
                    label={formatLabel(field.name)}
                    helperText={field.label || ''}
                    value={getValueForField(field.id, field.type)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(field.id, e.target.value)
                    }
                    date={field.type === 'date'}
                    dateType={field.type === 'date' ? ['day', 'month', 'year'] : undefined}
                    onChangeDate={(date: Date | null) => handleDynamicDateChange(field.id, date)}
                    required={field.is_required}
                />
            ))}
        </Box>
    );

    if (!accordionGroup || !accordionState || !setAccordionState) {
        return gridContent;
    }


    return (
        <Box marginBottom={'20px'}>
            <StyledAccordion
                expanded={!!accordionState[accordionGroup]}
                onToggle={() =>
                    setAccordionState(prev => ({
                        ...prev,
                        [accordionGroup]: !prev[accordionGroup],
                    }))
                }
                title={formatLabel(accordionGroup)}
                children={
                    accordionState[accordionGroup] && gridContent
                }

            />
        </Box>


    );
};
