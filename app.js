document.body.onload = game;

function game() {
    console.log('游戏开始...');
    loadResources();
}

function loadResources() {
    console.log("正在加载游戏资源...");
    var bgCanvas = document.getElementById('background');
    bgCanvas.width = document.body.clientWidth; //document.width is obsolete
    bgCanvas.height = document.body.clientHeight; //document.height is obsolete
    bgCtx = bgCanvas.getContext('2d');
    var bgImg = new Image();
    bgImg.src = "./src/bbg_desert_1.jpg";
    bgImg.onload = function() {
        bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
        console.log("背景资源加载结束...")
    }
    loadMaze();
}

function loadMaze() {
    var maze = new Maze({
        // canvas画布id
        "mazeId": "maze",
        // canvas画布高度
        "canvasHeight": 600,
        // canvas画布宽度
        "canvasWidth": 1240,
        // 迷宫宽度
        "mazeWidth": 41,
        // 迷宫高度
        "mazeHeight": 18,
        // 路与墙的总宽度
        "gird": 30,
        // 路的宽度
        "road": 28,
        // 迷宫墙的颜色
        "wallColor": "black",
        // 迷宫行进路线的颜色
        "roadColor": "white"
    });
    maze.init();
}

var interval = [];
document.onkeydown = function(e) {
    for (v in interval) {
        window.clearInterval(interval[v])
    }
    if (e.which === 38) {
        interval.push(window.setInterval(function() {
            layer.moveUp();
        }, 15))
    }
    if (e.which === 40) {
        interval.push(window.setInterval(function() {
            layer.moveDown();
        }, 15))
    }
    if (e.which === 37) {
        interval.push(window.setInterval(function() {
            layer.moveLeft();
        }, 15))
    }
    if (e.which === 39) {
        interval.push(window.setInterval(function() {
            layer.moveRight();
        }, 15))

    }
}
