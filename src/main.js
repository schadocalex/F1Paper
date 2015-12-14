var WIDTH = 4000,
    HEIGHT = 2000,
    TILE_SIZE = 25,
    OFFSET = null,
    GRID_COLOR = "#C8C8C8",
    NB_TILES_X = Math.ceil(WIDTH/TILE_SIZE),
    NB_TILES_Y = Math.ceil(WIDTH/TILE_SIZE);

var CircuitCanvas,
    PlayersCanvas;

var player;

function convertPos(p) {
    if(p.converted) {
        return p;
    }
    return new Point(p.x * TILE_SIZE + OFFSET.x, p.y * TILE_SIZE + OFFSET.y, true);
}

window.onload = function() {
    CircuitCanvas = Canvas(WIDTH, HEIGHT, world);
    PlayersCanvas = Canvas(WIDTH, HEIGHT, world);

    var game = new Game();
};