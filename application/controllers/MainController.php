<?php
/**
 * User: pascal
 * Date: 5/2/12
 */
class MainController extends Zend_Controller_Action
{
    public function indexAction(){
        $storage = new Zend_Auth_Storage_Session();
        $data = $storage->read();
        if(!$data){
            $this->_redirect('login/login');
        }
        $this->view->username = $data->username;
        $this->render("home");
    }

    public function homeAction(){

    }

}
