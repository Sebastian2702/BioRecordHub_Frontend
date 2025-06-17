import {DeleteBibliography} from './bibliography/bibliography.ts';

export const handleDeleteData = async (id:number, dataType:string) => {
    switch(dataType) {
        case "bibliography":
            await DeleteBibliography(id);
            break;
        // Add more cases for other data types as needed
        default:
            throw new Error(`Unsupported data type: ${dataType}`);

    }
}