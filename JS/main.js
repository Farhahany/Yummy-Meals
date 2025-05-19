//  Classes Import  //
//-----------------//
import { Home } from "./home.js";
import { SearchByName } from "./search.js";
import { SearchByFirstLetter } from "./search.js";
import { Categories } from "./categories.js";
import { CategoryMeals } from "./categories.js";
import { Area } from "./area.js";
import { AreaMeals } from "./area.js";
import { Ingredients } from "./ingredients.js";
import { IngredientMeals } from "./ingredients.js";
import { Details } from "./mealDetails.js";

//  Classes Objects  //
//------------------//
let homeMeals = new Home();
let mealName = new SearchByName();
let mealNameByFirstLetter = new SearchByFirstLetter();
let mealsCategories = new Categories();
let categoryMeals = new CategoryMeals();
let areaName = new Area();
let areaMeals = new AreaMeals();
let mainIngredient = new Ingredients();
let ingredientMeals = new IngredientMeals();
let mealsDetails = new Details();

//   Selection   //
//--------------//
const loader = $('#loader');
const nav = $('nav');
const navIcon = $('.fa-2x');
const menuWidth = $('nav .bg-black').innerWidth();
const menu = $('nav ul li');
const mealNameInput = $('#mealName');
const mealFirstLetterInput = $('#mealletter');
const contactInputs = $('#contact input');

//  Declerations  //
//---------------//
var currentSection = 'home';
var mealsArray = [];
var categoriesArray = [];
var mealsByFirstNameArray = [];
const regex = {
    name: /^[a-zA-Z\s]{3,}$/,
    email: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
    phone: /^(\+?\d{10,15})$/,
    age: /^(1[4-9]|[2-9][0-9]|100)$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    repassword: null
};
let flag = false;

//  Loader  //
//---------//
//this function does not work untill all html, css and js files load
jQuery(function () {
    loader.fadeOut(1000);
})

//  Navbar  //
//---------//
nav.css({ left: `-${menuWidth}px` });
navIcon.on('click', function () {
    if (navIcon.hasClass('fa-align-justify')) {
        nav.animate({ left: `0` }, 500);
        $('#navList .nav-item').each(function (index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
            $(this).addClass('animate-in');
        });
        navIcon.toggleClass('fa-align-justify open-close-icon fa-x');
    } else {
        nav.animate({ left: `-${menuWidth}px` }, 500);
        $('#navList .nav-item').each(function () {
            $(this).removeClass('animate-in');
            $(this).css({
                opacity: 0,
                transform: 'translateY(40px)',
                animationDelay: '0s'
            });
        });
        navIcon.toggleClass('fa-align-justify open-close-icon fa-x');
    }
});

menu.eq(0).on('click', function () {
    sectionDisplay('home');
    home();
    loader.fadeOut();
    nav.animate({ left: `-${menuWidth}` }, 500);
    navIcon.toggleClass('fa-align-justify open-close-icon fa-x');
});
menu.eq(1).on('click', function () {
    sectionDisplay('search');
    loader.fadeOut();
    nav.animate({ left: `-${menuWidth}` }, 500);
    navIcon.toggleClass('fa-align-justify open-close-icon fa-x');
});
menu.eq(2).on('click', function () {
    sectionDisplay('categories');
    loader.fadeOut();
    categories();
    nav.animate({ left: `-${menuWidth}` }, 500);
    navIcon.toggleClass('fa-align-justify open-close-icon fa-x');
});
menu.eq(3).on('click', function () {
    sectionDisplay('area');
    loader.fadeOut();
    area();
    nav.animate({ left: `-${menuWidth}` }, 500);
    navIcon.toggleClass('fa-align-justify open-close-icon fa-x');
});
menu.eq(4).on('click', function () {
    sectionDisplay('ingredients');
    loader.fadeOut();
    ingredients();
    nav.animate({ left: `-${menuWidth}` }, 500);
    navIcon.toggleClass('fa-align-justify open-close-icon fa-x');
});
menu.eq(5).on('click', function () {
    sectionDisplay('contact');
    loader.fadeOut();
    nav.animate({ left: `-${menuWidth}` }, 500);
    navIcon.toggleClass('fa-align-justify open-close-icon fa-x');
});

//   Home   //
//---------//
async function home() {
    mealsArray = await homeMeals.home();
    displayMeals(mealsArray.meals, 'homeContainer');
    mealDetails(mealsArray.meals);
}
home();

//   Search   //
//-----------//
mealNameInput.on('input', async function () {
    if (mealNameInput.val() != '') {
        mealsArray = await mealName.searchByName(mealNameInput.val());
        if (!mealsArray.meals) {
            $('#searchContainer').html('<p class="text-center fs-4">No meals found.</p>');
            loader.fadeOut();
            return;
        }
        displayMeals(mealsArray.meals, 'searchContainer');
        mealDetails(mealsArray.meals);
    }
    else {
        $('#searchContainer').html('');
    }
});
mealFirstLetterInput.on('input', async function () {
    if (mealFirstLetterInput.val() != '') {
        mealsByFirstNameArray = await mealNameByFirstLetter.searchByFirstLetter(mealFirstLetterInput.val());
        if (!mealsByFirstNameArray.meals) {
            $('#searchContainer').html('<p class="text-center fs-4">No meals found.</p>');
            loader.fadeOut();
            return;
        }
        displayMeals(mealsByFirstNameArray.meals, 'searchContainer');
        mealDetails(mealsByFirstNameArray.meals);
    }
    else {
        $('#searchContainer').html('');
    }

})

