import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-a99da-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const hero = document.querySelector(".hero")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

const heroImg = [
    "assets/hero1.png",
    "assets/hero2.png",
    "assets/hero3.png"
]

const emptyImg = [
    "assets/empty1.png",
    "assets/empty2.png",
    "assets/empty3.png",
    "assets/empty4.png"
]

window.onload = function() {
    // hero.innerHTML = `<img class="hero-img" src="${getHeroImg()}">`
    hero.innerHTML = `<img class="hero-img" src="/assets/hero1.png">`
}

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = 
        // `
        //     <img class="empty-img" src="${getEmptyImg()}">
        //     <p class="no-item">No items here... yet</p>
        // `
        `<img class="empty-img" src="/assets/empty3.png">
        <p class="no-item">No items here... yet</p>`

    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

function getRandomNumber(img) {
    let randomNumber = Math.floor(Math.random() * img.length)
    return randomNumber
}

function getEmptyImg() {
    let getEmpty = emptyImg[getRandomNumber(emptyImg)]
    return getEmpty
}

function getHeroImg() {
    let getHero = heroImg[getRandomNumber(heroImg)]
    return getHero
}