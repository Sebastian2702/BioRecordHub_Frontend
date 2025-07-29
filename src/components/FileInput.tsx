import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import {darken} from '@mui/system';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { COLORS, FONT_SIZES, BORDER } from "../constants/ui";


interface FileInputProps {
    label: string;
    acceptedFileTypes?: string;
    multiple?: boolean;
    onChange: (files: File[] | File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, acceptedFileTypes, onChange, multiple }) => {
    return(
        <Box sx={{
            padding: '10px',
            border: `2px solid ${COLORS.primary}`,
            borderRadius: BORDER.radius,
            backgroundColor: COLORS.white,
            margin: '20px'
        }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{width: '100%'}}
            >
                <UploadFileIcon sx={{fontSize: '50px'}}/>
                <TextField
                    type="file"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const fileList = e.target.files;

                        if (!fileList || fileList.length === 0) {
                            onChange(multiple ? [] : null);
                            return;
                        }

                        if (multiple) {
                            onChange(Array.from(fileList));
                        } else {
                            onChange(fileList[0]);
                        }
                    }}
                    slotProps={{
                        htmlInput: {
                            accept: acceptedFileTypes,
                            multiple: multiple || false,
                        }
                    }}
                    fullWidth={false}
                    sx={{
                        backgroundColor: COLORS.white,
                        borderRadius: BORDER.radius,
                        width: 'auto',
                        textAlign: 'center',
                        '& .MuiOutlinedInput-root': {
                            height: '55px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 14px',
                            fontSize: FONT_SIZES.small,
                            color: COLORS.black,
                            '& fieldset': {
                                border: '0px',
                            },
                        },
                        '& input[type="file"]': {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        },
                        '& input[type="file"]::file-selector-button': {
                            backgroundColor: COLORS.primary,
                            color: COLORS.white,
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '10px',
                        },
                        '& input[type="file"]::file-selector-button:hover': {
                            backgroundColor: darken(COLORS.primary, 0.3),
                        },
                    }}
                />
                <Box
                    mt={1}
                    sx={{
                        color: COLORS.primary,
                        fontSize: FONT_SIZES.small,
                        textAlign: 'center',
                        maxWidth: 400,
                    }}
                >
                    <strong>Drag and drop</strong> {label}
                </Box>
            </Box>
        </Box>
    )
}

export default FileInput;
