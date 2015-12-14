var Camera = (function() {
    "use strict";

    function Camera(node) {
        this.node = node;
    }

    Camera.prototype.focusPlayer = function(player) {
        var pos = convertPos(player.getPos()),
            width = window.innerWidth,
            height = window.innerHeight;

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

        this.node.style.transform = "translate(" + pos.x + "px," + pos.y + "px)";
    };

    return Camera;
})();