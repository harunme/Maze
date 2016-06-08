function Layer(id) {
    this.coordinates = {
        x: null,
        y: null
    };
    this.img = document.getElementById(id);
    this.initLayer = function(maze, url, x, y) {
        var random = Math.floor(Math.random() * maze.path.length);
        this.coordinates.x = x == undefined ? maze.path[random][0] * maze.config['grid'] + 6 : x + 6;
        this.coordinates.y = x == undefined ? maze.path[random][1] * maze.config['grid'] + 6 : y + 6;
        this.img.style.backgroundImage = "url(./img/" + url + ")";
        this.img.style.display = "block";
        this.img.style.position = "absolute";
        this.img.style.width = "20px";
        this.img.style.height = "18px";
        this.img.style.backgroundSize = "70px 70px";
        this.img.style.left = this.coordinates.x + 'px';
        this.img.style.top = this.coordinates.y + 'px';
        this.ctx = maze.ctx;
        this.pathPos = random;
    };
    this.moveUp = function() {
        if (!isCollsion(this.ctx, this.img, this.coordinates.x, this.coordinates.y - 1)) {
            this.img.style.backgroundPosition = "-2px 18px";
            --this.coordinates.y;
            this.move();
        }
    };
    this.moveDown = function() {
        if (!isCollsion(this.ctx, this.img, this.coordinates.x, this.coordinates.y + 1)) {
            this.img.style.backgroundPosition = "-2px 70px";
            ++this.coordinates.y;
            this.move();
        }
    };
    this.moveLeft = function() {
        if (!isCollsion(this.ctx, this.img, this.coordinates.x - 1, this.coordinates.y)) {
            this.img.style.backgroundPosition = "-2px 52px";
            --this.coordinates.x;
            this.move();
        }
    };
    this.moveRight = function() {
        if (!isCollsion(this.ctx, this.img, this.coordinates.x + 1, this.coordinates.y)) {
            this.img.style.backgroundPosition = "-2px 35px";
            ++this.coordinates.x;
            this.move();
        }
    };
    this.move = function(u, r, d, l) {
        this.img.style.left = this.coordinates.x + 'px';
        this.img.style.top = this.coordinates.y + 'px';
    };
}

function isCollsion(context, img, x, y) {
    var imgData = context.getImageData(x, y, 18, 18);
    var pixels = imgData.data;
    for (var i = 0; n = pixels.length, i < n; i += 4) {
        var red = pixels[i];
        var green = pixels[i + 1];
        var blue = pixels[i + 2];
        var alpha = pixels[i + 3];
        if (red == 0 && green == 0 && blue == 0 && alpha == 0) {
            return true;
        }
    }

    return false;
}
