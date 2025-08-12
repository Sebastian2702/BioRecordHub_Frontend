export const dropdownFilterBibliographyOptions: { display: string; value: string }[] = [
    { display: "Journal Article", value: "journal_article" },
    { display: "Book", value: "book" },
    { display: "Conference Paper", value: "conference_paper" },
    { display: "Thesis", value: "thesis" },
    { display: "Report", value: "report" },
    { display: "Book Section", value: "book_section" },
];

export const dropdownProjectOptions: { display: string; value: string }[] = [
    { display: "Undergraduate Thesis", value: "undergraduate_thesis" },
    { display: "Master's Thesis", value: "masters_thesis" },
    { display: "PhD Dissertation", value: "phd_dissertation" },
    { display: "Postdoctoral Research", value: "postdoctoral_research" },
    { display: "Independent Study", value: "independent_study" },
    { display: "Scientific Paper", value: "scientific_paper" },
    { display: "Research Project", value: "research_project" },
    { display: "Capstone Project", value: "capstone_project" },
    { display: "Internship Report", value: "internship_report" },
    { display: "Coursework Project", value: "coursework_project" },
    { display: "Technical Report", value: "technical_report" },
    { display: "Other", value: "other" },
];


export const dropdownFilterAdminUserOptions: { display: string; value: string }[] = [
    { display: "Manager", value: "manager" },
    { display: "User", value: "user" },

]

export const dropdownFilterAdminMandatoryFieldsOptions: { display: string; value: boolean }[] = [
    { display: "Required", value: true },
    { display: "Optional", value: false },
]

export const dropdownFilterAdminFiledStatusOptions: { display: string; value: boolean }[] = [
    { display: "Active", value: true },
    { display: "Inactive", value: false },
]

export const dropdownEditUserRoleOptions: { display: string; value: string }[] = [
    { display: "admin", value: "admin" },
    { display: "Manager", value: "manager" },
    { display: "User", value: "user" },
]

export const dropDownOccurrenceFieldTypeOptions: { display: string; value: string }[] = [
    { display: "Text", value: "text" },
    { display: "Number", value: "number" },
    { display: "Checkbox", value: "checkbox" },
    { display: "Date", value: "date" },
]

export const dropdownOccurrenceFieldGroupOptions: { display: string; value: string }[] = [
    { display: "Geographic", value: "geographic" },
    { display: "Event", value: "event" },
    { display: "Occurrence", value: "occurrence" },
    { display: "Organism", value: "organism" },
    { display: "Identification", value: "identification" },
    { display: "Collection", value: "collection" },
    { display: "Dataset", value: "dataset" },
    { display: "Record-level", value: "record" },
    { display: "Location", value: "location" },
    { display: "Other", value: "other" },
]


export const itemTypeOptionsFormat: { key: string; display: string }[] = [
    { key: "journal_article", display: "Journal Article" },
    { key: "book", display: "Book" },
    { key: "conference_paper", display: "Conference Paper" },
    { key: "thesis", display: "Thesis" },
    { key: "report", display: "Report" },
]

export const allowedFileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "application/vnd.ms-excel.sheet.macroEnabled.12", // .xlsm
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12", // .xlsb
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template", // .xltx
    "application/vnd.ms-excel.template.macroEnabled.12" // .xltm
];