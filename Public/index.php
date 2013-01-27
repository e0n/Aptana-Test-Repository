<?php
/**
 * User: pascal
 * Date: 5/2/12
 */
require_once '/../include/Zend/Application.php';

define('BASE_PATH', realpath(dirname(__FILE__) . '/../'));
define('APPLICATION_PATH', BASE_PATH . '/application');

if($_SERVER['HTTP_HOST'] == 'localhost') {
    define('APPLICATION_ENV', 'development');
} else {
    define('APPLICATION_ENV', 'production');
}

set_include_path(
    BASE_PATH . '/include'
        . PATH_SEPARATOR . get_include_path()
);

error_reporting(E_ALL | E_STRICT);

$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.ini'
);

$application->bootstrap();
$application->run();