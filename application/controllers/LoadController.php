<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class LoadController extends Zend_Controller_Action
{
    public function indexAction(){
        $this->render("index");
        //TODO Wait while loading
        $this->_forward("home","main",null,null);
    }

}
