<?php
/**
 * User: sebastian
 * Date: 27.10.12
 */


class LoginController extends Zend_Controller_Action
{
    function indexAction() {

    }

    /**
     * Tryout session for the a guest
     * Username and password are not needed
     */
    public function tryoutAction(){
        $users_mapper = new Model_Users_DbMapper();
        $auth = Zend_Auth::getInstance();
        $authAdapter = new Zend_Auth_Adapter_DbTable($users_mapper->getTable()->getAdapter(),'users');
        $authAdapter->setIdentityColumn('username')
            ->setCredentialColumn('password');
        $authAdapter->setIdentity('Guest')
            ->setCredential('Guest');
        $result = $auth->authenticate($authAdapter);
        if($result->isValid()){
            $storage = new Zend_Auth_Storage_Session();
            $storage->write($authAdapter->getResultRowObject());
            $this->_redirect('load');
        } else {
            $this->view->errorMessage = "Invalid username or password entered.</br>Please try again.";
            $this->_helper->viewRenderer('index');//Reload view with error in it
        }
    }

    /**
    * Login session for the user
    * Checks username and password in the data bank
    * If they are valid, the process goes on
    * Otherwise an error is reported and login should be done again
    */
    public function loginAction(){

        $users_mapper = new Model_Users_DbMapper();
        if($this->getRequest()->isPost()){
            $data = $this->_request->getPost();
            $username = $data['username'];
            if(strpos($username,'@') and strpos($username,'.')){// Is an email address
                $temp_username = $users_mapper->getUsernameFromEmail($username);
                if($temp_username !== false)
                    $username = $temp_username;
            }
            $password = $data['password'];

            $auth = Zend_Auth::getInstance();
            $authAdapter = new Zend_Auth_Adapter_DbTable($users_mapper->getTable()->getAdapter(),'users');
            $authAdapter->setIdentityColumn('username')
                ->setCredentialColumn('password');
            $authAdapter->setIdentity($username)
                ->setCredential($password);
            $result = $auth->authenticate($authAdapter);
            if($result->isValid()){
                $storage = new Zend_Auth_Storage_Session();
                $storage->write($authAdapter->getResultRowObject());
                $this->_redirect('load');
            } else {
                $this->view->errorMessage = "Invalid username (".$username.") or password entered.</br>Please try again.";
                $this->_helper->viewRenderer('index');//Reload view with error in it
            }
        } else {
            $storage = new Zend_Auth_Storage_Session();
            $data = $storage->read();
            if(!$data){
                $this->_redirect('login');
            } else {
                $this->_redirect('load');
            }
        }
    }

    /**
     * Signup a new user
     * Checks if data entered is correct
     * and creates a new user in the DB
     * After that the user is automatically signed in
     */
    public function signupAction(){

        $users_mapper = new Model_Users_DbMapper();
        if($this->getRequest()->isPost()){

            $data = $this->getRequest()->getPost();
            $username = $data['usernamesignup'];
            $pw = $data['passwordsignup'];
            $email = $data['emailsignup'];

            if($pw != $data['passwordsignup_confirm']){
                $this->view->errorMessage = "Password and confirm password don't match.";
                $this->_helper->viewRenderer('index');//Reload view with error in it
                return;
            }
            if($users_mapper->checkUnique($username)){
                $this->view->errorMessage = "Name already taken. Please choose another one.";
                $this->_helper->viewRenderer('index');//Reload view with error in it
                return;
            }
            //Create a user
            $newUser = new Model_Users();
            $newUser->setUsername($username);
            $newUser->setPassword($pw);
            $newUser->setEmail($email);

            $users_mapper->save($newUser);

            // sign automaticaly in
            // like this your don't have to write your login data again
            $auth = Zend_Auth::getInstance();
            $authAdapter = new Zend_Auth_Adapter_DbTable($users_mapper->getTable()->getAdapter(),'users');
            $authAdapter->setIdentityColumn('username')
                ->setCredentialColumn('password');
            $authAdapter->setIdentity($newUser->getUsername())
                ->setCredential($newUser->getPassword());
            $result = $auth->authenticate($authAdapter);
            if($result->isValid()){
                $storage = new Zend_Auth_Storage_Session();
                $storage->write($authAdapter->getResultRowObject());
            } else {
                $this->view->errorMessage = "wtf again!?";
                $this->_helper->viewRenderer('indexy');//Reload view with error in it
            }

            $this->_redirect('login/login');
        }
    }

    /**
     * Clear the actual session
     * User gets logged out
     */
    public function logoutAction(){

        $storage = new Zend_Auth_Storage_Session();
        $storage->clear();
        $this->_redirect('index');
    }
}
