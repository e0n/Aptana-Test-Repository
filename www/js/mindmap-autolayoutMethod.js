/*
 mindmap-factoryMethod

 */
autoLayout = {
    var: xOfObject = 0,
    var: yOfObject = 0,
    var: rootNode = null,

    autoLayout : function (newObject, parent, rootBaseNode){
    xOfObject = newObject.group.getX();
    yOfObject = newObject.group.getY();
    rootNode = rootBaseNode;
    checkForCollision(newObject,parent);
    }
}

function checkForCollision(newObject, parent){
    // Check if the newObject collidates with root node, but root node Ellipse sucks...
    checkForOverlying(newObject,rootNode);
    for(var count = 0; count < parent.childElements.length; count++ ){
        if(newObject.id != parent.childElements[count].id){
            checkForOverlying(newObject, parent.childElements[count]);
            if(parent.childElements[count].childElements.length != 0){
                checkForCollision(newObject, parent.childElements[count])
            }
        } else if(newObject.childElements.length != 0){
            checkForCollision(newObject, newObject);
        }
    }
}

function checkForOverlying(newObject, objectToCompare){
    //Fall 2
    if(
        (((xOfObject + newObject.text.getWidth()) > (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
            (yOfObject < objectToCompare.group.getY())
            )   &&
            (
                (xOfObject  < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                    ((yOfObject + newObject.text.getHeight()) > objectToCompare.group.getY())
                )
        ){
        xOfObject = xOfObject + 49;
        yOfObject = yOfObject - 49;
        checkForCollision(newObject, rootNode);
    } else

    //Fall 3
    if(
        ((xOfObject < objectToCompare.group.getX()) &&
            ((yOfObject + newObject.text.getHeight()) > (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
            )   &&
            (((xOfObject + newObject.text.getWidth()) > objectToCompare.group.getX()) &&
                (yOfObject  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject - 51;
        yOfObject = yOfObject + 51;
        checkForCollision(newObject, rootNode);
    } else


    //Fall 4
    if(
        ((xOfObject < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
            (yOfObject  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
            )   &&
            (((xOfObject + newObject.text.getWidth()) > (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                ((yOfObject + newObject.text.getHeight())  > (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject + 53;
        yOfObject = yOfObject + 53;
        checkForCollision(newObject, rootNode);
    } else

    //Fall 1
    if(
        ((xOfObject < objectToCompare.group.getX()) &&
            (yOfObject  < objectToCompare.group.getY())
            )   &&
            (((xOfObject + newObject.text.getWidth()) > objectToCompare.group.getX()) &&
                ((yOfObject + newObject.text.getHeight())  > objectToCompare.group.getY())
                )
        ){
        xOfObject = xOfObject - 56;
        yOfObject = yOfObject - 56;
        checkForCollision(newObject, rootNode);
    } else

    //Fall 5
    if(
        ((xOfObject > objectToCompare.group.getX()) &&
            (yOfObject  > objectToCompare.group.getY())
            )   &&
            (((xOfObject + newObject.text.getWidth()) < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                ((yOfObject + newObject.text.getHeight())  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject + 50;
        yOfObject = yOfObject + 50;
        checkForCollision(newObject, rootNode);
    } else

    // Fall 6
    if(
        ((xOfObject > objectToCompare.group.getX() ) &&
            ((yOfObject + newObject.text.getHeight()) > objectToCompare.group.getY())
            )   &&
            (
                ((xOfObject + newObject.text.getWidth())  < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                    (yOfObject  < objectToCompare.group.getY())
                )
        ){
        xOfObject = xOfObject - 55;
        yOfObject = yOfObject - 60;
        checkForCollision(newObject, rootNode);
    } else

    // Fall 7
    if(
        ((xOfObject < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
            (yOfObject > objectToCompare.group.getY())
            )   &&
            (
                ((xOfObject + newObject.text.getWidth())  > (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                    ((yOfObject + newObject.text.getHeight())  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject + 60;
        yOfObject = yOfObject + 59;
        checkForCollision(newObject, rootNode);
    } else

    // Fall 8
    if(
        ((xOfObject > objectToCompare.group.getX() ) &&
            (yOfObject  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
            )   &&
            (
                ((xOfObject + newObject.text.getWidth())  < (objectToCompare.group.getX() + objectToCompare.text.getWidth())) &&
                    ((yOfObject + newObject.text.getHeight())  > (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject + 55;
        yOfObject = yOfObject + 49;
        checkForCollision(newObject, rootNode);
    } else

    // Fall 9
    if(
        ((xOfObject < objectToCompare.group.getX() ) &&
            (yOfObject > objectToCompare.group.getY())
            )   &&
            (
                ((xOfObject + newObject.text.getWidth())  > objectToCompare.group.getX()) &&
                    ((yOfObject + newObject.text.getHeight())  < (objectToCompare.group.getY() + objectToCompare.text.getHeight()))
                )
        ){
        xOfObject = xOfObject - 49;
        yOfObject = yOfObject - 55;
        checkForCollision(newObject, rootNode);
    }

}

function move(object, newX, newY) {
    if(xOfObject != object.group.getX() && yOfObject != object.group.getY()){
        object.group.transitionTo({
            x: newX,
            y: newY,
            duration: 0.3,
            easing: 'linear'
        })
    }
}



