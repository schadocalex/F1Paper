var Player = (function() {

    function drawPath(from, to) {
        from = from || 0;
        to = to || this.path.length;
        var path = this.path.slice(from, to);
        CircuitLayer.setColor(this.color);
        CircuitLayer.setLineWidth(5);
        CircuitLayer.drawCrosses(path);
        CircuitLayer.drawPath(path);
    }

    function Player(params) {
        this.name = params.name;
        this.color = params.color;

        this.path = [params.startPos.add(new Point(-1, 0)), params.startPos];
        drawPath.call(this);
    }

    Player.prototype.getPos = function() {
        return this.path[this.path.length - 1];
    };

    Player.prototype.getPreviousPos = function() {
        return this.path[this.path.length - 2];
    };

    Player.prototype.getNextPoint = function(type) {
        var oldPoint = this.getPreviousPos(),
            currentPoint = this.getPos();

        return currentPoint.add(currentPoint.sub(oldPoint));
    };

    return Player;
})();