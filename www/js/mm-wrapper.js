

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
        var baseNode = document.rootNode;
        console.log("intit " + baseNode);

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
        //alert(x[0].nodeValue);

        var nodeWithAll = xmlDoc.childNodes;
//        console.log(nodeWithAll);

        var nodeWithMap = nodeWithAll[0].childNodes;
//        for (var a = 0; a < nodeWithAll.length; a++) {
//            if( nodeWithAll[a].nodeName == 'map') {
//                nodeWithMap = nodeWithAll[a].childNodes;
//                console.log(a);
//            }
//        }

        var nodeWithBase = nodeWithMap[3].childNodes;
//        console.log(nodeWithMap);
//        for (var b = 0; b < nodeWithMap.length; b++) {
//
//            if( nodeWithMap[b].nodeName == 'node') {
//                nodeWithBase = nodeWithMap[b].childNodes;
//                console.log(b);
//            }
//        }

        for (var c = 0; c < nodeWithBase.length; c++) {

            if( nodeWithBase[c].nodeName == 'node') {
                console.log("basenode " + baseNode);
                nodeChildren(nodeWithBase[c], baseNode);
            }
        }

        function nodeChildren(thisNodeXML, parentNode) {
            //console.log("nodechild " + parentNode.id);

            var newNode = null;
            newNode = newNodeFactory.NewRectNode(parentNode.layer, parentNode);
//            newNode.setText(thisNodeXML.getAttribute("TEXT"));
//            newNode.id = thisNodeXML.getAttribute("ID");

            var childArray = null;

            childArray = thisNodeXML.childNodes;
//            console.log(childArray);
            for (var i = 0; i < childArray.length; i++) {
                if( childArray[i].nodeName == 'node') {
                    console.log(thisNodeXML.getAttribute("ID")+ " with id " + newNode.id  + " calls " + childArray[i].getAttribute("ID"));
                    nodeChildren(childArray[i], newNode);
                }
            }
        };
    }
}