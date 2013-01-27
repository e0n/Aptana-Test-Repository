<?php
/**
 * User: Tobi
 * Date: 24.10.12
 * Time: 09:33
 */

class MindmapController extends Zend_Controller_Action
{
    public function indexAction(){
        $storage = new Zend_Auth_Storage_Session();
        $data = $storage->read();
        if(!$data){
            $this->_redirect('login/login');
        }
        $this->view->username = $data->username;
        $this->render();
    }

}
