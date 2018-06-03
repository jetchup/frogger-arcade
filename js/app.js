'use strict';

// Enemies our player must avoid
var Enemy = function(name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.name = name;
    this.sprite = 'images/enemy-bug.png';
    this.x = -50;
    this.speed = Math.random() * 0.5 + 0.1;
    // Enemy spawn location
    this.chosenPath = Math.floor(Math.random() * ((3) + 1));
    if (this.chosenPath === 1){
        this.y= 50;
    } else {
        if (this.chosenPath === 2){
            this.y= 150;
          } else {
            this.y= 250;
          }
    }

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  const timer = setInterval(goEnemyGo, dt);


    function goEnemyGo() {
        if (allEnemies.length != 0 && runAnimation){
            allEnemies.forEach(function(enemy) {
            // Delete enemies that are off screen
                if (enemy.x > 500) {
                    let soonDeleted = allEnemies.indexOf(enemy);
                    allEnemies.splice(soonDeleted, 1);
                } else {
                    enemy.x =enemy.x + (dt * enemy.speed);
                }
            });
      }
   }
};


// Do we have a running animation? Modified from https://www.html5canvastutorials.com/advanced/html5-canvas-start-and-stop-an-animation/
let runAnimation = true;


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player (){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 350;
    this.speedX = 0.25;
    this.speedY = 0.25;
}

Player.prototype.update = function() {
    checkCollision();
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e) {
    if (runAnimation) {
        if (this.x > 0 && e=== "left") {
            this.x -= 100;
        }
        if (e=== "right" && this.x < 400) {
            this.x += 100;
        }

        if (this.y > 0 && e=== "up") {
            this.y -= 100;
        }
        if (this.y < 400 && e=== "down") {
            this.y += 100;
        }
        if (this.y === -50) {
          // if you go to the water
          plusOne();

          setTimeout(function() {
              document.querySelector(".plus-one").style.display = "none";
          }, 1000);

          setTimeout(function() {
              addScore();
          }, 1000);
          this.y = 350;
        }
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Start creating Enemies
const allEnemies = [];
// Create enemies

if (allEnemies.length === 0){
    spawn();

    let clock = Math.random() * 1000 + 700;
    var spawning = setInterval(spawn, clock);
} else {
    //pass;
}


function spawn() {
    console.log(allEnemies);
    var enemy = new Enemy;
    allEnemies.push(enemy);
}

// Initialize the player
const player = new Player();


// Check for collisions
function checkCollision() {
    allEnemies.forEach(function(enemy) {
        if (enemy.y === player.y && runAnimation) {
            enemy.x = Math.round(enemy.x);
            player.x = Math.round(player.x);
            let enemyWidth = (enemy.x + 100) + enemy.x;
            let playerWidth = (player.x + 100) + player.x;
            let enemyHitPos = enemy.x + enemyWidth + 150;
            let playerHitPos = player.x + playerWidth;
            let distance = playerHitPos - enemyHitPos;

            // If too close, colide
            const checkOnce = (function () {
                if (distance < 0 && distance > -50) {
                    runAnimation = false;
                    clearInterval(spawning);
                    openModal();
                } else {
                    // pass
                }
            });
            checkOnce();
        }
    });
}


// Plus one point when you manage it to the river
function plusOne() {
    var point = document.querySelector(".plus-one");
    point.style.display = "block";
}


// Modal appears when you lose
// ------- Create reload button -------
var showModal = function() {
    let reloadButton = document.querySelectorAll(".fa-undo");
    reloadButton[0].addEventListener("click", reload);


    function reload(){
        window.location.reload();
    }
}


// Open modal
function openModal() {
    modal.style.display = "block";
    showModal();
}
// End modal section


// Adding points when you go to the water
function addScore() {
    document.querySelector(".score").innerHTML = parseInt(document.querySelector(".score").innerHTML) + 1;
}


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
    e.preventDefault();
});
