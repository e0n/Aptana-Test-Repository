<?php
/**
 * The active session will be controlled in this class.
 * The function indexAction checks the login status of the user.
 * When it is logged, the process goes on.
 * Otherwise login session will be generated and the login screen will be shown up.
 * 
 * Function nextsiteAction leads the user to the next site of the application
 * 
 * User: pascal
 * Date: 05.05.12
 * 
 * @param string
 * @param string
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
        $this->_redirect('mindmap');
    }
}
