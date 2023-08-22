const CATEGORY_KEY = 'news_category';


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