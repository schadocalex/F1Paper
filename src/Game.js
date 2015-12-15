var Game = (function() {
    "use strict";

    function Game(params) {

        if(MAP_NUM === 1) {
            OFFSET = new Point(2700, 2000, true);
            var path = [
                new Point(0, 17),
                new Point(16, 16),
                new Point(26, 11),
                new Point(24, 2),
                new Point(16, 0),
                new Point(0, 4),
                new Point(-16, -7),
                new Point(-24, -7),
                new Point(-36, 8),
                new Point(-20, 16)
            ];
            var startPos = [
                new Point(8, 13),
                new Point(8, 14),
                new Point(8, 15),
                new Point(8, 16),
                new Point(8, 17),
                new Point(8, 18),
                new Point(8, 19),
                new Point(8, 20)
            ];
        } else if(MAP_NUM === 2) {
            OFFSET = new Point(2500, 1700, true);
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
                new Point(38, 23),
                new Point(38, 24),
                new Point(38, 25),
                new Point(38, 26),
                new Point(38, 27),
                new Point(38, 28),
                new Point(38, 29),
                new Point(38, 30)
            ];
        }
        this.map = new Map({
            canvas: circuitLayer,
            path: path,
            startPos: startPos
        });
        this.map.draw();

        this.players = [
            {
                startPos: startPos[3],
                color: "#0000ff"
            },
            {
                startPos: startPos[4],
                color: "#ff0000"
            },
            {
                startPos: startPos[2],
                color: "#00cc00"
            },
            {
                startPos: startPos[5],
                color: "#ffdd00"
            },
            {
                startPos: startPos[1],
                color: "#cc00cc"
            },
            {
                startPos: startPos[6],
                color: "#cccc00"
            },
            {
                startPos: startPos[0],
                color: "#00cccc"
            },
            {
                startPos: startPos[7],
                color: "#ccff00"
            }
        ].slice(0, NB_PLAYERS).map(function(p) {
            return new Player(p);
        });

        this.currentPlayer = this.players[0];

        camera.node = world;
        this.focusCurrentPlayer();
        window.onresize = this.focusCurrentPlayer.bind(this);

        gameLayerController.setPlayers(this.players);
        gameLayerController.redraw();
    }

    Game.prototype.start = function() {
        this.loop();
    };

    Game.prototype.loop = function() {
        var self = this;

        this.focusCurrentPlayer();

        var pos = this.currentPlayer.getNextPos();
        gameLayerController.color = this.currentPlayer.color;

        gameLayerController.getChoice([
            pos.add(new Point(-1, -1)),
            pos.add(new Point(0, -1)),
            pos.add(new Point(1, -1)),
            pos.add(new Point(-1, 0)),
            pos.add(new Point(0, 0)),
            pos.add(new Point(1, 0)),
            pos.add(new Point(-1, 1)),
            pos.add(new Point(0, 1)),
            pos.add(new Point(1, 1))
        ].filter(function(point) {
            return self.players.every(function(player) {
                return player.getPos().x !== point.x || player.getPos().y !== point.y;
            })
        }), nextPlayer)

        function nextPlayer(point) {
            self.currentPlayer.newPos(point);
            self.currentPlayer = self.players[(self.players.indexOf(self.currentPlayer) + 1) % self.players.length];
            self.loop();
        }
    };

    Game.prototype.focusCurrentPlayer = function() {
        camera.focusPos(this.currentPlayer.getPos());
    };

    return Game;

})();