var Point = (function() {
    function Point(x, y, converted) {
        this.x = x;
        this.y = y;
        this.converted = !!converted;
    }

    Point.prototype.add = function(p) {
        if(this.converted != p.converted) {
            throw new Error("Convert 2 points in different units");
        }
        return new Point(this.x + p.x, this.y + p.y, this.converted);
    };

    Point.prototype.sub = function(p) {
        if(this.converted != p.converted) {
            throw new Error("Convert 2 points in different units");
        }
        return new Point(this.x - p.x, this.y - p.y, this.converted);
    };

    return Point;
})();