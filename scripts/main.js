//Init screen 1 slider
var slider = Peppermint(document.getElementById('peppermint'), {
  dots: true,
  onSetup: function(n) {
    console.log('Peppermint setup done. Slides found: ' + n);
  }
});

//Screens
var screens = [];

screens[0] = document.getElementById('screen1');
screens[1] = document.getElementById('screen2');
screens[2] = document.getElementById('screen3');
screens[3] = document.getElementById('screen4');
screens[4] = document.getElementById('screen5');
var startScreen = screens[0];
var currentScreen = screens[0];
var nextScreen  = screens[1];

//Ingredient Elements Screen3
var symptomLocation = document.getElementById('symptomLocation');
var ingredientLocation = document.getElementById('ingredientLocation');

var ingredientImg = document.querySelector('.ingredient-info-img');

var ingredientHeader = document.querySelector('.ingredient-info-header');

var ingredientDesc = document.querySelector('.desc');

//Buttons
var button = document.querySelectorAll('.next');
//Re-add this later
//var backButton = document.querySelectorAll('.back');
var browseAllFoodItems = document.querySelectorAll('.browse-button');
var footers = document.querySelectorAll('.footer');

//Buttons to switch channels
var symptomsButton = document.getElementById('symptoms');
var ingredientsButton = document.getElementById('ingredients');

//Buttons to switch channels on ingredient page
var ingredientSymptomsButton = document.getElementById('ingredientSymptoms');
var ingredientIngredientsButton = document.getElementById('ingredientIngredients');

//Symptom Menu Buttons
symptomDropdownButtons = document.querySelectorAll('.dropdown-button');

symptomDropdownImages = document.querySelectorAll('.dropdown-image');

//Nutrient Table elements
var nutrientDOMelements = [];

//Food storage arrays
var allFoodItems = [];
var throat = [];
var menst = [];
var head = [];
var muscle = [];
var acne = [];

//Store all food items in an array
for (var i = 0; i < foods.length; i++) {
  allFoodItems.push(foods[i]);
}

//For each food item check if it belongs in a given category, if it does store it
for (var i = 0; i < foods.length; i++) {
  if (foods[i].category.includes("throat")) {
    throat.push(foods[i]);
  }
  if (foods[i].category.includes("menstruation")) {
    menst.push(foods[i]);
  }
  if (foods[i].category.includes("headaches")) {
    head.push(foods[i]);
  }
  if (foods[i].category.includes("muscle")) {
    muscle.push(foods[i]);
  }
  if (foods[i].category.includes("acne")) {
    acne.push(foods[i]);
  }
}

function changeScreen(currentScreenNum, nextScreenNum) {
  //Hide the current screen if it is active
  if (screens[currentScreenNum].classList.contains('active')) {
    screens[currentScreenNum].classList.remove('active');
    screens[currentScreenNum].classList.add('hidden');
  }
  //Show the next screen if it is hidden
  if (screens[nextScreenNum].classList.contains('hidden')) {
    screens[nextScreenNum].classList.remove('hidden');
    screens[nextScreenNum].classList.add('active');
  }
  //Log the current screen to the console
  currentScreen = screens[nextScreenNum];
  console.log('Current screen: ' + currentScreen.id);
}

//----SCREEN 2----//

var symptomList = document.getElementById('symptomList');
var ingredientList = document.getElementById('ingredientList');
var symptomListArrow = document.querySelector('.symptoms-arrow');
var ingredientListArrow = document.querySelector('.ingredients-arrow');

//Call the switch list funtion on symptomsButton and ingredientsButton
symptomsButton.addEventListener('click', function() {
  console.log('clicked symptomsButton');
  symptomList.classList.remove('hidden');
  symptomList.classList.add('active');
  symptomListArrow.classList.remove('hidden');
  symptomListArrow.classList.add('active');

  ingredientList.classList.remove('active');
  ingredientList.classList.add('hidden');
  ingredientListArrow.classList.remove('active');
  ingredientListArrow.classList.add('hidden');
});

ingredientsButton.addEventListener('click', function() {
  console.log('clicked ingredientsButton');
  //ensure list & arrow are active
  ingredientList.classList.remove('hidden');
  ingredientList.classList.add('active');
  ingredientListArrow.classList.remove('hidden');
  ingredientListArrow.classList.add('active');
  //And other list and other arrow are hidden
  symptomList.classList.remove('active');
  symptomList.classList.add('hidden');
  symptomListArrow.classList.remove('active');
  symptomListArrow.classList.add('hidden');

});

