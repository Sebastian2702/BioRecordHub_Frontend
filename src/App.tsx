import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegistration from './pages/LoginRegistration.tsx';



function App() {


  return (
    <Router>
        <Routes>
            <Route path="/login_registration" element={<LoginRegistration/>} />
        </Routes>
    </Router>
)
}

export default App



