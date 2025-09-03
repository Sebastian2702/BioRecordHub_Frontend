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
    dataType: 'bibliography' | 'nomenclature' | 'projects';
    isSingleSelect : boolean;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
                                                               data,
                                                               selectedIds,
                                                               onChange,
                                                               dataType,
                                                               isSingleSelect
                                                           }) => {
    const [selectedValue, setSelectedValue] = useState('');


    const getOptions = () => {
        if (dataType === 'bibliography') {
            return data.map((b) => ({
                value: b.id,
                display: `${b.key} — ${b.author}, ${b.publication_year} — ${truncateString(b.title, 50)}`,
            }));
        } else if (dataType === 'projects') {
            return data.map((b) => ({
                value: b.id,
                display: `${b.title} — ${b.research_type ? truncateString(b.description, 50) : ''}`,
            }));
        } else {
            return data.map((b) => ({
                value: b.id,
                display: `${b.species} — ${b.author}`,
            }));
        }
    };

    const isAddDisabled = () => {
        return isSingleSelect && selectedIds.length > 0;
    };

    const handleAdd = () => {
        if (!selectedValue) return;

        if (isSingleSelect) {
            if (selectedIds[0] !== selectedValue) {
                onChange([selectedValue]);
            }
        } else {
            if (!selectedIds.includes(selectedValue)) {
                onChange([...selectedIds, selectedValue]);
            }
        }

        setSelectedValue('');
    };

    const handleRemove = (id: string) => {
        if (isSingleSelect) {
            onChange([]);
        } else {
            onChange(selectedIds.filter((i) => i !== id));
        }
    };

    const getDisplay = (id: string) => {
        const item = data.find((b) => b.id === id);
        if (!item) return id;

        if (dataType === 'bibliography') {
            return `${item.author}, ${item.publication_year} - ${truncateString(item.title, 30)}`;
        } else if (dataType === 'nomenclature') {
            return `${item.species}, ${item.author}`;
        } else if (dataType === 'projects') {
            return `${item.title} — ${item.research_type ? truncateString(item.description, 50) : ''}`;
        }
    };

    const getTitle = () => {
        if (dataType === 'bibliography') return 'Bibliographies';
        if (dataType === 'nomenclature') return 'Nomenclature';
        if (dataType === 'projects') return 'Project';
        return '';
    };

    return (
        <Box sx={{ margin: '0 0px', padding: '0 0px' }}>
            <Typography
                align="left"
                sx={{
                    color: COLORS.primary,
                    fontSize: FONT_SIZES.medium,
                    fontWeight: 'bold',
                    marginBottom: '8px',
                }}
            >
                {getTitle()}:
            </Typography>

            <Box display="flex" gap={"20px"} height={"60px"} marginBottom={"20px"} alignItems={'center'}>
                <Box flex={1}>
                    <DropdownInput
                        options={getOptions()}
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        label={`Select a ${getTitle().toLowerCase()}`}
                        required={false}
                    />
                </Box>

                <StyledButton
                    label="Add"
                    color="primary"
                    size="medium"
                    icon={<AddIcon sx={{ color: COLORS.white }} fontSize={"large"} />}
                    onClick={handleAdd}
                    disabled={isAddDisabled()}
                />
            </Box>

            {selectedIds.length > 0 && (
                <Box display="flex" gap="10px" sx={{ marginTop: '5px', flexWrap: 'wrap' }}>
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

