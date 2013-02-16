/**
 * Created with JetBrains PhpStorm.
 * User: Admin
 * Date: 30.11.12
 * Time: 17:02
 * To change this template use File | Settings | File Templates.
 */

debugGUI = {
    buildNewEllipseButton : function () {
        var button = new Kinetic.Text({
            x: 10,
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
            cornerRadius: 5
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
            x: 140,
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
            cornerRadius: 5
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
            x: 270,
            y: 35,
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
            cornerRadius: 5
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
            cornerRadius: 5
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
            x: 140,
            y: 120,
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
            cornerRadius: 5
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
            x: 270,
            y: 120,
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
            cornerRadius: 5
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
            cornerRadius: 5
        });
        // add cursor styling for shape oval
        button.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        button.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        return button;
    }
};
