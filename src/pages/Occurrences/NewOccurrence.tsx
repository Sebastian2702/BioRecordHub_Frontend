import Box from "@mui/material/Box";
import {useAuth} from "../../context/AuthContext.tsx";
import { COLORS, BORDER, FONT_SIZES } from '../../constants/ui.ts';
import Typography from '@mui/material/Typography';
import BackButton from "../../components/BackButton.tsx";
import FormField from "../../components/FormField.tsx";
import {useEffect, useState} from "react";
import {formatLabel, truncateString} from "../../utils/helperFunctions.ts";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {formatContributors, splitFieldsByRequirement} from "../../utils/helperFunctions.ts";
import {GetSpeciesAutocomplete} from "../../services/nomenclature/nomenclature.ts";
import {GetProjectAutoComplete} from "../../services/project/project.ts";
import {GetOccurrenceFields} from "../../services/admin/admin.ts";
import {CreateOccurrence} from "../../services/occurrences/occurrences.ts";
import {getHelperText, occurrenceFieldKeys} from "../../utils/formFieldHelpers.ts";
import dayjs from "dayjs";
import OccurrencesFormAutoComplete from "../../components/OccurrencesFormAutoComplete.tsx";
import {FieldsGrid} from "../../components/FieldsGrid.tsx";

