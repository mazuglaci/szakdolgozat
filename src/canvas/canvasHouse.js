const { WallColorEnum, RoofColorEnum } = require("../enums/canvasEnum");
const { enumValueOrRandom, randomBetween, randomBool } = require("../helper/functions");

class CanvasHouse {
    /** @type {CanvasRenderingContext2D} */ #ctx;
    /** @type {Number} */ #maxWindowWidth;
    /** @type {Number} */ #doorHeight;
    /** @type {Number} */ #doorWidth;
    /** @type {String} */ #doorColor
    
    constructor(width, floorHeight, wallColor, roofColor, windows, multilevel) {
        this.width = width
        this.floorHeight = floorHeight
        this.wallColor = wallColor
        this.roofColor = roofColor
        this.windows = windows
        this.multilevel = multilevel
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
     draw(ctx, x, y) {
        this.#ctx = ctx
        this.#maxWindowWidth = this.width/6
        this.#doorHeight = this.floorHeight*3/4
        this.#doorWidth = this.#doorHeight/2
        this.#doorColor = "#a67449"

        ctx.save()
        ctx.transform(1,0, 0,-1,x,y)
        this._drawWall()
        this._drawRoof()
        ctx.restore()
    }

    /**
     * @returns {CanvasPerson}
     */
     static fromObject(obj, width, floorHeight) {
         return new CanvasHouse(
             width, floorHeight,
             enumValueOrRandom(WallColorEnum, obj.color).value,
             enumValueOrRandom(RoofColorEnum, obj.roof).value,
             obj.windows ?? randomBetween(2,10),
             obj.multilevel ?? randomBool()
         )
     }
    
    _drawWall() {
        const ctx = this.#ctx
        const halfWindow = Math.floor(this.windows/2)
        const windowGound = this.multilevel ? halfWindow : this.windows
        const windowUpper = this.multilevel ? halfWindow + this.windows%2 : 0

        ctx.save()
        this._drawFloor(windowGound, true)
        if(this.multilevel) {
            ctx.transform(1,0, 0,1, 0,this.floorHeight)
            this._drawFloor(windowUpper, false)
        }
        ctx.restore()
    }

    _drawFloor(windows, hasDoor) {
        const ctx = this.#ctx
        const halfWindows = Math.ceil(windows/2)
        const width = this.width
        const height = this.floorHeight
        const availableWidth = hasDoor ? width-this.#doorWidth : width
        const windowWidth = Math.min(availableWidth/(2*windows), this.#maxWindowWidth)
        const windowHeight = height/2
        const windowGap = (availableWidth-windowWidth*windows)/windows
        ctx.save()
        ctx.fillStyle = this.wallColor
        ctx.fillRect(0,0, width, height)
        ctx.translate(0,height*3/8)
        if(windows===1) {
            ctx.translate(-windowGap/4,0)
        }
        for(let i=0;i<halfWindows;i++) {
            ctx.translate(windowGap/2, 0)
            this._drawWindow(windowWidth, windowHeight)
            ctx.translate(windowWidth + windowGap/2, 0)
        }
        if(hasDoor) {
            ctx.translate(0,-height*3/8)
            this._drawDoor()
            ctx.translate(this.#doorWidth,height*3/8)
        }
        for(let i=halfWindows;i<windows;i++) {
            ctx.translate(windowGap/2, 0)
            this._drawWindow(windowWidth, windowHeight)
            ctx.translate(windowWidth + windowGap/2, 0)
        }
        ctx.restore()
    }
    
    _drawRoof() {
        const ctx = this.#ctx
        const width = this.width
        const height = this.floorHeight*2/3
        const roofStartY = (this.multilevel ? 2 : 1) * this.floorHeight
        ctx.save()
        ctx.transform(1,0,0,1, 0,roofStartY)
        ctx.fillStyle = this.roofColor
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(width/6, height)
        ctx.lineTo(width*5/6, height)
        ctx.lineTo(width, 0)
        ctx.lineTo(0,0)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
    
    _drawWindow(width, height) {
        const ctx = this.#ctx
        const extraWidth = Math.min(width,height)/8
        ctx.save()
        ctx.fillStyle = "lightblue"
        ctx.fillRect(0,0,width,height)
        ctx.strokeStyle = this.#doorColor
        ctx.lineWidth = extraWidth
        ctx.beginPath()
        ctx.moveTo(width/2,0)
        ctx.lineTo(width/2,height/2)
        ctx.lineTo(0,height/2)
        ctx.lineTo(width/2,height/2)
        ctx.lineTo(width/2,height)
        ctx.lineTo(width/2,height/2)
        ctx.lineTo(width,height/2)
        ctx.stroke()
        ctx.closePath()
        ctx.fillStyle = "lightgrey"
        ctx.strokeStyle = "grey"
        ctx.lineWidth = 1
        ctx.fillRect(0,0,width,extraWidth)
        ctx.strokeRect(0,0,width,extraWidth)
        ctx.restore()
    }

    _drawDoor() {
        const ctx = this.#ctx
        const width = this.#doorWidth
        const height = this.#doorHeight
        const knobRadius = width/8
        ctx.save()
        ctx.fillStyle = this.#doorColor
        ctx.fillRect(0,0,width,height)
        ctx.beginPath()
        ctx.fillStyle = "gold"
        ctx.strokeStyle = "orange"
        ctx.lineWidth = 1
        ctx.arc(knobRadius*2,height/2,knobRadius,0,Math.PI*2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
    }
}

module.exports = CanvasHouse;