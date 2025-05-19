export class Categories {
    async categories() {
        try {
            const CategoriesReq = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
            const categoriesResponse = await CategoriesReq.json();           
            return categoriesResponse;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}

export class CategoryMeals {
    async categoryMeals(category) {
        try {
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=beef`);
            const response = await req.json(); 
            return response;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}