export class SearchByName {
    async searchByName(mealName) {
        try {
            const allMealsReq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
            const allMealsResponse = await allMealsReq.json();
            return allMealsResponse;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}

export class SearchByFirstLetter {
    async searchByFirstLetter(letter) {
        try {
            const allFirstLetterDataReq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            const allFirstLetterDataResponse = await allFirstLetterDataReq.json();
            return allFirstLetterDataResponse;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}