//  Categories  //
//-------------//
async function categories() {
    categoriesArray = await mealsCategories.categories();
    displayCategories(categoriesArray.categories);
    for (let i = 0; i < categoriesArray.categories.length && i < 20; i++) {
        let currentCategory = $(`.card${i}`);
        let CategoryName = categoriesArray.categories[i].strCategory;
        currentCategory.on('click', async function () {
            const currentCategoryMeals = await categoryMeals.categoryMeals(CategoryName);
            displayMeals(currentCategoryMeals.meals, 'categoriesContainer');
            mealDetails(currentCategoryMeals.meals);
        })
    }
}

//  Area  //
//-------//
async function area() {
    mealsArray = await areaName.area();
    displayArea(mealsArray.meals);
    for (let i = 0; i < mealsArray.meals.length && i < 20; i++) {
        let currentArea = $(`.card${i}`);
        let areaName = mealsArray.meals[i].strArea;
        currentArea.on('click', async function () {
            const currentAreaMeals = await areaMeals.areaMeals(areaName);
            console.log(currentAreaMeals.meals);
            displayMeals(currentAreaMeals.meals, 'areaContainer');
            mealDetails(currentAreaMeals.meals);
        })
    }
}

//  Ingredients  //
//--------------//
async function ingredients() {
    mealsArray = await mainIngredient.ingredients();
    displayIngredients(mealsArray.meals);
    console.log(mealsArray.meals);
    for (let i = 0; i < mealsArray.meals.length && i < 20; i++) {
        let currentIngredient = $(`.card${i}`);
        let ingredientName = mealsArray.meals[i].strIngredient;
        currentIngredient.on('click', async function () {
            const currentIngredientMeals = await ingredientMeals.ingredientMeals(ingredientName);
            console.log(currentIngredientMeals);
            displayMeals(currentIngredientMeals.meals, 'ingredientsContainer');
            mealDetails(currentIngredientMeals.meals);
        })
    }
}

//  Contact Us  //
//-------------//
window.typingRegexCheck = function (elem) {
    $(`#${elem.id}`).removeClass('is-invalid');
    const recentInputs = {
        name: contactInputs.eq(0).val(),
        email: contactInputs.eq(1).val(),
        phone: contactInputs.eq(2).val(),
        age: contactInputs.eq(3).val(),
        password: contactInputs.eq(4).val(),
        repassword: contactInputs.eq(5).val()
    }
    if (elem.id == 'repassword') {
        if (recentInputs.repassword === recentInputs.password && regex.password.test(recentInputs.password) == true) {
            $(`#${elem.id}`).addClass('is-valid');
        }
    } else {
        if (regex[elem.id].test(recentInputs[elem.id]) == true && elem.id != 'repassword') {
            $(`#${elem.id}`).addClass('is-valid');
        }
    }
    for (let i = 0; i < contactInputs.length; i++) {
        if (contactInputs.eq(i).val() === '' || !contactInputs.eq(i).hasClass('is-valid')) {
            flag = false;
            break;
        } else {
            flag = true;
        }
    }
    if (flag) {
        $('.btn-outline-danger').removeClass('disabled');
        $('.btn-outline-danger').addClass('enabled');
        $('btn-outline-danger').on('click', function () {
            contactInputs.val('');
        })
    }
}
window.blurRegexCheck = function (elem) {
    const recentInputs = {
        name: contactInputs.eq(0).val(),
        email: contactInputs.eq(1).val(),
        phone: contactInputs.eq(2).val(),
        age: contactInputs.eq(3).val(),
        password: contactInputs.eq(4).val(),
        repassword: contactInputs.eq(5).val()
    }
    if (elem.id == 'repassword') {
        if (recentInputs.repassword === recentInputs.password && regex.password.test(recentInputs.password) == true) {
            $(`#${elem.id}`).removeClass('is-invalid');
            $(`#${elem.id}`).addClass('is-valid');
            $(`#${elem.id} + small`).addClass('d-none');

        } else {
            $(`#${elem.id}`).addClass('is-invalid');
            $(`#${elem.id} + small`).removeClass('d-none');

        }
    } else {
        if (regex[elem.id].test(recentInputs[elem.id]) == false && elem.id != 'repassword') {
            $(`#${elem.id}`).addClass('is-invalid');
            $(`#${elem.id} + small`).removeClass('d-none');
        } else {
            $(`#${elem.id}`).removeClass('is-invalid');
            $(`#${elem.id}`).addClass('is-valid');
            $(`#${elem.id} + small`).addClass('d-none');
        }
    }
}

