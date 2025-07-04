import {DeleteBibliography, DeleteNomenclatureFromBibliography} from './bibliography/bibliography.ts';
import {DeleteBibliographyFromNomenclature} from './nomenclature/nomenclature.ts';

export const handleDeleteData = async (id:number, dataType:string, referenceID?: number) => {
    switch(dataType) {
        case "bibliography":
            await DeleteBibliography(id);
            break;
        case "bibliographyNomenclature":
            await DeleteNomenclatureFromBibliography(referenceID!, id);
            break;
        case "nomenclatureBibliography":
            await DeleteBibliographyFromNomenclature(referenceID!, id);
            break;


        // Add more cases for other data types as needed
        default:
            throw new Error(`Unsupported data type: ${dataType}`);

    }
}