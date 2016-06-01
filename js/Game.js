function Game() {
    this.LEVEL = [{
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
    }];
    this.endImgUrl = ['icon_maze_cave_small.png', 'icon_maze_time_small.png', 'icon_maze_angel_small.png', 'icon_maze_fort_small.png', 'mercenary_19000087.png'];
    this.bgImgUrl = ['bbg_forest_3.jpg', 'bbg_garden_3.jpg', 'bbg_snowfield_3.jpg', 'bbg_jungle_3.jpg', 'bbg_desert_3.jpg', 'bbg_mushroom_3.jpg', 'bbg_seabeach_2.jpg', 'bbg_seabeach_3.jpg'];
    this.nextLevel = 0;
    this.loadBg = function() {
        var bgCanvas = document.getElementById('background');
        bgCanvas.width = document.body.clientWidth;
        bgCanvas.height = document.body.clientHeight;
        bgCtx = bgCanvas.getContext('2d');
        var bgImg = new Image();
        bgImg.src = "./src/" + this.bgImgUrl[Math.floor(Math.random() * this.bgImgUrl.length)];
        bgImg.onload = function() {
            bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
            window.onresize = function() {
                console.log('hi')
                bgCanvas.width = document.body.clientWidth;
                bgCanvas.height = document.body.clientHeight;
                bgCtx.clearRect(0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
                bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, bgCanvas.width, bgCanvas.height);
            }
        }
        return bgCtx;
    };

    this.loadMaze = function(setting) {
        var maze = new Maze(setting);
        maze.init();
        return maze;
    };

    this.loadLayer = function(maze) {
        var hero = new Layer('layerImg');
        hero.initLayer(maze, '10000004.png');
        return {
            "hero": hero
        };
    };

    this.generateEndPoint = function(maze) {
        var endPoint = new EndPoint('endPoint');
        endPoint.initLayer(maze, this.endImgUrl[this.nextLevel - 1]);
        return endPoint;
    };

    this.start = function(obj) {
        var interval,
            self = this;
        document.onkeydown = function(e) {
            window.clearInterval(interval)
            if (e.which === 38) {
                interval = window.setInterval(function() {
                    if (self.collisionDetection(obj.layer['hero'].coordinates, obj.endPoint.coordinates))
                        return self.newLevel(obj, interval);
                    obj.layer['hero'].moveUp();
                }, 10)
            }
            if (e.which === 40) {
                interval = window.setInterval(function() {
                    if (self.collisionDetection(obj.layer['hero'].coordinates, obj.endPoint.coordinates))
                        return self.newLevel(obj, interval);
                    obj.layer['hero'].moveDown();
                }, 10)
            }
            if (e.which === 37) {
                interval = window.setInterval(function() {
                    if (self.collisionDetection(obj.layer['hero'].coordinates, obj.endPoint.coordinates))
                        return self.newLevel(obj, interval);
                    obj.layer['hero'].moveLeft();
                }, 10)
            }
            if (e.which === 39) {
                interval = window.setInterval(function() {
                    if (self.collisionDetection(obj.layer['hero'].coordinates, obj.endPoint.coordinates))
                        return self.newLevel(obj, interval);
                    obj.layer['hero'].moveRight();
                }, 10)
            }
        }
    };

    this.newLevel = function(obj, interval) {
        window.clearInterval(interval);
        var bgImg = new Image(),
            self = this;
        obj.bgCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
        bgImg.src = "./src/" + this.bgImgUrl[Math.floor(Math.random() * this.bgImgUrl.length)];
        bgImg.onload = function() {
            obj.bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, document.body.clientWidth, document.body.clientHeight);
            obj.maze.init(self.LEVEL[self.nextLevel++]);
            obj.layer['hero'].initLayer(obj.maze, '10000004.png');
            obj.endPoint.initLayer(obj.maze, self.endImgUrl[self.nextLevel]);
        }
    }

    this.collisionDetection = function(xy, ab) {
        return Math.abs(xy.x - ab.x) < 20 && Math.abs(xy.y - ab.y) < 20;
    }
};
