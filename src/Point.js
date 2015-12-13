var Point = (function() {
    var offset = {
        x: WIDTH / 2,
        y: HEIGHT / 2
    };

    function Point(x, y, enableOffset) {
        this.x = x;
        this.y = y;
        if(enableOffset !== false) {
            this.x += offset.x;
            this.y += offset.y;
        }
    }

    Point.add = function(p1, p2) {
        return new Point(p1.x + p2.x, p1.y + p2.y, false);
    };

    return Point;
})();