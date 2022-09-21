const Enum = require("./Enum")

class PictureEmum extends Enum {
    static APPLE = new PictureEmum("apple") //"images/apple.png")
    static BANANA = new PictureEmum("banana") //"images/banana.png")
    static BUSH = new PictureEmum("bush") //"images/bush.png")
    static TREE = new PictureEmum("tree") //"images/tree.png")
    static SUN = new PictureEmum("sun") //"images/sun.png")
    static MOON = new PictureEmum("moon") //"images/moon.png")
    static CAT = new PictureEmum("cat") //"images/cat.png")
    static DOG = new PictureEmum("dog") //"images/dog.png")

    #image

    constructor(value) {
        super(value)
        this.#image = [...document.querySelectorAll("#toDraw img")].filter(img => img.id === value)[0]
    }

    get image() {
        return this.#image
    }
}

class HeightEmum extends Enum {
    static SMALL = new HeightEmum(1.25)
    static NORMAL = new HeightEmum(1.50)
    static TALL = new HeightEmum(1.75)
}

class SkinColorEmum extends Enum {
    static WHITE = new SkinColorEmum("peachpuff")
    static ASIAN = new SkinColorEmum("khaki")
    static BLACK = new SkinColorEmum("#6F4E37")
}

class HairColorEnum extends Enum {
    static BLOND = new HairColorEnum("#FFFF66")
    static RED = new HairColorEnum("orangered")
    static BROWN = new HairColorEnum("saddlebrown")
    static BLACK = new HairColorEnum("black")
}

class EyeColorEnum extends Enum {
    static BLUE = new EyeColorEnum("darkblue")
    static GREEN = new EyeColorEnum("darkgreen")
    static BROWN = new EyeColorEnum("#7B3F00")
}

class ClothColorEnum extends Enum {
    static RED = new ClothColorEnum("red")
    static BLUE = new ClothColorEnum("blue")
    static GREEN = new ClothColorEnum("green")
    static ORANGE = new ClothColorEnum("orange")
    static YELLOW = new ClothColorEnum("yellow")
    static PURPLE = new ClothColorEnum("purple")
    static PINK = new ClothColorEnum("pink")
    static GREY = new ClothColorEnum("lightgrey")
    static BLACK = new ClothColorEnum("black")
}

class WallColorEnum extends Enum {
    static WHITE = new WallColorEnum("#EAEAEA")
    static BLUE = new WallColorEnum("#1D1A52")
    static GREEN = new WallColorEnum("#0D581C")
    static YELLOW = new WallColorEnum("#DDD46E")
    static PURPLE = new WallColorEnum("#9238CB")
}

class RoofColorEnum extends Enum {
    static ORANGE = new RoofColorEnum("#DD7701")
    static RED = new RoofColorEnum("#761414")
    static BLACK = new RoofColorEnum("#252525")
    static BROWN = new RoofColorEnum("#53320A")

}

module.exports = {
    PictureEmum: PictureEmum,
    HeightEmum: HeightEmum,
    SkinColorEmum: SkinColorEmum,
    HairColorEnum: HairColorEnum,
    EyeColorEnum: EyeColorEnum,
    ClothColorEnum: ClothColorEnum,
    WallColorEnum: WallColorEnum,
    RoofColorEnum: RoofColorEnum
}