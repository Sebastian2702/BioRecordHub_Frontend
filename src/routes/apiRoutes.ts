export const AUTH_ROUTES = {
    login: '/login',
    register: '/register',
    logout: '/logout',
    user: '/api/user',
}

export const COOKIE_ROUTE = {
    csrf: '/sanctum/csrf-cookie',
}

export const BIBLIROGRAPHY_ROUTES = {
    bibliography: '/api/bibliographies',
    bibliographyCreateMultiple: '/api/bibliographies/multiple',
    bibliographyById: (id: number) => `/api/bibliographies/${id}`,
}

export const EXCEL_ROUTES = {
    bibliography: '/api/excel_import/bibliography',
}