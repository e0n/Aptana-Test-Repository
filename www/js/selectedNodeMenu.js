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
        $(menu).css('top',  - node.group.getY());
        $(menu).css('left',  node.group.getX() - (node.text.getWidth()/2));
    } else {
        $(menu).css('top',  - (node.group.getY() - 40));
        $(menu).css('left', node.group.getX());
    }

    $(size).change(function(){
        node.text.setFontSize($(sizeSelected).val());
        layer.draw();
    });

    $(font).change(function(){
        node.text.setFontFamily($(fontSelected).val());
        layer.draw();
    });

    $(bold).click(function(){
        if(node.text.getFontStyle() == 'bold'){
            node.text.setFontStyle('normal');
        } else {
            node.text.setFontStyle('bold');
        }
        layer.draw();
    });

    $(italic).click(function(){
        if(node.text.getFontStyle() == 'italic'){
            node.text.setFontStyle('normal');
        } else {
            node.text.setFontStyle('italic');
        }
        layer.draw();
    });

    $(underline).click(function(){
        if(node.text.getFontStyle() == 'underline'){
            node.text.setFontStyle('normal');
        } else {
            node.text.setFontStyle('underline');
        }
        layer.draw();
    });
}