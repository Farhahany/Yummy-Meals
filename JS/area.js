export class Area {
    async area() {
        try {
            const areaReq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
            const areaResponse = await areaReq.json();
            return areaResponse;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}

export class AreaMeals {
    async areaMeals(areaName) {
        try {
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
            const response = await req.json();
            return response;
        } catch (error) {
            alert(`Error loading Meals: ${error.message}`);
            return [];
        }
    }
}