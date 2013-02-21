

mmWrapper = {
    import: function () {

        $('#file').change(function(){
            var file = document.getElementById('file').files[0];

            var reader = new FileReader();

            reader.onloadend = function(evt) {
                if (evt.target.readyState == FileReader.DONE) {
                    //alert(evt.target.result);
                    mmWrapper.createMindmap(evt.target.result);
                }
            };
            reader.readAsBinaryString(file);
        });
    },

    createMindmap : function (stringtext) {

        var xmlDoc;
        var baseNode;
        var hashTable = {};
        //for IE
        if (window.ActiveXObject)
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(stringtext);
        }
        //for Mozilla, Firefox, Opera, etc.
        else if (document.implementation && document.implementation.createDocument)
        {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(stringtext,'text/xml');
        }
        var x=xmlDoc.getElementsByTagName("node");
        alert(x[0].nodeValue);



        //alert(x[0].getAttribute("TEXT"));
        baseNode = document.rootNode;
        baseNode.text.setText(x[0].getAttribute("TEXT"));
        baseNode.layer.draw();

        for(var count = 1; count < x.length; count++) {
            var nextnodes = x[count];
            mmWrapper.addChild(nextnodes, baseNode);
        }
    },

    addChild : function (node, parent, hashTable) {
        if(hashTable.hasOwnProperty())
        var newNode = newNodeFactory.NewRectNode(parent.layer, parent);
        newNode.setText(node.getAttribute("TEXT"));
        var childNodes = node.getElementsByTagName("node");
        alert(childNodes);
        if (childNodes.length) {
            for(var count = 0; count < childNodes.length; count++) {
                mmWrapper.addChild(childNodes[count], newNode);
                //alert("child");
            }
        } else {
        }
        //alert(nodes.getAttribute("TEXT"));
    }
}

//function addChild2 (nodes, parent) {
//    //var newNode = newNodeFactory.NewRectNode(parent.layer, parent);
//    //newNode.setText(nodes[0].getAttribute("TEXT"));
//    alert(nodes[0].getAttribute("TEXT"));
//    for(var count = 0; count < nodes.length; count++) {
//        mmWrapper.addChild2(nodes[count], null);
//    }
//}