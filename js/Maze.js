function Maze(config) {
    // 迷宫基本配置
    this.config = config;
    // 判断当前位置是否走过
    this.book = [];
    // 存储行进路径
    this.path = [];
    // 存储哪些墙需要消除
    this.wall = [];
    this.init = function(obj) {
        if (obj) {
            for (var i in obj) {
                this.config[i] = obj[i];
            }
        }
        // 判断当前位置是否走过
        this.book = [];
        // 存储行进路径
        this.path = [];
        // 存储哪些墙需要消除
        this.wall = [];
        this.updateCssStyle();
        this.dfs(0, 0);
        this.drawWaze();
    };
    this.updateCssStyle = function() {
        var mazeDiv = document.getElementById('mazeDiv');
        mazeDiv.style.width = this.config.mazeWidth * this.config.grid + 'px';
        mazeDiv.style.height = this.config.mazeHeight * this.config.grid + 'px';
    };
    // 深度优先算法
    this.dfs = function(x, y) {
        // 循环变量
        var i = 0,
            // 下一步位置坐标
            nx, ny,
            // 迷宫宽度
            W = this.config.mazeWidth,
            // 迷宫高度
            H = this.config.mazeHeight;
        // 保存行进路径
        this.path.push([x, y]);
        // 标记已走过的位置
        this.book[x * W + y] = this.generateRandomDirections();
        // 遍历上下左右四个方向
        for (; i < 4; i++) {
            // 下一步X轴位置
            nx = x + this.book[x * W + y][i][0];
            // 下一步Y轴位置
            ny = y + this.book[x * W + y][i][1];
            // 边界判断
            if (nx < 0 || nx > 1 * W - 1 || ny < 0 || ny > 1 * H - 1) continue;
            // 判断该位置是否走过
            if (!this.book[nx * W + ny]) {
                // 保存哪些墙需要消除
                this.wall.push([(x + nx) / 2, (y + ny) / 2]);
                // 继续下一步
                this.dfs(nx, ny);
            }
        }
    };
    // 随机排列数组中上下左右方向
    this.generateRandomDirections = function() {
        // 使用二维数组声明上下左右四个方向
        var steps = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1]
            ],
            // 循环变量
            i = 0,
            // 交换位置copy
            copyS = [];
        // 对四个方向进行随机排序
        for (; i < steps.length; i++) {
            var n = Math.floor(Math.random() * 4);
            copyS[i] = steps[i];
            steps[i] = steps[n];
            steps[n] = copyS[i];
        }
        // 返回排序后的数组
        return steps;
    };
    this.drawWaze = function() {
        // 获取canvas画布
        var canvas = document.getElementById(this.config.mazeId);
        // 设置画布高度
        canvas.height = this.config.mazeHeight * this.config.grid;
        // 设置画布宽度
        canvas.width = this.config.mazeWidth * this.config.grid;
        // 获取画布上下文对象
        this.ctx = canvas.getContext('2d');
        // 设置迷宫墙的颜色
        this.ctx.fillStyle = this.config.wallColor;
        // 绘制迷宫底图
        // this.ctx.fillRect(0, 0, canvas.height, canvas.width);
        // 设置行进路径颜色
        this.ctx.fillStyle = this.config.roadColor;
        this.ctx.clearRect(0, 0, this.config.mazeWidth * this.config.grid, this.config.mazeHeight * this.config.grid);
        // 绘制墙
        for (var j = 0; j < this.wall.length; j++) {
            this.ctx.fillRect(this.wall[j][0] * this.config.grid, this.wall[j][1] * this.config.grid, this.config.road, this.config.road)
        }
        // 绘制路径
        for (var j = 0; j < this.path.length; j++) {
            this.ctx.fillRect(this.path[j][0] * this.config.grid, this.path[j][1] * this.config.grid, this.config.road, this.config.road)
        }
        this.ctx.stroke();
    };
}
