export default {
    getPaginationParam(paginationParam) {
        let params = {};

        if (paginationParam.fieldsets !== undefined) {
            params.fieldsets = paginationParam.fieldsets;
        }
        if (paginationParam.filters !== undefined) {
            params.filters = paginationParam.filters;
        }
        if (paginationParam.include !== undefined) {
            params.include = paginationParam.include;
        }
        if (paginationParam.rowsPerPage !== undefined && paginationParam.page !== undefined) {
            if (paginationParam.rowsPerPage === -1) {
                params.pagination = {
                    'limit': 1000000,
                    'offset': 0
                };
            } else {
                params.pagination = {
                    'limit': paginationParam.rowsPerPage,
                    'offset': (paginationParam.page - 1) * paginationParam.rowsPerPage
                };
            }
        }
        if (paginationParam.sortBy !== undefined) {
            params.sort = {
                [paginationParam.sortBy]: paginationParam.descending !== undefined ? (paginationParam.descending ? 'desc' : 'asc') : 'asc',
            };
        }
        if (paginationParam.q !== undefined && paginationParam.q !== '') {
            params.q = paginationParam.q;
        }

        return params;
    },
    checkIsOkAnswerStatus(status) {
        if (status === 200 || status === 204) {
            return true;
        }

        return false;
    }
}