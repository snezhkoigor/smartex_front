export default {
    getMessage(response) {
        let errors = null;
        if (response.status === 500) {
            errors = {
                system: 'Oops! Something wrong in server!'
            };
        } else {
            errors = response.data;
        }

        if (process.env !== 'production') window.console.log('error', errors);

        return errors;
    },
    goByStatusCode(status, router) {
        if (status === 404 || status === 500 || status === 401) {
            window.location.href = '/' + status;
        }
    }
}