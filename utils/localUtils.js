const USER_KEY = 'user_key'
const USERNAME_KEY = 'user_name'

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

export const username_status = {
    saveUserName(username){
        localStorage.setItem(USERNAME_KEY, username);
    },
    getUserName(){
        return localStorage.getItem(USERNAME_KEY);
    },
    removeUserName(){
        localStorage.removeItem(USERNAME_KEY);
    }
}