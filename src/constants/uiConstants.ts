export const dropdownFilterBibliographyOptions: { display: string; value: string }[] = [
    { display: "Journal Article", value: "journal_article" },
    { display: "Book", value: "book" },
    { display: "Conference Paper", value: "conference_paper" },
    { display: "Thesis", value: "thesis" },
    { display: "Report", value: "report" },
];

export const dropdownFilterAdminUserOptions: { display: string; value: string }[] = [
    { display: "Admin", value: "admin" },
    { display: "Manager", value: "Manager" },
    { display: "Biologist", value: "user" },

]

export const dropdownFilterAdminMandatoryFieldsOptions: { display: string; value: string }[] = [
    { display: "Mandatory", value: "true" },
    { display: "Optional", value: "false" },
]

export const dropdownFilterAdminFiledStatusOptions: { display: string; value: string }[] = [
    { display: "Active", value: "true" },
    { display: "Inactive", value: "false" },
]

export const dropdownEditUserRoleOptions: { display: string; value: string }[] = [
    { display: "Admin", value: "admin" },
    { display: "Manager", value: "manager" },
    { display: "User", value: "user" },
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