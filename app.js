document.body.onload = game;

function game() {
    console.log('游戏开始...');
    var gameObj = loadResources();
    eventListener(gameObj);
}

function loadResources() {
    console.log("正在加载游戏资源...");
    loadBg();
    var mazeSetting = {
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
        "grid": 30,
        // 路的宽度
        "road": 28,
        // 迷宫墙的颜色
        "wallColor": "black",
        // 迷宫行进路线的颜色
        "roadColor": "white"
    };
    var maze = loadMaze(mazeSetting);
    return {
        "maze": maze,
        "layer": loadLayer(maze),
        "endPoint": generateEndPoint(maze)
    }
}

function loadBg() {
    var bgCanvas = document.getElementById('background');
    bgCanvas.width = document.body.clientWidth; //document.width is obsolete
    bgCanvas.height = document.body.clientHeight; //document.height is obsolete
    bgCtx = bgCanvas.getContext('2d');
    var bgImg = new Image();
    bgImg.src = "./src/bbg_garden_3.jpg";
    bgImg.onload = function() {
        bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
        console.log("背景资源加载结束...")
    }
}

function loadMaze(setting) {
    var maze = new Maze(setting);
    maze.init();
    return maze;
}

function loadLayer(maze) {
    var layer = new Layer('layerImg');
    layer.initLayer(maze);
    return layer;
}

function generateEndPoint(maze) {
    var endPoint = new EndPoint('endPoint');
    endPoint.initLayer(maze);
    return endPoint;
}

function eventListener(obj) {
    var interval;
    document.onkeydown = function(e) {
        window.clearInterval(interval)
        if (e.which === 38) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer.coordinates, obj.endPoint.coordinates)) {
                    alert('到达终点')
                    window.clearInterval(interval)
                };
                obj.layer.moveUp();
            }, 10)
        }
        if (e.which === 40) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer.coordinates, obj.endPoint.coordinates)) {
                    alert('到达终点')
                    window.clearInterval(interval)
                };
                obj.layer.moveDown();
            }, 10)
        }
        if (e.which === 37) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer.coordinates, obj.endPoint.coordinates)) {
                    alert('到达终点')
                    window.clearInterval(interval)
                };
                obj.layer.moveLeft();
            }, 10)
        }
        if (e.which === 39) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer.coordinates, obj.endPoint.coordinates)) {
                    alert('到达终点')
                    window.clearInterval(interval)
                };
                obj.layer.moveRight();
            }, 10)

        }
    }
}

function collisionDetection(xy, ab) {
    return xy.x == ab.x && xy.y == ab.y;
}
