import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {COLORS, FONT_SIZES, BORDER} from '../constants/ui';
import CloseIcon from '@mui/icons-material/Close';

interface ListInputValue {
    value: string;
    onRemove: (value: string) => void;
}

const ListInputValue: React.FC<ListInputValue> = ({ value, onRemove }) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: BORDER.radius, width: 'fit-content', padding: '5px 10px', margin: '5px 0'}}>
            <Typography color={COLORS.white} fontSize={FONT_SIZES.small} fontWeight="bold" sx={{ textAlign: 'center' }}>
                {value}
            </Typography>
            <CloseIcon
                sx={{ color: COLORS.white, cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => onRemove(value)}
            />
        </Box>
    )

}

export default ListInputValue;