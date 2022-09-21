'use strict'

const { HeightEmum, SkinColorEmum, HairColorEnum, EyeColorEnum, ClothColorEnum, PictureEmum } = require("../enums/canvasEnum");
const { randomArrayElem, randomEnum, enumValueOrRandom } = require("../helper/functions");

class CanvasPerson {
    /** @type {CanvasRenderingContext2D} */ #ctx;
    /** @type {Boolean} */ #isMale;
    /** @type {Number} */ #headX;
    /** @type {Number} */ #headY;
    /** @type {Number} */ #lineWidth;
    /** @type {Number} */ #eyeRadius;
    /** @type {Number} */ #eyeColorRadius;

    constructor(bodyWidth, bodyHeight, headRadius, textSize, name, age, sex, skinColor, hairColor, eyeColor, clothColor, figureImages, glasses) {
        this.bodyWidth = bodyWidth
        this.bodyHeight = bodyHeight
        this.headRadius = headRadius
        this.textSize = textSize
        this.name = name
        this.age = age
        this.sex = sex
        this.skinColor = skinColor
        this.hairColor = hairColor
        this.eyeColor = eyeColor
        this.clothColor = clothColor
        this.figureImages = figureImages
        this.glasses = glasses
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx, x, y) {
        this.#ctx = ctx
        this.#isMale = this.sex == "male"
        this.#headX = this.bodyWidth / 2
        this.#headY = this.bodyHeight + this.headRadius / 2
        this.#lineWidth = this.headRadius / 25
        this.#eyeRadius = this.headRadius / 4
        this.#eyeColorRadius = this.#eyeRadius * 2 / 5

        ctx.save()
        ctx.transform(1, 0, 0, -1, x, y)
        this._drawHairBack()
        this._drawBody()
        this._drawHead()
        this._drawName()
        ctx.restore()
    }

    /**
     * @returns {CanvasPerson}
     */
    static fromObject(obj, baseWidth, baseHeight) {
        let heightEmum
        if(obj.height != undefined) {
            heightEmum = HeightEmum.fromValue(obj.height)
        } else {
            heightEmum = randomEnum(HeightEmum)
        }
        const width = baseWidth
        const height = heightEmum.value * baseHeight
        return new CanvasPerson(
            width, height, width * 2 / 5, width / 4,
            obj.name, obj.age,
            obj.sex ?? randomArrayElem(["male","female"]),
            enumValueOrRandom(SkinColorEmum, obj.skin).value,
            enumValueOrRandom(HairColorEnum, obj.hair).value,
            enumValueOrRandom(EyeColorEnum, obj.eye).value,
            enumValueOrRandom(ClothColorEnum, obj.clothes ?? obj.clothing_color ?? obj.clothing?.color).value,
            (obj.clothing_figures ?? obj.clothing?.figures ?? []).map(name => PictureEmum[name.toUpperCase()].image),
            obj.glasses ?? false
        )
    }


    _drawBody() {
        this._drawClothing()
        this._drawFigures()
    }
    
