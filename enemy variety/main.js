/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const cxt = canvas.getContext('2d');
const width = 500;
const height = 800;
canvas.width = width;
canvas.height = height;

class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 1500; 
        this.enemyTimer = 0;
        this.maxEnemies = 10; 
        this.enemyTypes = ['worm', 'ghost', 'spider'];
    }

    update(deltaTime) {
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

        if (this.enemyTimer > this.enemyInterval && this.enemies.length < this.maxEnemies) {
            this.#addNewEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(enemy => enemy.update(deltaTime));
    }

    draw() {
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
    }

    #addNewEnemy() {
        const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];

        if (randomEnemy == 'worm') this.enemies.push(new Worm(this));
        if (randomEnemy == 'ghost') this.enemies.push(new Ghost(this));
        if (randomEnemy == 'spider') this.enemies.push(new Spider(this));
        this.enemies.sort(function(a,b) {
            return a.y - b.y;
        });
    }
}


class Enemy {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.maxFrame = 5;
        this.frameInterval = 1500;
        this.frameTimer = 0;
    }

    update(deltaTime) {
        this.x -= this.vx * (deltaTime / 1000);
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}


class Worm extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = this.game.width;
        this.y = this.game.height - this.height;
        this.image = worm;  
        this.vx = Math.random() * 0.1 + 0.1;
    }
}

class Ghost extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height * 0.6);
        this.image = ghost;  
        this.vx = Math.random() * 0.2 + 0.2;
        this.angle = 0;
        this.curve = Math.random() * 0.01;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.y += Math.sin(this.angle) * this.angle * 0.2;
        this.angle+= 0.04;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.5;
        super.draw(ctx);
        ctx.restore();
    }
}


class Spider extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = Math.random() * (this.game.width * 0.5);
        this.y = 0 - this.height;
        this.image = spider;  
        this.vx = 0;
        this.vy = Math.random() * 0.005 + 0.005;
        this.maxLenght = Math.random() * (this.game.height * 0.4);
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.y  < 0 - this.height * 2) this.markedForDeletion = true;

        this.y += this.vy * deltaTime;

        if (this.y > this.maxLenght) this.vy  *= -1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2,0);
        ctx.lineTo(this.x + this.width/2,this.y + 10);
        ctx.stroke();
        super.draw(ctx);
    }
}


const game = new Game(cxt, canvas.width, canvas.height);
let lastTime = 1;
function animate(timestamp) {
    cxt.clearRect(0,0, canvas.width, canvas.height);
    const deltaTime = timestamp - lastTime;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
}

animate(0);