//  Meal Details  //
//----------------//
function mealDetails(array) {
    for (let i = 0; i < array.length && i < 20; i++) {
        let currentMeal = $(`.card${i}`);
        let mealId = array[i].idMeal;
        currentMeal.on('click', async function () {
            const currentMealDetails = await mealsDetails.details(mealId);
            displayMealDetails(currentMealDetails.meals[0]);
        })
    }
}
$(document).on('click', '.btn-close', function () {
    loader.show();
    $('#mealDetails').addClass('d-none');
    $(`#${currentSection}`).removeClass('d-none');
    loader.fadeOut();
});

//  Section Display  //
//------------------//
function sectionDisplay(sectionId) {
    loader.show();
    $(`#${currentSection}`).addClass('d-none');
    $(`#${sectionId}`).removeClass('d-none');
    currentSection = `${sectionId}`;
    //in case the user doesn't click the x button and click on any li in the nav menu
    if ($('#mealDetails').hasClass('d-none') == false) {
        $('#mealDetails').addClass('d-none');
    }
}

//  Display Functions  //
//--------------------//
function displayMeals(array, containerId) {
    loader.show();
    let box = '';
    for (let i = 0; i < array.length && i < 20; i++) {
        box += `<div class="col-12 col-md-3 card${i}">
                <div class="border-0 rounded-2 position-relative overflow-hidden">
                    <img src="${array[i].strMealThumb}" alt="${array[i].strMeal} Meal" class="w-100 border-0 rounded-2">
                    <div
                        class="position-absolute top-100 start-0 end-0 h-100 border-0 rounded-2 homeShadow text-black d-flex align-items-center ps-2 fs-5"><h2 class"h3">${array[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
    }
    $(`#${containerId}`).html(box);
    loader.fadeOut();
}
function displayCategories(array) {
    let box = '';
    for (let i = 0; i < array.length && i < 20; i++) {
        box += ` <div class="col-12 col-md-3 card${i}">
                <div class="border-0 rounded-2 position-relative overflow-hidden">
                    <img src="${array[i].strCategoryThumb}" alt="${array[i].strCategory} Meal" class="w-100 border-0 rounded-2">
                    <div
                        class="position-absolute top-100 start-0 end-0 h-100 border-0 rounded-2 homeShadow text-black text-center pt-3">
                        <h2 class="h4">${array[i].strCategory}</h2>
                        <p class="fs-6">${array[i].strCategoryDescription.split(/\s+/).slice(0, 20).join(' ').trim()}</p>
                    </div>
                </div>
            </div>`;
    }
    $(`#categoriesContainer`).html(box);
}
function displayArea(array) {
    let box = '';
    for (let i = 0; i < array.length && i < 20; i++) {
        box += `<div class="col-12 col-md-3 card${i}">
                <div class="text-center text-white">
                    <i class="fa-solid fa-house-laptop fa-4x mb-1"></i>
                    <h2 class="h4">${array[i].strArea}</h2>
                </div>
            </div>`;
    }
    $(`#areaContainer`).html(box);
}
function displayIngredients(array) {
    let box = '';
    for (let i = 0; i < array.length && i < 20; i++) {
        box += ` <div class="col-12 col-md-3 card${i}">
                <div class="text-center text-white">
                    <i class="fa-solid fa-drumstick-bite fa-4x mb-1"></i>
                    <h2 class="h4">${array[i].strIngredient}</h2>
                    <p>${array[i].strDescription.split(/\s+/).slice(0, 20).join(' ').trim()}</p>
                </div>
            </div>`;
    }
    $(`#ingredientsContainer`).html(box);
}
function displayMealDetails(meal) {
    loader.show();
    $(`#${currentSection}`).addClass('d-none');
    $('#mealDetails').removeClass('d-none');
    let recipesBox = '';
    let tagsBox = '';
    let tags = meal.strTags ? meal.strTags.split(',') : [];
    for (let i = 1; i <= 20 && meal[`strIngredient${i}`] != ''; i++) {
        recipesBox += `<div class="bg-primary p-1 me-2 mb-2 border-0 rounded-2">
        ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</div>`
    }
    for (let i = 0; i < tags.length; i++) {
        tagsBox += `<div class="bg-info p-1 me-2 mb-2 border-0 rounded-2">${tags[i]}</div>`
    }
    let box = `<div class="d-flex justify-content-end">
                <button type="button" class="btn-close mb-2" aria-label="Close"></button>
             </div>
            <div class="row">
            <div class="col-10 col-md-4 mx-auto">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 border-0 rounded-2 mb-2">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-10 col-md-8 m-auto">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
                <h4>Area: ${meal.strArea}</h4>
                <h4>Category: ${meal.strCategory}</h4>
                <h4>Recipes:</h4>
                <div class="d-flex flex-wrap">
                ${recipesBox}
                </div>
                <h4>Tags:</h4>
                <div class="d-flex flex-wrap">
                ${tagsBox}
                </div>
                <button type="button" class="btn btn-success mt-2" onclick="window.open('${meal.strSource}', '_blank')">Source</button>
                <button type="button" class="btn btn-danger mt-2" onclick="window.open('${meal.strYoutube}', '_blank')">Youtue</button>
            </div>
        </div>`;
    $('#mealDetails').html(box);
    loader.fadeOut();
}
