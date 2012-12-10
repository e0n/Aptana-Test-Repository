<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class LoadController extends Zend_Controller_Action
{
    public function indexAction(){
        $storage = new Zend_Auth_Storage_Session();
        $data = $storage->read();
        if(!$data){
            $this->_redirect('login/login');
        }
        $this->view->username = $data->username;
    }

    //TODO this is only temporal, load heavy stuff instead
    public function nextsiteAction(){
        $this->_redirect('main');
    }
}
