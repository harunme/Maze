function EndPoint(id) {
    this.coordinates = {
        x: null,
        y: null
    };
    this.img = document.getElementById(id);
    this.initLayer = function(maze) {
        this.coordinates.x = maze.path[maze.path.length - 1][0] * maze.config['grid'];
        this.coordinates.y = maze.path[maze.path.length - 1][1] * maze.config['grid'];
        this.img.style.backgroundImage = "url(./src/icon_item_10000012.png)";
        this.img.style.display = "block";
        this.img.style.position = "absolute";
        this.img.style.width = "30px";
        this.img.style.height = "30px";
        this.img.style.backgroundSize = "30px 30px";
        this.img.style.left = this.coordinates.x + 'px';
        this.img.style.top = this.coordinates.y + 'px';
    }
}
