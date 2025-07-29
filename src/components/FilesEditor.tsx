import Box from "@mui/material/Box";
import { COLORS, BORDER, FONT_SIZES } from '../constants/ui.ts';
import Typography from '@mui/material/Typography';
import StyledButton from "./StyledButton.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

interface FilesEditorProps {
    images: any[];
    altText?: string;
    deleteImage?: (index: number) => void;
}

const FilesEditor: React.FC<FilesEditorProps> = ({
                                                     images,
                                                     altText = 'Image',
                                                     deleteImage
                                                 }) => {
    return (
        <Box>

            {images.length > 0 ? (
                <Box padding={'20px'}>
                    <Typography variant="body1" textAlign={'left'} sx={{ color: COLORS.primary, fontSize: FONT_SIZES.large, mb: 2, fontWeight:'bold' }}>
                        Images:
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        border: `1px solid ${BORDER}`,
                        padding: 2,
                        borderRadius: 1
                    }}>
                        {images.map((image, index) => (
                            <Box key={index} sx={{ width: '150px', height: '150px', position: 'relative' }}>
                                <img
                                    src={image.url}
                                    alt={altText}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <StyledButton label={"Delete"} color={'delete'} size={'medium'} onClick={() => deleteImage(image.id)} icon={<DeleteIcon/>}/>

                            </Box>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box padding={'20px'}>
                    <Typography variant="body1" textAlign={'left'} sx={{ color: COLORS.primary, fontSize: FONT_SIZES.large, mb: 2, fontWeight:'bold' }}>
                        Images:
                    </Typography>
                    <Typography variant="body1" sx={{ color: COLORS.gray, fontSize: FONT_SIZES.medium }}>
                        No images available
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default FilesEditor;
