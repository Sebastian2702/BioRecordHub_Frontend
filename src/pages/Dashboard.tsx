import { Box, Typography } from "@mui/material";
import {COLORS, BORDER, FONT_SIZES} from '../constants/ui.ts';
import {useAuth} from "../context/AuthContext.tsx";
import logo from "../assets/images/logo_primary.png";


function Dashboard () {
    const { user } = useAuth();
    return (
      <Box sx={{
          height: 'calc(100vh - 150px)',
          margin: 'auto',
          padding: "0px 20px"
      }}>
          <Box
            display="flex"
            gap={3}
            flexDirection="row"
            minHeight={'calc(100vh - 70vh)'}
            marginBottom={4}
          >
              <Box
                sx={{
                    backgroundColor: COLORS.white,
                    color: COLORS.primary,
                    borderRadius: BORDER.radius,
                    width: '100%',
                    padding: '20px',
                }}
              >
                  <Box display={'flex'} flexDirection="row" justifyContent='space-evenly' marginBottom={'25px'}>
                      <img
                          src={logo}
                          alt="logo"
                          style={{ width: "90px", height: "90px" }}
                      />
                      <Box>
                          <Typography align={'center'} sx={{fontSize: FONT_SIZES.large, color: COLORS.black}}>Welcome Back</Typography>
                          <Typography align={'center'} sx={{fontSize: FONT_SIZES.medium, fontWeight:'bold'}}><strong>{user?.name}!</strong></Typography>
                      </Box>
                  </Box>
                  <Typography align={'center'} sx={{fontSize: FONT_SIZES.medium, marginTop: '10px'}}>
                        This is your dashboard, where you can manage your projects, view your occurrences, and access your bibliographies.
                        <br />
                  </Typography>

              </Box>
              <Box
                  sx={{
                      backgroundColor: COLORS.white,
                      color: COLORS.primary,
                      borderRadius: BORDER.radius,
                      width: '100%',
                  }}
              >

              </Box>
          </Box>
          <Box
              sx={{
                  backgroundColor: COLORS.white,
                  color: COLORS.primary,
                  borderRadius: BORDER.radius,
                  width: '100%',
                  minHeight: '62%'
              }}
          >

          </Box>
      </Box>
    );
}

export default Dashboard;