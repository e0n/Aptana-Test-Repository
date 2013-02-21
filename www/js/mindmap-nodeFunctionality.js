/**
 * NodeFunctionality-Class
 * This class provides and add a couple necessary functionality for nodes.
 *
 *
 * @fileOverview This is the class where some functionality are added to the nodes
 */

    /**
     * This variable defines if the automatic layout functionality is on or off.
     * @type boolean
     */
    var autoLayoutIsOn = true;


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
        nodeMarking.clickNode(thisNode, thisNode.layer, event);
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
    thisNode.group.on("dblclick", function() {
        editText();
    });
    thisNode.group.on("dragstart dragend", function(){
        // this line is necessary, because on mobile devices it isn't possible to "click" (Line 471)
        //clickNode(thisNode, thisNode.layer);
        thisNode.drawConnectionLine.start();
        showselecedNodeMenu(thisNode, thisNode.layer);
    });
    thisNode.group.on("dragend", function(){
        updateAnchorBounds(thisNode);
        autoLayout.autoLayoutMethod(thisNode, rootNode, rootNode);
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
 * Rename function with JQuery Dialog
 * @desc Opens up a JQuery UI Dialog and provides an input field to enter a new Node text.
 * @name editText
 */
function editText() {
    var name = 'input#enterText';
    var parent = $(name).parent('fieldset');
    $(parent).css("visibility","visible");
    $("#newText").css("visibility","visible");
    $( "#newText" ).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            OK: function(){
                var value = $(name).val();
                markedNode.setText(value);
                $( "#enterText").val(value);
                $( "#newText" ).dialog( "close" );
            },
            Cancel: function(){
                $( "#newText" ).dialog( "close" );
            }
        }
    });
    $( "#newText" ).dialog( "open" );
}

/**
 * Rename function with JQuery Dialog
 * @desc Opens up a JQuery UI Dialog and provides an input field to enter a new Node text.
 * @name editText
 */
function autoLayoutOnAndOff() {
    if(autoLayoutIsOn){
        autoLayout.setAutoLayout(false);
        autoLayoutIsOn = false;
        $("#derberDialog").append('<p>Automatische Anordung ist ausgeschaltet!</p>')
    }else {
        autoLayout.setAutoLayout(true);
        autoLayoutIsOn = true;
        $("#derberDialog").append('<p>Automatische Anordung ist eingeschaltet!</p>')
    }
    $("#derberDialog").css("visibility","visible");
    $( "#derberDialog" ).dialog({
        autoOpen: false,
        modal: true,
        title : 'Autolayout',
        buttons: {
            OK: function(){
                $( "#derberDialog").empty();
                $( "#derberDialog" ).dialog( "close" );
            }
        }
    });
    $( "#derberDialog" ).dialog( "open" );
}

