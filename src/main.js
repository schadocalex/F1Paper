var WIDTH = 3862,
    HEIGHT = 2150;

window.onload = function() {
    var CircuitCanvas = Canvas(WIDTH, HEIGHT, world);

    var points = [
        new Point(0, 420),
        new Point(400, 400),
        new Point(600, 300),
        new Point(600, 50),
        new Point(400, 0),
        new Point(0, 0),
        new Point(-400, -170),
        new Point(-600, -170),
        new Point(-600, 200),
        new Point(-400, 300)
    ];

    var map = new Map(CircuitCanvas, points);
    map.drawDebug();
};