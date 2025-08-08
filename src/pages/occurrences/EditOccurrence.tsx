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
import {useNavigate, useParams} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {formatContributors, splitFieldsByRequirement} from "../../utils/helperFunctions.ts";
import {GetSpeciesAutocomplete} from "../../services/nomenclature/nomenclature.ts";
import {GetProjectAutoComplete} from "../../services/project/project.ts";
import {GetOccurrenceFields} from "../../services/admin/admin.ts";
import {getHelperText, occurrenceFieldKeys, occurrenceGroupKeys} from "../../utils/formFieldHelpers.ts";
import dayjs from "dayjs";
import StyledAccordion from "../../components/StyledAccordion.tsx";
import OccurrencesFormAutoComplete from "../../components/OccurrencesFormAutoComplete.tsx";
import {GetOccurrencesById} from "../../services/occurrences/occurrences.ts";
import FilesEditor from "../../components/FilesEditor.tsx";
import {DeleteOccurrenceFile, EditOccurrenceRequest} from "../../services/occurrences/occurrences.ts";
import CustomDialog from "../../components/CustomDialog.tsx";


function EditOccurrence() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [occurrenceData, setOccurrenceData] = useState<any>(null);
    const [nomenclatureOptions, setNomenclatureOptions] = useState<any[]>([]);
    const [projectOptions, setProjectOptions] = useState<any[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number>();
    const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<number>();
    const [requiredFormFields, setRequiredFormFields] = useState<any[]>([]);
    const [notRequiredFormFields, setNotRequiredFormFields] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [usedFormFields, setUsedFormFields] = useState<{ id: string, value: string }[]>([]);
    const [error, setError] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const { id } = useParams();
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
    const [currentStep, setCurrentStep] = useState(1); // 1: Basic, 2: Fields, 3: Edit Files, 4: New Files
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [deleteTitle, setDeleteTitle] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);


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

    const goToNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const fetchData = async (id: number) => {
        setLoading(true);
        try {
            const [fieldsResponse, nomenclatureResponse, projectsResponse, occurrenceResponse] = await Promise.all([
                GetOccurrenceFields(),
                GetSpeciesAutocomplete(),
                GetProjectAutoComplete(),
                GetOccurrencesById(id)
            ]);
            const { required, nonRequired } = splitFieldsByRequirement(fieldsResponse);
            const formattedNomenclature = nomenclatureResponse.map((item: any) => ({
                id: item.id,
                label: `${item.species} - ${item.author}`
            }));
            const formattedProjects = projectsResponse.map((item: any) => ({
                id: item.id,
                label: `${item.title} - ${formatLabel(item.research_type)} - ${truncateString(item.description, 50)}`
            }));
            const formattedUsedFields = occurrenceResponse.fields.map((field: any) => ({
                id: field.pivot.occurrence_field_id,
                value: field.pivot.value,
            }))

            setRequiredFormFields(required);
            setNotRequiredFormFields(nonRequired);
            setNomenclatureOptions(formattedNomenclature);
            setProjectOptions(formattedProjects);
            setSelectedProjectId(occurrenceResponse.project ? occurrenceResponse.project.id : undefined);
            setSelectedNomenclatureId(occurrenceResponse.nomenclature ? occurrenceResponse.nomenclature.id : undefined);
            setFiles(occurrenceResponse.files || []);
            setImages(occurrenceResponse.images || []);
            setUsedFormFields(formattedUsedFields);
            setOccurrenceData({ ...occurrenceResponse, nomenclature: undefined, project: undefined, files: undefined, fields: undefined, images: undefined });
        } catch (error) {
            console.error("Error fetching occurrenceData:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteDialogOpen = (id:number, title:string) => {
        setDeleteId(id);
        setDeleteTitle(title);
        setDeleteDialogOpen(true);
    };

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

    const handleDynamicDateChange = (fieldId: string, date: Date | null) => {
        const formatted = date ? dayjs(date).format('YYYY-MM-DD') : '';
        handleDynamicFieldChange(fieldId, formatted);
    };

    const getValueForField = (fieldId: string, fieldType: string) => {
        const field = usedFormFields.find(f => f.id === fieldId);
        if (fieldType === 'date') {
            return field ? dayjs(field.value).isValid() ? dayjs(field.value) : null : null;
        }
        return field ? field.value : null;
    }

    const handleSave = () => {
       const missingBasicFields = occurrenceFieldKeys.filter((key) => !occurrenceData[key]);
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
            if (value && key !== 'project_id' && key !== 'nomenclature_id') {
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

        formData.append('_method', 'PUT');

        EditOccurrenceRequest(Number(id), formData, setLoading, setError, navigate)

    }


    const handleDeleteFile = async (fileId: number) => {
        try{
            setLoading(true);
            await DeleteOccurrenceFile(Number(id), fileId);
            setImages(prev => prev.filter((img) => Number(img.id) !== Number(fileId)));
            setFiles(prev => prev.filter((file) => Number(file.id) !== Number(fileId)));
            handleDeleteDialogClose();
            toast.success("File deleted successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false);
        }
        catch(error:any) {
            setLoading(false);
            setError("Failed to delete file");
        }

    }

    const deleteDialogContent = (
        <Box>
            <Typography variant="body1">
                Are you sure you want to delete <strong>"{deleteTitle}"</strong>?
            </Typography>
        </Box>
    )

    useEffect(() => {
        if (!id) return;
        fetchData(Number(id));
    }, [id]);

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
            <CustomDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                title="Confirm Deletion"
                contentText={deleteDialogContent}
                content={"delete"}
                dialogLoading={dialogLoading}
                action={() => {
                    handleDeleteFile(deleteId || 0);
                }}
            />
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
                                fontSize: FONT_SIZES.large,
                                textShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                            }}
                        >
                            Edit {occurrenceData.scientific_name} - {occurrenceData.event_date} - {occurrenceData.locality}
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
                                            setOccurrenceData({
                                                ...occurrenceData,
                                                [field]: date ? dayjs(date).format('YYYY-MM-DD') : ''
                                            });
                                        }}
                                        required={true}
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
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: '20px' }}>
                                {requiredFormFields.map((field) => {
                                    if (!field.is_active) return null;

                                    return (
                                        <FormField
                                            key={field.id}
                                            label={formatLabel(field.name)}
                                            helperText={field.label || ''}
                                            value={getValueForField(field.id, field.type)}
                                            onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
                                            date={field.type === 'date'}
                                            dateType={field.type === 'date' ? ['day', 'month', 'year'] : undefined}
                                            onChangeDate={(date: Date | null) => handleDynamicDateChange(field.id, date)}
                                            required={field.is_required}
                                        />
                                    );
                                })}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                3. Additional Non-Required Fields
                            </Typography>
                            {occurrenceGroupKeys.map((group) => (
                                <Box marginBottom={'20px'} key={group}>
                                    <StyledAccordion
                                        key={group}
                                        title={`Expand to fill ${formatLabel(group)} information`}
                                        expanded={notRequiredFormFieldsAccordions[group] || false}
                                        onToggle={() =>
                                            setNotRequiredFormFieldsAccordions((prev) => ({
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
                                                        value={getValueForField(field.id, field.type)}
                                                        onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
                                                        date={field.type === 'date'}
                                                        dateType={field.type === 'date' ? ['day', 'month', 'year'] : undefined}
                                                        onChangeDate={(date: Date | null) => handleDynamicDateChange(field.id, date)}
                                                        required={false}
                                                    />
                                                ))}
                                        </Box>
                                    </StyledAccordion>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {
                        currentStep === 3 && (
                            <Box sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                    4. Files and Images
                                </Typography>
                                <Box display={'flex'} flexDirection={'column'} gap={'150px'}>
                                    <FilesEditor files={images} altText={"Occurrence Image"} deleteImage={(index) => {handleDeleteDialogOpen(index, "this image")}} images={true} />
                                    <FilesEditor files={files} altText={"Occurrence File"} deleteImage={(index) => {handleDeleteDialogOpen(index, "this file")}} images={false} />
                                </Box>
                            </Box>
                        )
                    }

                    {currentStep === 4 && (
                        <Box sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                5. Attachments
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
                        {currentStep < 4 ? (
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

export default EditOccurrence;