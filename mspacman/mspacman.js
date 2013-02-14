function draw() {
    canvas = document.getElementById('game');
    if(canvas.getContext) {
        ctx = canvas.getContext("2d");
        //Draw background
        bg = new Image();
        bg.src = "pacman10-hp-sprite.png";
        //Draw mspacman
        pm = new Image();
        pm.src = "pacman10-hp-sprite.png";
        //Draw Ghost
        ghost = new Image();
        ghost.src = "pacman10-hp-sprite.png";
        ghost.onload = function() {
            ctx.drawImage(bg, 322, 2, 464, 136, 50, 50, 464, 136);
            ctx.drawImage(pm, 81, 3, 18, 18, 187, 143, 18, 18);
            ctx.drawImage(ghost, 79, 122, 18, 18, 257, 142, 18, 18);
        }
    }
    else {
        alert('Sorry, canvas is not supported. Use another browser.');
    }
}