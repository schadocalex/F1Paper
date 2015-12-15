var gameLayerController = (function() {
    "use strict";

    function GameLayerController() {
        this.players = [];
        this.points = [];
        this.currentFocusPoint = null;
    }

    GameLayerController.prototype.setPlayers = function(players) {
        this.players = players;
    };

    GameLayerController.prototype.redraw = function(color) {
        var pos, oldPos,
            rot;
        gameLayer.reset();
        gameLayer.setColor(this.color);
        gameLayer.setLineWidth(2);

        for(var i = 0; i < this.players.length; i++) {
            pos = convertPos(this.players[i].getPos());
            oldPos = convertPos(this.players[i].getPreviousPos());
            rot = Math.atan2(pos.y - oldPos.y, pos.x - oldPos.x);
            gameLayer.drawRotatedImage(F1, pos, rot);
        }
        gameLayer.drawPoints(this.points);
        if(this.currentFocusPoint != null) {
            gameLayer.drawCross(this.currentFocusPoint);
        }
    };

    GameLayerController.prototype.getChoice = function(points, cb) {
        var self = this;
        this.points = points;
        this.redraw();

        function findPoint(mousePos) {
            for(var i = 0; i < points.length; i++) {
                if(Math.abs(mousePos.x - points[i].x) < 0.5
                    && Math.abs(mousePos.y - points[i].y) < 0.5) {
                    return points[i];
                }
            }
        }

        input.onMouseClick = function(mousePos) {
            var found = findPoint(mousePos);

            if(found != null) {
                self.points = [];
                self.currentFocusPoint = null;
                input.onMouseClick = function () {};
                input.onMousePosChange = function () {};
                self.redraw();
                cb(found);
            }
        };

        input.onMousePosChange = function(mousePos) {
            var found = findPoint(mousePos);

            if(found != null) {
                if(self.currentFocusPoint == null
                || self.currentFocusPoint.x !== found.x
                || self.currentFocusPoint.y !== found.y) {
                    self.currentFocusPoint = found;
                    self.redraw();
                }
            } else {
                if(self.currentFocusPoint != null) {
                    self.currentFocusPoint = null;
                    self.redraw();
                }
            }
        };
    };

    return new GameLayerController();
})();