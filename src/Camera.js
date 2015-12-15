var camera = (function() {
    "use strict";

    function Camera() {

    }

    Camera.prototype.focusPos = function(pos) {
        var width = window.innerWidth,
            height = window.innerHeight;

        pos = convertPos(pos);

        pos.x -= width / 2;
        pos.y -= height / 2;
        if(pos.x < 0) {
            pos.x = 0;
        }
        if(pos.y < 0) {
            pos.y = 0;
        }
        if(pos.x >= WIDTH - width) {
            pos.x = WIDTH - width;
        }
        if(pos.y >= HEIGHT - height) {
            pos.y = HEIGHT - height;
        }

        this.worldOffset = new Point(-pos.x, -pos.y, true);
        this.node.style.transform = "translate(" + this.worldOffset.x + "px," + this.worldOffset.y + "px)";
    };

    return new Camera();
})();