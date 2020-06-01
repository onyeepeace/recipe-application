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
            <img src=${searchResult.recipe.image} class="recipe-image">
            <h1>${searchResult.recipe.label}</h1>
            <h5>${searchResult.recipe.yield + ' serving(s)'}</h5>
            <h5>${searchResult.recipe.dietLabels}</h5>
            <h5>${searchResult.recipe.healthLabels}</h5>
            <h5>${searchResult.recipe.calories + ' calories'}</h5>
            <h5>${searchResult.recipe.totalWeight + ' grams'}</h5>
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