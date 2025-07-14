import { useLocation } from 'react-router-dom';
import NomenclatureList from '../../components/NomenclatureList.tsx';

function NomenclatureListPage() {
    const location = useLocation();
    const nomenclature = location.state?.nomenclature || [];

    return <NomenclatureList nomenclature={nomenclature} />;
}

export default NomenclatureListPage;