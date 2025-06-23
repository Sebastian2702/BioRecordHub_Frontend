import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BORDER, COLORS, FONT_SIZES} from "../constants/ui.ts";
import BackButton from "../components/BackButton.tsx";
import TextField  from '@mui/material/TextField';
import { darken } from '@mui/system';


function NewBibliographyFileUpload() {
  return (
      <Box sx={{
          width: '97%',
          height: 'calc(100vh - 150px)',
          backgroundColor: COLORS.white,
          color: COLORS.primary,
          borderRadius: BORDER.radius,
          margin: 'auto',
          paddingTop: "20px",
          overflow: 'auto',
      }}>
          <Box sx={{ position: 'relative', height: '50px', marginBottom: '20px', padding: '0 10px' }}>
              <Box sx={{ position: 'absolute', left: 0 }}>
                  <BackButton width="55px" />
              </Box>

              <Typography
                  sx={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontWeight: 'bold',
                      fontSize: FONT_SIZES.xlarge,
                      textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                  }}
              >
                  New Bibliography
              </Typography>
          </Box>
          <Box sx={{padding: '0 10px'}}>
              <TextField
                  type="file"
                  variant="outlined"
                  slotProps={{
                      htmlInput: {
                      accept: '.xlsx, .xlsm, .xls, .xlsb, .xltx, .xltm'
                  }
                  }}
                  placeholder="Drag and drop .xlsx, .xlsm, .xls files here, or browse"
                  fullWidth
                  sx={{
                      height: '55px',
                      backgroundColor: COLORS.white,
                      borderRadius: BORDER.radius,
                      '& .MuiOutlinedInput-root': {
                          height: '100%',
                          padding: '10px 14px',
                          fontSize: FONT_SIZES.small,
                          color: COLORS.primary,
                          '& fieldset': {
                              border: '0px',
                          },
                      },
                      '& input[type="file"]::file-selector-button': {
                          backgroundColor: COLORS.primary,
                          color: COLORS.white,
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                      },
                      '& input[type="file"]::file-selector-button:hover': {
                          backgroundColor: darken(COLORS.primary, 0.3) , // optional darker variant
                      },
                  }}
              />

          </Box>

      </Box>
  );
}

export default NewBibliographyFileUpload;