function Layer(id) {
    this.coordinates = {
        x: 0,
        y: 0
    };
    this.img = document.getElementById(id);
    this.initLayer = function(ctx) {
        this.ctx = ctx;
        ctx.drawImage(this.img, this.coordinates.x, this.coordinates.y);
    };
    this.moveUp = function() {
        console.log('up')
        if (!isCollsion(this.ctx, this.img, this.coordinates.x, this.coordinates.y - 1)) {
            this.clear();
            --this.coordinates.y;
            this.move();
        }
    };
    this.moveDown = function() {
        console.log('moveDown')
        if (!isCollsion(this.ctx, this.img, this.coordinates.x, this.coordinates.y + 1)) {
            this.clear();
            ++this.coordinates.y;
            this.move();
        }
    };
    this.moveLeft = function() {
        console.log('moveLeft')
        if (!isCollsion(this.ctx, this.img, this.coordinates.x - 1, this.coordinates.y)) {
            this.clear();
            --this.coordinates.x;
            this.move();
        }
    };
    this.moveRight = function() {
        console.log('moveRight')

        if (!isCollsion(this.ctx, this.img, this.coordinates.x + 1, this.coordinates.y)) {
            this.clear();
            ++this.coordinates.x;
            this.move();
        }
    };
    this.move = function(u, r, d, l) {
        console.log(isCollsion(this.ctx, this.img, this.coordinates.x, this.coordinates.y))
        this.ctx.drawImage(this.img, this.coordinates.x, this.coordinates.y);
    };
    this.clear = function() {
        this.ctx.clearRect(this.coordinates.x, this.coordinates.y, this.img.width, this.img.height);
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
