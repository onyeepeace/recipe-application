const click = document.getElementById('click')!;
const boxInput = document.getElementById('meal') as HTMLInputElement;
const foodResult = document.querySelector('.food-result')!;
const background = document.querySelector('.background') as HTMLHeadingElement;

var API_KEY = config.API_KEY;

const getFoodData = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${boxInput.value}&app_id=eeb7d952&app_key=${API_KEY}&from=0&to=100`);

    const data = await response.json();

    let foodDataHtml = '';

    data.hits.forEach((searchResult: { recipe: { label: string; image: string; calories: number; totalWeight: number; dietLabels: string; healthLabels: string; url: string; }; }) => {
        foodDataHtml += `
        <div class="recipe-div">
            <h1>${searchResult.recipe.label}</h1>
            <img class="recipe-image" src=${searchResult.recipe.image}>
            <div class="light">
                <p class="yield">${Math.round(searchResult.recipe.calories) + ' calories'}</p>
                <p class="yield">${Math.round(searchResult.recipe.totalWeight) + ' grams'}</p>
            </div>
            <class="bold">${searchResult.recipe.dietLabels}</p>
            <class="bold">${searchResult.recipe.healthLabels}</p>
            <a href=${searchResult.recipe.url} target="_blank"><mark>Directions</mark></a>
        </div>
        `
    });

    foodResult.innerHTML = foodDataHtml;
    boxInput.value = '';
    return data;
}

click.addEventListener('click', (e: Event) => {
    e.preventDefault();
    background.style.display = 'none';
    getFoodData();
})