var input = (function() {
    function Input() {
        this.clientMousePos = null;
        var self = this;
        document.addEventListener('mousemove', function(evt) {
            self.clientMousePos = new Point(evt.clientX, evt.clientY, true);
            self.onMousePosChange(self.getMousePos());
        }, false);
        document.addEventListener('click', function(evt) {
            self.onMouseClick(self.getMousePos());
        }, false);
    }

    Input.prototype.onMousePosChange = function() {};
    Input.prototype.onMouseClick = function() {};

    Input.prototype.getMousePos = function() {
        if(this.clientMousePos == null) {
            this.clientMousePos = new Point(0, 0, true);
        }
        return convertToUnit(this.clientMousePos.sub(camera.worldOffset));
    };

    return new Input();
})();