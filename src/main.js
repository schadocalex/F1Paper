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

var circuitLayer,
    gameLayer,
    minimap,
    game;

function convertPos(p) {
    if(p.converted) {
        return p;
    }
    return new Point(p.x * TILE_SIZE + OFFSET.x, p.y * TILE_SIZE + OFFSET.y, true);
}

function addOffset(p) {
    return new Point(p.x + OFFSET.x / TILE_SIZE, p.y + OFFSET.y / TILE_SIZE, true);
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
    minimap = Canvas(WIDTH/TILE_SIZE, HEIGHT/TILE_SIZE, document.body, "minimap");

    minimap.drawCurve = function(curve) {
        var ctx = this.getContext();
        ctx.beginPath();
        var p = curve.points.map(addOffset);
        ctx.moveTo(p[0].x, p[0].y);
        if(p.length === 3) {
            ctx.quadraticCurveTo(
                p[1].x, p[1].y,
                p[2].x, p[2].y
            );
        }
        if(p.length === 4) {
            ctx.bezierCurveTo(
                p[1].x, p[1].y,
                p[2].x, p[2].y,
                p[3].x, p[3].y
            );
        }
        ctx.stroke();
        ctx.closePath();
    };

    minimap.drawPath = function(path, cyclic) {
        path = path.map(addOffset);
        for(var i = 0; i < path.length - 1; i++) {
            this.drawLine(path[i], path[i+1]);
        }
        if(cyclic === true) {
            this.drawLine(path[path.length-1], path[0]);
        }
    }

    game = new Game();
    game.start();
};