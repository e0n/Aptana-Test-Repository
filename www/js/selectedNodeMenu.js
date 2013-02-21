/**
 * User: pascal
 * Date: 10.02.13
 */

function showselecedNodeMenu(markedNodes, layer) {
    var menu = 'footer div#selectedNodeMenu';
    var font = 'select#font'
    var fontSelected = 'select#font > option:selected';
    var size = 'select#size';
    var sizeSelected = 'select#size > option:selected';
    var bold = 'a#bold';
    var italic = 'a#italic';
    var colorText = 'div#colorSelector';
    var colorShape = 'div#borderColorSelector';
    var colorTextInput = 'div#colorSelector > input';
    var colorShapeInput = 'div#borderColorSelector > input';
    $(menu).css('display', 'block');
    var canvasHeight = $(".kineticjs-content").height();
    if(markedNode.typ == 'rect'){
        $(menu).css('top',  - canvasHeight + (markedNode.group.getAbsolutePosition().y * 0.8));
        $(menu).css('left',  markedNode.group.getAbsolutePosition().x + (markedNode.text.getWidth()/3.3));
    } else {
        $(menu).css('top', - canvasHeight + (markedNode.group.getY() - 40));
        $(menu).css('left', markedNode.group.getX());
    }

    $(size).change(function(){
        markedNode.text.setFontSize($(sizeSelected).val());
        layer.draw();
    });

    $(font).change(function(){
        markedNode.text.setFontFamily($(fontSelected).val());
        layer.draw();
    });

    $(bold).click(function(){
        if(markedNode.text.getFontStyle() == 'bold'){
            markedNode.text.setFontStyle('normal');
        } else {
            markedNode.text.setFontStyle('bold');
        }
        layer.draw();
    });

    $(italic).click(function(){
        if(markedNode.text.getFontStyle() == 'italic'){
            markedNode.text.setFontStyle('normal');
        } else {
            markedNode.text.setFontStyle('italic');
        }
        layer.draw();
    });

    $(colorText).click(function(){
        $(colorTextInput).css("visibility", "visible").trigger("focus");
    });

    $(colorTextInput).blur(function() {
        $(colorTextInput).css("visibility", "hidden");
    });
    $(colorTextInput).change(function(){
        markedNode.text.setTextFill($(colorTextInput).val());
        $(colorTextInput).trigger("blur");
    });

    $(colorShape).click(function(){
        $(colorShapeInput).css("visibility", "visible").trigger("focus");
    });

    $(colorShapeInput).blur(function() {
        $(colorShapeInput).css("visibility", "hidden");
    });
    $(colorShapeInput).change(function(){
        //markedNode.shape.setFill($(colorShapeInput).val());
        markedNode.backgroundColorBackup = $(colorShapeInput).val();
        $(colorShapeInput).trigger("blur");
    });
}