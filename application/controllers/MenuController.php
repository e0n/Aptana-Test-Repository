<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class MenuController extends Zend_Controller_Action
{
    public function init()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->contextSwitch()
            ->addActionContext('preferences', 'json')
            ->initContext();
    }

    public function indexAction() {
        $menuMapper = new Model_Menu_DbMapper();
        $this->view->menus = $menuMapper->getMenu();
    }

    public function preferencesAction(){
        if($this->getRequest()->isGet()){
            var_dump($this->getRequest()->getParam("ff"));
               $this->view->test = Zend_Json::encode(array("test" => "laber"));
        } elseif ($this->getRequest()->isPost()){

        }
    }

}
