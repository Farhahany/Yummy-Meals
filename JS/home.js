export class Home {
    async home() {
        try {
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
            const response = await req.json();
            return response;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}