function Canvas(w, h, container) {
    container = container || document.body;

    var cvs = container.appendChild(document.createElement("canvas"));
    cvs.width = w;
    cvs.height = h;
    var ctx = cvs.getContext("2d");

    return {
        getCanvas: function() { return cvs; },

        reset: function() {
            cvs.width = cvs.width;
            ctx.strokeStyle = "black";
            ctx.fillStyle = "none";
            ctx.clearRect(0, 0, cvs.width, cvs.height);
        },

        getWidth: function() {
            return cvs.width;
        },

        getHeight: function() {
            return cvs.height;
        },

        setColor: function(c) {
            ctx.strokeStyle = c;
        },

        noColor: function(c) {
            ctx.strokeStyle = "transparent";
        },

        setLineWidth: function(w) {
            ctx.lineWidth = w;
        },

        setRandomColor: function() {
            var r = ((255*Math.random())|0),
                g = ((255*Math.random())|0),
                b = ((255*Math.random())|0);
            ctx.strokeStyle = "rgb("+r+","+g+","+b+")";
        },

        setRandomFill: function(a) {
            a = (typeof a === "undefined") ? 1 : a;
            var r = ((255*Math.random())|0),
                g = ((255*Math.random())|0),
                b = ((255*Math.random())|0);
            ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
        },

        setFill: function(c) {
            ctx.fillStyle = c;
        },

        noFill: function() {
            ctx.fillStyle = "transparent";
        },

        drawSkeleton: function(curve) {
            var pts = curve.points.map(convertPos);
            ctx.strokeStyle = "blue";
            this.drawLine(pts[0], pts[1]);
            if(pts.length === 3) { this.drawLine(pts[1], pts[2]); }
            else {this.drawLine(pts[2], pts[3]); }
            ctx.strokeStyle = "black";
            this.drawPoints(pts);
        },

        drawCurve: function(curve) {
            ctx.beginPath();
            var p = curve.points.map(convertPos);
            ctx.moveTo(p[0].x, p[0].y);
            if(p.length === 3) {
                ctx.quadraticCurveTo(
                    p[1].x, p[1].y,
                    p[2].x, p[2].y
                );
            }
            if(p.length === 4) {
                ctx.bezierCurveTo(
                    p[1].x, p[1].y,
                    p[2].x, p[2].y,
                    p[3].x, p[3].y
                );
            }
            ctx.stroke();
            ctx.closePath();
        },

        drawLine: function(p1, p2) {
            p1 = convertPos(p1);
            p2 = convertPos(p2);
            ctx.beginPath();
            ctx.moveTo(p1.x,p1.y);
            ctx.lineTo(p2.x,p2.y);
            ctx.stroke();
        },

        drawPoint: function(p) {
            p = convertPos(p);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, 2*Math.PI);
            ctx.stroke();
        },

        drawPoints: function(points) {
            points.forEach(function(p) {
                this.drawCircle(p, 3);
            }, this);
        },

        drawCrosses: function(points) {
            points.forEach(this.drawCross, this);
        },

        drawCross: function(p) {
            this.drawLine(p.add(new Point(-0.3,-0.3)), p.add(new Point(0.3,0.3)));
            this.drawLine(p.add(new Point(0.3,-0.3)), p.add(new Point(-0.3,0.3)));
        },

        drawPath: function(path, cyclic) {
            for(var i = 0; i < path.length - 1; i++) {
                this.drawLine(path[i], path[i+1]);
            }
            if(cyclic === true) {
                this.drawLine(path[path.length-1], path[0]);
            }
        },

        drawArc: function(p) {
            p = convertPos(p);
            ctx.beginPath();
            ctx.moveTo(p.x + ox, p.y + oy);
            ctx.arc(p.x + ox, p.y + oy, p.r, p.s, p.e);
            ctx.lineTo(p.x + ox, p.y + oy);
            ctx.fill();
            ctx.stroke();
        },

        drawCircle: function(p, r) {
            p = convertPos(p);
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, 2*Math.PI);
            ctx.stroke();
        },

        drawbbox: function(bbox) {
            var bboxMin = convertPos(new Point(bbox.x.min, bbox.y.min)),
                bboxMax = convertPos(new Point(bbox.x.max, bbox.y.max));
            ctx.beginPath();
            ctx.moveTo(bboxMin.x, bboxMin.y);
            ctx.lineTo(bboxMin.x, bboxMax.y);
            ctx.lineTo(bboxMax.x, bboxMax.y);
            ctx.lineTo(bboxMax.x, bboxMin.y);
            ctx.closePath();
            ctx.stroke();
        },

        drawShape: function(shape) {
            var order = shape.forward.points.length - 1;
            ctx.beginPath();
            ctx.moveTo(shape.startcap.points[0].x, shape.startcap.points[0].y);
            ctx.lineTo(shape.startcap.points[3].x, shape.startcap.points[3].y);
            if(order === 3) {
                ctx.bezierCurveTo(
                    shape.forward.points[1].x, shape.forward.points[1].y,
                    shape.forward.points[2].x, shape.forward.points[2].y,
                    shape.forward.points[3].x, shape.forward.points[3].y
                );
            } else {
                ctx.quadraticCurveTo(
                    shape.forward.points[1].x, shape.forward.points[1].y,
                    shape.forward.points[2].x, shape.forward.points[2].y
                );
            }
            ctx.lineTo(shape.endcap.points[3].x, shape.endcap.points[3].y);
            if(order === 3) {
                ctx.bezierCurveTo(
                    shape.back.points[1].x, shape.back.points[1].y,
                    shape.back.points[2].x, shape.back.points[2].y,
                    shape.back.points[3].x, shape.back.points[3].y
                );
            } else {
                ctx.quadraticCurveTo(
                    shape.back.points[1].x, shape.back.points[1].y,
                    shape.back.points[2].x, shape.back.points[2].y
                );
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        },

        drawText: function(text, pos) {
            pos = convertPos(pos);
            ctx.fillText(text, pos.x, pos.y);
        }
    };
}