    _drawHead() {
        const ctx = this.#ctx
        ctx.save()
        ctx.transform(1, 0, 0, 1, this.#headX, this.#headY)
        this._drawHeadSkin()
        this._drawHair()
        this._drawMouth()
        this._drawEyes()
        this._drawGlasses()
        ctx.restore()
    }

    _drawHairBack() {
        if (!this.#isMale) {
            const ctx = this.#ctx
            const headX = this.#headX
            const headY = this.#headY
            const headRadius = this.headRadius
            ctx.save()
            ctx.fillStyle = this.hairColor
            ctx.fillRect(headX - headRadius, headY - headRadius * 2.25, headRadius * 2, headRadius * 2.25)
            ctx.restore()
        }
    }

    _drawClothing() {
        const ctx = this.#ctx
        const bodyWidth = this.bodyWidth
        const bodyHeight = this.bodyHeight
        ctx.save()
        ctx.fillStyle = this.clothColor
        ctx.beginPath()
        if (this.#isMale) {
            ctx.moveTo(bodyWidth / 4, 0)
            ctx.bezierCurveTo(0, bodyHeight * 5 / 4, 0, bodyHeight * 2 / 3, bodyWidth / 2, bodyHeight)
            ctx.bezierCurveTo(bodyWidth, bodyHeight * 2 / 3, bodyWidth, bodyHeight * 5 / 4, bodyWidth * 3 / 4, 0)
            ctx.lineTo(bodyWidth / 4, 0);
        } else {
            ctx.moveTo(bodyWidth / 3, 0)
            ctx.bezierCurveTo(bodyWidth / 4, bodyHeight / 6, bodyWidth / 6, bodyHeight / 6, bodyWidth / 6, bodyHeight / 3)
            ctx.bezierCurveTo(bodyWidth / 6, bodyHeight / 2, bodyWidth / 3, bodyHeight * 5 / 12, bodyWidth / 6, bodyHeight * 2 / 3)
            ctx.bezierCurveTo(0, bodyHeight * 11 / 12, bodyWidth / 6, bodyHeight * 5 / 6, bodyWidth / 2, bodyHeight)
            ctx.bezierCurveTo(bodyWidth * 5 / 6, bodyHeight * 5 / 6, bodyWidth, bodyHeight * 11 / 12, bodyWidth * 5 / 6, bodyHeight * 2 / 3)
            ctx.bezierCurveTo(bodyWidth * 2 / 3, bodyHeight * 5 / 12, bodyWidth * 5 / 6, bodyHeight / 2, bodyWidth * 5 / 6, bodyHeight / 3)
            ctx.bezierCurveTo(bodyWidth * 5 / 6, bodyHeight / 6, bodyWidth * 3 / 4, bodyHeight / 6, bodyWidth * 2 / 3, 0)
            ctx.lineTo(bodyWidth / 3, 0)
        }
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    _drawFigures() {
        if (this.figureImages.length !== 0) {
            const ctx = this.#ctx
            const figureWidth = this.bodyWidth * 5 / 12
            const figureSpace = this.bodyHeight * 3 / 4
            const figureX = (this.bodyWidth - figureWidth) / 2
            const figureDY = figureSpace / this.figureImages.length
            const figureStartY = (this.bodyHeight + figureSpace - figureDY + figureWidth) / 2
            ctx.save()
            ctx.transform(1, 0, 0, -1, figureX, figureStartY)
            for (let i = 0; i < this.figureImages.length; i++) {
                const img = this.figureImages[i]
                ctx.drawImage(img, 0, 0, figureWidth, img.naturalHeight * figureWidth / img.naturalWidth)
                ctx.transform(1, 0, 0, 1, 0, figureDY)
            }
            ctx.restore()
        }
    }

    _drawHeadSkin() {
        const ctx = this.#ctx
        ctx.save()
        ctx.fillStyle = this.skinColor
        ctx.beginPath()
        ctx.arc(0, 0, this.headRadius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    _drawHair() {
        const ctx = this.#ctx
        const headRadius = this.headRadius
        const hairColor = this.hairColor
        const skinColor = this.skinColor
        ctx.save()
        //left side
        let hairStart = { x: Math.cos(Math.PI) * headRadius, y: Math.sin(Math.PI) * headRadius }
        let hairEnd = { x: Math.cos(Math.PI / 3) * headRadius, y: Math.sin(Math.PI / 3) * headRadius }
        ctx.beginPath()
        ctx.fillStyle = hairColor
        ctx.arc(0, 0, headRadius, Math.PI / 3, Math.PI)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = skinColor
        ctx.moveTo(hairStart.x, hairStart.y)
        ctx.quadraticCurveTo((4 * hairStart.x + hairEnd.x) / 5, (hairStart.y + 4 * hairEnd.y) / 5, hairEnd.x, hairEnd.y)
        ctx.lineTo(0, 0)
        ctx.lineTo(hairStart.x, hairStart.y)
        ctx.fill()
        ctx.closePath()
        //right side
        hairStart = { x: Math.cos(Math.PI * 3 / 4) * headRadius, y: Math.sin(Math.PI * 3 / 4) * headRadius }
        hairEnd = { x: Math.cos(Math.PI / 9) * headRadius, y: Math.sin(Math.PI / 9) * headRadius }
        ctx.beginPath()
        ctx.fillStyle = hairColor
        ctx.arc(0, 0, headRadius, Math.PI / 9, Math.PI * 3 / 4)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(hairStart.x, hairStart.y)
        ctx.quadraticCurveTo(hairStart.x, hairEnd.y, hairEnd.x, hairEnd.y)
        ctx.lineTo(0, headRadius)
        ctx.lineTo(hairStart.x, hairStart.y)
        ctx.fill()
        ctx.closePath()
        
        ctx.restore()
    }

    _drawMouth() {
        const ctx = this.#ctx
        const headRadius = this.headRadius
        const mouthY = -headRadius / 2
        const mouthLeftX = -headRadius / 3
        const mouthRightX = headRadius / 3
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = this.#lineWidth
        ctx.strokeStyle = "black"
        ctx.moveTo(mouthLeftX, mouthY)
        ctx.quadraticCurveTo((mouthRightX + mouthLeftX) / 2, -this.headRadius * 2 / 3, mouthRightX, mouthY)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
    }

    _drawEyes() {
        const ctx = this.#ctx
        const headRadius = this.headRadius
        const eyeDX = headRadius * 17 / 40 // *2/5
        const eyeDY = 0
        const eyeLeftX = -eyeDX
        const eyeRightX = eyeDX
        const eyeY = eyeDY
        const eyeRadius = this.#eyeRadius
        const eyeColorRadius = this.#eyeColorRadius
        const eyeLeftSide = { x: -eyeRadius, y: 0 }
        const eyeRightSide = { x: eyeRadius, y: 0 }
        const eyeDelta = { x: (eyeLeftSide.x + eyeRightSide.x) / 2, yUp: eyeY + eyeRadius, YDown: eyeY - eyeRadius }
        const drawEyeBall = () => {
            ctx.beginPath()
            ctx.fillStyle = "white"
            ctx.moveTo(eyeLeftSide.x, eyeLeftSide.y)
            ctx.quadraticCurveTo(eyeDelta.x, eyeDelta.yUp, eyeRightSide.x, eyeRightSide.y)
            ctx.quadraticCurveTo(eyeDelta.x, eyeDelta.YDown, eyeLeftSide.x, eyeLeftSide.y)
            ctx.fill()
            ctx.closePath()
            ctx.beginPath()
            ctx.fillStyle = this.eyeColor
            ctx.arc(0, 0, eyeColorRadius, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()
        }
        ctx.save()

        ctx.save()
        ctx.transform(1, 0, 0, 1, eyeLeftX, eyeY)
        drawEyeBall()
        ctx.restore()
        ctx.save()
        ctx.transform(1, 0, 0, 1, eyeRightX, eyeY)
        drawEyeBall()
        ctx.restore()
        
        ctx.restore()
    }

    _drawGlasses() {
        if(this.glasses) {
            const ctx = this.#ctx
            const glassesDX = this.headRadius / 10
            const glassesDY = this.#eyeColorRadius
            const glassesWidth = this.headRadius * 4 / 5
            const glassesHeight = glassesWidth * 2 / 3
            const glassesLeft = { x: -glassesDX, y: glassesDY }
            const glassesRight = { x: glassesDX, y: glassesDY }
            ctx.save()
            
            ctx.lineWidth = this.#lineWidth
            ctx.strokeStyle = "black"
            ctx.fillStyle = "lightblue"
            const drawGlasses = () => {
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.bezierCurveTo(0, glassesHeight * 5 / 12, glassesWidth, glassesHeight * 5 / 12, glassesWidth, 0)
                ctx.bezierCurveTo(glassesWidth, -glassesHeight * 3 / 4, glassesWidth / 2, -glassesHeight * 2 / 3, glassesWidth / 3, -glassesHeight * 2 / 3)
                ctx.bezierCurveTo(glassesWidth / 6, -glassesHeight * 2 / 3, 0, -glassesHeight * 3 / 4, 0, 0)
                ctx.stroke()
                ctx.globalAlpha = 0.35
                ctx.fill()
                ctx.closePath()
            }

            ctx.save()
            ctx.transform(1, 0, 0, 1, glassesRight.x, glassesRight.y)
            drawGlasses()
            ctx.restore()
            ctx.save()
            ctx.transform(-1, 0, 0, 1, glassesLeft.x, glassesLeft.y)
            drawGlasses()
            ctx.restore()
            ctx.beginPath()
            ctx.moveTo(glassesLeft.x, glassesLeft.y)
            ctx.quadraticCurveTo((glassesRight.x + glassesLeft.x) / 2, glassesLeft.y + glassesHeight / 18, glassesRight.x, glassesLeft.y)
            ctx.stroke()
            ctx.closePath()

            ctx.restore()
        }
    }

    _drawName() {
        if(this.name != undefined) {
            const ctx = this.#ctx
            const text = this.name + (this.age != undefined ? " (" + this.age + ")" : "")
            ctx.save()
            ctx.fillStyle = "black"
            ctx.font = this.textSize + "px serif"
            const textWidth = ctx.measureText(text).width;
            const textX = this.#headX - textWidth/2
            const textY = this.#headY + this.headRadius * 7 / 6
            ctx.transform(1,0, 0,-1, textX,textY)
            ctx.fillText(text, 0, 0)
            ctx.restore()
        }
    }
}

module.exports = CanvasPerson