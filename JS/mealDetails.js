export class Details {
    async details(id) {
        try {
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const response = await req.json();
            return response;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}