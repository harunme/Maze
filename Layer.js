function Layer(id) {
    this.coordinates = {
        x: null,
        y: null
    };
    this.img = document.getElementById(id);
    this.initLayer = function(maze) {
        this.coordinates.x = maze.path[Math.floor(Math.random() * maze.path.length)][0] * maze.config['grid'] + 6;
        this.coordinates.y = maze.path[Math.floor(Math.random() * maze.path.length)][1] * maze.config['grid'] + 6;
        this.img.style.position = 'absolute';
        this.img.style.left = this.coordinates.x + 'px';
        this.img.style.top = this.coordinates.y + 'px';
        this.ctx = maze.ctx;
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
        // this.ctx.drawImage(this.img, this.coordinates.x, this.coordinates.y);
        this.img.style.left = this.coordinates.x + 'px';
        this.img.style.top = this.coordinates.y + 'px';
    };
    this.clear = function() {
        // this.ctx.clearRect(this.coordinates.x, this.coordinates.y, this.img.width, this.img.height);
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
        if (red == 0 && green == 0 && blue == 0 && alpha == 0) {
            return true;
        }
    }

    return false;
}
