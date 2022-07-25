import {auth} from '../services/Auth'

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = auth.isAuthenticated;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
        // return `Bearer ${currentUser.token}`;
    } else {
        return {};
    }
}