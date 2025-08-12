import { Box, Typography } from "@mui/material";
import {COLORS, BORDER, FONT_SIZES} from '../constants/ui.ts';
import {useAuth} from "../context/AuthContext.tsx";
import logo from "../assets/images/logo_primary.png";
import { GetDashboardData } from "../services/dashboard/dashboard.ts";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import DataTable from "../components/DataTable.tsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


function Dashboard () {
    const { user } = useAuth();
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({});

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Occurrences over the last 5 days',
                color: COLORS.primary,
            },
        },
    };

    const getDatesFromDailyCounts = (data: any) => {
            if (!data || !Array.isArray(data.dailyCounts)) return [];
            return data.dailyCounts.map((item: { date: string }) => item.date);
    }
    const getCountsFromDailyCounts = (data: any) => {
        if (!data || !Array.isArray(data.dailyCounts)) return [];
        return data.dailyCounts.map((item: { count: number }) => item.count);
    }



    const getData = async () => {
        try{
            const response = await GetDashboardData();
            setData(response);
            setLoading(false);
            setChartData({
                labels: getDatesFromDailyCounts(response),
                datasets: [
                    {
                        label: 'Occurrences',
                        data: getCountsFromDailyCounts(response),
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ]
            });
        }catch(error){
            setError("Failed to fetch dashboard data. Please try again later.");
            setLoading(false);
        }


    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError("");
        }
    }, [error]);

    useEffect(() => {
       getData();
    }, []);

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
                      padding: '20px',
                  }}
              >
                  {loading ? (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                          <CircularProgress/>
                      </Box>
                  ) :
                      <Box>
                        <Bar
                            data={chartData}
                            options={chartOptions}
                            height={100}
                        />
                      </Box>
                  }

              </Box>
          </Box>
          <Box
              sx={{
                  backgroundColor: COLORS.white,
                  color: COLORS.primary,
                  borderRadius: BORDER.radius,
                  width: '97%',
                  minHeight: '62%',
                  padding: '20px',
              }}
          >
              {loading ? (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                          <CircularProgress/>
                      </Box>
                  ) :
                  <Box>
                      <Typography align={'left'} sx={{  fontSize: FONT_SIZES.large, color: COLORS.primary, fontWeight:'bold',textShadow: '0px 4px 12px rgba(0,0,0,0.15)',marginBottom:'20px' }}>Most recent occurrences</Typography>
                      <DataTable
                          data={data.recentOccurrences}
                          columns={[
                              { id: 'scientific_name', label: 'Scientific Name' },
                              { id: 'event_date', label: 'Event Date' },
                              { id: 'locality', label: 'Locality' },
                          ]}
                          editButton={false}
                          viewButton={true}
                          viewLink={"/Occurrences/"}
                          deleteButton={false}
                          trashCanButton={false}
                          dataType={"occurrence"}
                          setError={setError}
                          exportData={false}
                      />
                  </Box>
              }

          </Box>
      </Box>
    );
}

export default Dashboard;