var WIDTH = 5000,
    HEIGHT = 4000,
    TILE_SIZE = 25,
    OFFSET = null,
    GRID_COLOR = "#C8C8C8",
    NB_TILES_X = Math.ceil(WIDTH/TILE_SIZE),
    NB_TILES_Y = Math.ceil(WIDTH/TILE_SIZE);

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}
function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}
var params = getSearchParameters();
var MAP_NUM = Math.max(Math.min(params.map ? parseInt(params.map, 10) : 1, 2), 1),
    NB_PLAYERS = Math.max(Math.min(params.players ? parseInt(params.players, 10) : 1, 8), 1),
    DIFFICULTY = Math.max(Math.min(params.difficulty ? 5-parseInt(params.difficulty, 10) : 3, 4), 0);

console.log(MAP_NUM, NB_PLAYERS, DIFFICULTY);

var circuitLayer,
    gameLayer,
    game;

function convertPos(p) {
    if(p.converted) {
        return p;
    }
    return new Point(p.x * TILE_SIZE + OFFSET.x, p.y * TILE_SIZE + OFFSET.y, true);
}

function convertToUnit(p) {
    if(!p.converted) {
        return p;
    }
    return new Point((p.x - OFFSET.x) / TILE_SIZE, (p.y - OFFSET.y) / TILE_SIZE, false);
}

window.onload = function() {
    circuitLayer = Canvas(WIDTH, HEIGHT, world, "circuitLayer");
    gameLayer = Canvas(WIDTH, HEIGHT, world, "gameLayer");

    game = new Game();
    game.start();
};