var Point = (function() {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    Point.add = function(p1, p2) {
        return new Point(p1.x + p2.x, p1.y + p2.y);
    };

    return Point;
})();