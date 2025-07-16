import {BORDER, COLORS} from "../constants/ui.ts";
import { Box } from "@mui/material";
import DataTable from "./DataTable.tsx";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {toast, ToastContainer} from "react-toastify";

interface NomenclatureListProps {
    nomenclature: any[];
}

const NomenclatureList: React.FC<NomenclatureListProps> = ({nomenclature}) => {
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState("");
    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };


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

  return (
      <Box sx={{
          width: '97%',
          height: 'calc(100vh - 150px)',
          backgroundColor: COLORS.white,
          color: COLORS.primary,
          borderRadius: BORDER.radius,
          margin: 'auto',
          paddingTop: "20px"
      }}>
          <ToastContainer />
          <Typography variant="h3" align={'center'} fontWeight={'bold'}>
                Nomenclature List
          </Typography>

          <DataTable
              data={nomenclature}
              columns={[
                  { id: 'species', label: 'Species' },
                  { id: 'author', label: 'Author' },
                  { id: 'genus', label: 'Genus' },
                  { id: 'family', label: 'Family' },
                  { id: 'order', label: 'Order' }
              ]}
              editButton={false}
              viewButton={true}
              viewLink={"/nomenclature/"}
              deleteButton={false}
              trashCanButton={true}
              dataType={"nomenclature"}
              setError={setError}
          />

      </Box>
  );
}

export default NomenclatureList;