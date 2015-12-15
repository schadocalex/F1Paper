var Map = (function() {
    "use strict";

    function Map(params) {
        params = params || {};

        this.canvas = params.canvas;
        this.curves = [];
        this.path = params.path;

        drawGrid.call(this);
        this.canvas.setLineWidth(5);
        computeCurves.call(this);
    }

    Map.prototype.draw = function() {
        this.difficulties = this.curves.map(function(c, i) {
            if(i === 0) {
                return 4;
            } else if(DIFFICULTY === 0) {
                return Math.ceil(Math.random() * 4);
            } else {
                return DIFFICULTY;
            }
        });
        this.curves.forEach(drawCurve, this);
    };

    Map.prototype.drawDebug = function() {
        this.curves.forEach(drawCurveDebug, this);
    };

    function computeCurves() {
        var points = this.path,
            pointsMid = [],
            i, j;

        this.curves = [];

        for(i = 0; i < points.length; i++) {
            j = (i + 1) % points.length;
            pointsMid.push(new Point(
                (points[i].x+points[j].x) / 2,
                (points[i].y+points[j].y) / 2,
                false
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

    function drawCurve(curve, i) {
        var canvas = this.canvas,
            outline,
            j = (i + 1) % this.difficulties.length;

        canvas.setColor("rgba(0,0,0,0.8)");
        canvas.setLineWidth(1);
        canvas.drawCurve(curve);
        canvas.setLineWidth(5);
        var doc = function(c, j, arr) {
            if(j % (arr.length/2) === 0) { return; }
            canvas.drawCurve(c);
            minimap.drawCurve(c);
        }.bind(this);

        canvas.setColor("rgba(0,0,0,0.8)");

        outline = curve.outline(this.difficulties[i],this.difficulties[i],this.difficulties[j],this.difficulties[j]);
        outline.curves.forEach(doc);
    }

    function drawCurveDebug(curve, i) {
        var canvas = this.canvas,
            outline;

        canvas.setColor("rgba(0,0,0,1)");
        canvas.drawCurve(curve);
        canvas.drawSkeleton(curve);
        var doc = function(c, j, arr) {
            if(j % (arr.length/2) === 0) { return; }
            canvas.drawCurve(c);
        }.bind(this);


        canvas.getCanvas().getContext("2d").font="30px Arial";
        canvas.drawText(i, {
            x: this.path[i].x + 1,
            y: this.path[i].y + 1
        });

        //var j = (i + 1) % diff.length;
        //var outline = curve.outline(diff[i]*100,diff[i]*100,diff[j]*100,diff[j]*100);
        //outline.curves.forEach(doc);

        canvas.setColor("rgba(255,0,0,0.8)");
        outline = curve.outline(1,1,1,1);
        outline.curves.forEach(doc);
        canvas.setColor("rgba(255,100,0,0.8)");
        outline = curve.outline(2,2,2,2);
        outline.curves.forEach(doc);
        canvas.setColor("rgba(255,200,0,0.8)");
        outline = curve.outline(3,3,3,3);
        outline.curves.forEach(doc);
        canvas.setColor("rgba(0,255,0,0.8)");
        outline = curve.outline(4,4,4,4);
        outline.curves.forEach(doc);
    }

    function drawGrid() {
        this.canvas.reset();
        var keepOffset = new Point(OFFSET.x, OFFSET.y);
        OFFSET = new Point(0, 0);
        this.canvas.setColor(GRID_COLOR);
        this.canvas.setLineWidth(1);
        for(var i = 0; i < NB_TILES_X; i++) {
            this.canvas.drawLine(new Point(i, 0), new Point(i, NB_TILES_Y));
        }
        for(var j = 0; j < NB_TILES_Y; j++) {
            this.canvas.drawLine(new Point(0, j), new Point(NB_TILES_X, j));
        }
        OFFSET = keepOffset;
    }

    return Map;

})();