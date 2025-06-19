import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {BORDER, COLORS, FONT_SIZES} from '../constants/ui';

interface ExtraFieldAccordionProps {
    title: string;
    children: React.ReactNode;
    expanded?: boolean;
    onToggle?: () => void;
}

const ExtraFieldAccordion: React.FC<ExtraFieldAccordionProps> = ({title, children, expanded, onToggle}) => {
    return (
        <Accordion
            expanded={expanded}
            onChange={onToggle}
            disableGutters
            elevation={0}
            square={false}
            sx={{
                border: `2px solid ${COLORS.primary}`,
                backgroundColor: COLORS.white,

                '&.MuiAccordion-root:last-of-type':{
                    borderRadius: BORDER.radius,
                },
                '&::before': {
                    display: 'none',
                },
                '&.Mui-expanded': {
                    margin: 0,
                },
            }}
        >
            <AccordionSummary expandIcon={<ArrowDropDownIcon sx={{color: COLORS.primary}}/>}
                              aria-controls="panel1a-content" id="panel1a-header"
                              sx={{
                                  color: COLORS.primary,
                                  fontSize: {xs: FONT_SIZES.xsmall, sm: FONT_SIZES.small, lg: FONT_SIZES.small},
                                  fontWeight: 'bold',
                                  marginBottom: '8px',
                                  '&.Mui-focusVisible': {
                                      outline: 'none',
                                  },
                                  '&:focus': {
                                      outline: 'none',
                                  },
                              }}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails sx={{ borderBottomLeftRadius: BORDER.radius, borderBottomRightRadius: BORDER.radius }}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default ExtraFieldAccordion;
