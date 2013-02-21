/**
 * Created with JetBrains PhpStorm.
 * User: Admin
 * Date: 30.11.12
 * Time: 17:02
 * To change this template use File | Settings | File Templates.
 */

debugGUI = {
    var: markedNode = 0,
    var: autoLayoutIsOn = true,

    buildNewEllipseButton : function () {
        var button = new Kinetic.Text({
            x: 140,
            y: 35,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            text: 'New EllipseNode',
            fontSize: 14,
            fontFamily: 'Calibri',
            textFill: '#555',
            width: 120,
            padding: 20,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5,
            shadow: {
                color: '#3D9DB3',
                blur: 3,
                offset: [5, 5],
                opacity: 1
            }
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        return button;
    },

    buildNewRectButton : function () {
        var button = new Kinetic.Text({
            x: 10,
            y: 35,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            text: 'New RectNode',
            fontSize: 14,
            fontFamily: 'Calibri',
            textFill: '#555',
            width: 120,
            padding: 20,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5,
            shadow: {
                color: '#3D9DB3',
                blur: 3,
                offset: [5, 5],
                opacity: 1
            }
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        return button;
    },

    buildNewEditTextButton : function () {
        var button = new Kinetic.Text({
            x: 10,
            y: 390,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            text: 'Edit Text',
            fontSize: 14,
            fontFamily: 'Calibri',
            textFill: '#555',
            width: 120,
            padding: 20,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5,
            shadow: {
                color: '#3D9DB3',
                blur: 3,
                offset: [5, 5],
                opacity: 1
            }
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        return button;
    },

    buildNewShowButton : function () {
        var button = new Kinetic.Text({
            x: 10,
            y: 120,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            text: 'Show',
            fontSize: 14,
            fontFamily: 'Calibri',
            textFill: '#555',
            width: 120,
            padding: 20,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5,
            shadow: {
                color: '#3D9DB3',
                blur: 3,
                offset: [5, 5],
                opacity: 1
            }
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        return button;
    },

    buildNewHideButton : function () {
        var button = new Kinetic.Text({
            x: 10,
            y: 210,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            text: 'Hide',
            fontSize: 14,
            fontFamily: 'Calibri',
            textFill: '#555',
            width: 120,
            padding: 20,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5,
            shadow: {
                color: '#3D9DB3',
                blur: 3,
                offset: [5, 5],
                opacity: 1
            }
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        return button;
    },

    buildNewDeleteButton : function () {
        var button = new Kinetic.Text({
            x: 10,
            y: 300,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            text: 'Delete',
            fontSize: 14,
            fontFamily: 'Calibri',
            textFill: '#555',
            width: 120,
            padding: 20,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5,
            shadow: {
                color: '#3D9DB3',
                blur: 3,
                offset: [5, 5],
                opacity: 1
            }
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        return button;
    },


    buildNewAutoLayoutButton : function () {
        var button = new Kinetic.Text({
            x: 140,
            y: 300,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            text: 'AutoLayout',
            fontSize: 13,
            fontFamily: 'Calibri',
            textFill: '#555',
            width: 120,
            padding: 20,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5,
            shadow: {
                color: '#3D9DB3',
                blur: 3,
                offset: [5, 5],
                opacity: 1
            }
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        return button;
    },

    buildNewMenuButton : function() {
        var button = new Kinetic.Text({
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            text: 'tex',
            fontSize: 14,
            fontFamily: 'Calibri',
            textFill: '#555',
            width: 120,
            padding: 20,
            align: 'center',
            fontStyle: 'italic',
            cornerRadius: 5,
            shadow: {
                color: '#3D9DB3',
                blur: 3,
                offset: [5, 5],
                opacity: 1
            }
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        return button;
    },

    updateMarkedNode: function(newNode) {
        this.markedNode = newNode;
    },

    buildDebugButtons : function(nodeLayer, buttonLayer, baseNode) {

        var nodeToCopy;

        //Button for showing the marked node
        //this functionality would be used later for hide/minimize (and reshow) parts of the mindmap
        var newShowButton = this.buildNewShowButton();
        newShowButton.on("click", function(){
            markedNode.showChildren(nodeLayer);
        });
        buttonLayer.add(newShowButton);

        //Button for hiding the marked node
        //this functionality would be used later for hide/minimize parts of the mindmap
        var newHideButton = this.buildNewHideButton();
        newHideButton.on("click", function(){
            markedNode.hideChildren(nodeLayer);
        });
        buttonLayer.add(newHideButton);

        //Button for hiding the marked node
        //this functionality would be used later for hide/minimize parts of the mindmap
        var newAutoLayoutButton = this.buildNewAutoLayoutButton();
        newAutoLayoutButton.on("click", function(){
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
        });
        buttonLayer.add(newAutoLayoutButton);

        // this buttons deletes current marked node and all its children
        var newDeleteButton = debugGUI.buildNewDeleteButton();
        newDeleteButton.on("click", function(){
            markedNode.deleteNode(nodeLayer);
            markedNode = baseNode;
            markedNode.fillBackground('#3D9DB3');
            nodeLayer.draw();
        });
        buttonLayer.add(newDeleteButton);

        //Button for FactoryMethod of creating new Nodes
        var newEllipseButton = debugGUI.buildNewEllipseButton();
        newEllipseButton.on("click", function(){
            new newNodeFactory.NewEllipseNode(nodeLayer, markedNode);
        });
        buttonLayer.add(newEllipseButton);

        var newRectButton = debugGUI.buildNewRectButton();
        newRectButton.on("click", function(){
            new newNodeFactory.NewRectNode(nodeLayer, markedNode);
        });
        buttonLayer.add(newRectButton);

//        var newEditTextButton = debugGUI.buildNewEditTextButton();
//        newEditTextButton.on("click", function(){
//            var newText=prompt("Please enter a new name", markedNode.getText());
//            if (newText !=null )
//            {
//                markedNode.setText(newText);
//            }
//        });

        var newEditTextButton = debugGUI.buildNewEditTextButton();
        newEditTextButton.on("click", function(){
            editText();
        });

        buttonLayer.add(newEditTextButton);

        var newCopyButton = debugGUI.buildNewMenuButton();
        newCopyButton.setText('Copy');
        newCopyButton.setPosition(140, 120);
        newCopyButton.on("click", function(){
            nodeToCopy = markedNode;
        });
        buttonLayer.add(newCopyButton);

        //Button for pasting a node
        var newPasteButton = debugGUI.buildNewMenuButton();
        newPasteButton.setText('Paste');
        newPasteButton.setPosition(140, 210);
        newPasteButton.on("click", function(){
            if(nodeToCopy.typ == 'rect'){
                var nodeToPaste = new newNodeFactory.NewRectNode(nodeLayer, markedNode);
            } else {
                var nodeToPaste = new newNodeFactory.NewEllipseNode(nodeLayer, markedNode);
            }
            var text = nodeToCopy.getText();
            nodeToPaste.setText(text);
            nodeToPaste.fillBackground(nodeToPaste.text.getFill());
            nodeToPaste.text.setTextFill(nodeToPaste.text.getTextFill());
        });
        buttonLayer.add(newPasteButton);
    }
};