//Hide and show 2nd level lists
symptomDropdownButtons
symptomDropdownImages

for (var i = 0; i < symptomDropdownButtons.length; i++) {
  symptomDropdownButtons[i].addEventListener('click', function(e){
    //ChildNodes returns 'undefined'
    //symptomDropdownButtons[i].childNodes[3].classList.toggle('active');
    //symptomDropdownButtons[i].childNodes[3].classList.toggle('hidden');
    //console.log(e.target.innerHTML);

    if (e.target.innerHTML == "Sore Throat") {
      console.log('sore throat clicked')
      var throatList = document.getElementById('throatList')
      throatList.classList.toggle('hidden')
      symptomDropdownImages[0].classList.toggle('rotated-down');
    }

    if (e.target.innerHTML == "Menstruation") {
      console.log('Menstruation clicked')
      var menstList = document.getElementById('menstList')
      menstList.classList.toggle('hidden')
      symptomDropdownImages[1].classList.toggle('rotated-down');
    }

    if (e.target.innerHTML == "Headaches") {
      console.log('Headaches clicked')
      var headList = document.getElementById('headList')
      headList.classList.toggle('hidden')
      symptomDropdownImages[2].classList.toggle('rotated-down');
    }

    if (e.target.innerHTML == "Muscle Pain") {
      console.log('Muscle Pain clicked')
      var muscleList = document.getElementById('muscleList')
      muscleList.classList.toggle('hidden')
      symptomDropdownImages[3].classList.toggle('rotated-down');
    }

    if (e.target.innerHTML == "Acne") {
      console.log('Acne clicked')
      var acneList = document.getElementById('acneList')
      acneList.classList.toggle('hidden')
      symptomDropdownImages[4].classList.toggle('rotated-down');
    }

  })
}

function getProductData(product) {
  //RECIPE API CODE
  //Key: f7fd2f40172b4865a188b4cb99d97591
  //Request: https://dev.tescolabs.com/grocery/products/?query=honey&offset=0&limit=0&
  $.ajax({url: 'https://dev.tescolabs.com/grocery/products/?query=' + product + '&offset=0&limit=10&',
  beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f7fd2f40172b4865a188b4cb99d97591");
            }, type: "GET",
            // Request body
            data: "{body}", success: function(result){
        console.log(result.uk.ghs.products.results)

        results = result.uk.ghs.products.results;

        var groceryList = document.querySelector('.grocery-list');

        for (var i = 0; i < results.length; i++) {
          // var prodImg = results[i].image;
          // var prodName = results[i].name;
          // var category = results[i].superDepartment;
          // var price = results[i].price;
          var li = document.createElement('li');
          var prodImg = document.createElement('img');
          var prodName = document.createElement('p');
          var cat = document.createElement('span');
          var price = document.createElement('span');

          prodImg.src = results[i].image;
          prodName.textContent = results[i].name;
          cat.textContent = results[i].superDepartment;
          price.textContent = '£' + results[i].price;


          li.appendChild(prodImg);
          li.appendChild(prodName);
          prodName.appendChild(cat);
          prodName.appendChild(price);

          groceryList.appendChild(li)

        }
  }});
}


function getRecipe(ingredient) {
  //RECIPE API CODE
  //Key: a7bcebc0a91d34322a4ff5272180369b
  //Request: http://food2fork.com/api/search?key={a7bcebc0a91d34322a4ff5272180369b}&q=oranges
  $.ajax({url: 'https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=a7bcebc0a91d34322a4ff5272180369b&q=' + ingredient, success: function(result){
        //Store result as JSON in 'p' variable
        var p = JSON.parse(result);
        var recipes = p.recipes;
        console.log(recipes);
        //Grab recipe list
        var recipeList = document.querySelector('.recipe-list');
        recipeList.innerHTML = '';
        //For each recipe item
        for (var i = 0; i < recipes.length; i++) {
          //Create a list item
          var recipeItem = document.createElement('li');
          //Create a link
          var a = document.createElement('a');
          //Set the link text to recipe item title
          a.textContent = recipes[i].title;
          //Set a href to recipe link
          a.setAttribute('href', recipes[i].source_url);
          //Set list item background to recipe image
          recipeItem.style.background = "url('" + recipes[i].image_url + "')";
          recipeItem.style.backgroundSize = "cover";
          recipeItem.appendChild(a);
          //Add list item to to list
          recipeList.appendChild(recipeItem);
        }

  }});
}

