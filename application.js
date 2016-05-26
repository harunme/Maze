var isMouseDown = false,
    startX = startY = 0,
    WIDTH, HEIGHT, DATA;
window.onload = function() {
    var img = new Image();
    img.src = './maze.png';
    img.onload = function(argument) {
        // WIDTH = img.width;
        // HEIGHT = img.height;
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        ctx = initMaze(img);
        var layer = new Layer();
        layer.initLayer(ctx);
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
    }
};

function initMaze(img) {
    var canvas = document.getElementById('baseboard');
    baseCtx = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    baseCtx.drawImage(img, 0, 0);
    return baseCtx;
}

function Layer() {
    this.coordinates = {
        x: 0,
        y: 0
    };
    this.img = document.getElementById('face');
    this.initLayer = function(ctx) {
        this.ctx = ctx;
        var face = document.getElementById('face');
        ctx.drawImage(face, this.coordinates.x, this.coordinates.y);
    };
    this.moveUp = function() {
        if (!isCollsion(this.ctx, this.img, this.coordinates.x, this.coordinates.y - 1)) {
            this.clear();
            --this.coordinates.y;
            this.move();
        }
    };
    this.moveDown = function() {
        if (!isCollsion(this.ctx, this.img, this.coordinates.x, this.coordinates.y + 1)) {
            this.clear();
            ++this.coordinates.y;
            this.move();
        }
    };
    this.moveLeft = function() {
        if (!isCollsion(this.ctx, this.img, this.coordinates.x - 1, this.coordinates.y)) {
            this.clear();
            --this.coordinates.x;
            this.move();
        }
    };
    this.moveRight = function() {
        if (!isCollsion(this.ctx, this.img, this.coordinates.x + 1, this.coordinates.y)) {
            this.clear();
            ++this.coordinates.x;
            this.move();
        }
    };
    this.move = function(u, r, d, l) {
        console.log(isCollsion(this.ctx, this.img, this.coordinates.x, this.coordinates.y))
        ctx.drawImage(this.img, this.coordinates.x, this.coordinates.y);
    };
    this.clear = function() {
        ctx.clearRect(this.coordinates.x, this.coordinates.y, this.img.width, this.img.height);
    };
}

function isCollsion(context, img, x, y) {
    var imgData = context.getImageData(x, y, img.width, img.height);
    var pixels = imgData.data;
    for (var i = 0; n = pixels.length, i < n; i += 4) {
        var red = pixels[i];
        var green = pixels[i + 1];
        var blue = pixels[i + 2];
        var alpha = pixels[i + 3];
        // console.log(red, green, blue, alpha)
        if (red == 0 && green == 0 && blue == 0 && alpha == 255) {
            return true;
        }
    }
    return false;
}
