<?php
/**
 * The active session will be controlled in this class.
 *
 * User: pascal
 * Date: 05.05.12
 */
class LoadController extends Zend_Controller_Action
{
    /**
    * Checks the login status of the user.
    * When he is logged in, the process goes on.
    * Otherwise he is redirected to the login screen.
    */
    public function indexAction(){
        $storage = new Zend_Auth_Storage_Session();
        $data = $storage->read();
        if(!$data){
            $this->_redirect('login/login');
        }
        $this->view->username = $data->username;
    }

    /**
    * Leads the user to the next site of the application, the mindmap site.
    */
    public function nextsiteAction(){
        $this->_redirect('mindmap');
    }
}