var secondLevelLists = document.querySelectorAll('.second-level-list');

function generateFoodItem(symptom, header, img, desc, location, ndbNo,) {
  //JSON Params:
  //Symptom location string
  //ref to e.target.textContent
  //img from JSON e.g. foods[0].img
  //desc from JSON e.g. foods[0].desc
  //EXTERNAL Params:
  //ndbNo sting
  //Food2fork string

  //Set DOM content
  symptomLocation.textContent = symptom;
  ingredientLocation.textContent =  location;
  ingredientHeader.textContent = header;
  ingredientImg.src = img;
  ingredientDesc.textContent = desc

  //Change Screen
  changeScreen(1,2);
  //Get & Set nutritionalInfo
  getNutritionalInfo(ndbNo);
  //Get & Set Recipes
  getRecipe(header);
}

//Get nutritional information from USDA
//Access food image via
// "url(" + foods[0].image + ")";

//Store nutrition table and button
var nutritionalButton = document.querySelector('.nutrition-button');
var nutritionTable = document.querySelector('.nutritional-info--table')

//When nutrition button is clicked expand the table
nutritionalButton.addEventListener('click', function () {
  nutritionTable.classList.toggle('table-expanded')
})

function getNutritionalInfo(databaseNumber) { //e.g. Oranges
  //Justify Technologies for blogging homework 22nd feb
  //GOV API key: 3D6pSDVULi3GrRrFMC6my8G9NMYG9GA3gRC7KpUv
  //Recieve info: result.foods[0].food.nutrients
  //Jquery AJAX call to USDA nutrition database
  $.ajax({url: 'https://api.nal.usda.gov/ndb/V2/reports?ndbno=' + databaseNumber + '&type=f&format=json&api_key=3D6pSDVULi3GrRrFMC6my8G9NMYG9GA3gRC7KpUv', success: function(result){
    console.log(result.foods[0].food.nutrients);

    //Store all nutrient values from api call
    var calories = result.foods[0].food.nutrients[1].value;
    console.log(calories);
    var fats = result.foods[0].food.nutrients[31].value;
    var carbs = result.foods[0].food.nutrients[6].value;
    var fiber = result.foods[0].food.nutrients[7].value;
    var protein = result.foods[0].food.nutrients[3].value;
    var vitamins = [];

    //Loop through nutrients and pick out any vitamins
    for (var i = 0; i < result.foods[0].food.nutrients.length; i++) {
      if (result.foods[0].food.nutrients[i].group == 'Vitamins') {
        vitamins.push(result.foods[0].food.nutrients[i].name);
      }
    }

    //Store dom elements for nutrients
    nutrientDOMelements = [
      document.getElementById('calories'),
      document.getElementById('fats'),
      document.getElementById('carbs'),
      document.getElementById('fiber'),
      document.getElementById('proteins'),
      document.getElementById('vits')
    ]

    //Set DOM elements to values from API call
    //for each dom element
    //if the id name matches calories
    //You will have to reset these dom elements when leaving page
    for (var i = 0; i < nutrientDOMelements.length; i++) {
      if (nutrientDOMelements[i].innerHTML == '') {
        if (nutrientDOMelements[i].id === 'calories') {
          nutrientDOMelements[i].innerHTML = calories;
        } else if (nutrientDOMelements[i].id === 'fats') {
          nutrientDOMelements[i].innerHTML = fats;
        } else if (nutrientDOMelements[i].id === 'carbs') {
          nutrientDOMelements[i].innerHTML = carbs;
        } else if (nutrientDOMelements[i].id === 'fiber') {
          nutrientDOMelements[i].innerHTML = fiber;
        } else if (nutrientDOMelements[i].id === 'proteins') {
          nutrientDOMelements[i].innerHTML = protein;
        } else if (nutrientDOMelements[i].id === 'vits') {
          nutrientDOMelements[i].innerHTML = vitamins;
        }
      }
    }
  }});
}

