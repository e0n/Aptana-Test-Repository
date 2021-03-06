/**
 * Autolayout-Class.
 *
 * This class provides all necessary functionality for the autolayout.
 * Autolayout is the function that assures that nodes are arranged side by side instead of covering another Node
 *
 * @fileOverview This class provides all necessary functionality for the autolayout.
 */
autoLayout = {
    /**
     * This is the X-coordinate of the newObject.
     * @type int
     * @global
     * @name xOfObject
     */
    var: xOfObject = 0,

    /**
     * This is the Y-coordinate of the newObject.
     * @type int
     * @global
     * @name yOfObject
     */
    var: yOfObject = 0,

    /**
     * This variable represents the rootNode.
     * @type node
     * @global
     * @name rootNode
     */
    var: rootNode = null,

    /**
     * This variable defines if autolayout is on or not.
     * @type boolean
     * @global
     * @name autoLayoutIsOn
     */
    var: autoLayoutIsOn = true,

    /**
     * This function is the external interface and entry point.
     *
     * @method
     * @global
     * @param {Node} newObject This is the object which has to be arranged on the map.
     * @param {Node} parent The parent Node of the Node which has to be arranged.
     * @param {Node} rootBaseNode The Base-node of the mindmap.
     */
    autoLayoutMethod : function (newObject, parent, rootBaseNode){
        xOfObject = newObject.group.getX();
        yOfObject = newObject.group.getY();
        rootNode = rootBaseNode;
        if(autoLayoutIsOn == true){
            checkForCollisionMethod(newObject,parent);
        }
    },
    /**
     * This function is the external interface and entry point.
     *
     * @method
     * @global
     * @param {Node} newObject This is the object which has to be arranged on the map.
     * @param {Node} parent The parent Node of the Node which has to be arranged.
     * @param {Node} rootBaseNode The Base-node of the mindmap.
     */
     setAutoLayout : function (bool){
        autoLayoutIsOn = bool;
     }



}

    /**
     *  This Function iterates through all existing nodes on the map to make sure the Node do not cover one of them.
     * @method
     * @param {Node} newObject This is the object which has to be arranged on the map.
     * @param {Node} parent The parent Node of the Node which has to be arranged.
     */
    function checkForCollisionMethod(newObject, parent){
        checkForOverlyingMethod(newObject,rootNode);
        for(var count = 0; count < parent.childElements.length; count++ ){
            if(newObject.id != parent.childElements[count].id){
                checkForOverlyingMethod(newObject, parent.childElements[count]);
                if(parent.childElements[count].childElements.length != 0){
                    checkForCollisionMethod(newObject, parent.childElements[count])
                }
            } else if(newObject.childElements.length != 0){
                checkForCollisionMethod(newObject, newObject);
            }
        }
    }

    /**
     * This function does the comparing of two different nodes.
     * In different cases would be proofed if an node overlays another node.
     * @method
     * @param {Node} newObject This is the object which has to be arranged on the map.
     * @param {Node} objectToCompare This is the object which is actually compared to the newObject.
     */
    function checkForOverlyingMethod(newObject, objectToCompare){
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
            checkForCollisionMethod(newObject, rootNode);
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
            checkForCollisionMethod(newObject, rootNode);
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
            checkForCollisionMethod(newObject, rootNode);
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
            checkForCollisionMethod(newObject, rootNode);
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
            checkForCollisionMethod(newObject, rootNode);
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
            checkForCollisionMethod(newObject, rootNode);
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
            checkForCollisionMethod(newObject, rootNode);
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
            checkForCollisionMethod(newObject, rootNode);
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
            checkForCollisionMethod(newObject, rootNode);
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



