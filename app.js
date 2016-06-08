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
    var loadingImg = document.getElementById('loadingImg');
    loadingImg.src = 'img/Loading30.png';
    var bgCanvas = document.getElementById('background');
    bgCanvas.width = document.body.clientWidth;
    bgCanvas.height = document.body.clientHeight;
    bgCtx = bgCanvas.getContext('2d');
    var bgImg = new Image();
    bgImg.src = "./img/" + bgImgUrl[Math.floor(Math.random() * bgImgUrl.length)];
    bgImg.onload = function() {
        loadingImg.src = 'img/Loading50.png';
        bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
        loadingImg.src = 'img/Loading80.png';
        var maze = loadMaze();
        var layer = loadLayer(maze);
        start({
            "bgCtx": bgCtx,
            "maze": maze,
            "layer": layer,
            "endPoint": generateEndPoint(maze)
        })
        loadingImg.src = 'img/Loading100.png';
        window.onresize = function() {
            bgCanvas.width = document.body.clientWidth;
            bgCanvas.height = document.body.clientHeight;
            bgCtx.clearRect(0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
            bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
        }
    }
}

function loadMaze() {
    var maze = new Maze(LEVEL[nextLevel++]);
    maze.init();
    return maze;
}

function loadLayer(maze) {
    var hero = new Layer('layerImg'),
        other = new Layer('otherImg');
    hero.initLayer(maze, '10000004.png');
    // other.initLayer(maze, '13000007.png', 0, 0);
    return {
        "hero": hero
            // "other": other
    };
}

function generateEndPoint(maze) {
    var endPoint = new EndPoint('endPoint');
    endPoint.initLayer(maze, endImgUrl[nextLevel - 1]);
    return endPoint;
}

function start(obj) {
    setTimeout(function() {
        document.getElementById('loading').style.display = "none";
    }, 800)
    var interval;
    document.onkeydown = function(e) {
        window.clearInterval(interval)

        if (e.which === 38) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer['hero'].coordinates, obj.endPoint.coordinates))
                    return newLevel();
                obj.layer['hero'].moveUp();
            }, 10)
        }
        if (e.which === 40) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer['hero'].coordinates, obj.endPoint.coordinates))
                    return newLevel();
                obj.layer['hero'].moveDown();
            }, 10)
        }
        if (e.which === 37) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer['hero'].coordinates, obj.endPoint.coordinates))
                    return newLevel();
                obj.layer['hero'].moveLeft();
            }, 10)
        }
        if (e.which === 39) {
            interval = window.setInterval(function() {
                if (collisionDetection(obj.layer['hero'].coordinates, obj.endPoint.coordinates))
                    return newLevel();
                obj.layer['hero'].moveRight();
            }, 10)
        }

        function newLevel() {
            window.clearInterval(interval);
            var bgImg = new Image();
            obj.bgCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
            bgImg.src = "./img/" + bgImgUrl[Math.floor(Math.random() * bgImgUrl.length)];
            bgImg.onload = function() {
                obj.bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, document.body.clientWidth, document.body.clientHeight);
                obj.maze.init(LEVEL[nextLevel++]);
                obj.layer['hero'].initLayer(obj.maze, '10000004.png');
                obj.endPoint.initLayer(obj.maze, endImgUrl[nextLevel]);
            }
        }

        function collisionDetection(xy, ab) {
            return Math.abs(xy.x - ab.x) < 20 && Math.abs(xy.y - ab.y) < 20;
        }

    };

}
