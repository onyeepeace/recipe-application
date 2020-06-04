const click = document.getElementById('click');
const boxInput = document.getElementById('meal');
const foodResult = document.querySelector('.food-result');
const background = document.querySelector('.background');

const getFoodData = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${boxInput.value}&app_id=eeb7d952&app_key=94d54ed8987c9748fda0ab7882276088&from=0&to=100`);

    const data = await response.json();
    console.log(data);

    let foodDataHtml = '';

    data.hits.forEach(searchResult => {
        foodDataHtml += `
        <div class="recipe-div">
            <h1>${searchResult.recipe.label}</h1>
            <img class="recipe-image" src=${searchResult.recipe.image}>
            <div class="light">
                <p class="yield">${Math.round(searchResult.recipe.calories) + ' calories'}</p>
                <p class="yield">${Math.round(searchResult.recipe.totalWeight) + ' grams'}</p>
            </div>
            < class="bold">${searchResult.recipe.dietLabels}</p>
            < class="bold">${searchResult.recipe.healthLabels}</p>
            <a href=${searchResult.recipe.url} target="_blank"><mark>Directions</mark></a>
        </div>
        `
    });

    foodResult.innerHTML = foodDataHtml;

    boxInput.value = '';
    
    return data;
}

click.addEventListener('click', function(e) {
    e.preventDefault();
    background.style.display = 'none';
    getFoodData();
})