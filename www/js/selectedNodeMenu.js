/**
 * User: pascal
 * Date: 10.02.13
 */

function showselecedNodeMenu(node, layer) {
    var menu = 'footer div#selectedNodeMenu';
    var font = 'select#font'
    var fontSelected = 'select#font > option:selected';
    var size = 'select#size';
    var sizeSelected = 'select#size > option:selected';
    var bold = 'a#bold';
    var italic = 'a#italic';
    var underline = 'a#underline';
    $(menu).css('display', 'block');
    if(node.typ == 'rect'){
        $(menu).css('top',  layer.getHeight() - markedNode.group.getY());
        $(menu).css('left',  markedNode.group.getX() - (markedNode.text.getWidth()/2));
    } else {
        $(menu).css('top', layer.getHeight() - (markedNode.group.getY() - 40));
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

    $(underline).click(function(){
        if(markedNode.text.getFontStyle() == 'underline'){
            markedNode.text.setFontStyle('normal');
        } else {
            markedNode.text.setFontStyle('underline');
        }
        layer.draw();
    });
}