import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledButton from "./StyledButton.tsx";
import InputTextField from "./InputTextField.tsx";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {FetchGbifTaxonomy} from "../services/nomenclature/nomenclature.ts";

interface GetNomenclatureDialogProps {
    open: boolean;
    onClose: () => void;
    nomenclatureData: Array<{ [key: string]: string }>;
    setNomenclatureData: (data: any) => void;
    setError: (msg: string) => void;
}



const GetNomenclatureDialog: React.FC<GetNomenclatureDialogProps> = ({ open, onClose, setError,setNomenclatureData, nomenclatureData }) => {
    const [speciesName, setSpeciesName] = useState("");
    const [loading, setLoading] = useState(false);
    const [showData, setShowData] = useState<boolean>(false);
    const [results, setResults] = useState<any>(null);

    const searchSpecies = async (speciesName: string) => {
        if (!speciesName.trim()) {
            setError("Please enter a species name");
            return;
        }
        setError("");
        const data = await FetchGbifTaxonomy(speciesName, setLoading, setError);
        console.log(data)
        if (!data) {
            setShowData(false);
            setSpeciesName("");
            return;
        }
        setResults(data);
        setShowData(true)
    }

    const onGetNomenclature = () => {
        if (!results) {
            setError("No results found");
            return;
        }
        setNomenclatureData({
            ...nomenclatureData,
            kingdom: results.kingdom || '',
            phylum: results.phylum || '',
            class: results.class || '',
            order: results.order || '',
            family: results.family || '',
            genus: results.genus || '',
            species: results.species || '',
        });
        setSpeciesName("");
        setShowData(false);
        onClose();
    }

    if(showData) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Taxonomic Data</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you would display the taxonomic data retrieved from GBIF:
                        <ul>
                            <li><strong>Kingdom:</strong> {results.kingdom}</li>
                            <li><strong>Phylum:</strong> {results.phylum}</li>
                            <li><strong>Class:</strong> {results.class}</li>
                            <li><strong>Order:</strong> {results.order}</li>
                            <li><strong>Family:</strong> {results.family}</li>
                            <li><strong>Genus:</strong> {results.genus}</li>
                            <li><strong>Species:</strong> {results.species}</li>
                            <li><strong>Status:</strong> {results.status}</li>
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <StyledButton onClick={onClose} color={"delete"} size={"medium"} label={"Close"} />
                    <StyledButton onClick={() => onGetNomenclature(results)} color={"primary"} size={"medium"} label={"Confirm"} disabled={loading} />
                </DialogActions>
            </Dialog>
        );
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Get taxonomic data from GBIF</DialogTitle>
            <DialogContent>
                <DialogContentText>
                        Search for a species and get its taxonomic data from the Global Biodiversity Information Facility (GBIF). This will help you to fill in the nomenclature details.
                        <br/>
                        <br/>
                    { loading ?
                        (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                                <CircularProgress/>
                            </Box>
                        ):
                        <InputTextField label={"Species name"} value={speciesName} onChange={(e) => setSpeciesName(e.target.value)} required={true}/>
                    }

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <StyledButton onClick={onClose} color={"delete"} size={"medium"} label={"Cancel"} />
                <StyledButton onClick={() => searchSpecies(speciesName)} color={"primary"} size={"medium"} label={"Get Nomenclature"} disabled={loading} />
            </DialogActions>
        </Dialog>
    )
}

export default GetNomenclatureDialog;