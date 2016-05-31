var LEVEL = [{
        // canvas画布id
        "mazeId": "maze",
        // 迷宫X轴格子数量
        "mazeWidth": 15,
        // 迷宫Y轴格子数量
        "mazeHeight": 10,
        // 路与墙的总宽度
        "grid": 38,
        // 路的宽度
        "road": 36,
        // 迷宫墙的颜色
        "wallColor": "black",
        // 迷宫行进路线的颜色
        "roadColor": "white"
    }, {
        "mazeWidth": 21,
        "mazeHeight": 12
    }, {
        "mazeWidth": 25,
        "mazeHeight": 15
    }, {
        "mazeWidth": 29,
        "mazeHeight": 18
    }, {
        "mazeWidth": 33,
        "mazeHeight": 20
    }],
    endImgUrl = ['icon_maze_cave_small.png', 'icon_maze_time_small.png', 'icon_maze_angel_small.png', 'icon_maze_fort_small.png'],
    bgImgUrl = ['bbg_forest_3.jpg', 'bbg_garden_3.jpg', 'bbg_snowfield_3.jpg', 'bbg_jungle_3.jpg', 'bbg_desert_3.jpg', 'bbg_mushroom_3.jpg', 'bbg_seabeach_2.jpg', 'bbg_seabeach_3.jpg'],
    nextLevel = 0;
document.body.onload = game;

function game() {
    console.log('游戏开始...');
    var gameObj = loadResources();
    eventListener(gameObj);
}

function loadResources() {
    console.log("正在加载游戏资源...");
    var bgCtx = loadBg(),
        maze = loadMaze(LEVEL[nextLevel++]);
    return {
        "bgCtx": bgCtx,
        "maze": maze,
        "layer": loadLayer(maze),
        "endPoint": generateEndPoint(maze)
    }
}

function loadBg() {
    var bgCanvas = document.getElementById('background');
    bgCanvas.width = document.body.clientWidth;
    bgCanvas.height = document.body.clientHeight;
    bgCtx = bgCanvas.getContext('2d');
    var bgImg = new Image();
    bgImg.src = "./src/" + bgImgUrl[Math.floor(Math.random() * bgImgUrl.length)];
    bgImg.onload = function() {
        bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
        console.log("背景资源加载结束...");
    }
    return bgCtx;
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
    endPoint.initLayer(maze, endImgUrl[nextLevel - 1]);
    return endPoint;
}

function eventListener(obj) {
    var interval;
    document.onkeydown = function(e) {
        window.clearInterval(interval)
        if (e.which === 38) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer.coordinates, obj.endPoint.coordinates))
                    return newLevel();
                obj.layer.moveUp();
            }, 10)
        }
        if (e.which === 40) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer.coordinates, obj.endPoint.coordinates))
                    return newLevel();
                obj.layer.moveDown();
            }, 10)
        }
        if (e.which === 37) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer.coordinates, obj.endPoint.coordinates))
                    return newLevel();
                obj.layer.moveLeft();
            }, 10)
        }
        if (e.which === 39) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer.coordinates, obj.endPoint.coordinates))
                    return newLevel();
                obj.layer.moveRight();
            }, 10)
        }

        function newLevel() {
            window.clearInterval(interval);
            var bgImg = new Image();
            obj.bgCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
            bgImg.src = "./src/" + bgImgUrl[Math.floor(Math.random() * bgImgUrl.length)];
            bgImg.onload = function() {
                obj.bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, document.body.clientWidth, document.body.clientHeight);
                obj.maze.init(LEVEL[nextLevel++]);
                obj.layer.initLayer(obj.maze);
                obj.endPoint.initLayer(obj.maze, endImgUrl[nextLevel]);
            }
        }

        function collisionDetection(xy, ab) {
            return Math.abs(xy.x - ab.x) < 20 && Math.abs(xy.y - ab.y) < 20;
        }

    }
}
