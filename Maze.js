var WIDTH = HEIGHT = 10;
var pathWidth = 20;
var book = [];
var path = [];
var wall = [];

function dfs(x, y) {
    path.push([x, y]);
    book[x * WIDTH + y] = generateRandomDirections();
    for (var i = 0; i < 4; i++) {
        nx = x + book[x * WIDTH + y][i][0];
        ny = y + book[x * WIDTH + y][i][1];
        if (nx < 0 || nx > 1 * WIDTH - 1 || ny < 0 || ny > 1 * HEIGHT - 1) continue;
        if (!book[nx * WIDTH + ny]) {
            wall.push([(x + nx) / 2, (y + ny) / 2]);
            dfs(nx, ny);
        }
    }
}

function generateRandomDirections() {
    var steps = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
        ],
        s = [],
        copyS = [];
    for (var i = 0; i < 3; i++) {
        var n = Math.floor(Math.random() * 4);
        copyS[i] = steps[i];
        steps[i] = steps[n];
        steps[n] = copyS[i];
    }
    return steps;
}
dfs(0, 0);
console.log(path.toString())
var canvas = document.getElementById('test');
canvas.height = 800;
canvas.width = 800;
ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 800, 800);
ctx.fillStyle = 'white';
for (var j = 0; j < wall.length; j++) {
    ctx.fillRect(wall[j][0] * 20, wall[j][1] * 20, 10, 10)
}
for (var j = 0; j < path.length; j++) {
    ctx.fillRect(path[j][0] * 20, path[j][1] * 20, 10, 10)
}
ctx.stroke();
