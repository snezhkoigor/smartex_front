import store from '../store/index';
import Config from '../config/app';

export default (to, from, next) => {
    let jwtToken = localStorage.getItem('jwt_token');

    if (jwtToken !== null) {
        let jwtRole = localStorage.getItem('jwt_role');

        if(to.meta.role === Config.access.public || to.meta.role === undefined) {
            next();
        } else {
            if (to.meta.role.indexOf(atob(jwtRole)) === -1) {
                next({path: '/401'});
            } else {
                next();
            }
        }
    } else {
        store.dispatch('User/logout').then(() => {
            next({path: '/login'});
        });
    }
}