for (var i = 0; i < secondLevelLists.length; i++) {
  secondLevelLists[i].addEventListener('click', function(e){
    console.log(e.target.textContent)

    if (e.target.textContent == "Honey") {
      generateFoodItem('Sore Throat', foods[0].foodItemName, foods[0].img, foods[0].desc, e.target.textContent, 19296);
      getProductData('honey')
      changeScreen(1,2);
    }

    if (e.target.textContent == "Lemon") {
      generateFoodItem('Sore Throat', foods[1].foodItemName, foods[1].img, foods[1].desc, e.target.textContent, 09156);
      getProductData('lemon')
      changeScreen(1,2);
    }

    if (e.target.textContent == "Turmeric") {
      generateFoodItem('Sore Throat', foods[2].foodItemName, foods[2].img, foods[2].desc, e.target.textContent, 02043);
      getProductData('turmeric')
      changeScreen(1,2);
    }

    if (e.target.textContent == "Ginger") {
      generateFoodItem('Sore Throat', foods[3].foodItemName, foods[3].img, foods[3].desc, e.target.textContent, 11216);
      getProductData('ginger')
      changeScreen(1,2);
    }

    if (e.target.textContent == "Whiskey") {
      generateFoodItem('Sore Throat', foods[4].foodItemName, foods[4].img, foods[4].desc, e.target.textContent, 14531);
      getProductData('whiskey')
      changeScreen(1,2);
    }

    if (e.target.textContent == "Garlic") {
      generateFoodItem('Sore Throat', foods[5].foodItemName, foods[5].img, foods[5].desc, e.target.textContent, 11215);
      getProductData('garlic')
      changeScreen(1,2);
    }

    if (e.target.textContent == "Yoghurt") {
      generateFoodItem('Menstruation', foods[6].foodItemName, foods[6].img, foods[6].desc, e.target.textContent, 45126645);
      getProductData('yoghurt');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Chamomile Tea") {
      generateFoodItem('Menstruation', foods[7].foodItemName, foods[7].img, foods[7].desc, e.target.textContent, 14545);
      getProductData('chamomile')
      changeScreen(1,2);
    }

    if (e.target.textContent == "Whole Grains") {
      generateFoodItem('Menstruation', foods[8].foodItemName, foods[8].img, foods[8].desc, e.target.textContent, 20649);
      getProductData('garlic')
      changeScreen(1,2);
    }

    if (e.target.textContent == "Jacket Potato") {
      generateFoodItem('Headaches', foods[14].foodItemName, foods[14].img, foods[14].desc, e.target.textContent, 11352);
      getProductData('potato');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Watermelon") {
      generateFoodItem('Headaches', foods[15].foodItemName, foods[15].img, foods[15].desc, e.target.textContent, 09326);
      getProductData('watermelon');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Coffee") {
      generateFoodItem('Headaches', foods[16].foodItemName, foods[16].img, foods[16].desc, e.target.textContent, 14222);
      getProductData('coffee');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Salmon") {
      generateFoodItem('MusclePain', foods[20].foodItemName, foods[20].img, foods[20].desc, e.target.textContent, 15076);
      getProductData('salmon');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Cherries") {
      generateFoodItem('Muscle Pain', foods[21].foodItemName, foods[21].img, foods[21].desc, e.target.textContent, 09063);
      getProductData('cherries');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Oranges") {
      generateFoodItem('Muscle Pain', foods[22].foodItemName, foods[22].img, foods[22].desc, e.target.textContent, 19097);
      getProductData('oranges');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Green Tea") {
      generateFoodItem('Acne', foods[23].foodItemName, foods[23].img, foods[23].desc, e.target.textContent, 14190);
      getProductData('green tea');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Green Tea") {
      generateFoodItem('Acne', foods[23].foodItemName, foods[23].img, foods[23].desc, e.target.textContent, 14190);
      getProductData('green tea');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Oysters") {
      generateFoodItem('Acne', foods[24].foodItemName, foods[24].img, foods[24].desc, e.target.textContent, 15167);
      getProductData('oyster');
      changeScreen(1,2);
    }

    if (e.target.textContent == "Probiotics") {
      generateFoodItem('Acne', foods[25].foodItemName, foods[25].img, foods[25].desc, e.target.textContent, 45334803);
      getProductData('probiotic');
      changeScreen(1,2);
    }

  })
}

