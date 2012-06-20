<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class MenuController extends Zend_Controller_Action
{
    public function indexAction() {
        $menuMapper = new Model_Menu_DbMapper();
        $this->view->menus = $menuMapper->getMenu();
    }
}
