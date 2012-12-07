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
        this.parentNode = parent;
        this.layer = layer;

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

        this.group.add(this.text);

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

        this.drawConnectionLine = new Kinetic.Animation({
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

        buildNodeFunctions(thisNode);

        this.showAnchors = function() {

        };
        this.hideAnchors = function() {

        };

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
        this.parentNode = parent;
        this.layer = layer;

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
            stroke: '#555',
            strokeWidth: 5,
            id: 'shape'+sumOfNodes
        });

        this.text = new Kinetic.Text({
            x: 0,
            y: 0,
            text: 'Test Inhalt Test Inhalt',
            textFill: '#555',
            fontSize: 15,
            fontFamily: 'Calibri',
            width: 200,
            padding: 10,
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

        sumOfNodes++;

        this.group.add(this.shape);
        this.group.add(this.text);

        this.xConnectPosition = this.group.getX() + this.text.getWidth()/2;
        this.yConnectPosition = this.group.getY() + this.text.getHeight()/2;



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

        this.drawConnectionLine = new Kinetic.Animation({
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

        buildNodeFunctions(thisNode);

        addAnchor(thisNode, 0,0,"topLeft");
        addAnchor(thisNode, thisNode.text.getWidth(),0,"topRight");
        addAnchor(thisNode, thisNode.text.getWidth(),thisNode.text.getHeight(),"bottomRight");
        addAnchor(thisNode, 0,thisNode.text.getHeight(),"bottomLeft");

        this.showAnchors = function() {
            var topLeft = thisNode.group.get(".topLeft")[0];
            topLeft.setVisible(true);
            var topRight = thisNode.group.get(".topRight")[0];
            topRight.setVisible(true);
            var bottomRight = thisNode.group.get(".bottomRight")[0];
            bottomRight.setVisible(true);
            var bottomLeft = thisNode.group.get(".bottomLeft")[0];
            bottomLeft.setVisible(true);
        };

        this.hideAnchors = function() {
            var topLeft = thisNode.group.get(".topLeft")[0];
            topLeft.setVisible(false);
            var topRight = thisNode.group.get(".topRight")[0];
            topRight.setVisible(false);
            var bottomRight = thisNode.group.get(".bottomRight")[0];
            bottomRight.setVisible(false);
            var bottomLeft = thisNode.group.get(".bottomLeft")[0];
            bottomLeft.setVisible(false);
        };

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

        this.showAnchors = function() {

        };
        this.hideAnchors = function() {

        };
        this.fillBackground = function( color ) {
            thisNode.shape.setFill(color);
        };

        this.getBackground = function() {
            return thisNode.shape.getFill();
        };

        this.setText = function(newText) {
            this.text.setText(newText);
            layer.draw();
        };
        this.getText = function() {
            return this.text.getText();
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

function buildNodeFunctions(thisNode) {
    thisNode.group.on("mouseover", function() {
        document.body.style.cursor = "pointer";
    });
    thisNode.group.on("mouseout", function() {
        document.body.style.cursor = "default";
    });
    thisNode.group.on("click", function() {
        clickNode(thisNode, thisNode.layer);
    });
    thisNode.group.on("dragstart dragend", function(){
        thisNode.drawConnectionLine.start();
    });
    thisNode.parentNode.group.on("dragstart dragend", function() {
        thisNode.drawConnectionLine.start();
    });
    thisNode.setText = function(newText) {
        thisNode.text.setText(newText);
        thisNode.layer.draw();
    };
    thisNode.getText = function() {
        return thisNode.text.getText();
    };
}

function update(thisNode, activeAnchor) {

    var topLeft = thisNode.group.get(".topLeft")[0];

    var topRight = thisNode.group.get(".topRight")[0];

    var bottomRight = thisNode.group.get(".bottomRight")[0];

    var bottomLeft = thisNode.group.get(".bottomLeft")[0];


    // update anchor positions
    switch (activeAnchor.getName()) {
        case "topLeft":
            topRight.attrs.y = activeAnchor.attrs.y;
            bottomLeft.attrs.x = activeAnchor.attrs.x;
            break;
        case "topRight":
            topLeft.attrs.y = activeAnchor.attrs.y;
            bottomRight.attrs.x = activeAnchor.attrs.x;
            break;
        case "bottomRight":
            bottomLeft.attrs.y = activeAnchor.attrs.y;
            topRight.attrs.x = activeAnchor.attrs.x;
            break;
        case "bottomLeft":
            bottomRight.attrs.y = activeAnchor.attrs.y;
            topLeft.attrs.x = activeAnchor.attrs.x;
            break;
    }

    thisNode.text.setPosition(topLeft.attrs.x, topLeft.attrs.y);

    var width = topRight.attrs.x - topLeft.attrs.x;
    var height = bottomLeft.attrs.y - topLeft.attrs.y;
    if(width && height) {
        thisNode.text.setSize(width, height);
    }
}

function addAnchor(thisNode, x, y, name) {
    var layer = thisNode.layer;

    var anchor = new Kinetic.Circle({
        x: x,
        y: y,
        stroke: "#666",
        fill: "#ddd",
        strokeWidth: 2,
        radius: 8,
        name: name,
        draggable: true,
        visible: false
    });

    anchor.on("dragmove", function() {
        update(thisNode, this);
        layer.draw();
    });
    anchor.on("mousedown touchstart", function() {
        thisNode.group.setDraggable(false);
        this.moveToTop();
    });
    anchor.on("dragend", function() {
        thisNode.group.setDraggable(true);
        layer.draw();
    });
    // add hover styling
    anchor.on("mouseover", function() {
        var layer = thisNode.layer;
        document.body.style.cursor = "pointer";
        this.setStrokeWidth(4);
        layer.draw();
    });
    anchor.on("mouseout", function() {
        var layer = thisNode.layer;
        document.body.style.cursor = "default";
        this.setStrokeWidth(2);
        layer.draw();
    });

    thisNode.group.add(anchor);
}