// for (var i = 0; i < ingredientList.length; i++) {
//   ingredientList[i].addEventListener('click', function(e){
//     console.log(e.target.textContent);
//   })
// }

ingredientList.addEventListener('click', function(e){
  console.log(e.target.textContent);

  if (e.target.textContent == "Honey") {
    generateFoodItem('Sore Throat', foods[0].foodItemName, foods[0].img, foods[0].desc, e.target.textContent, 19296);
    getProductData('honey')
    changeScreen(1,2);
  }

  if (e.target.textContent == "Lemon") {
    generateFoodItem('Sore Throat', foods[1].foodItemName, foods[1].img, foods[1].desc, e.target.textContent, 09156);
    getProductData('lemon')
    changeScreen(1,2);
  }

  if (e.target.textContent == "Turmeric") {
    generateFoodItem('Sore Throat', foods[2].foodItemName, foods[2].img, foods[2].desc, e.target.textContent, 02043);
    getProductData('turmeric')
    changeScreen(1,2);
  }

  if (e.target.textContent == "Ginger") {
    generateFoodItem('Sore Throat', foods[3].foodItemName, foods[3].img, foods[3].desc, e.target.textContent, 11216);
    getProductData('ginger')
    changeScreen(1,2);
  }

  if (e.target.textContent == "Whiskey") {
    generateFoodItem('Sore Throat', foods[4].foodItemName, foods[4].img, foods[4].desc, e.target.textContent, 14531);
    getProductData('whiskey')
    changeScreen(1,2);
  }

  if (e.target.textContent == "Garlic") {
    generateFoodItem('Sore Throat', foods[5].foodItemName, foods[5].img, foods[5].desc, e.target.textContent, 11215);
    getProductData('garlic')
    changeScreen(1,2);
  }

  if (e.target.textContent == "Yoghurt") {
    generateFoodItem('Menstruation', foods[6].foodItemName, foods[6].img, foods[6].desc, e.target.textContent, 45126645);
    getProductData('yoghurt');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Chamomile Tea") {
    generateFoodItem('Menstruation', foods[7].foodItemName, foods[7].img, foods[7].desc, e.target.textContent, 14545);
    getProductData('chamomile')
    changeScreen(1,2);
  }

  if (e.target.textContent == "Whole Grains") {
    generateFoodItem('Menstruation', foods[8].foodItemName, foods[8].img, foods[8].desc, e.target.textContent, 20649);
    getProductData('garlic')
    changeScreen(1,2);
  }

  if (e.target.textContent == "Jacket Potato") {
    generateFoodItem('Headaches', foods[14].foodItemName, foods[14].img, foods[14].desc, e.target.textContent, 11352);
    getProductData('potato');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Watermelon") {
    generateFoodItem('Headaches', foods[15].foodItemName, foods[15].img, foods[15].desc, e.target.textContent, 09326);
    getProductData('watermelon');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Coffee") {
    generateFoodItem('Headaches', foods[16].foodItemName, foods[16].img, foods[16].desc, e.target.textContent, 14222);
    getProductData('coffee');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Salmon") {
    generateFoodItem('MusclePain', foods[20].foodItemName, foods[20].img, foods[20].desc, e.target.textContent, 15076);
    getProductData('salmon');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Cherries") {
    generateFoodItem('Muscle Pain', foods[21].foodItemName, foods[21].img, foods[21].desc, e.target.textContent, 09063);
    getProductData('cherries');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Oranges") {
    generateFoodItem('Muscle Pain', foods[22].foodItemName, foods[22].img, foods[22].desc, e.target.textContent, 19097);
    getProductData('oranges');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Green Tea") {
    generateFoodItem('Acne', foods[23].foodItemName, foods[23].img, foods[23].desc, e.target.textContent, 14190);
    getProductData('green tea');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Green Tea") {
    generateFoodItem('Acne', foods[23].foodItemName, foods[23].img, foods[23].desc, e.target.textContent, 14190);
    getProductData('green tea');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Oysters") {
    generateFoodItem('Acne', foods[24].foodItemName, foods[24].img, foods[24].desc, e.target.textContent, 15167);
    getProductData('oyster');
    changeScreen(1,2);
  }

  if (e.target.textContent == "Probiotics") {
    generateFoodItem('Acne', foods[25].foodItemName, foods[25].img, foods[25].desc, e.target.textContent, 45334803);
    getProductData('probiotic');
    changeScreen(1,2);
  }

})


