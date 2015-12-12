var ovalMap = (function() {
    var portionLength = 24,
        circuitCenter = 15,
        centerToBorder = 11;

    function Point(x, y) {
        return {x:x,y:y};
    }

    return {
        name: "Oval map",
        portions: {
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
                Point(0, centerToBorder+portionWidth),
                Point(portionLength, centerToBorder+portionWidth),
                Point(centerToBorder+portionLength+portionWidth, 0),
                Point(portionLength, -centerToBorder-portionWidth),
                Point(0, -centerToBorder-portionWidth),
                Point(-portionLength-portionWidth, -centerToBorder-portionWidth),
                Point(-portionLength-centerToBorder-portionWidth, 0),
                Point(portionLength+portionWidth, centerToBorder+portionWidth)
            ]
        }
    };
})();