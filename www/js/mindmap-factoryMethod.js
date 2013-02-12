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
        this.childElements = [];

        this.group = new Kinetic.Group({
            x: parent.xConnectPosition + 100,
            y: parent.yConnectPosition + 100,
            draggable: true,
            visible: true
        });

        this.shape = new Kinetic.Ellipse({
            x: 0,
            y: 0,
            radius: {
                x: 100,
                y: 50
            },
           // disabled because of STYLE REASOOONZZZ :-D
           // stroke: 'C7C7C7',
           // strokeWidth: 0,
            id: 'shape'+sumOfNodes,
            fill: "#F7F7F7",
            shadow: {
                color: '#777777',
                blur: 10,
                offset: [10, 10],
                opacity: 0.2
            },
            draggable: true
        });
        sumOfNodes++;
        addHovers(this.group, 'ease-in');
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

        this.newHideButton = new Kinetic.Text({
            x: -thisNode.shape.getWidth()/2,
            y: -thisNode.shape.getHeight()/2,
            fill: '#ddd',
            text: '-',
            fontSize: 15,
            fontFamily: 'Calibri',
            textFill: '#555',
            height: 19,
            width: 12,
            padding: 0,
            align: 'left',
            fontStyle: 'italic',
            cornerRadius: 0
        });

        this.newShowButton = new Kinetic.Text({
            x: -thisNode.shape.getWidth()/2+12,
            y: -thisNode.shape.getHeight()/2,
            fill: '#ddd',
            text: '+',
            fontSize: 15,
            fontFamily: 'Calibri',
            textFill: '#555',
            height: 19,
            width: 12,
            padding: 0,
            align: 'left',
            fontStyle: 'italic',
            cornerRadius: 0
        });

        this.group.add(this.newShowButton)
        this.newShowButton.hide();
        this.group.add(this.newHideButton)

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
            stroke: "#C7C7C7",
            strokeWidth: 2,
            lineCap: "round",
            lineJoin: "round",
            shadow: {
                color: '#777777',
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

        this.connectionLine = connectionLine;

        // Add the Child to the Parents child array
        parent.childElements.push(this);

        //function to show the hidden children
        this.showChildren = function(layer) {
            for(var count = 0; count < this.childElements.length; count++){
                this.childElements[count].showChildren(layer);
                this.childElements[count].group.show();
                this.childElements[count].connectionLine.show();
            }
            this.newHideButton.show();
            this.newShowButton.hide();
            layer.draw();
        };

        //function to hide the children
        this.hideChildren = function(layer) {
            for(var count = 0; count < this.childElements.length; count++){
                this.childElements[count].hideChildren(layer);
                this.childElements[count].group.hide();
                this.childElements[count].connectionLine.hide();
            }
            this.newHideButton.hide();
            this.newShowButton.show();
            layer.draw();
        };

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
        this.childElements = [];

        this.group = new Kinetic.Group({
            //stroke: 'C7C7C7',
            //strokeWidth: 0,
            x: parent.xConnectPosition + 100,
            y: parent.yConnectPosition + 100,
            draggable: true
        });

        this.shape = new Kinetic.Rect({
            x: 0,
            y: 0,
            //stroke: 'C7C7C7',
            //strokeWidth: 0,
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
            fill: "#F7F7F7",
            //stroke: 'C7C7C7',
            //strokeWidth: 0,
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
        addHovers(this.group, 'ease-in');

        this.xConnectPosition = this.group.getX() + this.text.getWidth()/2;
        this.yConnectPosition = this.group.getY() + this.text.getHeight()/2;

        this.newShowButton = new Kinetic.Text({
            x: -thisNode.shape.getWidth()-35,
            y: -thisNode.shape.getHeight()-15,
            fill: '#ddd',
            text: '+',
            fontSize: 15,
            fontFamily: 'Calibri',
            textFill: '#555',
            height: 19,
            width: 12,
            padding: 0,
            align: 'left',
            fontStyle: 'italic',
            cornerRadius: 0
        });

        this.newHideButton = new Kinetic.Text({
            x: -thisNode.shape.getWidth()-35,
            y: -thisNode.shape.getHeight()-15,
            fill: '#ddd',
            text: '-',
            fontSize: 15,
            fontFamily: 'Calibri',
            textFill: '#555',
            height: 19,
            width: 12,
            padding: 0,
            align: 'left',
            fontStyle: 'italic',
            cornerRadius: 0
        });

        addHoversForLittleButtons(this.newHideButton, 'ease-out');
        addHoversForLittleButtons(this.newShowButton, 'ease-out');
        this.group.add(this.newShowButton);
        this.group.add(this.newHideButton);
        this.newShowButton.hide();
        this.newHideButton.hide();
        this.areThereHiddenChildren = false;


        var xParent = parent.xConnectPosition;
        var yParent = parent.yConnectPosition;

        var connectionLine = new Kinetic.Line({
            y: yParent,
            x: xParent,
            points: [0, 0, this.xConnectPosition - xParent, this.yConnectPosition - yParent],
            stroke: "#C7C7C7",
            strokeWidth: 2,
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

        this.connectionLine = connectionLine;

        // Add the Child to the Parents child array
        parent.childElements.push(this);

        //function to show the hidden children
        this.showChildren = function(layer) {
            for(var count = 0; count < this.childElements.length; count++){
                this.childElements[count].showChildren(layer);
                this.childElements[count].group.show();
                this.childElements[count].connectionLine.show();
            }
            this.newShowButton.hide();
            this.areThereHiddenChildren = false;
            layer.draw();
        };

        //function to hide the children
        this.hideChildren = function(layer) {
            for(var count = 0; count < this.childElements.length; count++){
                this.childElements[count].hideChildren(layer);
                this.childElements[count].group.hide();
                this.childElements[count].connectionLine.hide();
            }
            this.newHideButton.hide();
            this.newShowButton.show();
            this.areThereHiddenChildren = true;
            layer.draw();
        };


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
        this.childElements = [];

        this.group = new Kinetic.Group({
            stroke: "#C7C7C7",
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
            fill: "#F7F7F7",
            stroke: "#C7C7C7",
            strokeWidth: 2 ,
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
    thisNode.shape.on("click", function() {
        clickNode(thisNode, thisNode.layer);
    });
    thisNode.text.on("click", function() {
        clickNode(thisNode, thisNode.layer);
    });
    thisNode.newHideButton.on("click", function(){
        thisNode.hideChildren(thisNode.layer);
    });
    thisNode.newShowButton.on("click", function(){
        thisNode.showChildren(thisNode.layer);
    });
    thisNode.group.on("dragstart dragend", function(){
        // this line is necessary, because on mobile devices it isn't possible to "click" (Line 471)
        clickNode(thisNode, thisNode.layer);
//        checkForCollision(thisNode, thisNode.parentNode);
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
        strokeWidth: 1,
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
        this.setStrokeWidth(3);
        layer.draw();
    });
    anchor.on("mouseout", function() {
        var layer = thisNode.layer;
        document.body.style.cursor = "default";
        this.setStrokeWidth(1);
        layer.draw();
    });

    thisNode.group.add(anchor);
}


function addHovers(shape, easing) {
    shape.on('mouseover touchstart', function() {
        this.transitionTo({
            scale: {
                x: 1.1,
                y: 1.1
            },
            duration: 0.3,
            easing: easing
        });
    });
    shape.on('mouseout touchend', function() {
        this.transitionTo({
            scale: {
                x: 1,
                y: 1
            },
            duration: 0.3,
            easing: easing
        });
    });
}

function addHoversForLittleButtons(shape, easing) {
    shape.on('mouseover touchstart', function() {
        this.moveToTop();
        this.transitionTo({
            scale: {
                x: 2,
                y: 2
            },
            duration: 0.3,
            easing: easing
        });
    });
    shape.on('mouseout touchend', function() {
        this.moveToBottom();
        this.transitionTo({
            scale: {
                x: 1,
                y: 1
            },
            duration: 0.3,
            easing: easing
        });
    });
}
/*
function checkForCollision(newObject, parent){
    var parentToInspect = parent;
    if(parentToInspect.childElements.length != 0){
       for(var count = 0; count < parentToInspect.childElements.length; count++ ){
           if(newObject.group.getX() != parentToInspect.childElements[count].group.getX() && newObject.group.getY() != parentToInspect.childElements[count].group.getY()){
                checkForOverlying(newObject, parentToInspect.childElements[count])
                if(parentToInspect.childElements[count].childElements.length != 0){
                    checkForCollision(newObject, parentToInspect.childElements[count]);
                }
                checkForCollision(newObject, parent.parentNode);
           }
        }
    }
}*/
/*
function checkForOverlying(newObject, objectToCompare){
    while((newObject.group.getY() + newObject.group.getHeight()) > objectToCompare.group.getY() &&
            (newObject.group.getX() + newObject.group.getWidth()) > objectToCompare.group.getX()) {
                   newObject.group.setX(newObject.group.getX() - 80);
                   newObject.group.setY(newObject.group.getY() - 80);
                   checkForCollision(newObject, objectToCompare.parentNode);
    }

    while((newObject.group.getY() + newObject.group.getHeight()) > objectToCompare.group.getY() &&
        newObject.group.getX() < (objectToCompare.group.getX() + objectToCompare.group.getWidth())) {
                   newObject.group.setX(newObject.group.getX() + 80);
                   newObject.group.setY(newObject.group.getY() - 80);
                   checkForCollision(newObject, objectToCompare.parentNode);
    }

    while(newObject.group.getY() < (objectToCompare.group.getY() + objectToCompare.group.getHeight()) &&
        newObject.group.getX() < (objectToCompare.group.getX() + objectToCompare.group.getWidth())) {
                   newObject.group.setX(newObject.group.getX() + 80);
                   newObject.group.setY(newObject.group.getY() + 80);
                   checkForCollision(newObject, objectToCompare.parentNode);
    }

    while(newObject.group.getY() < (objectToCompare.group.getY() + objectToCompare.group.getHeight()) &&
        (newObject.group.getX() + newObject.group.getWidth()) > objectToCompare.group.getX()) {
                   newObject.group.setX(newObject.group.getX() + 80);
                   newObject.group.setY(newObject.group.getY() - 80);
                   checkForCollision(newObject, objectToCompare.parentNode);
    }
}*/
