<?php
/**
 * User: pascal
 * Date: 03.05.12
 */
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    /**
     * @comment initializes Layout
     * @return Zend_View
     */
    protected function _initView()
    {
        // Init view
        $view = new Zend_View();
        $view->doctype('XHTML1_STRICT');
        $view->headTitle('Teamprojekt BrainstormingApp');
        $view->env = APPLICATION_ENV;

        // Add it to the ViewRenderer
        $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper(
            'ViewRenderer'
        );
        $viewRenderer->setView($view);

        // Return it, so that it can be stored by the bootstrap
        return $view;
    }

    /**
     * @comment initializes a Resource Loader
     */
    protected function _initResourceLoader() {
        $resourceloader = new Zend_Loader_Autoloader_Resource(array(
            'namespace' => '',
            'basePath' => BASE_PATH));

        $resourceloader->addResourceType('model', '/application/models/', 'Model');
        $resourceloader->addResourceType('lib', '/include/Lib/', 'Lib');
        $this->setResourceLoader($resourceloader);
    }
}