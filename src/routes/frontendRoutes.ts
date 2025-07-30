export const ROUTES = {
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    nomenclature: '/nomenclature',
    bibliography: '/bibliography',
    occurrences: '/occurrences',
    projects: '/projects',
    reports: '/reports',
    logout: '/logout',
    admin: '/administrator',
    profile: '/profile',
    bibliographyId: '/bibliography/:id',
    bibliographyCreate: '/bibliography/new',
    bibliographyFileUpload: '/bibliography/new_file_upload',
    nomenclatureId: '/nomenclature/:id',
    nomenclatureCreate: '/nomenclature/new',
    nomenclature_search: '/nomenclature_search/:field/:value',
    nomenclatureFileUpload: '/nomenclature/new_file_upload',
    nomenclatureSearchResults: '/nomenclature/search_results',
    projectsId: '/projects/:id',
}

export const ADMIN_ROUTES = {
    admin: '/administrator',
    bibliographyEdit: '/bibliography/edit/:id',
    nomenclatureEdit: '/nomenclature/edit/:id',
}