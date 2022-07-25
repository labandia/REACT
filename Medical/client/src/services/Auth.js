
let isAuthenticated = JSON.parse(localStorage.getItem('user'));

export const auth = {
    isAuthenticated,
    access,
    isaccess,
    logout
};


function isaccess(){
    return isAuthenticated;
}


function access(isload){
    return isload;
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

