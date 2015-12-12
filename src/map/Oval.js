var OvalMap = (function() {
    var portionLength = 24;
    var portionWidth = {
        easy: 8,
        medium: 6
    };
    var centerToBorder = 11;

    function Point(x, y) {
        return {x:x,y:y};
    }

    return {
        name: "Oval map",
        easy: {
            portionLength: 1,
            leftPoints: [
                Point(0, centerToBorder),
                Point(portionLength, centerToBorder),
                Point(centerToBorder+portionLength, 0),
                Point(portionLength, -centerToBorder),
                Point(-centerToBorder, 0),
                Point(-portionLength, -centerToBorder),
                Point(0, -portionLength-centerToBorder),
                Point(portionLength, centerToBorder)
            ],
            rightPoints: [
                Point(0, centerToBorder+portionWidth.easy),
                Point(portionLength, centerToBorder+portionWidth.easy),
                Point(centerToBorder+portionLength+portionWidth.easy, 0),
                Point(portionLength, -centerToBorder-portionWidth.easy),
                Point(0, -centerToBorder-portionWidth.easy),
                Point(-portionLength-portionWidth.easy, -centerToBorder-portionWidth.easy),
                Point(-portionLength-centerToBorder-portionWidth.easy, 0),
                Point(portionLength+portionWidth.easy, centerToBorder+portionWidth.easy)
            ]
        }
    };
})();