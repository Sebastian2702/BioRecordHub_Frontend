export const AUTH_ROUTES = {
    login: '/login',
    register: '/register',
    logout: '/logout',
    user: '/api/user',
    resetPassword: 'api/user/password',
    resetEmail: 'api/user/email',
}

export const COOKIE_ROUTE = {
    csrf: '/sanctum/csrf-cookie',
}

export const BIBLIROGRAPHY_ROUTES = {
    bibliography: '/api/bibliographies',
    bibliographyFromExcel: '/api/bibliographies/multiple',
    bibliographyById: (id: number) => `/api/bibliographies/${id}`,
    bibliographyFile: (id: number) => `/api/bibliographies/file/${id}`,
    deleteNomenclatureFromBibliography: (id: number, nomenclatureId: number) => `/api/bibliographies/${id}/nomenclatures/${nomenclatureId}`,
}

export const NOMENCLATURE_ROUTES = {
    nomenclature: '/api/nomenclature',
    nomenclatureById: (id: number) => `/api/nomenclature/${id}`,
    nomenclatureFromExcel: '/api/nomenclature/multiple',
    autocompleteNomenclature: '/api/nomenclature/getAutoComplete',
    speciesAutocomplete: '/api/nomenclature/speciesAutocomplete',
    searchNomenclature: '/api/nomenclature/search',
    deleteBibliographyFromNomenclature: (id: number, bibliographyId: number) => `/api/nomenclature/${id}/bibliographies/${bibliographyId}`,
    deleteNomenclatureImage: (id: number, imageId: number) => `/api/nomenclature/${id}/image/${imageId}`,
}

export const EXCEL_ROUTES = {
    bibliographyImport: '/api/excel_import/bibliography',
    nomenclatureImport: '/api/excel_import/nomenclature',
    occurrenceExport: '/api/excel_export/occurrence',
    occurrenceExportById: (id: number) => `/api/excel_export/occurrence/${id}`,
}

export const Admin_ROUTES = {
    getUsers: '/api/admin/users',
    deleteUser: (id: number) => `/api/admin/users/${id}`,
    updateRole: (id: number) => `/api/admin/users/${id}`,
    getOccurrenceFields: '/api/admin/occurrenceField',
    getOccurrenceFieldById: (id: number) => `/api/admin/occurrenceField/${id}`,
}

export const PROJECT_ROUTES = {
    projects: '/api/project',
    projectsById: (id: number) => `/api/project/${id}`,
    projectAutoComplete: '/api/project/getAutoComplete',
    deleteProjectFileById: (id: number, fileID: number) => `/api/project/${id}/file/${fileID}`,
}

export const  OCCURRENCE_ROUTES = {
    occurrences: '/api/occurrence',
    occurrencesById: (id: number) => `/api/occurrence/${id}`,
    occurrenceFile: (occurrenceId: number, fileId: number) => `/api/occurrence/${occurrenceId}/file/${fileId}`,
    occurrenceGetCsv: (occurrenceId: number) => `/api/occurrence/${occurrenceId}/export/csv`,
}

export const DASHBOARD_ROUTES = {
    dashboard: '/api/dashboard',
}