var maze = new Maze({
    // canvas画布id
    "mazeId": "maze",
    // canvas画布高度
    "canvasHeight": 300,
    // canvas画布宽度
    "canvasWidth": 300,
    // 迷宫宽度
    "mazeWidth": 13,
    // 迷宫高度
    "mazeHeight": 10,
    // 路与墙的总宽度
    "gird": 20,
    // 路的宽度
    "road": 18,
    // 迷宫墙的颜色
    "wallColor": "black",
    // 迷宫行进路线的颜色
    "roadColor": "white"
});
maze.init();
var layer = new Layer("layer");
layer.img.onload = function() {
    layer.initLayer(maze.ctx);
}
document.onkeydown = function(e) {
    if (e.which === 38) {
        layer.moveUp();
        return;
    }
    if (e.which === 40) {
        layer.moveDown();
        return;
    }
    if (e.which === 37) {
        layer.moveLeft();
        return;
    }
    if (e.which === 39) {
        layer.moveRight();
        return;
    }
}
