import Box from "@mui/material/Box";
import {useAuth} from "../../context/AuthContext.tsx";
import { COLORS, BORDER, FONT_SIZES } from '../../constants/ui.ts';
import Typography from '@mui/material/Typography';
import BackButton from "../../components/BackButton.tsx";
import FormField from "../../components/FormField.tsx";
import {useEffect, useState} from "react";
import {formatLabel} from "../../utils/helperFunctions.ts";
import StyledButton from "../../components/StyledButton.tsx";
import SaveIcon from '@mui/icons-material/Save';
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {formatContributors, splitFieldsByRequirement} from "../../utils/helperFunctions.ts";
import {GetNomenclature} from "../../services/nomenclature/nomenclature.ts";
import {GetProject} from "../../services/project/project.ts";
import {GetOccurrenceFields} from "../../services/admin/admin.ts";
import DropdownSelector from "../../components/DropdownSelector.tsx";
import {getHelperText, occurrenceFieldKeys, occurrenceGroupKeys} from "../../utils/formFieldHelpers.ts";
import dayjs from "dayjs";
import StyledAccordion from "../../components/StyledAccordion.tsx";

function NewOccurrence() {
    const {user} = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [requiredFormFields, setRequiredFormFields] = useState<any[]>([]);
    const [notRequiredFormFields, setNotRequiredFormFields] = useState<any[]>([]);
    const [nomenclatureOptions, setNomenclatureOptions] = useState<any[]>([]);
    const [projectOptions, setProjectOptions] = useState<any[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string[]>([]);
    const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<string[]>([]);
    const [occurrenceData, setOccurrenceData] = useState({
        scientific_name: '',
        event_date: '',
        country: '',
        locality: '',
        decimal_latitude: '',
        decimal_longitude: '',
        basis_of_record: '',
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [usedFormFields, setUsedFormFields] = useState<string[]>([]);
    const [notRequiredFormFieldsAccordion, setNotRequiredFormFieldsAccordion] = useState({
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
                GetNomenclature(),
                GetProject()
            ]);
            const { required, nonRequired } = splitFieldsByRequirement(fieldsResponse);
            setRequiredFormFields(required);
            setNotRequiredFormFields(nonRequired);

            setNomenclatureOptions(nomenclatureResponse);
            setProjectOptions(projectsResponse);
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
        console.log("Saving occurrence data:", occurrenceData);
    }

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
                                        value={field === 'event_date' ? occurrenceData[field as keyof typeof occurrenceData]
                                                ? dayjs(occurrenceData[field as keyof typeof occurrenceData])
                                                : null
                                            : occurrenceData[field as keyof typeof occurrenceData] || ''}
                                        onChange={(e) => setOccurrenceData({ ...occurrenceData, [field]: e.target.value })}
                                        date={field === 'event_date'}
                                        dateType={field === 'event_date' ? ['day', 'month', 'year'] : undefined}
                                        onChangeDate={(date: Date | null) => {
                                            setOccurrenceData({ ...occurrenceData, [field]: date?.toISOString().split('T')[0] || '' });
                                        }}
                                        required={true}
                                    />
                                ))}
                            </Box>
                            <DropdownSelector
                                data={nomenclatureOptions}
                                onChange={(ids) => setSelectedNomenclatureId(ids)}
                                isSingleSelect={true}
                                dataType={'nomenclature'}
                                selectedIds={selectedNomenclatureId}
                            />
                            <DropdownSelector
                                data={projectOptions}
                                onChange={(ids) => setSelectedProjectId(ids)}
                                isSingleSelect={true}
                                dataType={'projects'}
                                selectedIds={selectedProjectId}
                            />
                        </Box>
                    )}

                    {currentStep === 2 && (
                        <Box sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                2. Additional Required Fields
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                {requiredFormFields.map((field) => {
                                    if (!field.is_active) return null;

                                    return (
                                        <FormField
                                            key={field.id}
                                            label={formatLabel(field.name)}
                                            helperText={field.label || ''}
                                            value={
                                                /*field.type === 'date'
                                                    ? occurrenceData[field.name]
                                                        ? dayjs(occurrenceData[field.name])
                                                        : null
                                                    : occurrenceData[field.name] || ''*/
                                                null
                                            }
                                            onChange={(e) => console.log("Field change not implemented yet")}
                                            date={field.type === 'date'}
                                            dateType={field.type === 'date' ? ['day', 'month', 'year'] : undefined}
                                            onChangeDate={(date: Date | null) => {
                                                console.log("Field change not implemented yet");
                                            }}
                                            required={field.is_required}
                                        />
                                    );
                                })}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                3. Additional Not Required Fields
                            </Typography>
                            {occurrenceGroupKeys.map((group) => (
                                <Box marginBottom={'20px'} key={group}>
                                    <StyledAccordion
                                        key={group}
                                        title={formatLabel(group)}
                                        expanded={notRequiredFormFieldsAccordion[group] || false}
                                        onToggle={() =>
                                            setNotRequiredFormFieldsAccordion((prev) => ({
                                                ...prev,
                                                [group]: !prev[group],
                                            }))
                                        }
                                    >
                                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                            {notRequiredFormFields
                                                .filter((field) => field.group === group && field.is_active)
                                                .map((field) => (
                                                    <FormField
                                                        key={field.id}
                                                        label={formatLabel(field.name)}
                                                        helperText={field.label || ''}
                                                        value={
                                                            /*field.type === 'date'
                                                                ? occurrenceData[field.name]
                                                                    ? dayjs(occurrenceData[field.name])
                                                                    : null
                                                                : occurrenceData[field.name] || ''*/
                                                            null
                                                        }
                                                        onChange={(e) => console.log("Field change not implemented yet")}
                                                        date={field.type === 'date'}
                                                        dateType={field.type === 'date' ? ['day', 'month', 'year'] : undefined}
                                                        onChangeDate={(date: Date | null) => {
                                                            console.log("Field change not implemented yet");
                                                        }}
                                                        required={false}
                                                    />
                                                ))}
                                        </Box>
                                    </StyledAccordion>
                                </Box>
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
                                helperText={getHelperText('file', "nomenclature") || ''}
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