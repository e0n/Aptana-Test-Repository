<?php
/**
 * User: pascal
 * Date: 5/2/12
 */
class IndexController extends Zend_Controller_Action
{

    public function indexAction() {

    }

    public function loginAction() {
        $this->layout()->header = $this->render("login");
    }

    public function appindexAction(){
        $this->_helper->layout->setLayout('layout');
    }


}
