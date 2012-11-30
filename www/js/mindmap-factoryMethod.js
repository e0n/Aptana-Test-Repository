/*
 mindmap-factoryMethod

 */
newNodeFactory = {
    var: sumOfNodes = 0,

    // -----
    // Creates a new node with ellipse shape
    // -----

    newEllipseNode : function (layer, parentNode){

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
    },



    // -----
    // Creates a new node with rect shape
    // -----

    newRectNode : function (layer, parentNode){

        var rect = new Kinetic.Rect({
            x: parentNode.getX() + 100,
            y: parentNode.getY() + 100,
            height: 80,
            width: 200,
            fill: "#00D2FF",
            stroke: "black",
            strokeWidth: 4 ,
            id: 'oval'+sumOfNodes,
            draggable: true
        });
        sumOfNodes++;

        xConnectPosition = rect.getX();
        yConnectPosition = rect.getY();

        rect.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        rect.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        rect.on("click", function() {
            clickNode(rect, layer);
        });

        var xChild = rect.getX();
        var yChild = rect.getY();
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
                var xChild = rect.getX();
                var yChild = rect.getY();
                var xParent = parentNode.getX();
                var yParent = parentNode.getY();
                connectionLine.setX(xParent);
                connectionLine.setY(yParent);
                connectionLine.setPoints([0,0,xChild - xParent, yChild - yParent]);
            }
        });

        rect.on("dragstart dragend", function(){
            drawConnectionLine.start();
        });

        parentNode.on("dragstart dragend", function() {
            drawConnectionLine.start();
        });

        layer.add(connectionLine);
        layer.add(rect);
        layer.add(parentNode);
        layer.draw();

        return rect;
    },




    // -----
    // Creates the base Node with ellipse shape
    // -----

    createBaseNode: function(stage, layer){
       var base = new Kinetic.Ellipse({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: {
                x: 100,
                y: 50
            },
            fill: "red",
            stroke: "black",
            strokeWidth: 4 ,
            id: 'oval0'
        });
        xConnectPosition = base.getX();
        yConnectPosition = base.getY();

        // add cursor styling for shape oval
        base.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        base.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        base.on("click", function() {
            clickNode(base, layer);
        });

        return base;
    }
}