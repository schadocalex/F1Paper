var WIDTH = 4000,
    HEIGHT = 3000;

window.onload = function() {
    var CircuitCanvas = Canvas(WIDTH, HEIGHT, world);

    var points = [
        new Point(700, 675),
        new Point(1200, 650),
        new Point(1350, 400),
        new Point(1250, 250),
        new Point(800, 200),
        new Point(800, -50),
        new Point(1100, -200),
        new Point(1400, -300),
        new Point(1300, -550),
        new Point(350, -250),
        new Point(-100, -400),
        new Point(-200, -100),
        new Point(-600, -200),
        new Point(-1100, 200),
        new Point(-1150, 400),
        new Point(-950, 550),
        new Point(-700, 200),
        new Point(-500, 200),
        new Point(-400, 500),
        new Point(-300, 975),
        new Point(100, 700)

    ];

    var map = new Map(CircuitCanvas, points);
    map.drawDebug();
};