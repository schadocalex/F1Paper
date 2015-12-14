var Point = (function() {
    function Point(x, y, converted) {
        this.x = x;
        this.y = y;
        this.converted = !!converted;
    }

    Point.prototype.add = function(p) {
        return new Point(this.x + p.x, this.y + p.y);
    };

    Point.prototype.sub = function(p) {
        return new Point(this.x - p.x, this.y - p.y);
    };

    return Point;
})();