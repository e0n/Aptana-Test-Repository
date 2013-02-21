
nodeMarking = {
    var: markedNode = 0,

    // Marks nodes and saves fill color
    clickNode : function(node, layer, event) {
        if (event.ctrlKey) {
            markedNode.hideAnchors();
            if(markedNode.childElements.length != 0 && markedNode.areThereHiddenChildren == false){
                markedNode.newHideButton.hide();
            }
            markedNode = markedNode.toggleNode(node);
            markedNode.fillBackground('#3D9DB3');
            markedNode.showAnchors();
            if(markedNode.childElements.length != 0 && markedNode.areThereHiddenChildren == false){
                markedNode.newHideButton.show();
            }
            debugGUI.updateMarkedNode(markedNode);

        } else {
            markedNode.resetMarkedNodes(node);

            markedNode.fillBackground(markedNode.backgroundColorBackup);
            markedNode.hideAnchors();
            if(markedNode.childElements.length != 0 && markedNode.areThereHiddenChildren == false){
                markedNode.newHideButton.hide();
            }

            markedNode = node;
            markedNode.fillBackground('#3D9DB3');
            markedNode.showAnchors();
            if(markedNode.childElements.length != 0 && markedNode.areThereHiddenChildren == false){
                markedNode.newHideButton.show();
            }
            showselecedNodeMenu(node, layer);
            debugGUI.updateMarkedNode(markedNode);
        }
        layer.draw();
    },

    setMarked : function(node) {
        markedNode = node;
        markedNode.fillBackground('#3D9DB3');
    }

};