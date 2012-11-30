/*
 mindmap-factoryMethod

 */
newNodeFactory = {
    var: sumOfNodes = 0,
    var: xConnectPosition = 0,
    var: yConnectPosition = 0,

    newNodeFactory : function (layer, parentNode){

        var oval = new Kinetic.Ellipse({
            x: parentNode.getX() + 100,
            y: parentNode.getY() + 100,
            radius: {
                x: 100,
                y: 50
            },
            fill: "#00D2FF",
            stroke: "black",
            strokeWidth: 4 ,
            id: 'oval'+sumOfNodes,
            draggable: true
        });
        sumOfNodes++;

        xConnectPosition = oval.getX();
        yConnectPosition = oval.getY();

        oval.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        oval.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        oval.on("click", function() {
            clickNode(oval, layer);
        });

        var xChild = oval.getX();
        var yChild = oval.getY();
        var xParent = parentNode.getX();
        var yParent = parentNode.getY();

        var connectionLine = new Kinetic.Line({
            y: yParent,
            x: xParent,
            points: [0, 0, xChild - xParent, yChild - yParent],
            stroke: "black",
            strokeWidth: 4,
            lineCap: "round",
            lineJoin: "round"
        });

        var drawConnectionLine = new Kinetic.Animation({
            func: function() {
                var xChild = oval.getX();
                var yChild = oval.getY();
                var xParent = parentNode.getX();
                var yParent = parentNode.getY();
                connectionLine.setX(xParent);
                connectionLine.setY(yParent);
                connectionLine.setPoints([0,0,xChild - xParent, yChild - yParent]);
            }
        });

        oval.on("dragstart dragend", function(){
            drawConnectionLine.start();
        });

        parentNode.on("dragstart dragend", function() {
            drawConnectionLine.start();
        });

        layer.add(connectionLine);
        layer.add(oval);
        layer.add(parentNode);
        layer.draw();

        return oval;
    }
}