// function createFilteredFoodList(foodType) { //pass in food storage array name
//     //Clear list
//     items.innerHTML = '';
//     // for each mindFood item:
//     for (var j = 0; j < foodType.length; j++) {
//       //Create a li element
//       var listItem = document.createElement('li');
//       //Give the li element a class name of food-item
//       listItem.setAttribute('class','food-item');
//       //Set the elements text content to the name of the food item
//       console.log('Food: ' + foodType[j])
//       listItem.textContent = foodType[j].foodItemName;
//       //Append the named li element to the UL
//       items.appendChild(listItem);
//     }
//
// }
//
//THIS CAN BE DELETED
// function setListHeader(headerText) {
//   //grab list header
//   var listSubject = document.getElementById('listSubject');
//   //make sure list header is empty
//   listSubject.textContent = '';
//   //set list header html to name of category clicked
//   listSubject.textContent = headerText;
// }


//IssueList click listeners (Event delegation)
// issueList.addEventListener('click', function(event){
//   var elementClicked = event.target;
//   console.log('Chosen issue: ' + elementClicked.textContent);
//
//   //If trouble sleeping is clicked populate the issues UL with mindFoods
//   if (elementClicked.textContent == 'Fat Fighting Foods') {
//     createFilteredFoodList(fat);
//     setListHeader(' fight fat');
//     changeScreen(1,2);
//   }
//
//   if (elementClicked.textContent == 'Foods for Your Immune System') {
//     createFilteredFoodList(immune);
//     setListHeader(' improve your immune system');
//     changeScreen(1,2);
//   }
//
//   if (elementClicked.textContent == 'Foods for Your Skin') {
//     createFilteredFoodList(skin);
//     setListHeader(' get clearer skin');
//     changeScreen(1,2);
//   }
//
//   if (elementClicked.textContent == 'Foods for Sore Muscles') {
//     createFilteredFoodList(muscle);
//     setListHeader(' sooth your muscles');
//     changeScreen(1,2);
//   }
//
//   if (elementClicked.textContent == 'Foods for High Cholesterol') {
//     createFilteredFoodList(cholesterol);
//     setListHeader(' lower your cholesterol');
//     changeScreen(1,2);
//   }
//
//   if (elementClicked.textContent == 'Anti Cancer Foods') {
//     createFilteredFoodList(immune);
//     setListHeader(' protect against cancer');
//     changeScreen(1,2);
//   }
//
//   if (elementClicked.textContent == 'Anti Inflammatory Foods') {
//     createFilteredFoodList(antImf);
//     setListHeader(' reduce inflammation');
//     changeScreen(1,2);
//   }
//
// });

// //Add click listeners to  'browse all foods buttons'
// browseAllFoodItems[0].addEventListener('click', function(){
//   //Create food list containing all food items
//   createFilteredFoodList(allFoodItems);
//   //change screen
//   changeScreen(1,2);
// });
//
// //Add click listeners to  'browse all foods buttons'
// browseAllFoodItems[1].addEventListener('click', function(){
//   //Create food list containing all food items
//   createFilteredFoodList(allFoodItems);
//   //change screen
//   changeScreen(2,2);
// });
//
// //Add click listeners to  'browse all foods buttons'
// browseAllFoodItems[2].addEventListener('click', function(){
//   //Create food list containing all food items
//   createFilteredFoodList(allFoodItems);
//   //change screen
//   changeScreen(3,2);
// });



//----SCREEN 3----//
  ingredientSymptomsButton.addEventListener('click', function(e){
    var groceryList = document.querySelector('.grocery-list');
    clearDOM(groceryList);
    clearDOM(nutrientDOMelements);
    changeScreen(2,1);
    console.log(e)
  });
  ingredientIngredientsButton.addEventListener('click', function(e){
    var groceryList = document.querySelector('.grocery-list');
    clearDOM(groceryList);
    clearDOM(nutrientDOMelements);
    changeScreen(2,1);
    console.log(e)
  });

  //Hide/Show Recipe list
  var recipeButton = document.querySelector('.recipes');
  var recipeList = document.querySelector('.recipe-list')

  recipeButton.addEventListener('click', function(){
    recipeList.classList.toggle('expanded');
  })

  //Hide/Show Grocery list
  var groceryButton = document.querySelector('.grocery-header');
  var groceryList = document.querySelector('.grocery-list')

  groceryButton.addEventListener('click', function(){
    groceryList.classList.toggle('expanded');
  })

