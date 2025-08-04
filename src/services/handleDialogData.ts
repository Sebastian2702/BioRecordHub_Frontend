import {DeleteBibliography, DeleteNomenclatureFromBibliography} from './bibliography/bibliography.ts';
import {DeleteBibliographyFromNomenclature, DeleteNomenclature} from './nomenclature/nomenclature.ts';
import {DeleteUser, updateOccurrenceField, UpdateUserRole} from './admin/admin.ts';
import {DeleteProject} from './project/project.ts';
import {DeleteOccurrence} from './occurrences/occurrences.ts';

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
        case "nomenclature":
            await DeleteNomenclature(id);
            break;
        case "users":
            await DeleteUser(id);
            break;
        case "projects":
            await DeleteProject(id);
            break;
        case "occurrence":
            await DeleteOccurrence(id);
            break;
        // Add more cases for other data types as needed
        default:
            throw new Error(`Unsupported data type: ${dataType}`);

    }
}

export const handleEditData = async (id:number, dataType:string, data:any) => {
    switch(dataType) {
        case "users":
           await UpdateUserRole(id,data);
            break;
        case 'occurrenceFields':
            await updateOccurrenceField(id, data);
            break;

        // Add more cases for other data types as needed
        default:
            throw new Error(`Unsupported data type: ${dataType}`);
    }
}