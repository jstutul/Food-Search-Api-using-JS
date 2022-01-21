const loadData = async (a = "a") => {
  spinner("block");
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${a}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.meals);
};

const spinner = (s) => {
  const sp = document.getElementById("spiner");
  sp.style.display = s;
};

document.getElementById("search-food").addEventListener("click", function () {
  const itemField = document.getElementById("food-name");
  const itemName = itemField.value;
  if (itemName.toLowerCase() != "") {
    text = itemName.toLowerCase();
    updatedin();
    loadData(text);
  }
  itemField.value = "";
});

const displayData = (data) => {
  const blogContainer = document.getElementById("friends-container");
  data.forEach((item) => {
    const blogCol = document.createElement("div");
    blogCol.classList.add("col");
    const blogCard = document.createElement("div");
    blogCard.classList.add("card");
    blogCard.classList.add("h-100");
    const userPhoto = document.createElement("img");
    userPhoto.src = item.strMealThumb;
    blogCard.appendChild(userPhoto);
    blogBody = document.createElement("div");
    blogBody.classList.add("card-body");
    blogBody.innerHTML = `
      <h5 class="card-title">${item.strMeal} ID : ${item.idMeal}</h5>
      <p>${item.strInstructions.slice(0, 120)}....</p>
      <button 
      onclick="detailFood(${item.idMeal})" 
      class="btn btn-warning btn-sm">View Details</button>
      `;
    blogCard.appendChild(blogBody);
    blogCol.appendChild(blogCard);
    blogContainer.appendChild(blogCol);
  });

  spinner("none");
};

function detailFood(id) {
  console.log(id);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => getfooddetails(data.meals[0]));
}

function getfooddetails(data) {
  const detailSection = document.getElementById("food-details");
  detailSection.style.display = "block";
  const detailsCol = document.createElement("div");
  detailsCol.classList.add("col-lg-12");
  detailsCol.innerHTML = `
    <h2>${data.strMeal}</h2>
    <h5>Category : ${data.strCategory}</h5>
    <img src="${data.strMealThumb}" class="img-fluid" alt="" />
    <p class="my-2">
      ${data.strInstructions}
    </p>
    
    
    <h4>Indregents</h4>
    <ul class="list-styled">
      <li>${data.strIngredient1}</li>
      <li>${data.strIngredient2}</li>
      <li>${data.strIngredient3}</li>
      <li>${data.strIngredient4}</li>
      <li>${data.strIngredient5}</li>
      <li>${data.strIngredient6}</li>
      <li>${data.strIngredient7}</li>
      
    </ul>
    `;
  detailSection.append(detailsCol);
  const blogContainer = document.getElementById("friends-container");
  blogContainer.style.display = "none";
}
function updatedin() {
  let blogContainer = document.getElementById("friends-container");
  blogContainer.textContent = "";
}
