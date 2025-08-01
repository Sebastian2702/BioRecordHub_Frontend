import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from '../constants/ui.ts';
import pdfIcon from "../assets/images/pdfIcon.png";

interface AccessFileProps {
    url: string;
    fileName: string;
}

const AccessFile: React.FC<AccessFileProps> = ({ url, fileName }) => {
    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    height: '100px',
                    backgroundImage: `url(${pdfIcon})`,
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