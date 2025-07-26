import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {truncateString} from '../utils/helperFunctions';
import DropdownInput from './DropdownInput';
import StyledButton from './StyledButton';
import ListInputValue from './ListInputValue';
import {COLORS, FONT_SIZES} from '../constants/ui';

interface DropdownSelectorProps {
    data: { id: string; [key: string]: string }[];
    selectedIds: string[];
    onChange: (newIds: any[]) => void;
    dataType: 'bibliography' | 'nomenclature';
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
                                                               data,
                                                               selectedIds,
                                                               onChange,
                                                               dataType,
                                                           }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const getOptions = () => {
        if (dataType === 'bibliography') {
            return data.map((b) => ({
                value: b.id,
                display: `${b.key} — ${b.author}, ${b.publication_year} — ${truncateString(b.title, 50)}`,
            }))
        }
        else{
            return data.map((b) => ({
                value: b.id,
                display: `${b.species} — ${b.author}}`,
            }))
        }
    }



    const handleAdd = () => {
        if (selectedValue && !selectedIds.includes(selectedValue)) {
            onChange([...selectedIds, selectedValue]);
            setSelectedValue('');
        }
    };

    const handleRemove = (id: string) => {
        onChange(selectedIds.filter((i) => i !== id));
    };

    const getDisplay = (id: string) => {
        const bib = data.find((b) => b.id === id);
        if (!bib) return id;
        if(dataType === 'bibliography') {
            return `${bib.author}, ${bib.publication_year} - ${truncateString(bib.title, 30)}`;
        }
        else if(dataType === 'nomenclature') {
            return `${bib.species}, ${bib.author}`;
        }

    };

    return (
        <Box sx={{margin: '0 10px', padding: '0 10px'}}>
            <Typography
                align="left"
                sx={{
                    color: COLORS.primary,
                    fontSize: FONT_SIZES.medium,
                    fontWeight: 'bold',
                    marginBottom: '8px',
                }}
            >
                Bibliographies:
            </Typography>

            <Box display="flex" gap={"20px"} height={"60px"} marginBottom={"20px"}>
                <Box flex={1}>
                    <DropdownInput
                        options={getOptions()}
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        label="Select a bibliography"
                        required={false}
                    />
                </Box>

                <StyledButton
                    label="Add"
                    color="primary"
                    size="medium"
                    icon={<AddIcon sx={{color: COLORS.white}} fontSize={"large"}/>}
                    onClick={handleAdd}
                />
            </Box>

            {selectedIds.length > 0 && (
                <Box display="flex" gap="10px" sx={{marginTop: '5px', flexWrap: 'wrap'}}>
                    {selectedIds.map((id) => (
                        <ListInputValue
                            key={id}
                            value={getDisplay(id) ?? "undefined"}
                            onRemove={() => handleRemove(id)}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default DropdownSelector;
