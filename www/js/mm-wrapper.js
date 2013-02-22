

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
        for (var a = 0; a < nodeWithAll.length; a++) {
            if( nodeWithAll[a].nodeName == 'map') {
                nodeWithMap = nodeWithAll[a].childNodes;
//                console.log("special base node", nodeWithMap);
            }
        }

        var nodeWithBase;
//        console.log(nodeWithMap);
        for (var b = 0; b < nodeWithMap.length; b++) {

            if( nodeWithMap[b].nodeName == 'node') {
                nodeWithBase = nodeWithMap[b].childNodes;
            }
        }

        for (var c = 0; c < nodeWithBase.length; c++) {

            if( nodeWithBase[c].nodeName == 'node') {
                var data = {};
                console.log("basenode " + baseNode);
                console.log('c'+c);
                var r = nodeChildren(nodeWithBase[c], baseNode);
                sleep(100);
                if(r == baseNode) {
                    console.log("aSd");
                }
            }
        }

        function nodeChildren(thisNodeXML, parentNode) {
            console.log("nodechild " + parentNode);
            data.newNode = newNodeFactory.NewRectNode(parentNode.layer, parentNode);
            data.newNode.setText(thisNodeXML.getAttribute("TEXT"));
            data.newNode.id = thisNodeXML.getAttribute("ID");
            var childArray = null;
            childArray = thisNodeXML.childNodes;
            for (var d = 0; d < childArray.length; d++) {
                console.log('d'+c + ' ' + d);
                if( childArray[d].nodeName == 'node') {
                    nodeChildren(childArray[d], data.newNode);
                }
            }

            return parentNode;
        };

        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }
    }
}