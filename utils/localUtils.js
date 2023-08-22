const USER_KEY = 'user_key'

export const user_status = {
    saveUser(token){
        localStorage.setItem(USER_KEY, token);
    },
    getUser(){
        return localStorage.getItem(USER_KEY);
    },
    removeUser(){
        localStorage.removeItem(USER_KEY);
    }
}