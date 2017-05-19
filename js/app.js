var maxspeed = 700;
var minspeed = 100;
var basespeed = 50;

// Enemies our player must avoid

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.espeed();

};
Enemy.prototype.espeed = function() {
    return Math.floor(Math.random() * (maxspeed - minspeed + 1) + basespeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
        this.speed = this.espeed();
    }

};

// Draw the enemy on the screen, required method for game
//the score will be seen on the grid itself.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "20px Forte Regular";
    ctx.fillText("Score = " + player.playerScore, 210, 70);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    this.playerScore = 0;
};

//2D collision detection.  source - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Player.prototype.update = function() {
    for (var i = 0; i < 3; i++) {
        if ((this.x < allEnemies[i].x + 72) && (this.x + 72 > allEnemies[i].x) && (this.y < allEnemies[i].y + 72) && (this.y + 72 > allEnemies[i].y)) {
            this.reset();
        }
    }
};

//to reset the initial position of the player
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

};
Player.prototype.resetwin = function() {
    this.x = 200;
    this.y = 400;
    this.playerScore = 0;

};
Player.prototype.scored = function() {
    "use strict";
    this.playerScore += 1;
    if (this.playerScore == 5) {
        alert("You WON!");
        this.resetwin();
    }
    this.reset();

};
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    if (key == "down") {
        if (this.y < 400) {
            this.y = this.y + 90;
        }
    } else if (key == "right") {
        if (this.x < 350) {
            this.x = this.x + 90;
        }
    } else if (key == "up") {
        if (this.y > 40) {
            this.y -= 90

        } else {
            this.scored();
        }
    } else if (key == "left") {
        if (this.x > 50) {
            this.x = this.x - 90;
        }
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 40),
    new Enemy(0, 120),
    new Enemy(0, 220)
];
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});