<?php
/**
 * User: pascal
 * Date: 5/2/12
 */
class MainController extends Zend_Controller_Action
{
    public function indexAction(){
        $this->render("home");
    }

}
