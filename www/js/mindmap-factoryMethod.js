/*
 mindmap-factoryMethod

 */
newNodeFactory = {
    var: sumOfNodes = 0,

    // -----
    // Creates a new node with ellipse shape
    // -----

    newEllipseNode : function (layer, parent){

        var thisNode = this;

        this.group = new Kinetic.Group({
            x: parent.xConnectPosition + 100,
            y: parent.yConnectPosition + 100,
            draggable: true
        });

        this.shape = new Kinetic.Ellipse({
            x: 0,
            y: 0,
            radius: {
                x: 100,
                y: 50
            },
            stroke: 'black',
            strokeWidth: 3,
            id: 'shape'+sumOfNodes,
            fill: "#FFFFFF",
            shadow: {
                color: 'black',
                blur: 10,
                offset: [10, 10],
                opacity: 0.2
            },
            draggable: true
        });
        sumOfNodes++;
        this.group.add(this.shape);

        this.text = new Kinetic.Text({
            x: -thisNode.shape.getWidth()/2,
            y: -thisNode.shape.getHeight()/4,
            text: 'Test Inhalt',
            textFill: '#555',
            fontSize: 15,
            fontFamily: 'Calibri',
            width: thisNode.shape.getWidth(),
            padding: 5,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5
        });

        this.fillBackground = function (color) {
            thisNode.shape.setFill(color);
        };

        this.getBackground = function() {
            return thisNode.shape.getFill();
        };

        this.setText = function(newText) {
            thisNode.text.setText(newText);
        };

        //finishNode(thisNode);


        this.group.add(this.text);

        this.group.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        this.group.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        this.group.on("click", function() {
            clickNode(thisNode, layer);
        });

        this.xConnectPosition = this.group.getX();
        this.yConnectPosition = this.group.getY();

        var xParent = parent.xConnectPosition;
        var yParent = parent.yConnectPosition;

        var connectionLine = new Kinetic.Line({
            y: yParent,
            x: xParent,
            points: [0, 0, this.xConnectPosition - xParent, this.yConnectPosition - yParent],
            stroke: "black",
            strokeWidth: 4,
            lineCap: "round",
            lineJoin: "round",
            shadow: {
                color: 'black',
                blur: 10,
                offset: [10, 10],
                opacity: 0.2
            }
        });

        var drawConnectionLine = new Kinetic.Animation({
            func: function() {
                thisNode.xConnectPosition = thisNode.group.getX();
                thisNode.yConnectPosition = thisNode.group.getY();
                xParent = parent.xConnectPosition;
                yParent = parent.yConnectPosition;
                connectionLine.setX(xParent);
                connectionLine.setY(yParent);
                connectionLine.setPoints([0,0,thisNode.xConnectPosition - xParent, thisNode.yConnectPosition - yParent]);
            }
        });

        this.group.on("dragstart dragend", function(){
            drawConnectionLine.start();
        });

        parent.group.on("dragstart dragend", function() {
            drawConnectionLine.start();
        });

        layer.add(connectionLine);
        layer.add(this.group);
        layer.add(parent.group);
        layer.draw();
    },

    // -----
    // Creates a new node with rect shape
    // -----

    newRectNode : function (layer, parent){

        var thisNode = this;

        this.group = new Kinetic.Group({
            stroke: '#555',
            strokeWidth: 5,
            x: parent.xConnectPosition + 100,
            y: parent.yConnectPosition + 100,
            draggable: true
        });

        this.shape = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: 200,
            id: 'shape'+sumOfNodes
        });

        this.text = new Kinetic.Text({
            x: 0,
            y: 0,
            text: 'Test Inhalt Test Inhalt',
            textFill: '#555',
            fontSize: 15,
            fontFamily: 'Calibri',
            width: thisNode.shape.getWidth(),
            padding: 5,
            align: 'center',
            fontStyle: 'italic',
            fill: "#FFFFFF",
            stroke: 'black',
            strokeWidth: 3,
            shadow: {
                color: 'black',
                blur: 10,
                offset: [10, 10],
                opacity: 0.2
            },
            cornerRadius: 5
        });

        this.fillBackground = function( color ) {
            thisNode.text.setFill(color);
        };

        this.getBackground = function() {
            return thisNode.text.getFill();
        };

        this.setText = function(newText) {
            thisNode.text.setText(newText);
        };

        sumOfNodes++;

        this.group.add(this.shape);
        this.group.add(this.text);

        this.xConnectPosition = this.group.getX() + this.text.getWidth()/2;
        this.yConnectPosition = this.group.getY() + this.text.getHeight()/2;

        this.group.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        this.group.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        this.group.on("click", function() {
            clickNode(thisNode, layer);
        });

        var xParent = parent.xConnectPosition;
        var yParent = parent.yConnectPosition;

        var connectionLine = new Kinetic.Line({
            y: yParent,
            x: xParent,
            points: [0, 0, this.xConnectPosition - xParent, this.yConnectPosition - yParent],
            stroke: "black",
            strokeWidth: 4,
            lineCap: "round",
            lineJoin: "round",
            shadow: {
                color: 'black',
                blur: 10,
                offset: [10, 10],
                opacity: 0.2
            }
        });

        var drawConnectionLine = new Kinetic.Animation({
            func: function() {
                thisNode.xConnectPosition = thisNode.group.getX() + thisNode.text.getWidth()/2;
                thisNode.yConnectPosition = thisNode.group.getY() + thisNode.text.getHeight()/2;
                xParent = parent.xConnectPosition;
                yParent = parent.yConnectPosition;
                connectionLine.setX(xParent);
                connectionLine.setY(yParent);
                connectionLine.setPoints([0,0,thisNode.xConnectPosition - xParent, thisNode.yConnectPosition - yParent]);
            }
        });

        this.group.on("dragstart dragend", function(){
            drawConnectionLine.start();
        });

        parent.group.on("dragstart dragend", function() {
            drawConnectionLine.start();
        });

        layer.add(connectionLine);

        layer.add(this.group);
        layer.add(parent.group);
        layer.draw();
    },

    // -----
    // Creates the base Node with ellipse shape
    // -----

    createBaseNode: function(stage, layer){
        var thisNode = this;

        this.group = new Kinetic.Group({
            stroke: "black",
            strokeWidth: 1 ,
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2
        });

        this.shape = new Kinetic.Ellipse({
            x: 0,
            y: 0,
            radius: {
                x: 100,
                y: 50
            },
            fill: "red",
            stroke: "black",
            strokeWidth: 4 ,
            id: 'oval0'
        });

        this.text = new Kinetic.Text({
            x: -thisNode.shape.getWidth()/2,
            y: -thisNode.shape.getHeight()/4,
            text: 'RootNode',
            textFill: '#555',
            fontSize: 15,
            fontFamily: 'Calibri',
            width: thisNode.shape.getWidth(),
            padding: 5,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5
        });

        this.fillBackground = function( color ) {
            thisNode.shape.setFill(color);
        };

        this.getBackground = function() {
            return thisNode.shape.getFill();
        };

        this.setText = function(newText) {
            thisNode.text.setText(newText);
        };

        this.group.add(this.shape);
        this.group.add(this.text);

        this.xConnectPosition = this.group.getX();
        this.yConnectPosition = this.group.getY();

        // add cursor styling for shape oval
        this.group.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        this.group.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        this.group.on("click", function() {
            clickNode(thisNode, layer);
        });

        layer.add(this.group);
    }

};