function NewOccurrence() {
    const {user} = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [requiredFormFields, setRequiredFormFields] = useState<any[]>([]);
    const [notRequiredFormFields, setNotRequiredFormFields] = useState<any[]>([]);
    const [nomenclatureOptions, setNomenclatureOptions] = useState<any[]>([]);
    const [projectOptions, setProjectOptions] = useState<any[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number>();
    const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<number>();
    const [occurrenceData, setOccurrenceData] = useState({
        scientific_name: '',
        event_date: '',
        country: '',
        locality: '',
        decimal_latitude: '',
        decimal_longitude: '',
        basis_of_record: '',
        institution_code: '',
        collection_code: '',
        catalog_number: '',
        recorded_by: '',
        identified_by: '',
        date_identified: '',
        occurrence_remarks: '',
        language: '',
        license: '',
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [usedFormFields, setUsedFormFields] = useState<{ id: string, value: string }[]>([]);
    const [notRequiredFormFieldsAccordions, setNotRequiredFormFieldsAccordions] = useState({
        geographic: false,
        event: false,
        occurrence: false,
        organism: false,
        identification: false,
        collection: false,
        dataset: false,
        record: false,
        location: false,
        other: false
    });
    const [currentStep, setCurrentStep] = useState(1); // 1: Basic, 2: Fields, 3: Files

    const getData = async () => {
        setLoading(true);
        try {
            const [fieldsResponse, nomenclatureResponse, projectsResponse] = await Promise.all([
                GetOccurrenceFields(),
                GetSpeciesAutocomplete(),
                GetProjectAutoComplete()
            ]);
            const { required, nonRequired } = splitFieldsByRequirement(fieldsResponse);
            setRequiredFormFields(required);
            setNotRequiredFormFields(nonRequired);

            const formattedNomenclature = nomenclatureResponse.map((item: any) => ({
                id: item.id,
                label: `${item.species} - ${item.author}`
            }));
            const formattedProjects = projectsResponse.map((item: any) => ({
                id: item.id,
                label: `${item.title} - ${formatLabel(item.research_type)} - ${truncateString(item.description, 50)}`
            }));
            setNomenclatureOptions(formattedNomenclature);
            setProjectOptions(formattedProjects);
        } catch (err: any) {
            setError(err.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }

    const goToNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSave = () => {
        const missingBasicFields = Object.entries(occurrenceData).filter(([_, value]) => !value);
        const missingProjectOrNomenclature = !selectedProjectId || !selectedNomenclatureId;

        const requiredIds = requiredFormFields
            .filter(field => field.is_required)
            .map(field => field.id);

        const usedFieldMap = new Map(usedFormFields.map(f => [f.id, f.value]));
        const missingRequiredFields = requiredIds.filter(id => !usedFieldMap.get(id));

        if (missingBasicFields.length > 0) {
            setError("Please fill all required basic fields.");
            return;
        }

        if (missingProjectOrNomenclature) {
            setError("Please select a project and a nomenclature.");
            return;
        }

        if (missingRequiredFields.length > 0) {
            setError("Please complete all additional required fields.");
            return;
        }

        const formData = new FormData();

        Object.entries(occurrenceData).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        formData.append('nomenclature_id', selectedNomenclatureId);
        formData.append('project_id', selectedProjectId);
        formData.append("contributors", formatContributors("", user?.name || "Unknown User"));

        if (selectedFiles && selectedFiles.length > 0) {
            selectedFiles.forEach((file) => {
                formData.append("files[]", file);
            });
        }

        if (usedFormFields && usedFormFields.length > 0) {
            formData.append('fields', JSON.stringify(usedFormFields));
        }

        CreateOccurrence(formData, setLoading, setError, navigate);

    }

    const notRequiredFormFieldsByGroup = notRequiredFormFields.reduce((groups, field) => {
        const groupName = field.group || "Other";
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(field);
        return groups;
    }, {} as Record<string, Field[]>);

    const handleDynamicFieldChange = (fieldId: string, value: string) => {
        setUsedFormFields(prevFields => {
            const exists = prevFields.find(f => f.id === fieldId);
            if (exists) {
                return prevFields.map(f => f.id === fieldId ? { ...f, value } : f);
            } else {
                return [...prevFields, { id: fieldId, value }];
            }
        });
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

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box sx={{
            width: '97%',
            height: 'calc(100vh - 150px)',
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            borderRadius: BORDER.radius,
            margin: 'auto',
            paddingTop: "20px",
            overflow: 'auto',
        }}>
            <ToastContainer/>
            {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop={"50px"}>
                        <CircularProgress/>
                    </Box>
                ) :
                <Box>
                    <Box sx={{ position: 'relative', height: '50px', marginBottom: '20px' }}>
                        <Box sx={{ position: 'absolute', left: 0 }}>
                            <BackButton width="55px" />
                        </Box>

                        <Typography
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontWeight: 'bold',
                                fontSize: FONT_SIZES.xlarge,
                                textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                            }}
                        >
                            New Occurrence
                        </Typography>
                    </Box>
                    {currentStep === 1 && (
                        <Box sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                1. Basic Information
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                {occurrenceFieldKeys.map((field) => (
                                    <FormField
                                        key={field}
                                        label={formatLabel(field)}
                                        helperText={getHelperText(field, "occurrence") || ''}
                                        value={field === 'event_date' || field === 'date_identified' ? occurrenceData[field as keyof typeof occurrenceData]
                                                ? dayjs(occurrenceData[field as keyof typeof occurrenceData])
                                                : null
                                            : occurrenceData[field as keyof typeof occurrenceData] || ''}
                                        onChange={(e) => setOccurrenceData({ ...occurrenceData, [field]: e.target.value })}
                                        date={field === 'event_date' || field === 'date_identified'}
                                        dateType={field === 'event_date' || field === 'date_identified' ? ['day', 'month', 'year'] : undefined}
                                        onChangeDate={(date: Date | null) => {
                                            setOccurrenceData({
                                                ...occurrenceData,
                                                [field]: date ? dayjs(date).format('YYYY-MM-DD') : ''
                                            });
                                        }}
                                        required={true}
                                        multiline={field === 'occurrence_remarks'}
                                    />
                                ))}
                            </Box>
                            <OccurrencesFormAutoComplete
                                label="Nomenclature associated with the occurrence"
                                options={nomenclatureOptions}
                                value={selectedNomenclatureId}
                                onChange={(id) => setSelectedNomenclatureId(id ? id : undefined)}
                            />
                            <OccurrencesFormAutoComplete
                                label="Project associated with the occurrence"
                                options={projectOptions}
                                value={selectedProjectId}
                                onChange={(id) => setSelectedProjectId(id)}
                            />
                        </Box>
                    )}

                    {currentStep === 2 && (
                        <Box sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                2. Additional Required Fields
                            </Typography>
                            <FieldsGrid
                                fields={requiredFormFields}
                                usedFormFields={usedFormFields}
                                setUsedFormFields={setUsedFormFields}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                3. Additional Non-Required Fields
                            </Typography>
                            {Object.entries(notRequiredFormFieldsByGroup).map(([group, fields]) => (
                                <FieldsGrid
                                    key={group}
                                    fields={fields}
                                    usedFormFields={usedFormFields}
                                    setUsedFormFields={setUsedFormFields}
                                    accordionGroup={group}
                                    accordionState={notRequiredFormFieldsAccordions}
                                    setAccordionState={setNotRequiredFormFieldsAccordions}
                                />
                            ))}
                        </Box>
                    )}

                    {currentStep === 3 && (
                        <Box sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                4. Attachments
                            </Typography>
                            <FormField
                                label={"Files"}
                                helperText={getHelperText('file', "occurrence") || ''}
                                value={selectedFiles}
                                acceptedFileTypes={'.png, .jpg, .jpeg, .pdf, .docx, .xlsx'}
                                fileUpload={true}
                                onChangeFile={
                                    (files: File[] | File | null) => {
                                        if (Array.isArray(files)) {
                                            setSelectedFiles(files);
                                        } else if (files) {
                                            setSelectedFiles([files]);
                                        } else {
                                            setSelectedFiles([]);
                                        }
                                    }
                                }
                                required={false}
                                multipleFiles={true}
                            />
                        </Box>
                    )}

                    <Box  marginTop={"20px"} display={"flex"} justifyContent={"flex-end"} padding={'20px'} gap={'20px'}>
                        {currentStep > 1 && (
                            <StyledButton label="Back" color="secondary" size="large" onClick={goToPreviousStep} />
                        )}
                        {currentStep < 3 ? (
                            <StyledButton label="Next" color="primary" size="large" onClick={goToNextStep} />
                        ) : (
                            <StyledButton label="Submit" color="primary" size="large" onClick={handleSave} icon={<SaveIcon/>}/>
                        )}
                    </Box>

                </Box>
            }
        </Box>
    )
}

export default NewOccurrence;