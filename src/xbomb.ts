class Bomb extends FallingObject {

    constructor(x: number, y: number, speed: number) {
        super(x, y, speed)

    }   


    update() {

    }

    draw() {
        image(images.bomb, this.x, this.y, 70, 70)
        // ellipse(this.x, this.y, 70);
        // fill('black');
    }

}