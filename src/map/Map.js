var Map = (function() {

    function Map(canvas, points) {
        this.canvas = canvas;
        this.curves = [];

        var offset = new Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
        this.points = points.map(function(point) {
            return Point.add(point, offset);
        });
console.log(offset);
        canvas.drawLine(
            Point.add(offset, {
                x: -20,
                y: 0
            }),
            Point.add(offset, {
                x: 20,
                y: 0
            }));
        canvas.drawLine(
            Point.add(offset, {
                x: 0,
                y: -20
            }),
            Point.add(offset, {
                x: 0,
                y: 20
            }));

        computeCurves.call(this);
    }

    Map.prototype.drawDebug = function() {
        this.curves.forEach(drawCurveDebug, this);
    };

    function computeCurves() {
        var points = this.points,
            pointsMid = [],
            i, j;

        this.curves = [];

        for(i = 0; i < points.length; i++) {
            j = (i + 1) % points.length;
            pointsMid.push(new Point(
                (points[i].x+points[j].x) / 2,
                (points[i].y+points[j].y) / 2
            ));
        }
        for(i = 0; i < points.length; i++) {
            j = (i + 1) % points.length;
            this.curves.push(new Bezier(
                pointsMid[i].x,
                pointsMid[i].y,
                points[j].x,
                points[j].y,
                pointsMid[j].x,
                pointsMid[j].y
            ));
        }
    }

    function drawCurveDebug(curve, i) {
        var canvas = this.canvas;

        canvas.setColor("rgba(0,0,0,1)");
        canvas.drawCurve(curve);
        canvas.drawSkeleton(curve, null, i);
        var doc = function(c, j, arr) {
            if(j % (arr.length/2) === 0) { return; }
            canvas.drawCurve(c);
        };


        canvas.getCanvas().getContext("2d").font="30px Arial";
        canvas.drawText(i, {
            x: this.points[i].x + 20,
            y: this.points[i].y + 40
        });

        //var j = (i + 1) % diff.length;
        //var outline = curve.outline(diff[i]*100,diff[i]*100,diff[j]*100,diff[j]*100);
        //outline.curves.forEach(doc);

        canvas.setColor("rgba(255,0,0,0.8)");
        outline = curve.outline(25,25,25,25);
        outline.curves.forEach(doc);
        canvas.setColor("rgba(0,255,0,0.8)");
        outline = curve.outline(100,100,100,100);
        outline.curves.forEach(doc);
        canvas.setColor("rgba(255,200,0,0.8)");
        outline = curve.outline(75,75,75,75);
        outline.curves.forEach(doc);
        canvas.setColor("rgba(255,100,0,0.8)");
        outline = curve.outline(50,50,50,50);
        outline.curves.forEach(doc);
    };

    return Map;

})();