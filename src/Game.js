var Game = (function() {
    "use strict";

    function Game(params) {
        OFFSET = new Point(1500, 1000, true);

        //var path = [
        //    new Point(0, 17),
        //    new Point(16, 16),
        //    new Point(26, 11),
        //    new Point(24, 2),
        //    new Point(16, 0),
        //    new Point(0, 4),
        //    new Point(-16, -7),
        //    new Point(-24, -7),
        //    new Point(-36, 8),
        //    new Point(-20, 16)
        //];

        var path = [
            new Point(28, 27),
            new Point(48, 26),
            new Point(54, 16),
            new Point(50, 10),
            new Point(32, 8),
            new Point(32, -2),
            new Point(44, -8),
            new Point(56, -12),
            new Point(52, -22),
            new Point(14, -10),
            new Point(-4, -16),
            new Point(-8, -4),
            new Point(-24, -8),
            new Point(-44, 8),
            new Point(-46, 16),
            new Point(-38, 22),
            new Point(-28, 8),
            new Point(-20, 8),
            new Point(-16, 20),
            new Point(-12, 39),
            new Point(4, 28)
        ];

        var startPos = [
            new Point(38, 25),
            new Point(38, 26),
            new Point(38, 27),
            new Point(38, 28)
        ];

        this.map = new Map({
            canvas: CircuitLayer,
            path: path,
            startPos: startPos
        });
        this.map.drawDebug();

        this.players = [
            new Player({
                startPos: startPos[0],
                color: "#0000ff"
            }),
            new Player({
                startPos: startPos[1],
                color: "#ff0000"
            }),
            new Player({
                startPos: startPos[2],
                color: "#00cc00"
            }),
            new Player({
                startPos: startPos[3],
                color: "#ffdd00"
            })
        ];
        this.currentPlayer = this.players[0];

        this.camera = new Camera(world);
        this.focusCurrentPlayer();
        window.onresize = this.focusCurrentPlayer.bind(this);
    }

    Game.prototype.start = function() {

    };

    Game.prototype.focusCurrentPlayer = function() {
        this.camera.focusPlayer(this.currentPlayer);
    };

    return Game;

})();