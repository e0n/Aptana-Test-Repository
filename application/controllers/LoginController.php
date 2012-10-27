<?php
/**
 * User: sebastian
 * Date: 27.10.12
 */
class LoginController extends Zend_Controller_Action
{
    function indexAction() {
        $this->render('index');
    }

    function loginAction() {
        /*Welcome <?php echo $_POST["username"]; ?>!<br />
        You are <?php echo $_POST["password"]; ?> years old.
        You want to be remembered <?php echo $_POST["loginkeeping"]; ?>.*/

        $request = $this->getRequest();
        $this->view->assign('action', $request->getBaseURL()."/user/auth");
        $this->view->assign('title', 'Login Form');
        $this->view->assign('username', 'User Name');
        $this->view->assign('password', 'Password');

        //$this->_forward("index","load",null,null);
    }
}
