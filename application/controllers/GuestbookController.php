<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Tobi
 * Date: 07.06.12
 * Time: 12:51
 * To change this template use File | Settings | File Templates.
 */

class GuestbookController extends Zend_Controller_Action
{

    public function headlineAction()
    {

        $this->view->viewText = "Guestbook";

    }

    public function mycoolAction()
    {
        $tbPostedValue = "";
        $this->view->myCoolActionText = "i'm in Miami bitch";


        if($this->getRequest()->isPost())
        {
            $tbPostedValue = $this->_request->getParam("tbPosted");
            $this->view->myCoolActionText = "page has been posted".$tbPostedValue;


        } else
        {
            $this->view->myCoolActionText = "page not posted";
        }

    }

    public function helloAction()
    {
        $textArrayContent = "lalalala";
        //$textArrayContent = $this->getRequest()->getParam("textArray");



    }


}