// //FoodList event listener
// foodList.addEventListener('click', function(event){
//   var elementClicked = event.target;
//   foodItemClicked = elementClicked.textContent;
//   console.log('Chosen food: ' + elementClicked.textContent);
//
//   //If trouble sleeping is clicked populate the issues UL with mindFoods
//   //####TO-DO Ensure list only gets populated if empty
//   if (elementClicked.textContent == 'Artichoke') {
//     generateFoodItem('Artichoke', foods[0].image, foods[0].foodItemDesc, '11226', 'artichoke');
//   }
//
//   if (elementClicked.textContent == 'Bell Pepper') {
//     generateFoodItem('Bell Pepper', foods[1].image, foods[1].foodItemDesc, '11226', 'pepper');
//   }
//
//   if (elementClicked.textContent == 'Carrot') {
//     generateFoodItem('Carrot', foods[2].image, foods[2].foodItemDesc, '11226', 'carrot');
//   }
//
//   if (elementClicked.textContent == 'Dill') {
//     generateFoodItem('Dill', foods[3].image, foods[3].foodItemDesc, '11226', 'dill');
//   }
//
//   if (elementClicked.textContent == 'Fennel') {
//     generateFoodItem('Fennel', foods[4].image, foods[4].foodItemDesc, '11226', 'fennel');
//   }
//
//   if (elementClicked.textContent == 'Green Beans') {
//     generateFoodItem('Green Beans', foods[5].image, foods[5].foodItemDesc, '11226', 'green bean');
//   }
//
//   if (elementClicked.textContent == 'Jalapeños') {
//     generateFoodItem('Jalapeños', foods[6].image, foods[6].foodItemDesc, '11226', 'jalapeno');
//   }
//
//   if (elementClicked.textContent == 'Kale') {
//     generateFoodItem('Kale', foods[7].image, foods[7].foodItemDesc, '11226', 'kale');
//   }
//
//   if (elementClicked.textContent == 'Leeks') {
//     generateFoodItem('Leeks', foods[7].image, foods[7].foodItemDesc, '11226', 'leek');
//   }
//
//   if (elementClicked.textContent == 'Onion') {
//     generateFoodItem('Onion', foods[8].image, foods[8].foodItemDesc, '11226', 'onion');
//   }
//
//   if (elementClicked.textContent == 'Parsnip') {
//     generateFoodItem('Parsnip', foods[9].image, foods[9].foodItemDesc, '11226', 'parsnip');
//   }
//
//   if (elementClicked.textContent == 'Radish') {
//     generateFoodItem('Radish', foods[10].image, foods[10].foodItemDesc, '11226', 'radish');
//   }
//
// });




function clearDOM(element) { //nutrientDOMelements
  //If element is an array e.g. NodeList then cycle through it and clear it
  if (Array.isArray(element)) {
    for (var i = 0; i < element.length; i++) {
      element[i].innerHTML = '';
    }
  } else { //If not just clear the element
    element.innerHTML = '';
  }
}


//Buttons
//Home button hides the current screen and shows the home screen
var homeButton = document.querySelector('.footer');

homeButton.addEventListener('click', function () {
  changeScreen(1,0);
});

button[0].addEventListener('click', function () {
  changeScreen(0, 1);
  nextScreen = screens[2];
});

//Back buttons
// backButton[0].addEventListener('click', function(){
//   changeScreen(1,0);
// });
// backButton[1].addEventListener('click', function(){
//   changeScreen(2,1);
// });
//
// //Screen4 (Back)
// backButton[2].addEventListener('click', function(){
//   changeScreen(3,2);
//   clearDOM(nutrientDOMelements);
// })

//Home/footer
footers[0].addEventListener('click', function(){
  changeScreen(1, 0);
})
footers[1].addEventListener('click', function(){
  changeScreen(2, 0);
})
footers[2].addEventListener('click', function(){
  changeScreen(3, 0);
})
