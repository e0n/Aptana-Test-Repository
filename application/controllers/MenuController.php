<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class MenuController extends Zend_Controller_Action
{
    public function saveAction() {
        $storage = new Zend_Auth_Storage_Session();
        $data = $storage->read();
        if(!$data){
            $this->_redirect('login/login');
        }


        if($this->getRequest()->isPost()) {
            $this->_helper->layout->disableLayout();
            $save = $this->getRequest()->getParam('save');
            $filename = $this->getRequest()->getParam('mindmap');
            $mapper = new Model_Users_DbMapper();
            $dir = '../data/';
            if(empty($save) || is_callable($save)) {
                $return["error"] = "Something went wrong!";
                $this->view->return = json_encode($return);
                return $this->view->return;
            }
            if(!is_string($filename) || is_numeric($filename)){
                $return["error"] = "Filename must be String!";
                $this->view->return = json_encode($return);
                return $this->view->return;
            }
            $save = json_decode($save);
            $save = serialize($save);
            $id = $mapper->getID($data->username);
            $dir = $dir . $id . '/';
            if (!is_dir($dir)) {
                mkdir($dir);
            }
                if (!$handle = fopen($dir.$filename.'.oym', "a+")) {
                    $return["error"] = "Something went wrong!";
                    $this->view->return = json_encode($return);
                    return $this->view->return;
                }
                if (!fwrite($handle, $save)) {
                    $return["error"] = "Something went wrong!";
                    $this->view->return = json_encode($return);
                    return $this->view->return;
                }
                fclose($handle);
            $return["success"] = "File Saved!";
            $this->view->return = json_encode($return);
            return $this->view->return;
        }
    }

    public function loadAction(){
        $storage = new Zend_Auth_Storage_Session();
        $data = $storage->read();
        if(!$data){
            $this->_redirect('login/login');
        }
        $this->_helper->layout->disableLayout();

        if($this->getRequest()->isPost()) {
            $mapper = new Model_Users_DbMapper();


            $dir = '../data/';
            $id = $mapper->getID($data->username);
            $root = $dir . $id . '/';
            $dir = $this->getRequest()->getParam('dir');

            if( file_exists($root . $dir) ) {
                $files = scandir($root . $dir);
                natcasesort($files);
                if( count($files) > 2 ) { /* The 2 accounts for . and .. */
                    $this->view->return .= "<ul class=\"jqueryFileTree\" style=\"display: none;\">";
                    // All dirs
                    foreach( $files as $file ) {
                        if( file_exists($root . $dir . $file) && $file != '.' && $file != '..' && is_dir($root . $dir . $file) ) {
                            $this->view->return .= "<li class=\"directory collapsed\"><a href=\"#\" rel=\"" . htmlentities($dir . $file) . "/\">" . htmlentities($file) . "</a></li>";
                        }
                    }
                    // All files
                    foreach( $files as $file ) {
                        if( file_exists($root . $dir . $file) && $file != '.' && $file != '..' && !is_dir($root . $dir . $file) ) {
                            $ext = preg_replace('/^.*\./', '', $file);
                            $this->view->return .= "<li class=\"file ext_$ext\"><a href=\"#\" rel=\"" . htmlentities($dir . $file) . "\">" . htmlentities($file) . "</a></li>";
                        }
                    }
                    $this->view->return .= "</ul>";
                }
            }
        } elseif($this->getRequest()->isGet()) {
            $mapper = new Model_Users_DbMapper();
            $file = $this->getRequest()->getParam('file');
            $dir = '../data/';
            $id = $mapper->getID($data->username);
            $root = $dir . $id . '/' . $file;
            if(!file_exists($root)) {
                $return["error"] = "Something went wrong!";
                $this->view->return = json_encode($return);
                return $this->view->return;
            }  else {
                if (!$handle = fopen($root, "r")) {
                    $return["error"] = "Something went wrong!";
                    $this->view->return = json_encode($return);
                    return $this->view->return;
                }
                if (!$string = fread($handle, filesize($root))) {
                    $return["error"] = "Something went wrong!";
                    $this->view->return = json_encode($return);
                    return $this->view->return;
                }
                fclose($handle);

                $return["success"] = unserialize($string);
                $this->view->return = json_encode($return);
                return $this->view->return;
            }
        }
    }
}
