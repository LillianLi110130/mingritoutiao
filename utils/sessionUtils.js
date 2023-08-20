const CATEGORY_KEY = 'news_category';
const HEIGHTS_KEY = 'heights'

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

export const heights_status = {
    saveHeights(heights) {
        sessionStorage.setItem(HEIGHTS_KEY, heights.join('.'));
    },
    getHeights() {
        return sessionStorage.getItem(HEIGHTS_KEY);
    },
    removeHeights() {
        sessionStorage.removeItem(HEIGHTS_KEY);
    }
}