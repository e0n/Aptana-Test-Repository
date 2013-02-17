/*
 mindmap-factoryMethod

 */
newNodeFactory = {
    var: sumOfNodes = 0,
    var: rootNode = null,
    var: xOfObject = 0,
    var: yOfObject = 0,

    // -----
    // Creates a new node with ellipse shape
    // -----

    NewEllipseNode : function (layer, parent){

        var thisNode = this;
        this.parentNode = parent;
        this.layer = layer;
        this.childElements = [];
        this.typ = 'ellipse';

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
            fontSize: 16,
            fontFamily: 'Calibri',
            textFill: '#555',
            height: 19,
            width: 12,
            padding: 0,
            align: 'left',
            fontStyle: 'italic',
            cornerRadius: 0
        });

        this.group.add(this.newShowButton);
        this.newShowButton.hide();
        this.group.add(this.newHideButton);

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

        this.deleteNode = function (layer) {

        };

        layer.add(connectionLine);
        layer.add(this.group);
        layer.add(parent.group);
        layer.draw();
    },

    // -----
    // Creates a new node with rect shape
    // -----

    NewRectNode : function (layer, parent){

        var thisNode = this;
        this.parentNode = parent;
        this.layer = layer;
        this.childElements = [];
        this.typ = 'rect';
        this.id = 'shape'+sumOfNodes;

        this.group = new Kinetic.Group({
//            stroke: 'C7C7C7',
//            strokeWidth: 5,
            x: parent.xConnectPosition + 100,
            y: parent.yConnectPosition + 100,
            draggable: true
//            fill: '#FF0000',
//            visible: true
        });

        this.shape = new Kinetic.Rect({
            x: 0,
            y: 0,
            //stroke: 'C7C7C7',
            //strokeWidth: 0,
            //TODO id entfernen
            id: 'shape'+sumOfNodes
        });

        this.debugShape = new Kinetic.Rect({
            x: -10,
            y: -10,
            height: 10,
            width: 10,
            fill: '#FF0000',
            visible: true,
            //strokeWidth: 0,
            //TODO id entfernen
            id: 'shape'+sumOfNodes
        });
        this.group.add(this.debugShape);

        this.text = new Kinetic.Text({
            x: 0,
            y: 0,
            text: 'Test Inhalt Test Inhalt',
            textFill: '#555',
            fontSize: 16,
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
        this.group.add(this.shape);
        this.group.add(this.text);

        sumOfNodes++;

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
                thisNode.xConnectPosition = thisNode.group.getX() + thisNode.text.getX() + thisNode.text.getWidth()/2;
                thisNode.yConnectPosition = thisNode.group.getY() + thisNode.text.getY() + thisNode.text.getHeight()/2;
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

        this.deleteNode = function (layer) {

            while ( this.childElements.length != 0 ) {
                this.childElements[0].deleteNode(layer);
            }

            for( var count = 0; count < this.parentNode.childElements.length; count++) {
                if( this.parentNode.childElements[count] == this ) {
                    this.parentNode.childElements[count] = this.parentNode.childElements[this.parentNode.childElements.length-1];
                    this.parentNode.childElements.pop();
                }
            }

            this.group.remove();
            this.connectionLine.remove();

            layer.draw();
        };


        this.topLeftAnchor = addAnchor(thisNode, 0,0,"topLeft");
        this.topRightAnchor = addAnchor(thisNode, thisNode.text.getWidth(),0,"topRight");
        this.bottomRightAnchor = addAnchor(thisNode, thisNode.text.getWidth(),thisNode.text.getHeight(),"bottomRight");
        this.bottomLeftAnchor = addAnchor(thisNode, 0,thisNode.text.getHeight(),"bottomLeft");

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

        updateNoteGroup(thisNode);
        updateAnchorBounds(thisNode);

        layer.add(connectionLine);

        layer.add(this.group);
        layer.add(parent.group);
        layer.draw();
    },

    // -----
    // Creates the base Node with ellipse shape
    // -----

    CreateBaseNode: function(stage, layer){
        var thisNode = this;
        this.childElements = [];
        this.id = 'ovalX';
        rootNode = thisNode;

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

        this.deleteNode = function (layer) {

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
        thisNode.drawConnectionLine.start();
    });
    thisNode.group.on("dragend", function(){
        updateAnchorBounds(thisNode);
        autolayout(thisNode, rootNode);
        move(thisNode, xOfObject, yOfObject);
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

// closes gap between group and text in a node, also shifts anchors afterwards
function updateNoteGroup(thisNode) {

    // correct X-Gap between group and text
    thisNode.group.setX(thisNode.group.getX() + thisNode.text.getX());
    thisNode.text.setX(0);

    // shift anchors in x
    thisNode.topLeftAnchor.setX(0);
    thisNode.topRightAnchor.setX(thisNode.text.getWidth());
    thisNode.bottomLeftAnchor.setX(0);
    thisNode.bottomRightAnchor.setX(thisNode.text.getWidth());

    // correct Y-Gap between group and text
    thisNode.group.setY(thisNode.group.getY() + thisNode.text.getY());
    thisNode.text.setY(0);

    // shift anchors in y
    thisNode.topLeftAnchor.setY(0);
    thisNode.topRightAnchor.setY(0);
    thisNode.bottomLeftAnchor.setY(thisNode.text.getHeight());
    thisNode.bottomRightAnchor.setY(thisNode.text.getHeight());
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
        dragBoundFunc: function(pos) {
            var newX = 30;
            var newY = 30;
            switch (name) {
                case "topLeft":
                    newY = pos.y > thisNode.bottomBound ? thisNode.bottomBound : pos.y;
                    newX = pos.x > thisNode.rightBound ? thisNode.rightBound : pos.x;
                    break;
                case "topRight":
                    newY = pos.y > thisNode.bottomBound ? thisNode.bottomBound : pos.y;
                    newX = pos.x < thisNode.leftBound ? thisNode.leftBound : pos.x;
                    break;
                case "bottomRight":
                    newY = pos.y < thisNode.topBound ? thisNode.topBound : pos.y;
                    newX = pos.x < thisNode.leftBound ? thisNode.leftBound : pos.x;
                    break;
                case "bottomLeft":
                    newY = pos.y < thisNode.topBound ? thisNode.topBound : pos.y;
                    newX = pos.x > thisNode.rightBound ? thisNode.rightBound : pos.x;
                    break;
            }
            return {
                x: newX,
                y: newY
            };
        },
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
        updateNoteGroup(thisNode);
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

    return anchor;
}

function updateAnchorBounds(thisNode) {
    thisNode.leftBound =                                thisNode.group.getX();
    thisNode.rightBound = thisNode.text.getWidth()    + thisNode.group.getX();

    thisNode.bottomBound = thisNode.text.getHeight()  + thisNode.group.getY();
    thisNode.topBound =                                 thisNode.group.getY();
}

function addHovers(shape, easing) {
    //TODO Uncommented because of autolayout... ask tobi, if you like ps.: ER IST TOT, JIM!
//    shape.on('mouseover touchstart', function() {
//        this.transitionTo({
//            scale: {
//                x: 1.1,
//                y: 1.1
//            },
//            duration: 0.3,
//            easing: easing
//        });
//    });
//    shape.on('mouseout touchend', function() {
//        this.transitionTo({
//            scale: {
//                x: 1,
//                y: 1
//            },
//            duration: 0.3,
//            easing: easing
//        });
//    });
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

function autolayout(newObject, parent){
    xOfObject = newObject.group.getX();
    yOfObject = newObject.group.getY();
    checkForCollision(newObject,parent);
}

function checkForCollision(newObject, parent){
    // Check if the newObject collidates with root node, but root node Ellipse sucks...
    checkForOverlying(newObject,rootNode);
    for(var count = 0; count < parent.childElements.length; count++ ){
        if(newObject.id != parent.childElements[count].id){
            checkForOverlying(newObject, parent.childElements[count]);
            if(parent.childElements[count].childElements.length != 0){
                checkForCollision(newObject, parent.childElements[count])
            }
        } else if(newObject.childElements.length != 0){
            checkForCollision(newObject, newObject);
        }
    }
}

function checkForOverlying(newObject, objectToCompare){
    //Fall 2
    if(
            (((xOfObject + newObject.text.getWidth()) > (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
            (yOfObject < objectToCompare.group.getY())
            )   &&
            (
            (xOfObject  < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
            ((yOfObject + newObject.text.getHeight()) > objectToCompare.group.getY())
            )
        ){
        xOfObject = xOfObject + 49;
        yOfObject = yOfObject - 49;
        checkForCollision(newObject, rootNode);
    } else

    //Fall 3
    if(
        ((xOfObject < objectToCompare.group.getX()) &&
            ((yOfObject + newObject.text.getHeight()) > (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
            )   &&
            (((xOfObject + newObject.text.getWidth()) > objectToCompare.group.getX()) &&
                (yOfObject  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject - 51;
        yOfObject = yOfObject + 51;
        checkForCollision(newObject, rootNode);
    } else


    //Fall 4
    if(
        ((xOfObject < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
            (yOfObject  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
            )   &&
            (((xOfObject + newObject.text.getWidth()) > (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                ((yOfObject + newObject.text.getHeight())  > (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject + 53;
        yOfObject = yOfObject + 53;
        checkForCollision(newObject, rootNode);
    } else

    //Fall 1
    if(
        ((xOfObject < objectToCompare.group.getX()) &&
            (yOfObject  < objectToCompare.group.getY())
            )   &&
            (((xOfObject + newObject.text.getWidth()) > objectToCompare.group.getX()) &&
                ((yOfObject + newObject.text.getHeight())  > objectToCompare.group.getY())
                )
        ){
        xOfObject = xOfObject - 56;
        yOfObject = yOfObject - 56;
        checkForCollision(newObject, rootNode);
    } else

    //Fall 5
    if(
        ((xOfObject > objectToCompare.group.getX()) &&
            (yOfObject  > objectToCompare.group.getY())
            )   &&
            (((xOfObject + newObject.text.getWidth()) < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                ((yOfObject + newObject.text.getHeight())  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject + 50;
        yOfObject = yOfObject + 50;
        checkForCollision(newObject, rootNode);
    } else

    // Fall 6
    if(
        ((xOfObject > objectToCompare.group.getX() ) &&
            ((yOfObject + newObject.text.getHeight()) > objectToCompare.group.getY())
            )   &&
            (
                ((xOfObject + newObject.text.getWidth())  < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                    (yOfObject  < objectToCompare.group.getY())
                )
        ){
        xOfObject = xOfObject - 55;
        yOfObject = yOfObject - 60;
        checkForCollision(newObject, rootNode);
    } else

    // Fall 7
    if(
        ((xOfObject < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
            (yOfObject > objectToCompare.group.getY())
            )   &&
            (
                ((xOfObject + newObject.text.getWidth())  > (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                    ((yOfObject + newObject.text.getHeight())  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject + 60;
        yOfObject = yOfObject + 59;
        checkForCollision(newObject, rootNode);
    } else

    // Fall 8
    if(
        ((xOfObject > objectToCompare.group.getX() ) &&
            (yOfObject  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
            )   &&
            (
                ((xOfObject + newObject.text.getWidth())  < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                    ((yOfObject + newObject.text.getHeight())  > (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject + 55;
        yOfObject = yOfObject + 49;
        checkForCollision(newObject, rootNode);
    } else

    // Fall 9
    if(
        ((xOfObject < objectToCompare.group.getX() ) &&
            (yOfObject > objectToCompare.group.getY())
            )   &&
            (
                ((xOfObject + newObject.text.getWidth())  > objectToCompare.group.getX()) &&
                    ((yOfObject + newObject.text.getHeight())  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject - 49;
        yOfObject = yOfObject - 55;
        checkForCollision(newObject, rootNode);
    }
}


function move(object, newX, newY) {
    if(xOfObject != object.group.getX() && yOfObject != object.group.getY()){
        object.group.transitionTo({
            x: newX,
            y: newY,
            duration: 0.3,
            easing: 'linear'
        })
    }
}


