var Player = (function() {

    function drawPath(from, to) {
        from = from || 0;
        to = to || this.path.length;
        var path = this.path.slice(from, to);
        circuitLayer.setColor(this.color);
        circuitLayer.setLineWidth(2);
        circuitLayer.drawCrosses(path);
        circuitLayer.drawPath(path);
        minimap.setColor(this.color);
        minimap.drawPath(path);
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

    Player.prototype.newPos = function(pos) {
        this.path.push(pos);
        drawPath.call(this, this.path.length - 2);
    };

    Player.prototype.getPreviousPos = function() {
        return this.path[this.path.length - 2];
    };

    Player.prototype.getNextPos = function() {
        var oldPoint = this.getPreviousPos(),
            currentPoint = this.getPos();

        return currentPoint.add(currentPoint.sub(oldPoint));
    };

    return Player;
})();