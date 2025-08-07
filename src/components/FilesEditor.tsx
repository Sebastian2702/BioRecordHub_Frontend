import Box from "@mui/material/Box";
import { COLORS, BORDER, FONT_SIZES } from '../constants/ui.ts';
import Typography from '@mui/material/Typography';
import StyledButton from "./StyledButton.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import AccessFile from "../components/AccessFile.tsx"

interface FilesEditorProps {
    files: any[];
    altText?: string;
    deleteImage: (index: number) => void;
    images:boolean
}

const FilesEditor: React.FC<FilesEditorProps> = ({
                                                     files,
                                                     altText = 'Image',
                                                     deleteImage,
                                                     images = false
                                                 }) => {
    return (
        <Box>

            {files.length > 0 ? (
                <Box padding={'20px'}>
                    <Typography variant="body1" textAlign={'left'} sx={{ color: COLORS.primary, fontSize: FONT_SIZES.large, mb: 2, fontWeight:'bold' }}>
                        {images ? 'Images:' : 'Files:'}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 6,
                        border: `1px solid ${BORDER}`,
                        padding: 2,
                        borderRadius: 1
                    }}>
                        {files.map((file, index) => (
                            <Box key={index} sx={{ width: '150px', height: '150px', position: 'relative' }}>
                                {images ? (
                                    <Box>
                                        <img
                                            src={file.url}
                                            alt={altText}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                        <StyledButton label={"Delete"} color={'delete'} size={'small'} onClick={() => deleteImage(file.id)} icon={<DeleteIcon/>}/>
                                    </Box>
                                ):
                                    <Box alignItems={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={2} marginLeft={'20px'}>
                                        <AccessFile url={file.url} fileName={file.filename} extension={file.extension}/>
                                        <StyledButton label={"Delete"} color={'delete'} size={'small'} onClick={() => deleteImage(file.id)} icon={<DeleteIcon/>}/>
                                    </Box>
                                }


                            </Box>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box padding={'20px'}>
                    <Typography variant="body1" textAlign={'left'} sx={{ color: COLORS.primary, fontSize: FONT_SIZES.large, mb: 2, fontWeight:'bold' }}>
                        {images ? 'Images:' : 'Files:'}
                    </Typography>
                    <Typography variant="body1" sx={{ color: COLORS.black, fontSize: FONT_SIZES.medium }}>
                        No {images ? 'images' : 'files'} available.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default FilesEditor;
