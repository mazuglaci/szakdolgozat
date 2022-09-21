const { randomPersonObj } = require("./canvas/personDrawer")
const { loadTask, loadExample, loadBackWardsTask } = require("./content")
const allItemData = require("./data/itemList")

const headerUl = document.querySelector("nav#headerPanel ul")
const sideUl = document.querySelector("nav#sidePanel ul")
const containerDiv = document.querySelector("div#container")

let selectedHeaderLi, selectedSideLi
let defItem, itemList, selectedItem

global.randomPerson = randomPersonObj

const urlParams = new URLSearchParams(window.location.search)
//Oldal paraméter kezelése
if(!urlParams.has("page")) {
    urlParams.append("page", "main")
    window.location.search = urlParams.toString()
} else {
    const page = urlParams.get("page")
    selectedHeaderLi = [...headerUl.children].find(li => li.dataset.page == page)
    selectedHeaderLi.classList.toggle("selected")
    defItem = allItemData[page].default
    itemList = allItemData[page].items
}
//Feladat lista hozzáadása
for(const item of itemList) {
    const li = document.createElement("li")
    li.innerText = item.text
    li.dataset.item = item.id
    sideUl.appendChild(li)
}
if(itemList.length === 1) {
    document.querySelector("nav#sidePanel").classList.add("hidden")
}
//Fealdat paraméter kezelése
if(!urlParams.has("item")) {
    selectedSideLi = [...sideUl.children].find(li =>li.dataset.item == defItem) ?? null
    if(selectedSideLi != null) {
        selectedSideLi.classList.toggle("selected")
        selectedItem = itemList.find(i => i.id=defItem)
    }
} else {
    const item = urlParams.get("item")
    selectedSideLi = [...sideUl.children].find(li =>li.dataset.item == item)
    selectedSideLi.classList.toggle("selected")
    selectedItem = itemList.find(i => i.id===item)
}
//Content betöltése
if(selectedItem != undefined) {
    for(let elem of containerDiv.children) {
        if(elem.classList.contains(selectedItem.type)) {
            elem.classList.remove("hidden")
        }
    }
    if(selectedItem.type === "example") {
        loadExample(containerDiv, selectedItem)
    } else if(selectedItem.type === "task") {
        if(selectedItem.id !== "backwards") {
            loadTask(containerDiv, selectedItem)
        } else {
            loadBackWardsTask(containerDiv, selectedItem)
        }
    }
}
    
//Navigáció
headerUl.addEventListener("click", e => {
    if(!e.target.matches("li") || selectedHeaderLi==e.target) {
        return
    }
    selectedHeaderLi.classList.toggle("selected")
    selectedHeaderLi = e.target
    urlParams.set("page", selectedHeaderLi.dataset.page)
    urlParams.delete("item")
    window.location.search = urlParams.toString()
})

sideUl.addEventListener("click", e => {
    if(!e.target.matches("li") || selectedSideLi==e.target) {
        return
    }
    selectedSideLi?.classList.toggle("selected")
    selectedSideLi = e.target
    urlParams.set("item", selectedSideLi.dataset.item)
    window.location.search = urlParams.toString()
})