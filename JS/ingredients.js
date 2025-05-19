export class Ingredients {
    async ingredients() {
        try {
            const ingredientsReq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            const ingredientsResponse = await ingredientsReq.json();
            return ingredientsResponse;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}

export class IngredientMeals {
    async ingredientMeals(ingredient) {
        try {
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            const response = await req.json();
            return response;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}