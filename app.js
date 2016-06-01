var game = new Game();
(function() {
    var maze = game.loadMaze(game.LEVEL[game.nextLevel++]);
    game.start({
        "bgCtx": game.loadBg(),
        "maze": maze,
        "layer": game.loadLayer(maze),
        "endPoint": game.generateEndPoint(maze)
    })
})(game)
