import HomeIcon from '@mui/icons-material/Home';
import BiotechIcon from '@mui/icons-material/Biotech';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import StorageIcon from '@mui/icons-material/Storage';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const getIcon = (type: string) => {
    switch (type) {
        case "Dashboard": return <HomeIcon sx={{  width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)', height: 'clamp(2.5rem, 1.5vw + 0.5rem, 4rem)', marginRight: '1rem'}}/>;
        case "Nomenclature": return <BiotechIcon sx={{  width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)', height: 'clamp(2.5rem, 1.5vw + 0.5rem, 4rem)',marginRight: '1rem'}}/>;
        case "Bibliography": return <MenuBookIcon sx={{  width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)', height: 'clamp(2.5rem, 1.5vw + 0.5rem, 4rem)',marginRight: '1rem'}}/>;
        case "Occurrences": return <AssignmentIcon sx={{  width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)', height: 'clamp(2.5rem, 1.5vw + 0.5rem, 4rem)',marginRight: '1rem'}}/>;
        case "Projects": return <AnalyticsIcon sx={{  width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)', height: 'clamp(2.5rem, 1.5vw + 0.5rem, 4rem)',marginRight: '1rem'}}/>;
        case "Reports": return <StorageIcon sx={{  width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)', height: 'clamp(2.5rem, 1.5vw + 0.5rem, 4rem)',marginRight: '1rem'}}/>;
        case "Logout": return <LogoutIcon sx={{  width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)', height: 'clamp(2.5rem, 1.5vw + 0.5rem, 4rem)',marginRight: '1rem'}}/>;
        case "Admin": return <AdminPanelSettingsIcon sx={{  width: 'clamp(3rem, 1.5vw + 0.5rem, 5rem)', height: 'clamp(2.5rem, 1.5vw + 0.5rem, 4rem)',marginRight: '1rem'}}/>;
        default: return null;
    }
};

export default getIcon;