const { PictureEmum, SkinColorEmum, EyeColorEnum, HairColorEnum, ClothColorEnum, WallColorEnum, RoofColorEnum, HeightEmum } = require("../enums/canvasEnum");
const { randomArrayElem, randomBetween, randomBool, randomEnum } = require("../helper/functions");
const CanvasHouse = require("./canvasHouse");
const CanvasPerson = require("./canvasPerson");

/** @type {CanvasRenderingContext2D} */ let ctx;
let maxWidth, maxHeight;
let friendCount;
let groundY, mainAreaWidth, friendAreaWidth, friendAreaX0 ;
let mainPersonHeight, mainPersonWidth, mainPersonX, mainPersonY;
let houseHeight, houseWidth, houseX, houseY;
let friendPersonHeight, friendPersonWidth, friendPersonX0, friendPersonDX, friendPersonY;

/**
 * @param {HTMLCanvasElement} canvas 
 * @param {*} obj 
 */
exports.drawComplete = (canvas, obj) => {
    ctx = canvas.getContext("2d")
    let hasHouse = obj.house != undefined
    let hasFriends = obj.friends != undefined && obj.friends.length != 0
    friendCount = hasFriends ? obj.friends.length : 0
    maxWidth = canvas.width
    maxHeight = canvas.height
    groundY = maxHeight*3/4
    mainAreaWidth = hasFriends ? maxWidth/2 : maxWidth
    friendAreaWidth = maxWidth - mainAreaWidth
    friendAreaX0 = mainAreaWidth
    mainPersonWidth = maxWidth/8
    mainPersonHeight = maxHeight*2/5
    mainPersonX = mainAreaWidth / (hasHouse ? 4 : 2) - mainPersonWidth/2
    mainPersonY = maxHeight
    houseWidth = maxWidth / 4
    houseHeight = maxHeight / 5
    houseX = mainAreaWidth/2
    houseY = groundY
    friendPersonHeight = mainPersonHeight*2/3
    friendPersonWidth = mainPersonWidth*2/3
    friendPersonDX = friendAreaWidth / friendCount
    friendPersonX0 = friendAreaX0 + friendPersonDX / 2 - friendPersonWidth / 2
    friendPersonY = (maxHeight + groundY) / 2
    
    drawBackGround(obj)
    if(hasHouse) {
        drawHouse(obj.house)
    }
    drawMain(obj)
    if(hasFriends) {
        drawFriends(obj.friends)
    }
}

/**
 * @param {HTMLCanvasElement} canvas
 */
exports.drawBackGround = (canvas) => {
    ctx = canvas.getContext("2d")
    maxWidth = canvas.width
    maxHeight = canvas.height
    groundY = maxHeight*3/4
    drawBackGround()
}

function drawBackGround() {
    ctx.clearRect(0,0,maxWidth,maxHeight)
    ctx.save()
    ctx.fillStyle = "#87CEEB"
    ctx.fillRect(0,0,maxWidth,maxHeight)
    ctx.fillStyle = "#2CAA50"
    ctx.fillRect(0,groundY,maxWidth,maxHeight)
    ctx.restore()
}

function drawMain(personObj) {
    const person = CanvasPerson.fromObject(personObj, mainPersonWidth, mainPersonHeight)
    person.draw(ctx, mainPersonX, mainPersonY)
}

function drawHouse(houseObj) {
    const house = CanvasHouse.fromObject(houseObj, houseWidth, houseHeight)
    house.draw(ctx, houseX, houseY)
}

/**
 * @param {Array} friendObjs 
 */
function drawFriends(friendObjs) {
    const friends = friendObjs.map(friendObj => CanvasPerson.fromObject(friendObj, friendPersonWidth, friendPersonHeight))
    let friendPersonX = friendPersonX0
    for(let friend of friends ) {
        friend.draw(ctx, friendPersonX, friendPersonY)
        friendPersonX += friendPersonDX
    }
}

exports.randomPersonObj = (hasFriends) => randomPersonObj(true, hasFriends)

function randomPersonObj(isMain, hasFriends) {
    let ret = {
        name: randomName(),
        age: randomAge(),
        sex: randomArrayElem(["male","female"]),
        height: randomEnum(HeightEmum).value,
        skin: randomArrayElem(SkinColorEmum.keys).toLowerCase(),
        hair: randomArrayElem(HairColorEnum.keys).toLowerCase(),
        eye: randomArrayElem(EyeColorEnum.keys).toLowerCase(),
        clothing: {
            color: randomArrayElem(ClothColorEnum.keys).toLowerCase(),
            figures: []
        },
        glasses: randomBool()
    }
    let hasHouse = isMain && randomBool()
    let friendCount = isMain && hasFriends ? randomBetween(0, 3) : 0
    let figureCount = randomBetween(0, 3)
    if(hasHouse) {
        ret.house = randomHouseObj()
    }
    for(let i=0; i<friendCount; i++) {
        ret.friends = ret.friends || []
        ret.friends.push(randomPersonObj(false, false))
    }
    for(let i=0; i<figureCount; i++) {
        ret.clothing.figures = ret.clothing.figures || []
        ret.clothing.figures.push(randomFigure())
    }
    return ret
}

function randomName() {
    return randomArrayElem(["Frank", "John", "Mary", "Tom", "Jack", "Peter", "Linda", "Sue", "Mary", "Tom", "Jack", "Peter",
                "Linda", "Sue", "Partic", "Nicole", "Whitney", "Wayne", "Robert", "Michael", "William", "David", "Richard", "Christina", "Elena"])
}

function randomAge() {
    let r = randomBetween(9, 35)
    return  r<=17 ? null : r
}

function randomHouseObj() {
    return {
        color: randomArrayElem(WallColorEnum.keys).toLowerCase(),
        roof: randomArrayElem(RoofColorEnum.keys).toLowerCase(),
        windows: randomBetween(2,10),
        multilevel: randomBool()
    }
}

function randomFigure() {
    return randomArrayElem(PictureEmum.keys).toLowerCase()
}