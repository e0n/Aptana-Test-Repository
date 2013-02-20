/**
 * Factory for NodeObjects.
 *
 * Can produce ellipses, rectangles and the base Node
 * Note that ellipse is not full supported right now
 * @class This is the factory class to create nodes
 * @see NewEllipseNode
 * @see NewRectNode
 * @see CreateBaseNode
 */
newNodeFactory = {
    /**
     * Variable to calculate ids
     * @type int
     */
    var: sumOfNodes = 0,
    /**
     * Variable to save baseNode
     * @type node
     */
    var: rootNode = null,
    /**
     * Array for marking funcion
     * @type int[]
     */
    var: markedArray = 0,
    /**
     * Variable to drag multiple targets (not used jet)
     * @type Kinetic.Group
     */
    var: dragGroup = 0,

    testJasminAdd : function  (a, b) {
        return (a + b);
    },

    /**
     * Construct a new ellipse node.
     * @class This is the basic Ellipse class.
     * The ellipse node was the first node-type implemented and replaced by the rectangle Node
     * @constructor
     * @param {layer} layer This parameter describes the layer where the new created object should be drawn
     * @param {Node} parent The node which is marked for creating the new one.
     * @return A new node
     */
    NewEllipseNode : function (layer, parent){

        var thisNode = this;
        this.parentNode = parent;
        this.layer = layer;
        this.backgroundColorBackup = '#F7F7F7';
        this.childElements = [];
        this.typ = 'ellipse';

        /**
         * The Group of Kinetic elements
         * @type Kinetic.Group
         * @see #shape
         * @see #text
         * @see #newShowButton
         * @see #newHideButton
         */
        this.group = new Kinetic.Group({
            x: parent.xConnectPosition + 100,
            y: parent.yConnectPosition + 100,
            draggable: true,
            visible: true
        });

        /**
         * Shape of a node (only needed in Ellipse node)
         * @type Kinetic.Ellipse
         */
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
        this.group.add(this.shape);

        /**
         * The text element to display comments in mindmap
         * @type Kinetic.Text
         */
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

        /**
         * Hidebutton to hide children of a node
         * @type Kinetic.Text
         */
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

        /**
         * Showbutton to display children of a node
         * @type Kinetic.Text
         */
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

        /**
         * fills Background of a node with a color
         * @param {hexColor} color New backgroundcolor of the node
         */
        this.fillBackground = function (color) {
            thisNode.shape.setFill(color);
        };

        /**
         * returns Backgroundcolor of a node
         * @return hexcolor of backgroundcolor
         */
        this.getBackground = function() {
            return thisNode.shape.getFill();
        };

        this.group.add(this.text);

        /**
         * XPosition of the connection point for the drawConnectionLine animation
         * @type int
         * @see #yConnectPosition
         */
        this.xConnectPosition = this.group.getX();
        /**
         * YPosition of the connection point for the drawConnectionLine animation
         * @type int
         * @see #xConnectPosition
         */
        this.yConnectPosition = this.group.getY();

        /**
         * XPosition of the parents connection point
         * @type int
         * @see #yParent
         */
        var xParent = parent.xConnectPosition;
        /**
         * YPosition of the parents connection point
         * @type int
         * @see #xParent
         */
        var yParent = parent.yConnectPosition;

        /**
         * Connectionline between child and parent
         * @type Kinetic.Line
         * @see #xConnectPosition
         * @see #yConnectPosition
         * @see #xParent
         * @see #yParent
         */
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

        /**
         * Animation to redraw connection line if child/parent is moved
         * @type Kinetic.Animation
         * @see #connectionLine
         */
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

        /**
         * Function to show hidden children
         * @param {layer} layer Main layer
         */
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

        /**
         * Function to hide shown children
         * @param {layer} layer Main layer
         */
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

        /**
         * Function to shown anchor point if node is selected
         */
        this.showAnchors = function() {

        };
        /**
         * Function to hide anchor point if node is deselected
         */
        this.hideAnchors = function() {

        };

        /**
         * Deletes a marked node
         */
        this.deleteNode = function (layer) {

        };

        layer.add(connectionLine);
        layer.add(this.group);
        layer.add(parent.group);
        layer.draw();
    },

    /**
     * Construct a new rectangle node.
     * @class This is the basic Rectangle class.
     * The rectangle is the main used node
     * @constructor
     * @param {layer} layer This parameter describes the layer where the new created object should be drawn
     * @param {Node} parent The node which is marked for creating the new one.
     * @return A new node
     */
    NewRectNode : function (layer, parent){

        this.testJasminAdd = function  (a, b) {
            return (a + b);
        }
        /**
         * Saves this node
         * @type {Node}
         */
        var thisNode = this;
        /**
         * Parentnode of this node
         * @type {Node}
         */
        this.parentNode = parent;
        /**
         * This is where objects could be drawn
         * @type {layer}
         */
        this.layer = layer;
        /**
         * Backup for backgroundcolor
         * @type {String}
         */
        this.backgroundColorBackup = '#F7F7F7';
        /**
         * Array of node-childs
         * @type {Array}
         */
        this.childElements = [];
        /**
         * Type of node
         * @type {String}
         */
        this.typ = 'rect';
        /**
         * Id of node
         * @type {String}
         */
        this.id = 'shape'+sumOfNodes;

        /**
         * The Group of Kinetic elements
         * @type Kinetic.Group
         * @see #shape
         * @see #text
         * @see #newShowButton
         * @see #newHideButton
         */
        this.group = new Kinetic.Group({
            x: parent.xConnectPosition + 100,
            y: parent.yConnectPosition + 100,
            draggable: true
        });

        /**
         * Shape of a node (only needed in Ellipse node)
         * @type Kinetic.Ellipse
         */
        this.shape = new Kinetic.Rect({
            x: 0,
            y: 0,
            //stroke: 'C7C7C7',
            //strokeWidth: 0,
            id: 'shape'+sumOfNodes
        });

        /**
         * DebugShape of a node to show (0/0) pos of group
         * @type Kinetic.Rect
         */
        this.debugShape = new Kinetic.Rect({
            x: -10,
            y: -10,
            height: 10,
            width: 10,
            fill: '#FF0000',
            visible: true,
            //strokeWidth: 0,
            id: 'shape'+sumOfNodes
        });
        this.group.add(this.debugShape);

        /**
         * The text element to display comments in mindmap
         * @type Kinetic.Text
         */
        this.text = new Kinetic.Text({
            x: 0,
            y: 0,
            text: 'New content',
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

        /**
         * fills Background of a node with a color
         * @param {hexColor} color New backgroundcolor of the node
         */
        this.fillBackground = function( color ) {
            thisNode.text.setFill(color);
        };

        /**
         * returns Backgroundcolor of a node
         * @return hexcolor of backgroundcolor
         */
        this.getBackground = function() {
            return thisNode.text.getFill();
        };
        this.group.add(this.shape);
        this.group.add(this.text);

        sumOfNodes++;


        /**
         * XPosition of the connection point for the drawConnectionLine animation
         * @type int
         * @see #yConnectPosition
         */
        this.xConnectPosition = this.group.getX() + this.text.getWidth()/2;
        /**
         * YPosition of the connection point for the drawConnectionLine animation
         * @type int
         * @see #xConnectPosition
         */
        this.yConnectPosition = this.group.getY() + this.text.getHeight()/2;

        /**
         * Showbutton to display children of a node
         * @type Kinetic.Text
         */
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

        /**
         * Hidebutton to hide children of a node
         * @type Kinetic.Text
         */
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
        /**
         * Boolean variable for shown/hidden children
         * @type {Boolean}
         */
        this.areThereHiddenChildren = false;

        /**
         * XPosition of the parents connection point
         * @type int
         * @see #yParent
         */
        var xParent = parent.xConnectPosition;
        /**
         * YPosition of the parents connection point
         * @type int
         * @see #xParent
         */
        var yParent = parent.yConnectPosition;

        /**
         * Connectionline between child and parent
         * @type Kinetic.Line
         * @see #xConnectPosition
         * @see #yConnectPosition
         * @see #xParent
         * @see #yParent
         */
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

        /**
         * Animation to redraw connection line if child/parent is moved
         * @type Kinetic.Animation
         * @see #connectionLine
         */
        this.drawConnectionLine = new Kinetic.Animation({
            func: function() {
                thisNode.updateConnectionpoints();
                xParent = parent.xConnectPosition;
                yParent = parent.yConnectPosition;
                connectionLine.setX(xParent);
                connectionLine.setY(yParent);
                connectionLine.setPoints([0,0,thisNode.xConnectPosition - xParent, thisNode.yConnectPosition - yParent]);
            }
        });

        this.updateConnectionpoints = function () {
            thisNode.xConnectPosition = thisNode.group.getX() + thisNode.text.getX() + thisNode.text.getWidth()/2;
            thisNode.yConnectPosition = thisNode.group.getY() + thisNode.text.getY() + thisNode.text.getHeight()/2;
        };

        buildNodeFunctions(thisNode);

        this.connectionLine = connectionLine;

        // Add the Child to the Parents child array
        parent.childElements.push(this);

        /**
         * Function to show hidden children
         * @param {layer} layer Main layer
         */
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

        /**
         * Function to hide shown children
         * @param {layer} layer Main layer
         */
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

        /**
         * Deletes a marked node and all its children
         * @param {layer} layer Main layer
         */
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

        /**
         * This function is called when multiple nodes are marked and a node is clicked
         * if the node is not yet marked, it will be marked and added to the marked group
         * if the node is already marked, it will be dismarked and removed from marked group
         * @param {node} node The clicked node
         * @return The function will return the node which should be marked: a new one or an old when removing a node
         */
        this.toggleNode = function(node) {
            var isNotInArry = true;
            var resultNode = rootNode;

            if (node.id != 'ovalX') {
                for(var count = 0; count < markedArray.length; count++) {
                    if( markedArray[count].id == node.id) {
                        markedArray[count] = markedArray[markedArray.length-1];
                        markedArray.pop();
                        if(markedArray.length != 0) {
                            resultNode = markedArray[0];
                        }
                        isNotInArry = false;
                        node.fillBackground(node.backgroundColorBackup);
                        node.hideAnchors();
                        if(markedNode.childElements.length != 0 && markedNode.areThereHiddenChildren == false){
                            markedNode.newHideButton.hide();
                        }
                        break;
                    }
                }
                if( isNotInArry ) {
                    markedArray.push(node);
                    resultNode = node;
                }
            }
            return resultNode;
        };

        /**
         * This function is called when a single node is clicked to remove all nodes in the marked-nodes-array and dismarks them.
         * @param node
         */
        this.resetMarkedNodes = function(node) {
            while(markedArray.length != 0) {
                markedArray[0].fillBackground(markedArray[0].backgroundColorBackup);
                markedArray.shift();
            }
            if( node.id != 'ovalX') {
                markedArray.push(node);
            };
        };

        /**
         * anchor at the top left corner of the node group
         * @type {Kinetic.Circle} topLeftAnchor
         */
        this.topLeftAnchor = addAnchor(thisNode, 0,0,"topLeft");
        /**
         * anchor at the top right corner of the node group
         * @type {Kinetic.Circle} topRightAnchor
         */
        this.topRightAnchor = addAnchor(thisNode, thisNode.text.getWidth(),0,"topRight");
        /**
         * anchor at the bottom right corner of the node group
         * @type {Kinetic.Circle} bottomRightAnchor
         */
        this.bottomRightAnchor = addAnchor(thisNode, thisNode.text.getWidth(),thisNode.text.getHeight(),"bottomRight");
        /**
         * anchor at the bottom left corner of the node group
         * @type {Kinetic.Circle} bottomLeftAnchor
         */
        this.bottomLeftAnchor = addAnchor(thisNode, 0,thisNode.text.getHeight(),"bottomLeft");


        /**
         * Function to shown anchor point if node is selected
         */
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

        /**
         * Function to hide anchor point if node is deselected
         */
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

        return thisNode;
    },

    /**
     * Construct the base node.
     * @class This is the basic base class.
     * The base node is the first node created and is used as root node.
     * It's not movable or deletable
     * @constructor
     * @param {layer} layer This parameter describes the layer where the new created object should be drawn
     * @param {stage} stage TODO : Where it comes from?
     * @return The Basic Node
     */
    CreateBaseNode: function(stage, layer){
        this.stage = stage;
        this.layer = layer;
        var thisNode = this;
        this.childElements = [];
        this.id = 'ovalX';
        rootNode = thisNode;
        this.backgroundColorBackup = '#F7F7F7';

        markedArray = [];

        /**
         * The Group of Kinetic elements
         * @type Kinetic.Group
         * @see #shape
         * @see #text
         * @see #newShowButton
         * @see #newHideButton
         */
        this.group = new Kinetic.Group({
            stroke: "#C7C7C7",
            strokeWidth: 1 ,
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2
        });

        /**
         * Shape of a node (only needed in Ellipse node)
         * @type Kinetic.Ellipse
         */
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

        /**
         * The text element to display comments in mindmap
         * @type Kinetic.Text
         */
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

        /**
         * NOT NEEDED Function to shown anchor point if node is selected
         * BaseNode has no Anchors
         */
        this.showAnchors = function() {

        };
        /**
         * NOT NEEDED Function to hide anchor point if node is deselected
         * BaseNode has no Anchors
         */
        this.hideAnchors = function() {

        };

        /**
         * NOT NEEDED Deletes a marked node and all its children
         * BaseNode can not be deleted
         * @param {layer} layer Main layer
         */
        this.deleteNode = function (layer) {

        };

        /**
         * This function is called when multiple nodes are marked and a node is clicked
         * if the node is not yet marked, it will be marked and added to the marked group
         * if the node is already marked, it will be dismarked and removed from marked group
         * @param {node} node The clicked node
         * @return The function will return the node which should be marked: a new one or an old when removing a node
         */
        this.toggleNode = function(node) {
            var isNotInArray = true;
            var resultNode = rootNode;

            if (node.id != 'ovalX') {
                for(var count = 0; count < markedArray.length; count++) {
                    if( markedArray[count].id == node.id) {
                        markedArray[count] = markedArray[markedArray.length-1];
                        markedArray.pop();
                        if(markedArray.length != 0) {
                            resultNode = markedArray[0];
                        }
                        isNotInArray = false;
                        node.fillBackground(node.backgroundColorBackup);
                        node.hideAnchors();
                        if(node.childElements.length != 0 && node.areThereHiddenChildren == false){
                            node.newHideButton.hide();
                        }
                        break;
                    }
                }
                if( isNotInArray ) {
                    markedArray.push(node);
                    resultNode = node;
                }
            }
            return resultNode;
        };

        /**
         * This function is called when a single node is clicked to remove all nodes in the marked-nodes-array and dismarks them.
         * @param node
         */
        this.resetMarkedNodes = function(node) {
            while(markedArray.length != 0) {
                markedArray[0].fillBackground(markedArray[0].backgroundColorBackup);
                markedArray.shift();
            }
            if( node.id != 'ovalX') {
                markedArray.push(node);
            }
        };

        /**
         * fills Background of a node with a color
         * @param {hexColor} color New backgroundcolor of the node
         */
        this.fillBackground = function( color ) {
            thisNode.shape.setFill(color);
        };

        /**
         * returns Backgroundcolor of a node
         * @return hexcolor of backgroundcolor
         */
        this.getBackground = function() {
            return thisNode.shape.getFill();
        };

        /**
         * Text setter in BasicNode
         * @param newText String with new text
         */
        this.setText = function(newText) {
            this.text.setText(newText);
            layer.draw();
        };
        /**
         * Text getter in BasicNode
         * @return Text of node
         */
        this.getText = function() {
            return this.text.getText();
        };

        this.group.add(this.shape);
        this.group.add(this.text);

        /**
         * XPosition of the connection point for the drawConnectionLine animation
         * @type int
         * @see #yConnectPosition
         */
        this.xConnectPosition = this.group.getX();
        /**
         * YPosition of the connection point for the drawConnectionLine animation
         * @type int
         * @see #xConnectPosition
         */
        this.yConnectPosition = this.group.getY();

        // add cursor styling for shape oval
        this.group.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        this.group.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        this.group.on("click", function() {
            clickNode(thisNode, layer, event);
        });

        layer.add(this.group);
        return thisNode;
    }

};

/**
 * Builds basic node functions.
 * Event functions: mouse-, click-, touch- and drag-events
 * Text: setter getter
 * @param {node} thisNode On this node the functions will be added
 */
function buildNodeFunctions(thisNode) {
    thisNode.group.on("mouseover", function() {
        document.body.style.cursor = "pointer";
    });
    thisNode.group.on("mouseout", function() {
        document.body.style.cursor = "default";
    });
    thisNode.shape.on("click", function() {
        //alert("SHADE CLICKED!");
        //clickNode(thisNode, thisNode.layer, event);
    });
    thisNode.text.on("click", function() {
        clickNode(thisNode, thisNode.layer, event);
    });
    thisNode.newHideButton.on("click", function(){
        thisNode.hideChildren(thisNode.layer);
    });
    thisNode.newShowButton.on("click", function(){
        thisNode.showChildren(thisNode.layer);
    });
    thisNode.group.on("touchstart touchend", function() {
        //clickNode(thisNode, thisNode.layer, event);
    });
    thisNode.group.on("dragstart dragend", function(){
        // this line is necessary, because on mobile devices it isn't possible to "click" (Line 471)
        //clickNode(thisNode, thisNode.layer);
        thisNode.drawConnectionLine.start();
        showselecedNodeMenu(thisNode, thisNode.layer);
    });
    thisNode.group.on("dragend", function(){

        updateAnchorBounds(thisNode);
        autoLayout.autoLayout(thisNode, rootNode, rootNode);
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

/**
 * Closes gap between group and text in a Node when dragged
 * Also shifts anchors afterwards to the correct position
 * @param {node} thisNode The dragged node
 */
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

/**
 * Manages the anchors of a node when note is resized
 * Resizes the text-field
 * @param {node} thisNode The dragged node
 * @param {addAnchor} activeAnchor
 */
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

/**
 * Creates a resize-anchor
 * Adds events on anchors
 * @param {node} thisNode The dragged node
 * @param {int} x x position where the anchor is created
 * @param {int} y y position where the anchor is created
 * @param {string} name name of position: topLeft, topRight, bottomRight, bottomLeft
 */
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

/**
 * Updates anchor bounds to prevent resizing behind opposites anchor
 * @param {node} thisNode The resized node
 */
function updateAnchorBounds(thisNode) {
    thisNode.leftBound =                                thisNode.group.getX();
    thisNode.rightBound = thisNode.text.getWidth()    + thisNode.group.getX();

    thisNode.bottomBound = thisNode.text.getHeight()  + thisNode.group.getY();
    thisNode.topBound =                                 thisNode.group.getY();
}

/**
 * Hovers on mouseover for little buttons:  + and -
 * for resize and hide
 * @param {shape} shape The shape which the button belongs to
 * @param {easing} easing The way the shape behave on the mouseover effect
 */
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



