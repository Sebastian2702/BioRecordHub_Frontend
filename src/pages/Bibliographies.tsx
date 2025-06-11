import Button from "@mui/material/Button";
import {GetBibliographyById} from "../services/bibliography/bibliography.ts";
import {GetBibliography} from '../services/bibliography/bibliography.ts';


function Bibliographies(){

    const handleGetBibliography = async () => {
        console.log('Get Bibliography');
        try {
            const data = await GetBibliography();
            console.log(data);
        } catch (error) {
            console.error("Error fetching bibliography:", error);
        }
    }

    const handleGetBibliographyById = async (id: number) => {
        console.log('Get Bibliography By Id');
        try {
            const data = await GetBibliographyById(id);
            console.log(data);
        } catch (error) {
            console.error("Error fetching bibliography by ID:", error);
        }
    }
    return (
        <div style={{ display: "flex", width: "100%", height: "100dvh", overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                <h1>Bibliographies</h1>
                {/* Add your dashboard content here */}
                <Button size={"large"} onClick={handleGetBibliography}>Test</Button>
                <Button size={"large"} onClick={() => handleGetBibliographyById(1)}>Test By Id</Button>
            </div>
        </div>
    );
}
export default Bibliographies;