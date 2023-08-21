const CATEGORY_KEY = 'news_category';
const USER_KEY = 'user_key'

export const category_status = {
    saveCategory(category) {
        sessionStorage.setItem(CATEGORY_KEY, category);
    },
    getCategory() {
        return sessionStorage.getItem(CATEGORY_KEY);
    },
    removeCategory() {
        sessionStorage.removeItem(CATEGORY_KEY);
    }
}

export const user_status = {
    saveUser(token){
        sessionStorage.setItem(USER_KEY, token);
    },
    getUser(){
        return sessionStorage.getItem(USER_KEY);
    },
    removeUser(){
        sessionStorage.removeItem(USER_KEY);
    }
}