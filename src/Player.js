var Player = (function() {

    function drawPath(from, to) {
        from = from || 0;
        to = to || this.path.length;
        var path = this.path.slice(from, to);
        CircuitCanvas.setColor(this.color);
        CircuitCanvas.setLineWidth(5);
        CircuitCanvas.drawCrosses(path);
        CircuitCanvas.drawPath(path);
    }

    function Player(params) {
        this.name = params.name;
        this.color = params.color;

        this.path = [params.startPos.add(new Point(-1, 0)), params.startPos];
        drawPath.call(this);
    }

    Player.prototype.getNextPoint = function(type) {
        var oldPoint = this.path[this.path.length - 2],
            currentPoint = this.path[this.path.length - 1];

        return currentPoint.add(currentPoint.sub(oldPoint));
    };

    return Player;
})();