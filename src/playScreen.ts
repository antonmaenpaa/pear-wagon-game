
class PlayScreen {
    private pearWagon: IGameState
    private drops: any[]
    // private drop: Drop
    private player: Player
    private scoreHp: ScoreHpDisplay
    private spawnRate: number
    private lastSpawn: number
    private ground: number

    constructor(pearWagon: IGameState) {
        this.pearWagon = pearWagon;
        this.ground = 100;
        this.drops = []
        this.spawnRate = 500;
        this.lastSpawn = -1;
        
        this.player = new Player
        this.scoreHp = new ScoreHpDisplay
    }

    update() {
        let time = Date.now();
        if (time > (this.lastSpawn + this.spawnRate)){
            this.lastSpawn = time;
            let numb = (Math.floor(Math.random() * Math.floor(99)) + 1)
            if(numb >= 40){
                this.drops.push(new GreenPear(random(0, innerWidth), 0, (Math.floor(Math.random() * Math.floor(5)) + 1)));
            } else if(numb >= 30 && numb <= 39) {
                this.drops.push(new RottenPear(random(0, innerWidth), 0, (Math.floor(Math.random() * Math.floor(5)) + 1)));
            } else if(numb >= 20 && numb <= 29){
                this.drops.push(new Bomb(random(0, innerWidth), 0, (Math.floor(Math.random() * Math.floor(5)) + 1)));
            } else if(numb >= 10 && numb <= 19) {
                this.drops.push(new Star(random(0, innerWidth), 0, (Math.floor(Math.random() * Math.floor(5)) + 1)));
            } else {
                this.drops.push(new Heart(random(0, innerWidth), 0, (Math.floor(Math.random() * Math.floor(5)) + 1)));
            }
        }

        for(let i = 0; i < this.drops.length; i++){
            this.drops[i].move();
        }

        // this.drops[i].respawn();
        // this.drop.move();
        // this.drop.respawn();
        this.player.update();
        this.checkCollision();
    }

    checkCollision() {
        for (let drop of this.drops) {
            let distX = Math.abs(drop.x - this.player.x);
            const distY = Math.abs(drop.y - this.player.y);
            
            // return true if the rectangle and circle are colliding
    
            // if (distX > (rect.w/2 + circle.r)) { return false; }
            // if (distY > (rect.h/2 + circle.r)) { return false; }
    
            // if (distX <= (rect.w/2)) { return true; } 
            // if (distY <= (rect.h/2)) { return true; }
    
            // var dx=distX-rect.w/2;
            // var dy=distY-rect.h/2;
            // return (dx*dx+dy*dy<=(circle.r*circle.r));

            if (distX > (this.player.width/2 + drop.r)) { return false; }
            if (distY > (this.player.height/2 + drop.r)) { return false; }
    
            if (distX <= (this.player.width/2)) { return true; } 
            if (distY <= (this.player.height/2)) { return true; }
    
            let dx = distX - this.player.width/2;
            const dy = distY - this.player.height/2;


            return (dx * dx + dy * dy <= (drop.r * drop.r));
            
        }

    }

    draw() {
        push();
        background(136, 207, 248);
        // this.drop.draw();
        // this.player.draw();
        
        image(images.cloud1, innerWidth / 100 * 8, 100, 362, 214);
        image(images.cloud2, innerWidth / 100 * 65, 50, 362, 214);
        
        for(let i = 0; i < this.drops.length; i++){
            this.drops[i].draw();
        }
        this.player.draw();
        this.scoreHp.draw();

        //Ground
        noStroke();
        fill(27, 133, 30);
        rect(0, innerHeight - this.ground, innerWidth, 400);
        fill(125, 106, 68);
        rect(0, innerHeight - this.ground + 20, innerWidth, 400);
        pop();

    }

}