const searchForm=document.querySelector("form");
const searchReasultDiv=document.querySelector(".search-results");
const container=document.querySelector(".container");
let searchQuery="";
const App_Id="4db25c54";
const App_Key="70ee0358e82d810f58cf8d58d1b3c812	";


searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
    document.querySelector(".showing-results").innerHTML=`showing results for ${searchQuery}`
    fetchAPI();
})

async function fetchAPI(){
    const baseURL=`https://api.edamam.com/search?q=${searchQuery}&app_id=${App_Id}&app_key=${App_Key}&to=25`;
    const response= await fetch(baseURL);
    const data=await response.json();
    console.log(data)
    generateHTML(data.hits)
}
function generateHTML(results){
    container.classList.remove("initial")
    let generatedHTML=""
    results.map(result=>{
        generatedHTML+=
        `
            <div class="items">
                <img src=${result.recipe.image} alt="it's an image of pancake">  
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a href=${result.recipe.url} target="blank">View Recipe</a>
                </div>
                <p class="item-data">calories: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Diet Labels: ${result.recipe.dietLabels}</p>
                <p class="item-data">Health Labels: ${result.recipe.healthLabels}</p>
            </div>
        `

    })
    searchReasultDiv.innerHTML=generatedHTML
}