import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import InputTextField from './InputTextField.tsx';
import DateInput from './DateInput.tsx';
import DropDownInput from './DropdownInput.tsx';
import DateTimeInput from './DateTimeInput.tsx';
import FileInput from './FileInput.tsx';

import { COLORS, FONT_SIZES } from '../constants/ui';

interface FormFieldProps {
    label: string;
    value: any;
    required: boolean;
    helperText: string;
    multiline?: boolean;
    date?: boolean;
    dateType?: ['day', 'month', 'year'] | ['month', 'year'] | ['year'] | ['day', 'month'] | ['day'];
    dropdown?: boolean;
    dateTime?: boolean;
    switchInput?: boolean;
    fileUpload?: boolean;
    options?: { display: string; value: string }[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDropdown?: (event: SelectChangeEvent<string>) => void;
    onChangeDate?: (date: Date | null) => void;
    onChangeFile?: (file: File | null) => void;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 label,
                                                 value,
                                                 required,
                                                 helperText,
                                                 multiline = false,
                                                 date = false,
                                                 dateType = ['year'],
                                                 dropdown = false,
                                                 dateTime = false,
                                                 switchInput = false,
                                                 fileUpload = false,
                                                 options = [],
                                                 onChange,
                                                 onChangeDropdown,
                                                 onChangeDate,
                                                 onChangeFile,
                                             }) => {
    const labelStyles = {
        color: COLORS.primary,
        fontSize: {
            xs: FONT_SIZES.xsmall,
            sm: FONT_SIZES.small,
            lg: FONT_SIZES.medium,
        },
        fontWeight: 'bold',
        marginBottom: '8px',
    };

    const isOnly = (type: 'date' | 'dropdown' | 'dateTime' | 'switchInput' | 'fileUpload') => {
        const types = { date, dropdown, dateTime, switchInput, fileUpload };
        return types[type] && Object.values(types).filter(Boolean).length === 1;
    };

    const labelContent = (
        <Typography align="left" sx={labelStyles}>
            {label}:
        </Typography>
    );

    return (
        <Box sx={{ margin: '0 10px' }}>
            {(switchInput || fileUpload) ? (
                <Tooltip title={helperText} placement="top-start" arrow>
                    {labelContent}
                </Tooltip>
            ) : (
                labelContent
            )}

            {isOnly('date') && (
                <DateInput label={helperText} value={value} onChange={onChangeDate} type={dateType} />
            )}

            {isOnly('dropdown') && (
                <DropDownInput
                    options={options}
                    value={value}
                    onChange={onChangeDropdown}
                    label={helperText}
                    required={required}
                    filter={false}
                />
            )}

            {isOnly('dateTime') && (
                <DateTimeInput
                    label={helperText}
                    value={value}
                    onChange={onChangeDate}
                    type={dateType}
                />
            )}

            {isOnly('switchInput') && (
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
                    <Switch
                        checked={value}
                        onChange={onChange}
                        color="success"
                        sx={{ transform: 'scale(1.3)' }}
                    />
                    {value && <CheckCircleIcon color="success" />}
                </Box>
            )}

            {isOnly('fileUpload') && onChangeFile && (
                <FileInput
                    label={'.pdf; files here, or browse your computer'}
                    onChange={onChangeFile}
                    acceptedFileTypes={'.pdf'}
                />
            )}

            {!date && !dropdown && !dateTime && !switchInput && !fileUpload && (
                <InputTextField
                    label={helperText}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    required={required}
                    fontSize={FONT_SIZES.medium}
                    multiline={multiline}
                />
            )}
        </Box>
    );
};

export default FormField;
