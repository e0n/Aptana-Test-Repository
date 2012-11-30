/*
 mindmap-factoryMethod

 */
newNodeFactory = {
    var: sumOfNodes = 0,

    // -----
    // Creates a new node with ellipse shape
    // -----

    newEllipseNode : function (layer, parent){

        var parentNode = parent.shape;
        alert(parentNode.xConnectPosition);

        this.shape = new Kinetic.Ellipse({
            x: parentNode.xConnectPosition + 100,
            y: parentNode.yConnectPosition + 100,
            radius: {
                x: 100,
                y: 50
            },
            fill: "#00D2FF",
            stroke: "black",
            strokeWidth: 4 ,
            id: 'shape'+sumOfNodes,
            draggable: true
        });
        sumOfNodes++;

        this.shape.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        this.shape.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        this.shape.on("click", function() {
            clickNode(this, layer);
        });

        this.xConnectPosition = this.shape.getX();
        this.yConnectPosition = this.shape.getY();

        var xChild = this.shape.getX();
        var yChild = this.shape.getY();

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
                xChild = this.shape.getX();
                yChild = this.shape.getY();
                xParent = parentNode.getX();
                yParent = parentNode.getY();
                connectionLine.setX(xParent);
                connectionLine.setY(yParent);
                connectionLine.setPoints([0,0,xChild - xParent, yChild - yParent]);
            }
        });

        this.shape.on("dragstart dragend", function(){
            drawConnectionLine.start();
        });

        parentNode.on("dragstart dragend", function() {
            drawConnectionLine.start();
        });

        layer.add(connectionLine);
        layer.add(this.shape);
        layer.add(parentNode);
        layer.draw();
    },



    // -----
    // Creates a new node with rect shape
    // -----

    newRectNode : function (layer, parent){

        var parentNode = parent.shape;
        var shape = new Kinetic.Rect({
            x: parentNode.getX() + 100,
            y: parentNode.getY() + 100,
            height: 80,
            width: 200,
            fill: "#00D2FF",
            stroke: "black",
            strokeWidth: 4 ,
            id: 'shape'+sumOfNodes,
            draggable: true
        });
        sumOfNodes++;

        shape.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        shape.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        shape.on("click", function() {
            clickNode(shape, layer);
        });

        this.xConnectPosition = shape.getX();
        this.yConnectPosition = shape.getY();

        var xChild = shape.getX();
        var yChild = shape.getY();
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
                var xChild = shape.getX();
                var yChild = shape.getY();
                var xParent = parentNode.getX();
                var yParent = parentNode.getY();
                connectionLine.setX(xParent);
                connectionLine.setY(yParent);
                connectionLine.setPoints([0,0,xChild - xParent, yChild - yParent]);
            }
        });

        shape.on("dragstart dragend", function(){
            drawConnectionLine.start();
        });

        parentNode.on("dragstart dragend", function() {
            drawConnectionLine.start();
        });

        layer.add(connectionLine);
        layer.add(shape);
        layer.add(parentNode);
        layer.draw();

        return shape;
    },




    // -----
    // Creates the base Node with ellipse shape
    // -----

    createBaseNode: function(stage, layer){
        this.base = new Kinetic.Ellipse({
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

        this.xConnectPosition = this.base.getX();
        alert(this.xConnectPosition);
        this.yConnectPosition = this.base.getY();

        // add cursor styling for shape oval
        this.base.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        this.base.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        this.base.on("click", function() {
            clickNode(this.base, layer);
        });

        layer.add(this.base);
    }
}