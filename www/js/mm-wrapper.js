

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

        var nodeWithMap;
        for (var i = 0; i < nodeWithAll.length; i++) {
            if( nodeWithAll[i].nodeName == 'map') {
                nodeWithMap = nodeWithAll[i].childNodes;
//                console.log("special base node", nodeWithMap);
            }
        }

        var nodeWithBase;
//        console.log(nodeWithMap);
        for (var i = 0; i < nodeWithMap.length; i++) {

            if( nodeWithMap[i].nodeName == 'node') {
                nodeWithBase = nodeWithMap[i].childNodes;
            }
        }

        for (var i = 0; i < nodeWithBase.length; i++) {

            if( nodeWithBase[i].nodeName == 'node') {
                console.log("basenode " + baseNode);
                nodeChildren(nodeWithBase[i], baseNode);
            }
        }

        function nodeChildren(thisNodeXML, parentNode) {
            //console.log("nodechild " + parentNode.id);


            var newNode = null;
            newNode = newNodeFactory.NewRectNode(parentNode.layer, parentNode);
            newNode.setText(thisNodeXML.getAttribute("TEXT"));
            newNode.id = thisNodeXML.getAttribute("ID");


            var childArray = null;
            childArray = thisNodeXML.childNodes;
//            console.log(childArray);
            for (var i = 0; i < childArray.length; i++) {
                if( childArray[i].nodeName == 'node') {
                    console.log(i + " " + newNode.id);
                    nodeChildren(childArray[i], newNode);
                }
            }
            console.log("ende forschleife");
        };
    }
}