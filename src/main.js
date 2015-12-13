window.onload = function() {
    var Circuit = Canvas(1920, 1080, document.body);

    var draw = function (curve, i) {
        Circuit.setColor("rgba(0,0,255,0.5)");
        //Circuit.drawCurve(curve);
        //Circuit.drawSkeleton(curve);
        Circuit.setColor("black");
        var j = (i + 1) % diff.length;
        var outline = curve.outline(diff[i]*100,diff[i]*100,diff[j]*100,diff[j]*100);
        var doc = function(c, j, arr) {
            if(j % (arr.length/2) === 0) { return; }
            Circuit.drawCurve(c);
        };
        outline.curves.forEach(doc);
        //Circuit.drawCurve(curve.scale(30 * diff[i]));
        //Circuit.drawCurve(curve.scale(-30 * diff[i]));
        //Circuit.setColor("red");
    };

    var points = [
        [800,620],
        [1200,600],
        [1400,500],
        [1400,300],
        [1200,200],
        [800,200],
        [400,30],
        [200,30],
        [200,500],
        [400,600]
    ];
    var diff = [1,0.75,0.5,0.5,0.25,0.25,0.5,0.75,1,0.75];
    var pointsMid = [],
        curves = [],
        i, j;
    for(i = 0; i < points.length; i++) {
        j = (i + 1) % points.length;
        pointsMid.push([
            (points[i][0]+points[j][0]) / 2,
            (points[i][1]+points[j][1]) / 2
        ]);
    }
    for(i = 0; i < points.length; i++) {
        j = (i + 1) % points.length;
        curves.push(new Bezier(
            pointsMid[i][0],
            pointsMid[i][1],
            points[j][0],
            points[j][1],
            pointsMid[j][0],
            pointsMid[j][1]
        ));
    }

    //curves.forEach(draw);

    curves.forEach(function(curve, i){
        setTimeout(function() {
            draw(curve, i);
        }, 500 * i);
    });
}