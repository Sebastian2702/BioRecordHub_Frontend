import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from '../constants/ui.ts';
import pdfIcon from "../assets/images/pdfIcon.png";
import excelIcon from "../assets/images/excelIcon.png";
import docIcon from "../assets/images/docIcon.png";

interface AccessFileProps {
    url: string;
    fileName: string;
    extension?: string;
}

const AccessFile: React.FC<AccessFileProps> = ({ url, fileName, extension = 'pdf'}) => {

    const getFileIcon = (ext: string) => {
        switch (ext.toLowerCase()) {
            case 'pdf':
                return pdfIcon;
            case 'xlsx':
                return excelIcon;
            case 'xls':
                return excelIcon;
            case 'docx':
                return docIcon;
            default:
                return pdfIcon;
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    height: '100px',
                    backgroundImage: `url(${getFileIcon(extension)})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}
                onClick={() => window.open(url, '_blank')}
            />
            <Typography color={COLORS.primary} variant={'caption'} fontWeight={'bold'}>{fileName}</Typography>
        </Box>
    );
};

export default AccessFile;